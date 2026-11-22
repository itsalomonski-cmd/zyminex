// lib/home-faqs.ts
// Homepage FAQ content. Single source for BOTH the visible FAQ section
// (app/components/FAQ.tsx) and the homepage FAQPage JSON-LD
// (app/components/PageSchemas.tsx), so the structured data always matches
// what visitors can read on the page.
import { CONSTANTS } from '@/lib/seo';

export const homeFaqs: { q: string; a: string }[] = [
  {
    q: 'What is IPTV and how does it work?',
    a: `IPTV stands for Internet Protocol Television. Instead of a cable or satellite box, your channels and movies stream over your internet connection. With ${CONSTANTS.BRAND_NAME}, you can watch 55,000+ live channels and over 150,000 movies and shows in 4K on your Smart TV, Firestick, phone, or tablet. Setup takes minutes and your login lands in your inbox right after checkout.`,
  },
  {
    q: `What makes ${CONSTANTS.BRAND_NAME} the best IPTV Provider?`,
    a: `${CONSTANTS.BRAND_NAME} delivers a massive channel lineup — 55,000+ live channels covering the NFL, NBA, MLB, NHL, UFC, and all major PPV events, plus 150,000+ movies and shows on demand. Our anti-freeze servers run dedicated capacity across US edge locations, so your stream stays smooth even during the Super Bowl or a packed pay-per-view night.`,
  },
  {
    q: 'Which devices are compatible with your IPTV services?',
    a: 'Almost anything you already own — Samsung and LG Smart TVs, Android TV, Google TV, Amazon Firestick, Apple TV, iPhone, iPad, Windows PC, Mac, plus MAG and Formuler set-top boxes. Not sure about your device? Message our 24/7 support team and we will confirm it before you subscribe.',
  },
  {
    q: 'How does the setup and activation process work?',
    a: `Once you pick your ${CONSTANTS.SECONDARY_FOCUS_KEYWORD} plan and the number of screens you need, your M3U playlist and Xtream Codes login arrive by email within five minutes. Install a player like IPTV Extreme Pro, TiviMate, or Smart IPTV, paste your credentials, and you are streaming. Activation is instant and setup takes under five minutes.`,
  },
  {
    q: 'Can I request a free trial before I pay?',
    a: 'Yes, and we recommend it. Request a free trial and we will set you up so you can test the 4K picture quality, check the channel lineup for live sports, and make sure everything runs smooth on your device and internet connection. No contract and no pressure.',
  },
  {
    q: 'How do I install the IPTV player on my Smart TV or Firestick?',
    a: 'For Smart TVs and Firestick, download a supported player like IPTV Extreme Pro, TiviMate, Smart IPTV, or IPTV Smarters from your app store, then enter the login details we send you by email. If any step is unclear, our 24/7 support team will walk you through it step by step until you are watching.',
  },
  {
    q: 'What payment methods do you accept and what currency is used?',
    a: 'All prices are in US dollars (USD $) with no contract — cancel anytime. We accept Credit Card, PayPal, and Crypto through a secure encrypted checkout. Choose a 3, 6, or 12 month IPTV Subscription and pick 1, 2, or 3 screens for your household.',
  },
  {
    q: 'Do you offer support during my IPTV Subscription?',
    a: 'Yes, right through your whole IPTV Subscription. Reach our team any time by email and live chat for help with installation, setup, or anything else that comes up. That includes tips to get the most out of your player app and quick fixes if you ever notice buffering on your end.',
  },
];
