'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ---------------------------------------------------------------------------
// ROUTE PROGRESS BAR
// Non-blocking navigation indicator. It never covers page content and is not
// rendered on the initial page load, so it cannot delay FCP/LCP.
//
// Visibility is derived (no setState inside effects): when an internal link is
// clicked we remember the route we are leaving; the bar is shown only while the
// current route still equals that remembered route. As soon as the URL changes
// the condition becomes false and the bar disappears.
// ---------------------------------------------------------------------------
const SAFETY_RESET_MS = 10000;

function ProgressBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const [pendingFrom, setPendingFrom] = useState<string | null>(null);
  const routeKeyRef = useRef(routeKey);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    routeKeyRef.current = routeKey;
  }, [routeKey]);

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
        !href.startsWith('//') &&
        !href.startsWith('/#') &&
        targetAttr !== '_blank' &&
        downloadAttr === null &&
        href.split('#')[0] !== window.location.pathname + window.location.search
      ) {
        setPendingFrom(routeKeyRef.current);

        // Safety net in case the navigation is cancelled or fails.
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => setPendingFrom(null), SAFETY_RESET_MS);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  // Navigation finished: clear the pending marker so returning to the original
  // route later (e.g. browser Back) does not show the bar again.
  if (pendingFrom !== null && pendingFrom !== routeKey) {
    setPendingFrom(null);
  }

  const isNavigating = pendingFrom !== null && pendingFrom === routeKey;
  if (!isNavigating) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-1 overflow-hidden bg-[#18181B] pointer-events-none"
      role="status"
      aria-label="Loading"
    >
      <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#008000] via-[#39FF14] to-[#FFD700] shadow-[0_0_12px_rgba(57,255,20,0.5)] animate-[loaderSlide_1.4s_ease-in-out_infinite] motion-reduce:animate-none" />

      <style>{`
        @keyframes loaderSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

export default function RouteLoader() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  );
}
