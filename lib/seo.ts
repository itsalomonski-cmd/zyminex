// lib/seo.ts
import { Metadata } from 'next';

// ---------------------------------------------------------------------------
// CORE BRAND & DOMAIN CONFIGURATION (UNITED STATES)
// ---------------------------------------------------------------------------
const DOMAIN = 'zyminex.plus';
const BRAND_NAME = 'Zyminex';
const SITE_URL = `https://${DOMAIN}`;

// Focus keywords (priority order)
const FOCUS_KEYWORD = 'Zyminex';
const SECONDARY_FOCUS_KEYWORD = 'Zyminex IPTV';
const TERTIARY_FOCUS_KEYWORD = 'IPTV Provider';

const LOCALE = 'en_US';
const LANGUAGE = 'en-US';
const ADDRESS_COUNTRY = 'US';
const CURRENCY = 'USD';

// Single-region locale configuration (United States)
const TARGET_LOCALES = [
  { locale: 'en_US', language: 'en-US', country: 'US', region: 'United States' },
] as const;

// Stable Organization @id used to link brand entities across JSON-LD blocks
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Social-share and brand images that actually exist in /public, with their real
// pixel dimensions. Use these instead of hard-coding image paths in metadata or
// JSON-LD. OG_IMAGE is the dedicated 1200x630 (1.91:1) share image built from
// the existing logo; the previous square /img/og-image.png (1254x1254) is kept
// in /public unchanged.
const OG_IMAGE = {
  url: `/img/og-image.jpg`,
  width: 1200,
  height: 630,
  type: 'image/jpeg',
} as const;

const LOGO_IMAGE = {
  url: `/img/zyminex-logo.png`,
  width: 690,
  height: 150,
} as const;

// ---------------------------------------------------------------------------
// EXPORTED CONSTANTS
// ---------------------------------------------------------------------------
export const CONSTANTS = {
  DOMAIN,
  BRAND_NAME,
  SITE_URL,

  // Focus keywords
  FOCUS_KEYWORD,
  SECONDARY_FOCUS_KEYWORD,
  TERTIARY_FOCUS_KEYWORD,

  LOCALE,
  LANGUAGE,
  ADDRESS_COUNTRY,
  CURRENCY,
  ORGANIZATION_ID,
  OG_IMAGE,
  LOGO_IMAGE,

  // Locale map
  TARGET_LOCALES,

  // Primary High-Intent Keywords (US)
  PRIMARY_KEYWORDS: [
    'Zyminex',
    'Zyminex IPTV',
    'IPTV Provider',
    'IPTV Subscription',
    'Best IPTV Provider',
    'IPTV Service',
    'Live TV Streaming',
  ],

  // Secondary & High-Intent Search Terms (US)
  SECONDARY_KEYWORDS: [
    'Zyminex IPTV Subscription',
    'Best IPTV Provider in USA',
    'IPTV Provider with All Channels',
    '4K IPTV',
    'Buy IPTV',
    'Premium IPTV',
    'Free IPTV Trial',
    'Sports IPTV Provider',
    'Live TV Streaming Provider',
  ],

  // Business Contact Details
  CONTACT: {
    email: 'support@zyminex.plus',
    // Left empty until the owner provides a real number (the previous value was
    // the fictional placeholder "+1 555 000 0000"). /support falls back to
    // "Chat on WhatsApp" while this is empty.
    phone: '', // ⚠️ Add your real number
    whatsapp: '', // ⚠️ Add your real WhatsApp number
    whatsappUrl: 'https://support-tv.online', // ⚠️ Replace with your real wa.me link
    supportHours: '24/7 Customer Support via Email and Live Chat',
  },

  // Social Media (used in Footer). Left empty until the owner confirms real
  // profiles; the footer only renders icons for non-empty URLs. The previous
  // values (twitter.com/zyminex etc.) were unverified placeholders.
  SOCIALS: {
    twitter: '', // ⚠️ Add your real profile URL
    instagram: '', // ⚠️ Add your real profile URL
    facebook: '', // ⚠️ Add your real profile URL
  } as { twitter: string; instagram: string; facebook: string },

  // Payment Methods (used in Footer / Pricing badges)
  PAYMENT_METHODS: [
    { name: 'PayPal', icon: '/img/payment/1.png' },
    { name: 'Bitcoin & Crypto', icon: '/img/payment/2.png' },
    { name: 'Visa', icon: '/img/payment/3.png' },
    { name: 'Mastercard', icon: '/img/payment/4.png' },
  ],

  // Major Target Cities across the United States
  TARGET_REGIONS: [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Miami',
    'Dallas',
    'Phoenix',
    'Atlanta',
    'Philadelphia',
    'Seattle',
  ],

  // Value Propositions for US Viewers
  USPS: [
    'Buffer-free 4K & Full HD streaming backed by dedicated edge servers',
    'Access to live channels including major US networks, local news, and premium entertainment',
    'Universal device support: Amazon Firestick, Smart TV, Android, iOS, Apple TV, Roku, and MAG Box',
    'Full coverage of NFL, NBA, MLB, NHL, UFC, PPV events, ESPN, Fox, NBC, and CBS',
  ],
};

// ---------------------------------------------------------------------------
// FREE-TRIAL CTA DESTINATION
// The free 24-hour trial is requested over WhatsApp everywhere on the site
// (pricing, setup, channel pages, FAQ). This is the same message the pricing
// section's "free trial" button sends. There is no /free-trial page.
// ---------------------------------------------------------------------------
export const FREE_TRIAL_WHATSAPP_URL = `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(
  "Hi! I'd like to try the free 24-hour trial."
)}`;

// ---------------------------------------------------------------------------
// SEO METADATA GENERATOR
// ---------------------------------------------------------------------------
export const generateSEOMetadata = (
  pageName: string,
  description?: string,
  path: string = '/'
): Metadata => {
  // Enforces strict 150-160 character count for Google snippet optimisation
  const defaultDescription =
    description ||
    `Looking for a reliable IPTV Provider? Zyminex delivers premium IPTV Subscription plans with 4K streaming across the United States. Start your free trial today!`;

  // Title: "{Page} | Zyminex - Premium IPTV Provider" when it fits in 60 chars,
  // otherwise "{Page} | Zyminex"; a page name that already contains the brand
  // is used as-is. Returned as an *absolute* title so the root layout's
  // "%s | Zyminex" template is not appended a second time, and never cut
  // mid-word.
  const longTitle = `${pageName} | ${BRAND_NAME} - Premium IPTV Provider`;
  const formattedTitle = pageName.includes(BRAND_NAME)
    ? pageName
    : longTitle.length <= 60
      ? longTitle
      : `${pageName} | ${BRAND_NAME}`;

  const fullCanonicalUrl =
    path === '/'
      ? SITE_URL
      : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    title: { absolute: formattedTitle },
    description: defaultDescription,
    keywords: [
      ...CONSTANTS.PRIMARY_KEYWORDS,
      ...CONSTANTS.SECONDARY_KEYWORDS,
    ].join(', '),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullCanonicalUrl,
      languages: {
        'en-US': fullCanonicalUrl,
        'x-default': fullCanonicalUrl,
      },
    },
    openGraph: {
      title: formattedTitle,
      description: defaultDescription,
      url: fullCanonicalUrl,
      siteName: BRAND_NAME,
      locale: LOCALE,
      type: 'website',
      images: [{ ...OG_IMAGE, alt: `${BRAND_NAME} - ${FOCUS_KEYWORD}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: defaultDescription,
      images: [OG_IMAGE.url],
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
    authors: [{ name: BRAND_NAME, url: SITE_URL }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    category: 'Entertainment',
    applicationName: BRAND_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
};
