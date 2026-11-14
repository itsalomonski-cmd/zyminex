// app/blog/[slug]/page.tsx
import { blogPosts } from '@/lib/blog';
import { CONSTANTS } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Zap,
  ShieldCheck,
  Headphones,
  BookOpen,
  PlayCircle,
  Award,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import ShareButtons from '../../components/ShareButtons';
import ArticleScrollSidebar from '../../components/ArticleScrollSidebar';

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const FOCUS_KEYWORD = CONSTANTS.FOCUS_KEYWORD;
const LANGUAGE = CONSTANTS.LANGUAGE || 'en-US';

const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

function getCategoryLabel(post: any): string {
  if (post.category) {
    const map: Record<string, string> = {
      setup: 'Setup Guide',
      review: 'Review',
      sports: 'Live Sports',
      tips: 'Tips & Tricks',
      news: 'News',
    };
    return map[post.category] || post.category;
  }
  if (post.keywords && post.keywords.length > 0) return post.keywords[0];
  return `${FOCUS_KEYWORD} Guide`;
}

function getReadTime(post: any): number {
  if (post.readTime) {
    const match = String(post.readTime).match(/(\d+)/);
    if (match) return parseInt(match[1]);
  }
  const words = (post.content || '')
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function sanitizeContent(html: string): string {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '<\/h2>')
    .replace(/<h2([^>]*)>(.*?faq.*?)<\/h2>/gi, '<h2 id="faq-section"$1>$2</h2>');
}

function extractFAQs(html: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];

  const cardRegex =
    /<div class="faq-card[^"]*">\s*<h3[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>\s*<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, '').trim();
    const a = match[2].replace(/<[^>]*>/g, '').trim();
    if (q.length > 5 && a.length > 10) {
      faqs.push({ q, a });
    }
  }

  if (faqs.length === 0) {
    const legacyRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let legacyMatch;
    while ((legacyMatch = legacyRegex.exec(html)) !== null) {
      const rawQ = legacyMatch[1].replace(/<[^>]*>/g, '').trim();
      const rawA = legacyMatch[2].replace(/<[^>]*>/g, '').trim();
      if (rawQ.includes('Q.') || rawQ.endsWith('?')) {
        const cleanQ = rawQ.replace(/^Q\.\s*/, '').trim();
        if (cleanQ.length > 5 && rawA.length > 10) {
          faqs.push({ q: cleanQ, a: rawA });
        }
      }
    }
  }

  return faqs.slice(0, 10);
}

function getRelatedPosts(currentPost: any, allPosts: any[], limit = 3): any[] {
  const scored = allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      let score = 0;
      if (p.category && currentPost.category && p.category === currentPost.category) {
        score += 5;
      }
      const currentKw = (currentPost.keywords || []).map((k: string) => k.toLowerCase());
      const otherKw = (p.keywords || []).map((k: string) => k.toLowerCase());
      const shared = currentKw.filter((k: string) => otherKw.includes(k));
      score += shared.length * 2;
      if (p.author === currentPost.author) score += 1;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

function extractHeadings(html: string): string[] {
  const headings: string[] = [];
  const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text.length > 3 && text.length < 100) {
      headings.push(text);
    }
  }
  return headings.slice(0, 8);
}

import { BlogPost } from '@/lib/blog';

function extractQuickFacts(post: Partial<BlogPost>): { label: string; value: string }[] {
  const content = (post.content || '').toLowerCase();

  const qualityValue =
    post.quality ||
    (content.includes('4k') || content.includes('uhd') ? '4K Ultra HD' : 'HD / 4K');

  const deviceValue =
    post.device ||
    (content.includes('firestick')
      ? 'Firestick Ready'
      : content.includes('android tv') || content.includes('smart tv')
      ? 'Smart TV / Android'
      : 'Multi-Device');

  const playerValue =
    post.player ||
    (content.includes('smarters')
      ? 'IPTV Smarters Pro'
      : content.includes('tivimate')
      ? 'TiviMate'
      : 'All Players');

  const eventsValue =
    post.events ||
    (content.includes('nfl') || content.includes('ppv') || content.includes('sports')
      ? 'Live Sports & PPV'
      : 'Major Events');

  return [
    { label: 'Quality', value: qualityValue },
    { label: 'Device', value: deviceValue },
    { label: 'Player', value: playerValue },
    { label: 'Events', value: eventsValue },
  ];
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    const fallbackUrl = `${SITE_URL}/blog`;
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
      alternates: { canonical: fallbackUrl },
    };
  }

  const shortTitle = clampTitle(
    post.metatitle || post.title
  );

  const description = clampDescription(
    post.metadescription ||
      post.description ||
      post.excerpt ||
      `Read the full ${BRAND} guide and tips for IPTV streaming.`
  );

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${SITE_URL}${post.image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: shortTitle },
    description,
    keywords: post.keywords?.length
      ? post.keywords.join(', ')
      : `${CONSTANTS.FOCUS_KEYWORD}, ${CONSTANTS.SECONDARY_FOCUS_KEYWORD}`,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: BRAND,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: shortTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND,
      locale: CONSTANTS.LOCALE,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shortTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'entertainment',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const readTime = getReadTime(post);
  const displayCategory = getCategoryLabel(post);
  const dateStr = formatDate(post.date);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  const imageSrc = post.image || '/img/blog/default.webp';
  
  const schemaImageUrl = imageSrc.startsWith('http')
    ? imageSrc
    : `${SITE_URL}${imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`}`;

  const safeContent = sanitizeContent(post.content);
  const faqs = extractFAQs(post.content);
  const relatedPosts = getRelatedPosts(post, blogPosts, 3);
  const articleHeadings = extractHeadings(safeContent);
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const quickFacts = extractQuickFacts(post);

  const whatsappIboMsg = encodeURIComponent(
    `Hi! I'd like to get IPTV Smarters Pro access subscription.`
  );
  const whatsappSubMsg = encodeURIComponent(
    `Hi! I'd like to get a ${BRAND} subscription.`
  );

  const authorId = `${SITE_URL}/#author-${post.author
    .toLowerCase()
    .replace(/\s+/g, '-')}`;

  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const jsonLdGraph: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': authorId,
        name: post.author,
        url: `${SITE_URL}/about`,
        jobTitle: `${FOCUS_KEYWORD} Specialist`,
        description: `Specializes in IPTV streaming guides and setup.`,
        knowsAbout: [
          FOCUS_KEYWORD,
          'IPTV Smarters Pro',
          'Firestick setup',
          'Smart TV streaming',
          '4K streaming',
        ],
        worksFor: { '@id': orgId },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}/#article`,
        headline: post.title,
        name: post.title,
        description: post.description || post.excerpt,
        keywords: post.keywords ? post.keywords.join(', ') : '',
        articleSection: displayCategory,
        wordCount: wordCount,
        timeRequired: `PT${readTime}M`,
        image: {
          '@type': 'ImageObject',
          '@id': `${canonicalUrl}/#primaryimage`,
          url: schemaImageUrl,
          contentUrl: schemaImageUrl,
          width: 1200,
          height: 630,
          caption: post.title,
          representativeOfPage: true,
        },
        thumbnailUrl: schemaImageUrl,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: LANGUAGE,
        author: { '@id': authorId },
        publisher: { '@id': orgId },
        mainEntityOfPage: { '@id': `${canonicalUrl}/#webpage` },
        isPartOf: { '@id': `${canonicalUrl}/#webpage` },
        about: articleHeadings.slice(0, 4).map((h) => ({
          '@type': 'Thing',
          name: h,
        })),
        mentions: (post.keywords || []).slice(0, 6).map((k: string) => ({
          '@type': 'Thing',
          name: k,
        })),
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', 'article > p:first-of-type'],
        },
        accessMode: ['textual', 'visual'],
        isAccessibleForFree: true,
        copyrightHolder: { '@id': orgId },
        license: `${SITE_URL}/terms`,
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: post.title,
        description: post.description || post.excerpt,
        inLanguage: LANGUAGE,
        isPartOf: { '@id': websiteId },
        about: { '@id': `${canonicalUrl}/#article` },
        primaryImageOfPage: { '@id': `${canonicalUrl}/#primaryimage` },
        breadcrumb: { '@id': `${canonicalUrl}/#breadcrumb` },
        datePublished: post.date,
        dateModified: post.date,
        potentialAction: {
          '@type': 'ReadAction',
          target: [canonicalUrl],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  if (faqs.length > 0) {
    jsonLdGraph['@graph'].push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <article className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC] relative">

      {/* READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#18181B] backdrop-blur-sm">
        <div className="h-full w-1/3 bg-gradient-to-r from-[#008000] via-[#39FF14] to-[#FFD700] shadow-[0_0_12px_rgba(57,255,20,0.5)]" />
      </div>

      <script
        type="application/ld+json"
        id="article-schema-data"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {/* ==========================================================
          HERO — ARTICLE BG COVER IMAGE
      ========================================================== */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#09090B] border-b border-[#27272A]">

        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/90 via-[#09090B]/80 to-[#09090B]/95" />
        </div>

        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* HERO CONTENT */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 bg-[#18181B] px-5 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
            <BookOpen className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] text-[11px] font-black uppercase tracking-widest">
              {displayCategory}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F8FAFC] tracking-tight uppercase mb-6 leading-[1.1] max-w-5xl shadow-sm">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#39FF14]" />
            <div className="w-2 h-2 rotate-45 bg-[#39FF14]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#39FF14]" />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-medium max-w-3xl mx-auto leading-relaxed mb-8">
            {post.description || post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
            <div className="inline-flex items-center gap-3 bg-[#18181B]/90 backdrop-blur-md border border-[#27272A] pl-1.5 pr-4 py-1.5 rounded-full shadow-md">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#39FF14]">
                <Image
                  src="/img/profile.webp"
                  alt={post.author}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-black uppercase tracking-widest text-[#39FF14] leading-none">
                  Written by
                </div>
                <div className="text-[11px] font-black text-[#F8FAFC] uppercase tracking-wider leading-tight mt-0.5">
                  {post.author}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#18181B]/90 backdrop-blur-md border border-[#27272A] px-4 py-2 rounded-full text-[#F8FAFC] text-[11px] font-black uppercase tracking-widest shadow-md">
              <Calendar className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>{dateStr}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#18181B]/90 backdrop-blur-md border border-[#27272A] px-4 py-2 rounded-full text-[#F8FAFC] text-[11px] font-black uppercase tracking-widest shadow-md">
              <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>{readTime} min read</span>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <section className="bg-[#18181B] border-y border-[#27272A] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#27272A]">
            {quickFacts.map((fact, idx) => (
              <div key={idx} className="py-4 sm:py-5 px-4 text-center group hover:bg-[#27272A]/50 transition-colors">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#39FF14] mb-1">
                  {fact.label}
                </div>
                <div className="text-sm sm:text-base font-black text-[#F8FAFC] uppercase tracking-tight">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* CONTENT COLUMN */}
        <div className="lg:col-span-8 order-1 space-y-8">

          {/* ARTICLE BODY CARD */}
          <div className="relative bg-[#18181B] text-[#F8FAFC] rounded-3xl border border-[#27272A] shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#008000] via-[#39FF14] to-[#FFD700]" />

            <div className="p-5 sm:p-7 md:p-10 lg:p-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#39FF14]/5 to-transparent rounded-bl-[4rem] pointer-events-none" />

              <div
                className="
                  article-body
                  prose prose-lg max-w-none relative
                  [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:text-[#39FF14] [&_h2]:mb-5 [&_h2]:mt-10 [&_h2]:sm:mt-12 [&_h2]:tracking-tight [&_h2]:uppercase [&_h2]:leading-tight
                  [&_h2]:pb-3 [&_h2]:border-b-2 [&_h2]:border-[#27272A]
                  [&_h2]:relative [&_h2]:pl-4 [&_h2]:before:content-[''] [&_h2]:before:absolute [&_h2]:before:left-0 [&_h2]:before:top-0 [&_h2]:before:bottom-3 [&_h2]:before:w-1 [&_h2]:before:bg-[#39FF14] [&_h2]:before:rounded-full
                  [&_h2#faq-section]:pl-0 [&_h2#faq-section]:before:hidden
                  [&_h2[id*='faq']]:pl-0 [&_h2[id*='faq']]:before:hidden
                  [&_h2[id*='FAQ']]:pl-0 [&_h2[id*='FAQ']]:before:hidden
                  [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:md:text-2xl [&_h3]:font-black [&_h3]:text-[#39FF14] [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:uppercase
                  [&_h4]:text-base [&_h4]:sm:text-lg [&_h4]:md:text-xl [&_h4]:font-black [&_h4]:text-[#39FF14] [&_h4]:mb-3 [&_h4]:mt-6 [&_h4]:uppercase
                  [&_p]:text-[#94A3B8] [&_p]:text-[15px] [&_p]:sm:text-base [&_p]:md:text-lg [&_p]:font-medium [&_p]:leading-[1.8] [&_p]:mb-5 [&_p]:md:mb-6
                  [&_a]:text-[#39FF14] [&_a]:font-black [&_a]:hover:text-[#FFD700] [&_a]:transition-colors [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#39FF14] [&_blockquote]:bg-[#09090B] [&_blockquote]:pl-5 [&_blockquote]:sm:pl-6 [&_blockquote]:py-3 [&_blockquote]:my-6 [&_blockquote]:text-[#F8FAFC] [&_blockquote]:italic [&_blockquote]:rounded-r-xl
                  [&_code]:bg-[#09090B] [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-lg [&_code]:text-[#39FF14] [&_code]:text-sm [&_code]:font-bold
                  [&_pre]:bg-[#09090B] [&_pre]:text-[#F8FAFC] [&_pre]:p-5 [&_pre]:sm:p-6 [&_pre]:rounded-2xl [&_pre]:overflow-x-auto
                  [&_img]:rounded-2xl [&_img]:my-8 [&_img]:border border-[#27272A] [&_img]:w-full [&_img]:h-auto [&_img]:shadow-2xl
                  [&_hr]:border-[#27272A] [&_hr]:my-12
                "
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />

            </div>
          </div>

          {/* SHARE BUTTONS */}
          <ShareButtons title={`${post.title} - ${BRAND}`} url={canonicalUrl} />

          {/* TOPICS */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#39FF14]/10 border border-[#27272A] flex items-center justify-center">
                  <Tag className="w-4 h-4 text-[#39FF14]" />
                </div>
                <h2 className="text-[#F8FAFC] font-black text-base md:text-lg uppercase tracking-wide">
                  Topics in this article
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {post.keywords.slice(0, 8).map((keyword: string) => (
                  <span
                    key={keyword}
                    className="group/chip px-4 py-2 bg-[#18181B] text-[#F8FAFC] text-xs md:text-sm font-black uppercase tracking-wider rounded-full border border-[#27272A] shadow-md hover:bg-[#39FF14] hover:text-[#09090B] hover:border-[#39FF14] hover:scale-105 transition-all cursor-default"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AUTHOR CARD */}
          <div className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] shadow-2xl">
            <div className="h-1.5 bg-gradient-to-r from-[#FFD700] via-[#39FF14] to-[#FFD700]" />

            <div className="p-6 sm:p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/5 rounded-bl-[4rem] pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 relative z-10">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#39FF14] shadow-xl flex-shrink-0 rotate-2 hover:rotate-0 transition-transform">
                  <Image
                    src="/img/profile.webp"
                    alt={`${post.author} - ${FOCUS_KEYWORD} Specialist`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 bg-[#39FF14] text-[#09090B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-[#09090B]">
                    <User className="w-3 h-3" /> Author
                  </div>
                  <h2 className="text-[#F8FAFC] font-black text-xl sm:text-2xl md:text-3xl mb-1 uppercase tracking-tight">
                    {post.author}
                  </h2>
                  <p className="text-[#39FF14] text-xs md:text-sm uppercase tracking-widest font-black mb-3">
                    {FOCUS_KEYWORD} Specialist
                  </p>
                  <p className="text-[#94A3B8] text-sm md:text-base font-semibold leading-relaxed">
                    Specialized in streaming protocols, app configurations, and network optimizations. Helps customers get the most out of their 4K {FOCUS_KEYWORD} subscription and IPTV Smarters Pro setups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INLINE CTA CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-[#18181B] border border-[#27272A] p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#39FF14]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#39FF14]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#39FF14] text-[#09090B] px-3 py-1 rounded-full mb-4 shadow-md">
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    Ready to Stream?
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight leading-tight mb-2">
                  Get Your {FOCUS_KEYWORD} Subscription Today
                </h3>
                <p className="text-[#94A3B8] text-sm md:text-base font-bold max-w-lg">
                  55,000+ live channels, 150,000+ movies & TV shows, free trial first, instant WhatsApp setup.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <a
                  href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${whatsappSubMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] hover:scale-105 transition-all shadow-lg cursor-pointer border border-[#09090B]/20"
                >
                  Start Free Trial <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#09090B] text-[#F8FAFC] font-black text-xs uppercase tracking-widest border border-[#27272A] hover:border-[#39FF14] hover:text-[#39FF14] transition-all cursor-pointer"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <ArticleScrollSidebar
          relatedPosts={relatedPosts}
          whatsappIboMsg={whatsappIboMsg}
          whatsappSubMsg={whatsappSubMsg}
        />
      </div>

      {/* TRUST STRIP */}
      <div className="border-t border-[#27272A] mt-8 py-8 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#94A3B8] text-xs font-black uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#39FF14]" /> 4K Ultra HD
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39FF14]" /> 99.9% Server Uptime
            </span>
            <span className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#39FF14]" /> 24/7 WhatsApp Support
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#39FF14]" /> 50,000+ Happy Viewers
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#39FF14]" /> Global Coverage
            </span>
          </div>
          <p className="text-center text-[#94A3B8]/60 text-xs mt-6 font-bold">
            © 2026 {BRAND}. All rights reserved.
          </p>
        </div>
      </div>
    </article>
  );
}