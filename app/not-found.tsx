import type { Metadata } from 'next';
import { CONSTANTS } from '@/lib/seo';
import NotFoundContent from './components/NotFoundContent';

// Server wrapper so the 404 page can export its own metadata. Without this it
// inherited the root layout's homepage title/description and a canonical of
// "https://zyminex.plus/_not-found". The visible UI is unchanged
// (app/components/NotFoundContent.tsx).
export const metadata: Metadata = {
  title: { absolute: `Page Not Found | ${CONSTANTS.BRAND_NAME}` },
  description: `The page you are looking for does not exist on ${CONSTANTS.BRAND_NAME}.`,
  robots: { index: false, follow: true },
  // Replaces (not merges with) the layout's alternates: no canonical/hreflang
  // on an error page.
  alternates: {},
  openGraph: {
    title: `Page Not Found | ${CONSTANTS.BRAND_NAME}`,
    siteName: CONSTANTS.BRAND_NAME,
    images: [CONSTANTS.OG_IMAGE],
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
