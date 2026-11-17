'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [visible, setVisible] = useState(true); // for fade-out

  // 1. Initial page load
  useEffect(() => {
    setHasMounted(true);

    const finishLoading = () => {
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setLoading(false), 400); // wait for fade-out
      }, 400);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
      const fallback = setTimeout(finishLoading, 2500);
      return () => {
        window.removeEventListener('load', finishLoading);
        clearTimeout(fallback);
      };
    }
  }, []);

  // 2. Route change
  useEffect(() => {
    if (!hasMounted) return;

    setLoading(true);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setLoading(false), 400);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, hasMounted]);

  // 3. Click interception
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = (event.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');
      const downloadAttr = target.getAttribute('download');

      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        targetAttr !== '_blank' &&
        downloadAttr === null &&
        href !== pathname
      ) {
        setLoading(true);
        setVisible(true);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090B] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Loading"
      aria-live="polite"
      role="status"
    >
      {/* Background square-grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Neon glow behind image */}
      <div className="absolute w-[400px] h-[400px] bg-[#39FF14]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Image */}
      <div className="relative z-10 w-[220px] sm:w-[280px] md:w-[340px] animate-[loaderFloat_2.4s_ease-in-out_infinite]">
        <img
          src="/img/hero.png"
          alt="Zyminex loading"
          width={400}
          height={400}
          fetchPriority="high"
          loading="eager"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Loading bar */}
      <div className="relative z-10 mt-10 w-[180px] h-1.5 rounded-full overflow-hidden bg-[#18181B]">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#008000] via-[#39FF14] to-[#FFD700] animate-[loaderSlide_1.4s_ease-in-out_infinite]" />
      </div>

      {/* Text */}
      <p className="relative z-10 mt-5 text-[11px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">
        Loading
      </p>

      {/* Keyframes */}
      <style>{`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes loaderSlide {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}

export default function RouteLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}