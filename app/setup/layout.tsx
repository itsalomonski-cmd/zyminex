// app/setup/layout.tsx
import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';
import { setupFaqs } from '@/lib/page-faqs';

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/setup`;

// ---------------------------------------------------------------------------
// SEO STRINGS
// ---------------------------------------------------------------------------
const PAGE_TITLE = clampTitle(
  `${BRAND} Setup Guide | Firestick, Smart TV & Mobile`
);

const PAGE_DESCRIPTION = clampDescription(
  `${BRAND} setup guide for Firestick, Smart TV, Android & iOS. Install IPTV Smarters Pro in 10 minutes with WhatsApp help and a free trial.`
);

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
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
        alt: `${BRAND} Setup Guide for Firestick, Smart TV and Mobile`,
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
    'iptv setup guide',
    'iptv firestick setup',
    'iptv smart tv install',
    'IPTV Smarters Pro setup',
    'best iptv provider',
    'iptv provider',
    'iptv installation guide',
    'how to install iptv',
    'iptv android tv setup',
    'iptv apple tv install',
    'iptv mag box setup',
    'iptv xtream codes setup',
    'iptv m3u playlist guide',
    'smart tv iptv app',
  ],
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA — HowTo + FAQPage + Breadcrumbs
//
// NOTE: Organization is rendered by app/layout.tsx and is NOT duplicated here.
// ---------------------------------------------------------------------------
const SetupPageSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // HOW TO SCHEMA
      {
        '@type': 'HowTo',
        '@id': `${PAGE_URL}/#howto`,
        name: `How to Set Up ${BRAND} on Any Device`,
        description: `Complete step-by-step installation guide for ${BRAND} on Firestick, Smart TV, Android, Apple TV, and PC or Mac. Guided WhatsApp setup and a free 24 hour trial.`,
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '35.00',
        },
        image: {
          '@type': 'ImageObject',
          url: CONSTANTS.OG_IMAGE.url,
          width: CONSTANTS.OG_IMAGE.width,
          height: CONSTANTS.OG_IMAGE.height,
        },
        supply: [
          {
            '@type': 'HowToSupply',
            name: 'Smart TV, Firestick, Android TV, Apple TV, or PC or Mac',
          },
          {
            '@type': 'HowToSupply',
            name: 'Stable internet connection (minimum 15 Mbps, 30 Mbps for 4K)',
          },
          {
            '@type': 'HowToSupply',
            name: `Active ${BRAND} subscription or free trial`,
          },
        ],
        tool: [
          {
            '@type': 'HowToTool',
            name: 'IPTV Smarters Pro (recommended IPTV player)',
          },
          {
            '@type': 'HowToTool',
            name: 'WhatsApp (for 24/7 setup support)',
          },
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Your Plan',
            text: `Visit the pricing page and select a ${BRAND} subscription. Choose 3, 6, or 12 months with 1, 2, or 3 simultaneous screens.`,
            url: `${SITE_URL}/pricing`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Contact Support on WhatsApp',
            text: 'Message our team on WhatsApp. We confirm pricing, send a secure payment link, and walk you through the setup from start to finish.',
            url: CONSTANTS.CONTACT?.whatsappUrl || '#',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download IPTV Smarters Pro',
            text: 'Install IPTV Smarters Pro, one of the fastest and most stable IPTV players for Firestick, Smart TVs, Apple devices, and PC or Mac.',
            url: 'https://iboplayer.pro/',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Auto or Manual Setup',
            text: 'Choose Auto Setup where our team activates remotely using your Device Key, or Manual Setup where you enter the M3U URL or Xtream Codes credentials we send you on WhatsApp.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Load Content in 1 to 2 Minutes',
            text: 'Once activated, IPTV Smarters Pro automatically loads your full channel list, movies and TV shows library, and 7-day EPG guide.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Test on Your Free Trial',
            text: 'Try everything on the free 24 hour trial. Check the picture quality, sport lineup, and playback on your device before you upgrade to a paid plan.',
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Start Streaming',
            text: 'Enjoy instant access to 55,000+ live channels and 150,000+ movies and TV shows in 4K quality. Sport coverage includes the NFL, NBA, MLB, NHL, UFC, boxing PPV, plus ESPN, Fox Sports, NBC, CBS, and ABC.',
          },
        ],
      },

      // FAQ SCHEMA
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        // Built from the same list the page renders (lib/page-faqs.ts).
        mainEntity: setupFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },

      // BREADCRUMBS
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
            name: 'Setup Guide',
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="setup-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// RESPONSIVE SETUP LAYOUT
// ---------------------------------------------------------------------------
export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[#09090B] text-[#F8FAFC]">
      <SetupPageSchema />
      {/* div, not <main>: the root layout already provides the single <main> landmark */}
      <div className="flex-grow w-full">{children}</div>
    </div>
  );
}