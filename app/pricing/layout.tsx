// app/pricing/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';
import { pricingFaqs } from '@/lib/page-faqs';

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS — enforce char limits
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

// SEO CONSTANTS
const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/pricing`;

// ---------------------------------------------------------------------------
// SEO STRINGS
// ---------------------------------------------------------------------------
const PAGE_TITLE = clampTitle(
  `${BRAND} IPTV Pricing & Plans | 55,000+ Live Channels`
);

const PAGE_DESCRIPTION = clampDescription(
  `Save up to 60% on IPTV Subscription plans from $35. 55,000+ live channels, 150,000+ movies, free trial first. 3, 6, or 12 months.`
);

// ---------------------------------------------------------------------------
// METADATA CONFIGURATION
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  authors: [{ name: `${BRAND} Team` }],
  creator: BRAND,
  publisher: BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    locale: CONSTANTS.LOCALE,
    type: 'website',
    images: [
      {
        ...CONSTANTS.OG_IMAGE,
        alt: `${BRAND} Pricing — 4K IPTV Subscription Plans`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [CONSTANTS.OG_IMAGE.url],
  },
  category: 'entertainment',
  keywords: [
    CONSTANTS.FOCUS_KEYWORD,
    CONSTANTS.SECONDARY_FOCUS_KEYWORD,
    'iptv subscription pricing',
    'iptv subscription plans',
    'iptv provider subscription',
    'iptv provider cost',
    'buy iptv subscription',
    '4k iptv',
    'iptv free trial',
    'iptv firestick',
    'sports iptv provider',
    'smart tv iptv',
    'premium iptv',
    'cheap iptv provider',
  ],
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMAS — Product, FAQ, BreadcrumbList
//
// NOTE: Organization is rendered by app/layout.tsx and is NOT duplicated here.
// ---------------------------------------------------------------------------
const PricingPageSchema = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  // The return policy is declared once on the Organization (app/layout.tsx,
  // a link to /refund-policy); each offer names that Organization as seller.
  // shippingDetails is intentionally absent: nothing is shipped (digital
  // subscription), so any shipping rate, destination or time would be invented.
  const offerSeller = { seller: { '@id': CONSTANTS.ORGANIZATION_ID } };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // PRODUCT - Pricing Offers with Digital Delivery
      {
        '@type': 'Product',
        '@id': `${PAGE_URL}/#product`,
        name: `${BRAND} IPTV Subscription Plans`,
        alternateName: CONSTANTS.FOCUS_KEYWORD,
        image: CONSTANTS.OG_IMAGE.url,
        description: `${BRAND} offers premium IPTV plans starting at USD $35 with 55,000+ live channels, 150,000+ movies and TV shows in 4K Ultra HD. Setup is guided on WhatsApp and a free trial is available before you pay.`,
        brand: {
          '@type': 'Brand',
          '@id': `${SITE_URL}/#brand`,
          name: BRAND,
        },
        sku: 'IPTV-PRICING',
        category: 'Streaming Service',
        offers: [
          // ---- 1 Screen ----
          {
            '@type': 'Offer',
            name: '1 Screen - 3 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '35.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `3 month ${BRAND} subscription on 1 device with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
          {
            '@type': 'Offer',
            name: '1 Screen - 6 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '45.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `6 month ${BRAND} subscription on 1 device with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
          {
            '@type': 'Offer',
            name: '1 Screen - 12 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '75.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `12 month ${BRAND} subscription on 1 device with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },

          // ---- 2 Screens ----
          {
            '@type': 'Offer',
            name: '2 Screens - 3 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '59.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `3 month ${BRAND} subscription on 2 devices with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
          {
            '@type': 'Offer',
            name: '2 Screens - 6 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '79.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `6 month ${BRAND} subscription on 2 devices with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
          {
            '@type': 'Offer',
            name: '2 Screens - 12 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '109.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `12 month ${BRAND} subscription on 2 devices with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },

          // ---- 3 Screens ----
          {
            '@type': 'Offer',
            name: '3 Screens - 3 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '75.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `3 month ${BRAND} subscription on 3 devices with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
          {
            '@type': 'Offer',
            name: '3 Screens - 6 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '110.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `6 month ${BRAND} subscription on 3 devices with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
          {
            '@type': 'Offer',
            name: '3 Screens - 12 Months',
            priceCurrency: CONSTANTS.CURRENCY,
            price: '149.00',
            priceValidUntil: '2027-12-31',
            validFrom: currentDate,
            availability: 'https://schema.org/InStock',
            url: PAGE_URL,
            description: `12 month ${BRAND} subscription on 3 devices with 55,000+ live channels and 150,000+ movies and TV shows.`,
            ...offerSeller,
          },
        ],
      },

      // FAQ SECTION
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        // Built from the same list the page renders (lib/page-faqs.ts).
        mainEntity: pricingFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },

      // BREADCRUMB
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pricing',
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="pricing-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// RESPONSIVE PRICING LAYOUT
// ---------------------------------------------------------------------------
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[#09090B] text-[#F8FAFC]">
      <PricingPageSchema />
      {/* div, not <main>: the root layout already provides the single <main> landmark */}
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
}