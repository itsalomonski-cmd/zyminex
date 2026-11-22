import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  Mail,
  CheckCircle,
  Server,
  FileText,
} from 'lucide-react';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/privacy`;

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  'Privacy Policy & Data Protection',
  `Read how ${BRAND} safeguards your privacy and personal data in compliance with global privacy law, including GDPR (EU), UK GDPR, CCPA (California), and Australian privacy law. 100% confidential.`,
  '/privacy'
);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const PrivacySchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `Privacy Policy | ${BRAND}`,
        description: `${BRAND} privacy policy. How we collect, protect, and manage your personal data in compliance with GDPR, UK GDPR, CCPA, and global privacy law.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="privacy-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#F8FAFC]">

      <PrivacySchema />

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
              Privacy & Data Guarantee
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#F8FAFC] uppercase tracking-tighter leading-none mb-6">
            Privacy <span className="text-[#39FF14]">Policy</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] font-bold max-w-2xl mx-auto leading-relaxed">
            At {BRAND}, we place the highest value on your privacy. Learn how we confidentially collect, protect, and manage your personal data.
          </p>

          <p className="text-xs text-[#94A3B8]/60 mt-4 font-bold uppercase tracking-wider">
            Last updated:{' '}
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

        {/* Commitment Card */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#39FF14]" />
              </div>
            </div>
            <div>
              <p className="text-[#F8FAFC] font-bold text-sm md:text-base leading-relaxed">
                <span className="text-[#39FF14] font-black uppercase tracking-wide block mb-1">
                  Our Privacy Promise:
                </span>
                We treat your data with strict confidentiality in full compliance with global privacy law, including the EU GDPR, UK GDPR, the California Consumer Privacy Act (CCPA), and Australian privacy regulations. We never store viewing history, and we never sell your data to third parties under any circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Body */}
        <div className="space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              1. Data We Collect
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              When you use {BRAND}&apos;s services, we process only the minimum data necessary to deliver your IPTV subscription:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Email address and/or WhatsApp number (used to send your login credentials and subscription status).',
                'Payment verification (securely and encrypted through licensed payment processors; we do not store credit card or bank details).',
                'IP address and device type (temporary, for server connection, load balancing, and fraud prevention).',
                'Selected subscription duration and number of active streams or screens.',
                'Customer support communication history for fast assistance.',
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

            <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 my-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#39FF14]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#F8FAFC] text-sm font-bold leading-relaxed">
                    <span className="text-[#39FF14] font-black uppercase tracking-wide block mb-0.5">
                      What We Never Collect:
                    </span>
                    We do not record viewing behavior, channel selections, searches, or specific stream logs. Your streaming activity is and remains 100% private.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              2. How We Use Your Data
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              We use the information we collect exclusively for the following purposes:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Activating and configuring your subscription details and IPTV Smarters Pro setup.',
                'Securely processing transactions and billing.',
                'Providing technical support and setup assistance via WhatsApp and email.',
                'Informing you about important server maintenance or channel updates.',
                'Maintaining server stability and preventing unauthorized misuse.',
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

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              3. Data Security
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              {BRAND} employs advanced technical and organizational security measures to protect your data:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                '256 bit SSL/TLS end to end encryption for all web and account connections.',
                'Isolated servers and firewalls to prevent data leaks and DDoS attacks.',
                'Strict access controls: only authorized technical staff have access to support data.',
                'No local storage of sensitive banking or credit card details.',
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

            <div className="bg-[#18181B] border border-green-500/30 rounded-3xl p-6 my-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <div>
                  <p className="text-[#F8FAFC] text-sm font-bold leading-relaxed">
                    <span className="text-green-500 font-black uppercase tracking-wide block mb-0.5">
                      No Data Sales:
                    </span>
                    We never sell, rent, or share your personal data with marketing agencies, ad networks, or data brokers, ever.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              4. Cookies & Functional Storage
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed">
              We use only functional and anonymized analytical cookies to optimize website loading speed and remember your language preference. You can disable cookies at any time through your web browser settings.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              5. Your Rights Under GDPR, UK GDPR, CCPA & Global Privacy Laws
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              Depending on your jurisdiction (EU, UK, Australia, California, or other US states), you may have the following legal privacy rights:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Right of access: You may request a copy of the data we hold about you.',
                'Right to rectification: The right to correct inaccurate contact details.',
                'Right to erasure (Right to be Forgotten): The right to request permanent deletion of all your account data.',
                'Right to restrict processing and data portability.',
                'Right to opt out of any data sale. We never sell data, so this right is inherently respected.',
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

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              6. Third Party Service Providers
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed">
              We work with a small number of trusted third party service providers, including payment processors such as Stripe, PayPal, and crypto payment gateways, plus communications tools such as WhatsApp Business. These providers strictly comply with data protection standards, process data only as necessary to deliver their services, and are prohibited from using your data for any other purpose.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              7. Children&apos;s Privacy
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed">
              Our services are not directed to children under the age of 13, or the applicable age of digital consent in your jurisdiction. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can promptly delete it.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              8. Data Retention
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed">
              We retain your account and contact information only for as long as your subscription remains active, plus a reasonable period thereafter for legal, tax, and accounting purposes. After that period, all personal data is securely deleted or anonymized.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              9. International Data Transfers
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed">
              {BRAND} operates globally with customers across multiple regions. Your data may be transferred to and processed in countries outside your own, including our primary server locations. When we transfer personal data internationally, we implement appropriate safeguards such as standard contractual clauses and rely on your consent where required by applicable law.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#39FF14] rounded-full inline-block" />
              10. Contact Regarding Privacy
            </h2>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed mb-4">
              Do you have questions about our privacy policy, or wish to submit a data removal request? Contact our Data Protection Officer directly:
            </p>
            <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 my-6 text-center shadow-xl">
              <Mail className="w-8 h-8 text-[#39FF14] mx-auto mb-2" />
              <p className="text-xs uppercase font-black text-[#94A3B8] tracking-widest mb-1">
                Privacy & Data Protection Department
              </p>
              <a
                href={`mailto:privacy@${CONSTANTS.DOMAIN}`}
                className="text-[#F8FAFC] font-black text-xl md:text-2xl hover:text-[#39FF14] transition-colors break-all"
              >
                privacy@{CONSTANTS.DOMAIN}
              </a>
            </div>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed">
              For general customer support, use our 24/7{' '}
              <Link href="/support" className="text-[#39FF14] font-black hover:underline">
                WhatsApp support team
              </Link>{' '}
              instead.
            </p>
          </section>

          {/* Section 11 — Updates */}
          <section>
            <div className="bg-[#18181B] border border-[#27272A] rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-[#39FF14] font-black uppercase tracking-wider text-sm mb-1">
                    Policy Updates
                  </p>
                  <p className="text-[#F8FAFC] font-bold text-sm md:text-base leading-relaxed">
                    We reserve the right to update this Privacy Policy at any time. Material changes will be announced on our homepage or via WhatsApp to active subscribers. Continued use of our services after any changes constitutes acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#27272A] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#39FF14] hover:text-[#F8FAFC] transition-colors font-black text-xs uppercase tracking-widest py-2 -my-2"
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