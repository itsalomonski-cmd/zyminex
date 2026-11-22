// Shared, data-free helpers for blog UI.
// IMPORTANT: only a *type* import from ./blog is allowed here. This module is
// used by a client component (ArticleScrollSidebar); importing the blogPosts
// data at runtime would ship every article's HTML to the browser.
import type { BlogPost } from './blog';

export const BLOG_CATEGORY_LABELS: Record<NonNullable<BlogPost['category']>, string> = {
  setup: 'Setup Guide',
  review: 'Review',
  sports: 'Live Sports',
  tips: 'Tips & Tricks',
  news: 'News',
};

/** Category label for a post: mapped category, else first keyword, else `fallback`. */
export function getPostCategoryLabel(post: BlogPost, fallback: string): string {
  if (post.category) return BLOG_CATEGORY_LABELS[post.category] || post.category;
  if (post.keywords && post.keywords.length > 0) return post.keywords[0];
  return fallback;
}

/** Reading time in minutes (article page + sidebar): explicit readTime, else ~200 wpm, min 3. */
export function getPostReadMinutes(post: Pick<BlogPost, 'readTime' | 'content'>): number {
  if (post.readTime) {
    const match = String(post.readTime).match(/(\d+)/);
    if (match) return parseInt(match[1], 10);
  }
  const words = (post.content || '')
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

/** "Nov 2, 2026"-style date; returns the input unchanged if it is not a valid date. */
export function formatPostDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// Blog image optimization
// Blog covers and article-body images are plain <img> tags, so they bypass
// next/image. Several source files are 5000-8000px wide (up to ~0.9 MB), so
// local images are requested through the same Next.js image optimizer that
// next/image uses (resized + modern format). The files in /public are not
// modified. Widths must be in Next's default deviceSizes.
// ---------------------------------------------------------------------------
const BLOG_IMAGE_WIDTHS = [640, 828, 1200, 1920] as const;

function isLocalImage(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//');
}

/** URL of `src` resized to `width` by the Next.js image optimizer. */
export function optimizedImageUrl(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** src/srcSet/sizes props for an <img>; remote images are returned as-is. */
export function blogImageProps(
  src: string,
  sizes: string
): { src: string; srcSet?: string; sizes?: string } {
  if (!isLocalImage(src)) return { src };
  return {
    src: optimizedImageUrl(src, 1200),
    srcSet: BLOG_IMAGE_WIDTHS.map((w) => `${optimizedImageUrl(src, w)} ${w}w`).join(', '),
    sizes,
  };
}

/**
 * Rewrites local <img src="/img/..."> tags in article HTML to use the image
 * optimizer with a srcset, lazy loading and async decoding.
 */
export function optimizeArticleImages(html: string, sizes: string): string {
  return html.replace(
    /<img\s+src="(\/img\/[^"?#]+\.(?:webp|png|jpe?g))"/gi,
    (_match, src: string) => {
      const amp = (u: string) => u.replace(/&/g, '&amp;');
      const srcset = BLOG_IMAGE_WIDTHS.map((w) => `${amp(optimizedImageUrl(src, w))} ${w}w`).join(', ');
      return `<img loading="lazy" decoding="async" sizes="${sizes}" srcset="${srcset}" src="${amp(optimizedImageUrl(src, 1200))}"`;
    }
  );
}
