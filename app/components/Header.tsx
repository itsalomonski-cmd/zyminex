'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CONSTANTS } from '@/lib/seo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile navigation drawer on route transition. Adjusting state
  // during render when the pathname changes avoids an extra effect + render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  // Keyboard support for the full-screen mobile menu (a modal dialog):
  // move focus into it on open, close on Escape, and keep Tab inside the menu
  // (plus its close toggle) so focus cannot wander behind the overlay.
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const focusables = () => [toggle, ...Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter(Boolean) as HTMLElement[];
    const firstLink = menu?.querySelector<HTMLElement>('a[href]');
    const focusTimer = setTimeout(() => firstLink?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !items.includes(active as HTMLElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !items.includes(active as HTMLElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Setup', href: '/setup' },
    { name: 'Blog', href: '/blog' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#081425]/90 backdrop-blur-lg border-b border-[#39FF14] py-2.5 shadow-2xl'
            : 'bg-transparent py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group cursor-pointer" aria-label={`${CONSTANTS.BRAND_NAME} Home`}>
                <div className="h-10 flex items-center group-hover:scale-105 transition-transform duration-200">
                  <img
                    src="/img/zyminex-logo.png"
                    alt={`${CONSTANTS.BRAND_NAME} - Premium IPTV Provider Logo`}
                    width={160}
                    height={40}
                    className="object-contain h-full w-full"
                    fetchPriority="low"
                    loading="eager"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Pill */}
            <nav className="hidden lg:block" aria-label="Main Navigation">
              <ul className="flex items-center gap-1.5 bg-[#0B1F35]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#39FF14]/30 shadow-lg">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`font-black uppercase tracking-wider text-xs xl:text-sm transition-all duration-200 px-4 py-2 rounded-full inline-block cursor-pointer ${
                          active
                            ? 'bg-[#39FF14] text-[#081425] shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                            : 'text-white hover:text-[#39FF14] hover:bg-[#39FF14]/10'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/pricing"
                className="px-6 py-2.5 rounded-full bg-[#FFD700] text-[#081425] font-black tracking-widest uppercase text-xs xl:text-sm hover:bg-[#E6C200] transition-all duration-200 shadow-lg shadow-[#FFD700]/20 active:scale-95 hover:scale-105 cursor-pointer"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                ref={toggleRef}
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#39FF14] p-2.5 rounded-xl bg-[#0F2942] border border-[#39FF14]/30 z-50 relative active:scale-95 transition-transform cursor-pointer"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-[#081425]/95 backdrop-blur-2xl transition-all duration-300 lg:hidden flex flex-col justify-center items-center ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Global square-grid background pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(30,58,82,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,82,0.55) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
              className={`w-full text-center py-4 rounded-2xl text-lg font-black tracking-widest uppercase transition-all duration-200 border cursor-pointer ${
                isActive(link.href)
                  ? 'text-[#081425] bg-[#FFD700] border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                  : 'text-white bg-[#0F2942]/80 border-[#1E3A52] hover:bg-[#39FF14] hover:text-[#081425] hover:border-[#39FF14]'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="w-full pt-4">
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 rounded-2xl bg-[#FFD700] text-[#081425] font-black text-lg tracking-widest uppercase shadow-xl transition-all duration-200 hover:bg-[#E6C200] active:scale-95 cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}