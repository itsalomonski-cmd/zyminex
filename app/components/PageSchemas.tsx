// components/PageSchemas.tsx
import React from 'react';
import { CONSTANTS } from '@/lib/seo';
import { homeFaqs } from '@/lib/home-faqs';

const SITE_URL = CONSTANTS.SITE_URL;

// NOTE: The site-wide Organization and WebSite schemas are rendered once in
// app/layout.tsx. Do not add duplicates here.

// ---------------------------------------------------------------------------
// PRODUCT SCHEMA
// Uses canonical pricing matrix (1/2/3 devices × 3/6/12 months)
// ---------------------------------------------------------------------------
export function ProductSchema() {
  // The return policy is declared once on the Organization (app/layout.tsx,
  // a link to /refund-policy); each offer names that Organization as seller.
  // shippingDetails is intentionally absent: nothing is shipped (digital
  // subscription), so any shipping rate, destination or time would be invented.
  const commonOfferDefaults = {
    validFrom: '2025-01-01',
    seller: { '@id': CONSTANTS.ORGANIZATION_ID },
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/#product`,
    name: `${CONSTANTS.BRAND_NAME} Premium Subscription`,
    sku: `${CONSTANTS.BRAND_NAME.toUpperCase().replace(/\s+/g, '-')}-PREMIUM`,
    category: 'Streaming Service',
    description: `Experience premium ${CONSTANTS.FOCUS_KEYWORD} from ${CONSTANTS.BRAND_NAME}. Stream 55,000+ live TV channels and 150,000+ movies and series in crisp 4K Ultra HD. Built as the leading ${CONSTANTS.SECONDARY_FOCUS_KEYWORD} for ${CONSTANTS.TERTIARY_FOCUS_KEYWORD} entertainment — with fast WhatsApp support and a free no-obligation trial.`,
    // References the site-wide primary image defined once in app/layout.tsx
    // (re-defining the same @id here with different content was a conflict).
    image: { '@id': `${SITE_URL}/#primaryimage` },
    brand: {
      '@type': 'Brand',
      '@id': `${SITE_URL}/#brand`,
      name: CONSTANTS.BRAND_NAME,
    },
    offers: [
      // ---- 1 Device ----
      {
        '@type': 'Offer',
        name: 'Standard - 1 Device (3 Months)',
        price: '35.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: 'Standard - 1 Device (6 Months)',
        price: '45.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: 'Standard - 1 Device (12 Months)',
        price: '75.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },

      // ---- 2 Devices ----
      {
        '@type': 'Offer',
        name: 'Premium - 2 Devices (3 Months)',
        price: '59.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: 'Premium - 2 Devices (6 Months)',
        price: '79.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: 'Premium - 2 Devices (12 Months)',
        price: '109.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },

      // ---- 3 Devices ----
      {
        '@type': 'Offer',
        name: 'VIP Multi-Room - 3 Devices (3 Months)',
        price: '75.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: 'VIP Multi-Room - 3 Devices (6 Months)',
        price: '110.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
      {
        '@type': 'Offer',
        name: 'VIP Multi-Room - 3 Devices (12 Months)',
        price: '149.00',
        priceCurrency: CONSTANTS.CURRENCY,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        ...commonOfferDefaults,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="product-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// FAQ SCHEMA
// ---------------------------------------------------------------------------
export function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    // Built from the same data the visible homepage FAQ renders
    // (lib/home-faqs.ts), so the markup always matches the page.
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      id="faq-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}