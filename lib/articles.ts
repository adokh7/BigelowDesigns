import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Article, ArticleFrontmatter, Heading } from '@/types/article';
import { resolveImage } from './image-utils';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[`*_]/g, '');
      headings.push({ id: slugify(text), text, level });
    }
  }
  return headings;
}

function readArticleFile(filename: string): Article {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  const stats = readingTime(content);
  
  // Resolve image paths to browser-facing paths if they exist
  const heroImage = resolveImage(fm.heroImage);
  
  // Cast data to any to resolve image safely if present
  const rawData = data as any;
  const image = rawData.image ? resolveImage(rawData.image) : heroImage;

  return {
    ...fm,
    heroImage,
    image,
    slug: fm.slug ?? filename.replace(/\.mdx?$/, ''),
    content,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
    headings: extractHeadings(content),
  };
}

let articleCache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (articleCache) return articleCache;
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  const articles = files
    .map(readArticleFile)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  articleCache = articles;
  return articles;
}

export function getArticleBySlug(category: string, slug: string): Article | null {
  return (
    getAllArticles().find((a) => a.category === category && a.slug === slug) ?? null
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (a) => a.category === category || a.secondaryCategories?.includes(category),
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = 0;
      if (a.category === article.category) score += 3;
      const sharedTags = (a.tags ?? []).filter((t) => (article.tags ?? []).includes(t));
      score += sharedTags.length;
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.article);
}

export function getAllCategorySlugs(): string[] {
  return [...new Set(getAllArticles().map((a) => a.category))];
}

/** Look up a single article by slug, ignoring category. */
export function getArticleBySlugOnly(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}

/**
 * Canonical archive URL for an article category.
 *
 * Only the six physical rooms live under /rooms/<slug> (that route has
 * dynamicParams=false, so anything else 404s). Editorial categories map to
 * their own top-level hubs, and the retired room-guides archive
 * consolidates onto /rooms. Every component that links to a category
 * archive MUST use this helper rather than string-building the path.
 */
const CATEGORY_HUBS: Record<string, string> = {
  reviews: '/reviews',
  'design-trends': '/design-trends',
  'room-guides': '/rooms',
};

export function getCategoryHref(category: string): string {
  return CATEGORY_HUBS[category] ?? `/rooms/${category}`;
}
