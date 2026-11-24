import type { Metadata, Viewport } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { CONSTANTS } from '@/lib/seo';
import { GoogleAnalytics } from '@next/third-parties/google';
import Loading from './components/loading';
import MotionProvider from './components/MotionProvider';


// ---------------------------------------------------------------------------
// GLOBAL CACHING — applies to every page in the app
// 86400 seconds = 24 hours
// Any page can override this by declaring its own `revalidate` export.
// ---------------------------------------------------------------------------
export const revalidate = 86400;



const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;

// ---------------------------------------------------------------------------
// OG IMAGE — Centralized so it's used consistently in OG, Twitter, schema.
// Uses the 1200x630 share image defined in CONSTANTS.OG_IMAGE (lib/seo.ts).
// ---------------------------------------------------------------------------
const OG_IMAGE = {
  ...CONSTANTS.OG_IMAGE,
  // Describes what the image actually shows (logo + tagline).
  alt: `${CONSTANTS.BRAND_NAME} Plus logo with the tagline Stream More. Pay Less.`,
};

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

// ---------------------------------------------------------------------------
// SEO STRINGS
// ---------------------------------------------------------------------------
const SEO_TITLE = clampTitle(
  `${CONSTANTS.BRAND_NAME} - Premium IPTV Provider | 55,000+ Live Channels`
);

const SEO_DESCRIPTION = clampDescription(
  `${CONSTANTS.BRAND_NAME} delivers 55,000+ live channels, 150,000+ movies and shows in 4K Ultra HD. Instant setup, free trial, no contract. Trusted IPTV provider in the United States.`
);

const SEO_OG_TITLE = SEO_TITLE;
const SEO_OG_DESCRIPTION = SEO_DESCRIPTION;
const SEO_TWITTER_TITLE = clampTitle(SEO_TITLE, 70);
const SEO_TWITTER_DESCRIPTION = clampDescription(SEO_DESCRIPTION, 200);

// ---------------------------------------------------------------------------
// VIEWPORT
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090B',
};

// ---------------------------------------------------------------------------
// GLOBAL METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s | ${CONSTANTS.BRAND_NAME}`,
  },
  description: SEO_DESCRIPTION,
  authors: [{ name: CONSTANTS.BRAND_NAME }],
  creator: CONSTANTS.BRAND_NAME,
  publisher: CONSTANTS.BRAND_NAME,
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
    // Relative values resolve to each page's own URL. Pages that define their
    // own alternates override these; pages that inherit them (home, 404) must
    // not point their hreflang at the homepage.
    canonical: './',
    languages: {
      'en-US': './',
      'x-default': './',
    },
  },
  openGraph: {
    title: SEO_OG_TITLE,
    description: SEO_OG_DESCRIPTION,
    url: SITE_URL,
    siteName: CONSTANTS.BRAND_NAME,
    locale: 'en_US',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TWITTER_TITLE,
    description: SEO_TWITTER_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/img/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/img/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/img/favicons/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/img/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/img/favicons/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/img/favicons/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/img/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/img/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/img/favicons/favicon.ico',
    apple: [
      { url: '/img/favicons/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/img/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Served from public/img/favicons/site.webmanifest (uses the existing icons).
  manifest: '/img/favicons/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: CONSTANTS.BRAND_NAME,
    statusBarStyle: 'default',
  },
  other: {
    'msapplication-TileColor': '#09090B',
  },
  category: 'entertainment',
  keywords: [
    'Best IPTV Provider',
    CONSTANTS.BRAND_NAME,
    'IPTV Provider',
    'IPTV Subscription',
    'IPTV services',
    'Buy IPTV',
    '4K IPTV',
    '55,000 live channels',
    '150,000 movies and shows',
    'Premium IPTV',
    'Cheap IPTV Provider',
    'Free IPTV Trial',
    'Sports IPTV Provider',
    'Live TV Streaming Provider',
    'IPTV Firestick',
    'IPTV Smart TV',
    'IPTV Smarters Pro',
    'Ultra HD IPTV',
    'Anti-freeze IPTV',
    `${CONSTANTS.BRAND_NAME} USA`,
  ],
};

// ---------------------------------------------------------------------------
// SITE-WIDE SCHEMAS
// Rendered once in <body> — do NOT import these from PageSchemas.tsx.
// ---------------------------------------------------------------------------
const OrganizationSchema = () => (
  <script
    type="application/ld+json"
    id="organization-schema"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        // Same @id the Product offers reference as their seller.
        '@id': CONSTANTS.ORGANIZATION_ID,
        name: CONSTANTS.BRAND_NAME,
        alternateName: `${CONSTANTS.BRAND_NAME} Streaming`,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: CONSTANTS.LOGO_IMAGE.url,
          contentUrl: CONSTANTS.LOGO_IMAGE.url,
          width: CONSTANTS.LOGO_IMAGE.width,
          height: CONSTANTS.LOGO_IMAGE.height,
          caption: `${CONSTANTS.BRAND_NAME} Logo`,
        },
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#primaryimage`,
          url: OG_IMAGE.url,
          contentUrl: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          caption: OG_IMAGE.alt,
        },
        description: `${CONSTANTS.BRAND_NAME} is a premium IPTV Provider with 55,000+ live channels and 150,000+ movies and TV shows in 4K Ultra HD. Instant email setup, free trial available, and flexible pricing with no contract.`,
        contactPoint: {
          '@type': 'ContactPoint',
          // telephone omitted: CONSTANTS.CONTACT.phone is still the fictional
          // placeholder "+1 555 000 0000". Add it back once a real number is set.
          email: CONSTANTS.CONTACT.email,
          contactType: 'customer service',
          availableLanguage: ['English'],
          areaServed: ['US'],
        },
        // Store-wide return policy, given only as a link to the published page
        // (no returnPolicyCategory or merchantReturnDays). The policy refunds
        // only a verified server-side failure reported in writing within 7 days
        // of purchase, after support has had 24 hours to fix it, and never for
        // a change of mind: a 7-day return window would promise more than
        // that, and "returns not permitted" would hide the guarantee.
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          merchantReturnLink: `${SITE_URL}/refund-policy`,
        },
        // sameAs omitted: CONSTANTS.SOCIALS are still marked "Replace" in
        // lib/seo.ts. sameAs asserts those profiles ARE this organization, so
        // re-add it only with confirmed official profile URLs.
      }),
    }}
  />
);

const WebSiteSchema = () => (
  <script
    type="application/ld+json"
    id="website-schema"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: CONSTANTS.BRAND_NAME,
        alternateName: `${CONSTANTS.BRAND_NAME} - Premium IPTV Provider`,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
      }),
    }}
  />
);

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${poppins.className} ${montserrat.variable} antialiased min-h-screen bg-[#09090B] text-[#F8FAFC] selection:bg-[#39FF14] selection:text-[#09090B]`}
        suppressHydrationWarning
      >
        <OrganizationSchema />
        <WebSiteSchema />

        {/* Keyboard users can bypass the header; hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-full focus:bg-[#39FF14] focus:px-5 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:tracking-wider focus:text-[#09090B]"
        >
          Skip to content
        </a>

        <MotionProvider>
          <Loading />
          <Header />
          <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
            {children}
          </main>
          <Footer />

          <FloatingWhatsApp />
        </MotionProvider>
        <GoogleAnalytics gaId="G-B9EMDZMPBF" />
      </body>
    </html>
  );
}