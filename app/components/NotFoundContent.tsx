'use client';

// Client component: the background <img> uses an onError fallback handler,
// which cannot be passed from a Server Component. app/not-found.tsx renders
// this so it can export 404-specific metadata.

import Link from 'next/link';
import { CONSTANTS } from '@/lib/seo';
import { Home, ArrowLeft, Search, Tv, Film } from 'lucide-react';

export default function NotFoundContent() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden justify-center items-center py-20 sm:py-24 md:py-30 bg-[#09090B]">

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/error-404.webp"
          alt={`${CONSTANTS.BRAND_NAME} - Page not found on the best IPTV service`}
          className="w-full h-full object-cover opacity-95 brightness-[0.35]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/90 via-[#09090B]/80 to-[#09090B]/95" />
      </div>

      {/* Animated Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39FF14]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        <div className="max-w-3xl mx-auto">

          {/* 404 Number Layout Container */}
          <div className="mb-6">
            <div className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter uppercase select-none">
              <span className="text-[#39FF14]">4</span>
              <span className="text-[#F8FAFC]">0</span>
              <span className="text-[#39FF14]">4</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8FAFC] mb-4 uppercase tracking-tighter">
            Page Not Found
          </h1>

          <div className="w-24 h-1.5 bg-[#39FF14] mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(57,255,20,0.5)]" />

          <p className="text-[#94A3B8] text-base sm:text-lg font-medium max-w-xl mx-auto mb-12 leading-relaxed">
            That page is off the air. The link might be old, or the address may have a typo. Use the shortcuts below to get back to streaming 55,000+ live channels, 150,000+ movies, and 4K Ultra HD sports on {CONSTANTS.BRAND_NAME}.
          </p>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            <Link
              href="/"
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300 cursor-pointer"
            >
              <Home className="w-5 h-5 text-[#39FF14] group-hover:scale-110 transition-transform" />
              <span className="text-[#F8FAFC] text-xs font-black uppercase tracking-wider">Home</span>
            </Link>

            <Link
              href="/pricing"
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300 cursor-pointer"
            >
              <Tv className="w-5 h-5 text-[#39FF14] group-hover:scale-110 transition-transform" />
              <span className="text-[#F8FAFC] text-xs font-black uppercase tracking-wider">Plans</span>
            </Link>

            <Link
              href="/setup"
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300 cursor-pointer"
            >
              <Film className="w-5 h-5 text-[#39FF14] group-hover:scale-110 transition-transform" />
              <span className="text-[#F8FAFC] text-xs font-black uppercase tracking-wider">Setup</span>
            </Link>

            <Link
              href="/blog"
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_10px_30px_rgba(57,255,20,0.15)] transition-all duration-300 cursor-pointer"
            >
              <Search className="w-5 h-5 text-[#39FF14] group-hover:scale-110 transition-transform" />
              <span className="text-[#F8FAFC] text-xs font-black uppercase tracking-wider">Blog</span>
            </Link>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFD700] text-[#09090B] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 hover:bg-[#E6C200] shrink-0 shadow-2xl border border-[#09090B]/20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              Back to Home
            </Link>

            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#18181B] border border-[#27272A] hover:border-[#39FF14] text-[#F8FAFC] font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 shrink-0 shadow-2xl cursor-pointer"
            >
              View IPTV Subscription Plans
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}