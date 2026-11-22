// app/sitemap.ts
import { MetadataRoute } from 'next';
import { CONSTANTS } from '@/lib/seo';
import { blogPosts } from '@/lib/blog';
import { channelsData } from '@/lib/channels-data';

// lastModified is only emitted where a real content date exists (blog posts,
// and the blog index = its newest post). Stamping every URL with the build time
// made every page look "changed" on every deploy, which teaches search engines
// to ignore lastmod. URLs without a known date simply omit it (valid per spec).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${CONSTANTS.DOMAIN}`;

  const newestPostDate = blogPosts
    .map((post) => new Date(post.date))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  // -------------------------------------------------------------------------
  // 1. CORE STATIC PAGES
  // -------------------------------------------------------------------------
  const corePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/setup`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/zyminex`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/reseller`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/reviews`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/faq`, changeFrequency: 'weekly', priority: 0.85 },
    {
      url: `${baseUrl}/blog`,
      ...(newestPostDate ? { lastModified: newestPostDate } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    { url: `${baseUrl}/support`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // NOTE: there is no /channels index route (only /channels/[slug]), so it is
  // not listed. Add it here only if an index page is created.

  // -------------------------------------------------------------------------
  // 2. LEGAL & POLICY PAGES
  // -------------------------------------------------------------------------
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/dmca`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // -------------------------------------------------------------------------
  // 3. DYNAMIC CHANNEL CATEGORIES
  // -------------------------------------------------------------------------
  const channelPages: MetadataRoute.Sitemap = channelsData.map((category) => ({
    url: `${baseUrl}/channels/${category.slug}`,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // -------------------------------------------------------------------------
  // 4. DYNAMIC BLOG POSTS
  // -------------------------------------------------------------------------
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // -------------------------------------------------------------------------
  // COMBINE & RETURN
  // -------------------------------------------------------------------------
  return [...corePages, ...channelPages, ...blogPostPages, ...legalPages];
}
