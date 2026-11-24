// app/zyminex/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';
import { zyminexFaqs } from '@/lib/page-faqs';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const FOCUS_KEYWORD = CONSTANTS.FOCUS_KEYWORD;
// Must match this route's real URL: it drives the canonical, og:url, hreflang
// and every JSON-LD @id on the page.
const PAGE_URL = `${SITE_URL}/zyminex`;

const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 158): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

const PAGE_TITLE = clampTitle(
  `${BRAND} | 55,000+ Channels in 4K UHD`
);

const PAGE_DESCRIPTION = clampDescription(
  `Get ${BRAND}. Stream 55,000+ channels and 150,000+ movies in 4K UHD. Free trial first, WhatsApp setup, USD pricing with no lock-in.`
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PAGE_TITLE, absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    FOCUS_KEYWORD.toLowerCase(),
    `${FOCUS_KEYWORD.toLowerCase()} subscription`,
    `${FOCUS_KEYWORD.toLowerCase()} service`,
    `${FOCUS_KEYWORD.toLowerCase()} provider`,
    `best ${FOCUS_KEYWORD.toLowerCase()}`,
    `${FOCUS_KEYWORD.toLowerCase()} review`,
    `${FOCUS_KEYWORD.toLowerCase()} price`,
    'iptv provider',
    'best iptv provider',
    'iptv subscription',
    'iptv service',
    '4k streaming',
    'iptv setup',
    'iptv free trial',
  ],
  authors: [{ name: `${BRAND} Team` }],
  creator: BRAND,
  publisher: BRAND,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND,
    locale: 'en_US',
    type: 'website',
    images: [{ ...CONSTANTS.OG_IMAGE, alt: `${BRAND} - 55,000+ live channels in 4K Ultra HD` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [CONSTANTS.OG_IMAGE.url],
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

// ---------------------------------------------------------------------------
// PAGE-SPECIFIC SCHEMAS
//
// NOTE: Organization and WebSite schemas are rendered by the ROOT layout
// (app/layout.tsx) and are NOT duplicated here. Only page-specific schema
// (WebPage, BreadcrumbList, Product, FAQPage) lives in this file.
// ---------------------------------------------------------------------------
const IptvPageSchema = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  // The return policy is declared once on the Organization (app/layout.tsx,
  // a link to /refund-policy); each offer names that Organization as seller.
  // shippingDetails is intentionally absent: nothing is shipped (digital
  // subscription), so any shipping rate, destination or time would be invented.
  const offerSeller = { seller: { '@id': CONSTANTS.ORGANIZATION_ID } };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${PAGE_URL}/#product` },
        breadcrumb: { '@id': `${PAGE_URL}/#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: BRAND, item: PAGE_URL },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${PAGE_URL}/#product`,
        name: `${BRAND} Subscription`,
        sku: `${BRAND.toUpperCase().replace(/\s+/g, '-')}-PREMIUM`,
        category: 'Streaming Service',
        description: `${BRAND} from ${BRAND}. Stream 55,000+ live channels and 150,000+ movies and TV shows in 4K Ultra HD. Guided WhatsApp setup, free trial available, USD pricing with no lock-in contract.`,
        image: CONSTANTS.OG_IMAGE.url,
        brand: { '@type': 'Brand', name: BRAND },
        offers: [
          // ---- 1 Screen ----
          {
            '@type': 'Offer',
            name: '1 Screen - 3 Months',
            priceCurrency: 'USD',
            price: '35.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 3 month plan on 1 device with 55,000+ live channels.`,
          },
          {
            '@type': 'Offer',
            name: '1 Screen - 6 Months',
            priceCurrency: 'USD',
            price: '45.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 6 month plan on 1 device with 55,000+ live channels.`,
          },
          {
            '@type': 'Offer',
            name: '1 Screen - 12 Months',
            priceCurrency: 'USD',
            price: '75.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 12 month plan on 1 device with 55,000+ live channels.`,
          },

          // ---- 2 Screens ----
          {
            '@type': 'Offer',
            name: '2 Screens - 3 Months',
            priceCurrency: 'USD',
            price: '59.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 3 month plan on 2 devices with 55,000+ live channels.`,
          },
          {
            '@type': 'Offer',
            name: '2 Screens - 6 Months',
            priceCurrency: 'USD',
            price: '79.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 6 month plan on 2 devices with 55,000+ live channels.`,
          },
          {
            '@type': 'Offer',
            name: '2 Screens - 12 Months',
            priceCurrency: 'USD',
            price: '109.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 12 month plan on 2 devices with 55,000+ live channels.`,
          },

          // ---- 3 Screens ----
          {
            '@type': 'Offer',
            name: '3 Screens - 3 Months',
            priceCurrency: 'USD',
            price: '75.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 3 month plan on 3 devices with 55,000+ live channels.`,
          },
          {
            '@type': 'Offer',
            name: '3 Screens - 6 Months',
            priceCurrency: 'USD',
            price: '110.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 6 month plan on 3 devices with 55,000+ live channels.`,
          },
          {
            '@type': 'Offer',
            name: '3 Screens - 12 Months',
            priceCurrency: 'USD',
            price: '149.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/pricing`,
            ...offerSeller,
            description: `${BRAND} 12 month plan on 3 devices with 55,000+ live channels.`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        // Built from the same list the page renders (lib/page-faqs.ts).
        mainEntity: zyminexFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="iptv-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default function IptvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[#09090B] text-[#F8FAFC]">
      <IptvPageSchema />
      {/* div, not <main>: the root layout already provides the single <main> landmark */}
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
}