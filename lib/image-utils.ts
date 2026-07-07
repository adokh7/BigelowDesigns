/**
 * image-utils.ts
 *
 * Server-side image-path resolver for MDX articles and product
 * components. The contract is intentionally simple:
 *
 *   resolveImage("/foo.webp")  → "/foo.webp"  if public/foo.webp exists
 *   resolveImage("/missing")   → DEFAULT_FALLBACK
 *   resolveImage(undefined)    → DEFAULT_FALLBACK
 *   resolveImage("https://…")  → passthrough (external URLs trusted)
 *   resolveImage("data:…")     → passthrough
 *
 * Drop any image directly into /public and reference it as
 * `/filename.ext` anywhere in MDX or in a product component's `image`
 * prop. If the file is missing — typo, not uploaded yet, removed by
 * mistake — the resolver returns the global fallback instead of a
 * broken icon or an empty grey box.
 *
 * The fs check only runs on the server. All consumer call-sites
 * (mdx-components.tsx `img` mapping, ProductCard, AffiliateProductGrid)
 * are React Server Components, so this is safe and zero-runtime-cost
 * on the client.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** Global fallback. Drop the actual file at `public/default-fallback.webp`. */
export const DEFAULT_FALLBACK = '/default-fallback.webp';

/**
 * Resolve an image src to either itself (if the file exists in /public)
 * or the fallback path.
 *
 * @param src       The src as authored in MDX / prop (e.g. "/sofa.webp").
 * @param fallback  Optional per-call fallback. Defaults to DEFAULT_FALLBACK.
 */
export function resolveImage(
  src: string | null | undefined,
  fallback: string = DEFAULT_FALLBACK,
): string {
  if (!src || typeof src !== 'string') return fallback;

  // External URLs and data URIs are trusted as-is — we can't fs-check
  // them, and Next.js / the browser will handle their own errors.
  if (/^(https?:)?\/\//i.test(src)) return src;
  if (src.startsWith('data:'))      return src;

  // Normalize to a leading-slash public URL.
  const normalized = src.startsWith('/') ? src : `/${src}`;

  // Strip any query string or hash before hitting the filesystem.
  const fsRelativeClean = normalized.split('?')[0].split('#')[0];
  
  let fsRelative = fsRelativeClean;
  let returnPath = normalized;
  
  // If the path starts with /public/, strip it for physical fs check and return path
  if (fsRelativeClean.startsWith('/public/')) {
    fsRelative = fsRelativeClean.replace(/^\/public/, '');
    returnPath = normalized.replace(/^\/public/, '');
  }

  try {
    const fullPath = path.join(PUBLIC_DIR, fsRelative);
    if (existsSync(fullPath)) return returnPath;
  } catch {
    // Any unexpected fs error — fall through to fallback.
  }

  return fallback;
}
