/**
 * JsonLd — structured data injection utilities.
 *
 * Two exports:
 *
 *   JsonLd          — generic renderer. Accepts any schema object (or array
 *                     of objects) and serialises them into <script> tags.
 *                     Used throughout the app for Article, BreadcrumbList,
 *                     FAQPage, ItemList, and WebSite schemas.
 *
 *   OrganizationJsonLd — zero-prop convenience component. Renders the strict
 *                        schema.org/Organization schema for Bigelow Interior
 *                        Design, including the correct logo ImageObject and
 *                        sameAs social profiles.
 *
 * Placement:
 *   Both components render <script type="application/ld+json"> tags.
 *   They are safe to use inside <head> (via Next.js metadata) or anywhere
 *   in <body> — search engines accept structured data in either location.
 *   In this project they are rendered at the top of <body> in layout.tsx.
 *
 * Why dangerouslySetInnerHTML?
 *   JSON-LD must be a raw string inside the <script> tag, not escaped HTML.
 *   dangerouslySetInnerHTML bypasses React's default HTML escaping so the
 *   JSON is written verbatim. JSON.stringify produces valid, injection-safe
 *   output — no user-supplied strings reach this call path.
 */

import { buildOrganizationSchema } from '@/lib/schema';

// ─── Generic renderer ────────────────────────────────────────
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

// ─── Organisation schema (plug-and-play) ─────────────────────
/**
 * Renders the canonical Organisation JSON-LD block for Bigelow Interior Design.
 *
 * Outputs a single <script type="application/ld+json"> containing:
 *
 *   {
 *     "@context": "https://schema.org",
 *     "@type": "Organization",
 *     "name": "Bigelow Interior Design",
 *     "alternateName": "Bigelow Designs",
 *     "url": "https://bigelowdesigns.com",
 *     "logo": {
 *       "@type": "ImageObject",
 *       "url": "https://bigelowdesigns.com/bigelow-interior-design-logo.webp",
 *       "width": 612,
 *       "height": 408,
 *       "caption": "Bigelow Interior Design logo"
 *     },
 *     "sameAs": [
 *       "https://instagram.com/bigelowdesigns",
 *       "https://pinterest.com/bigelowdesigns",
 *       "https://x.com/bigelowdesigns",
 *       "https://youtube.com/@bigelowdesigns"
 *     ]
 *   }
 *
 * Usage — drop into any layout or page with no configuration:
 *
 *   import { OrganizationJsonLd } from '@/components/JsonLd';
 *   <OrganizationJsonLd />
 */
export function OrganizationJsonLd() {
  return <JsonLd data={buildOrganizationSchema()} />;
}
