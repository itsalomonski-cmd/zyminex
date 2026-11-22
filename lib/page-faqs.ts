// lib/page-faqs.ts
// Visible FAQ content for /pricing, /setup and /zyminex. Each list is the SINGLE
// source for both the on-page FAQ section and that page's FAQPage JSON-LD, so
// the structured data always matches what visitors can read.
import { CONSTANTS } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;
const FOCUS_KEYWORD = CONSTANTS.FOCUS_KEYWORD;

export type PageFaq = { q: string; a: string };

export const pricingFaqs: PageFaq[] = [
  {
    q: "Which payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrencies (Bitcoin, Ethereum, USDT). Every payment is processed via encrypted 256 bit SSL connections.",
  },
  {
    q: "Can I upgrade or modify my IPTV Subscription later?",
    a: "Yes, you can upgrade at any time to add more screens or switch to a longer period. Just reach our support team and we will adjust your account straight away.",
  },
  {
    q: "Is there a contract or automatic renewal?",
    a: "No. There are no long term contracts and no automatic renewals. Every plan is a prepaid one time payment that stops on its own when the period ends.",
  },
  {
    q: "What happens when my subscription expires?",
    a: "We will send you a reminder before your IPTV Subscription ends. You can renew easily through our support team. If you decide not to renew, the service stops automatically with no further obligation.",
  },
  {
    q: "Do you offer a free trial before I commit?",
    a: "Yes. Request a free trial and we will set you up so you can test the 4K picture quality and channel lineup on your own device and internet connection. Upgrade to a paid IPTV Subscription only when you are happy.",
  },
  {
    q: "Can I use the service on multiple devices at the same time?",
    a: "Yes, depending on your chosen plan. You can pick 1, 2, or 3 simultaneous screens during checkout to watch in multiple rooms at once. Everyone in the household can watch what they want.",
  },
  {
    q: "Are there discounts for longer subscriptions?",
    a: "Yes. The 12 month plans offer the highest savings, up to 60% off compared to the shorter terms. That is the best value option for a household that knows they will stick with it.",
  },
  {
    q: "Do I need a VPN to use this IPTV service?",
    a: "No VPN is required. Our servers are optimized for smooth, buffer free streaming on your home connection.",
  },
];

export const setupFaqs: PageFaq[] = [
  {
    q: 'How do I receive my login details after purchasing a plan?',
    a: 'Everything is handled live over WhatsApp. Once you confirm your plan and complete payment, our support team sends your setup details directly in the chat, usually within minutes.',
  },
  {
    q: `Which IPTV player do you recommend for ${FOCUS_KEYWORD}?`,
    a: 'We recommend IPTV Smarters Pro for the fastest channel zapping, lowest RAM usage, and best 4K performance across Firestick, Smart TVs, Apple devices, and PC or Mac. It is our top pick for smooth playback.',
  },
  {
    q: 'Do I need to activate IPTV Smarters Pro separately?',
    a: 'The activation service is included free with every subscription. Choose Auto Setup (send us your Device Key and we activate remotely) or Manual Setup (enter your M3U or Xtream Codes yourself).',
  },
  {
    q: `How long does ${FOCUS_KEYWORD} setup take?`,
    a: 'Most customers are streaming within 10 minutes. Installing IPTV Smarters Pro takes about 2 minutes, activation takes 1 to 2 minutes, and content loading takes 1 to 2 minutes.',
  },
  {
    q: 'Can I use my login credentials on multiple devices?',
    a: 'Yes. You can install the app on unlimited devices. The number of simultaneous streams depends on your plan, with 1 screen on the Starter, and 2 or 3 screens on the Multi-Room plans.',
  },
  {
    q: 'What should I do if I get a login error in IPTV Smarters Pro?',
    a: 'Confirm you selected the Xtream Codes API method (not M3U) and that there are no extra spaces in your username or password. If it persists, message us on WhatsApp and most issues resolve within 2 minutes.',
  },
  {
    q: `What internet speed do I need for 4K streaming?`,
    a: 'For 4K Ultra HD we recommend 30 Mbps minimum. Full HD 1080p runs smoothly on 15 Mbps. Our anti-freeze server technology adapts to your connection speed automatically.',
  },
  {
    q: `Do I need a VPN to use ${FOCUS_KEYWORD}?`,
    a: 'No. Our global servers are optimized and secure. If your internet provider applies streaming throttling during peak hours, you can enable a VPN without issues.',
  },
];

export const zyminexFaqs: PageFaq[] = [
  {
    q: `What is ${BRAND}?`,
    a: `${BRAND} is a premium IPTV service that delivers live television channels, movies, and TV shows over your internet connection. Our service offers 55,000+ live channels and 150,000+ movies and TV shows in 4K Ultra HD, with guided WhatsApp setup and USD pricing.`,
  },
  {
    q: `How do I get my ${BRAND} login details?`,
    a: `Pick your plan, message us on WhatsApp, and our team sends your ${BRAND} Xtream Codes API details in the chat. You also get step by step help installing the player app and loading your channel list.`,
  },
  {
    q: `Which IPTV players support ${BRAND}?`,
    a: `Most modern IPTV players support the Xtream Codes API format. The most popular ones are IPTV Smarters Pro, TiviMate, IBO Player Pro, and XCIPTV. Our team helps you choose the right one for your device.`,
  },
  {
    q: `Do I need technical skills to set up ${BRAND}?`,
    a: `No. Setup takes about 10 minutes with our help. You install the player app, copy the details we send on WhatsApp, paste them into the login fields, and your channel list loads automatically.`,
  },
  {
    q: `What is the difference between ${BRAND} and other IPTV providers?`,
    a: `${BRAND} runs on high-quality infrastructure with 55,000+ channels, 150,000+ movies, 99.9% uptime, global-optimized edge servers, and 24/7 WhatsApp support. You get a premium service with no lock-in contracts.`,
  },
  {
    q: `Is there a free trial for ${BRAND}?`,
    a: `Yes. Message us on WhatsApp and we will send you a free 24 hour trial ${BRAND} login. Test the 4K picture, check the sport lineup, and make sure everything runs smooth on your internet before you commit to a paid plan.`,
  },
];

export const resellerFaqs: PageFaq[] = [
  {
    q: 'What exactly is an IPTV reseller panel?',
    a: `A reseller panel is a private dashboard that lets you create and manage IPTV subscriptions for your own customers. You buy credits from ${BRAND} in bulk, then use those credits to activate yearly, monthly, or trial subscriptions for anyone you sell to. You keep the full retail price minus your wholesale cost, and your customers never see the brand behind the scenes.`,
  },
  {
    q: 'How much can I realistically earn as an IPTV reseller?',
    a: `It depends on how many customers you bring in. Customers typically pay between $60 and $120 per year, with $90 being the average. Your wholesale cost per credit starts around $30 per year, so your profit per sale ranges from $30 to $90 depending on your selling price. Sell 10 subscriptions at $90 and you have earned roughly $600 in profit from a $299 investment.`,
  },
  {
    q: 'Do I need technical skills to become a reseller?',
    a: 'No. The reseller panel is designed to be simple. If you can use WhatsApp and a web browser, you can run a reseller business. We also provide onboarding guidance over WhatsApp, so any time you get stuck, our team walks you through it directly.',
  },
  {
    q: 'Do the reseller credits expire?',
    a: 'No. Your credits stay in your account indefinitely. You can activate them at your own pace, whether that means selling several subscriptions in a week or spreading them across months. There is no monthly minimum, no expiration date, and no pressure to sell quickly.',
  },
  {
    q: 'Which currencies can I sell in?',
    a: `You can sell to your customers in any currency you prefer. US dollars, British pounds, Australian dollars, or anything else. Your wholesale cost with us is fixed in USD. Your retail price is completely up to you, so you control your margin. Use the currency toggle at the top of the pricing section to see all prices in USD, GBP, or AUD.`,
  },
  {
    q: 'What kind of support do I get as a reseller?',
    a: `Every reseller, regardless of tier, gets direct WhatsApp support from our team. The Growth plan adds priority response times, and the Pro plan includes a dedicated support channel plus white label setup assistance.`,
  },
];
