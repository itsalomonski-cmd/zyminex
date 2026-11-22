'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Makes every Framer Motion animation on the site honour the operating-system
// "reduce motion" preference (transform/layout animations such as the infinite
// poster and partner tickers are skipped; opacity fades remain).
// Users without that preference see exactly the same animations as before.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
