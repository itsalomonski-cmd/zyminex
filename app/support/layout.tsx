// app/support/layout.tsx
// The support page is a client component and cannot export metadata itself,
// so its metadata lives here (same pattern as faq/pricing/setup/reseller).
// Without it the page inherited the homepage's title, description and og:url.
import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;

// Description reuses the page's existing ContactPage schema wording.
export const metadata = generateSEOMetadata(
  'Support',
  `Contact ${BRAND} for 24/7 customer support. WhatsApp, email, and live chat help for IPTV subscriptions, setup, and billing.`,
  '/support'
);

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
