import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Wrench,
  Wifi,
  FileCheck,
} from 'lucide-react';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/refund-policy`;

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  'Refund & Guarantee Policy',
  `Read the official terms of the ${BRAND} 7 day quality guarantee. Transparent technical guidelines and support procedures.`,
  '/refund-policy'
);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const RefundSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `Refund & Guarantee Policy | ${BRAND}`,
        description: `${BRAND} refund and 7 day quality guarantee policy. Transparent technical guidelines and support procedures.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Refund Policy', item: PAGE_URL },
        ],
      },
      // No FAQPage here: this page is a policy document without a visible
      // question-and-answer section, and FAQ markup must match visible content.
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="refund-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function RefundPolicyPage() {
  const whatsappBaseUrl = CONSTANTS.CONTACT.whatsappUrl;

  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">

      <RefundSchema />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[#27272A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(57,255,20,0.05),_transparent_50%)] pointer-events-none" />
        
        {/* Global square-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full mb-6 shadow-md border border-[#39FF14]/40">
            <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#F8FAFC] font-black text-xs uppercase tracking-widest">
              Verified Server Guarantee
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-none mb-6">
            Refund & <span className="text-[#39FF14]">Guarantee</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed">
            {BRAND} delivers unmatched stability. We offer a transparent 7 day quality guarantee on all active streaming connections. If the service does not work as promised, we will make it right.
          </p>

          <p className="text-xs text-[#94A3B8]/60 mt-4 font-bold uppercase tracking-wider">
            Last reviewed:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">

        {/* Trust Banner */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#39FF14]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] uppercase tracking-tight mb-1">
                Our 7 Day Quality Guarantee
              </h2>
              <p className="text-[#F8FAFC] font-bold text-sm md:text-base leading-relaxed">
                We deliver only high quality 4K and Full HD streams. This guarantee applies to genuine service problems, such as a verified technical defect that our support team cannot fix within the stated repair window. It does not apply to change of mind requests, personal preference, or device issues on your end.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              1. Scope of the Technical Guarantee
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              A refund is granted only if the delivered service is structurally and demonstrably non-functional due to causes within our server infrastructure. The following conditions apply cumulatively:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'The report is filed in writing within exactly 7 calendar days of the initial purchase date.',
                'There is a sustained, server related failure that prevents the service from working as advertised.',
                'Our 24/7 technical support desk has had at least 24 hours to fix the reported connection problem or set up alternate routing.',
                'You have completed the standard diagnostic steps we request, such as a router restart, app cache clear, and DNS check.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#94A3B8] font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              2. Exceptions & Non Refundable Situations
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              Because digital access codes and playlists are permanently created on our load balancers immediately after purchase, <strong className="text-[#F8FAFC]">no refund</strong> can be claimed in the following situations:
            </p>

            <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-[#39FF14]" />
                  </div>
                </div>
                <div>
                  <ul className="space-y-2.5 text-[#F8FAFC] text-xs sm:text-sm font-bold leading-relaxed">
                    <li>
                      • <strong>Change of mind:</strong> Requests based on taste, interface experience, or simply no longer needing the subscription.
                    </li>
                    <li>
                      • <strong>Local network limitations:</strong> Buffering caused by an unstable Wi-Fi connection, local network congestion, or internet speeds under 25 Mbps.
                    </li>
                    <li>
                      • <strong>Device incompatibility:</strong> Problems caused by outdated Smart TV firmware, unsupported third party IPTV apps, or incorrect local configuration.
                    </li>
                    <li>
                      • <strong>Channel changes:</strong> Temporary restructuring or changes to individual channels within the thousands of available channels.
                    </li>
                    <li>
                      • <strong>Fair Use violations:</strong> Accounts automatically blocked for streaming on more screens than purchased.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              3. Mandatory Diagnostic & Repair Procedure
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              Before a refund can be authorized, our support team completes the following three step protocol:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] text-center flex flex-col justify-between hover:border-[#39FF14] transition-colors">
                <div>
                  <Wrench className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-[#F8FAFC] mb-1">1. Line Verification</h3>
                  <p className="text-xs text-[#94A3B8] font-medium">
                    We verify your account token on our active server ports.
                  </p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] text-center flex flex-col justify-between hover:border-[#39FF14] transition-colors">
                <div>
                  <Wifi className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-[#F8FAFC] mb-1">2. Server Reset</h3>
                  <p className="text-xs text-[#94A3B8] font-medium">
                    We reroute your streaming profile to an alternate global edge node.
                  </p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] text-center flex flex-col justify-between hover:border-[#39FF14] transition-colors">
                <div>
                  <FileCheck className="w-6 h-6 text-[#39FF14] mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-[#F8FAFC] mb-1">3. Release</h3>
                  <p className="text-xs text-[#94A3B8] font-medium">
                    If the outage remains unresolvable, immediate refund approval follows.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              4. Request Procedure & Processing Time
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-6">
              If your report meets the technical guarantee conditions, submit your request via one of the channels below, including your order number and a short description of the problem:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-[#39FF14]" />
                  </div>
                  <h3 className="text-lg font-black text-[#F8FAFC] uppercase tracking-tight mb-1">
                    WhatsApp Support (Fastest)
                  </h3>
                  <p className="text-[#94A3B8] text-xs sm:text-sm font-bold leading-relaxed mb-4">
                    Send your order details and a screenshot of the error message for real time diagnostics.
                  </p>
                </div>
                <a
                  href={`${whatsappBaseUrl}?text=${encodeURIComponent(
                    `Hi! I am experiencing a persistent technical problem with my IPTV account and would like to start the diagnostic procedure.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-wider hover:bg-[#E6C200] transition-all border border-[#09090B]/20 cursor-pointer"
                >
                  Start Diagnosis on WhatsApp →
                </a>
              </div>

              <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5 text-[#39FF14]" />
                  </div>
                  <h3 className="text-lg font-black text-[#F8FAFC] uppercase tracking-tight mb-1">
                    Written by Email
                  </h3>
                  <p className="text-[#94A3B8] text-xs sm:text-sm font-bold leading-relaxed mb-4">
                    Send your transaction receipt and error code to support@{CONSTANTS.DOMAIN}.
                  </p>
                </div>
                <a
                  href={`mailto:support@${CONSTANTS.DOMAIN}?subject=Technical%20Support%20Request`}
                  className="w-full text-center py-3 rounded-full bg-[#27272A] text-[#F8FAFC] font-black text-xs uppercase tracking-wider border border-[#39FF14] hover:bg-[#39FF14] hover:text-[#09090B] transition-all cursor-pointer"
                >
                  Email Support →
                </a>
              </div>
            </div>

            <p className="text-[#94A3B8] text-xs leading-relaxed font-medium">
              After official technical authorization, the amount is refunded within 1 to 3 business days via the original payment method: Credit Card, PayPal, Crypto, or Apple/Google Pay.
            </p>
          </section>
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-2">
              Need help with your setup?
            </h3>
            <p className="text-[#39FF14] font-bold text-sm md:text-base max-w-md mx-auto mb-6">
              In 99% of cases, our streaming experts fix buffering issues within 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
              <Link
                href="/support"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-widest hover:bg-[#E6C200] transition-all shadow-md border border-[#09090B]/20 cursor-pointer"
              >
                Get Instant Help
              </Link>
              <Link
                href="/setup"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#27272A] text-[#F8FAFC] font-black text-xs uppercase tracking-widest border border-[#39FF14] hover:bg-[#39FF14] hover:text-[#09090B] transition-all cursor-pointer"
              >
                Setup Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#27272A] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest cursor-pointer py-2 -my-2"
          >
            ← Back to homepage
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[#94A3B8]/60 text-xs font-bold">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}