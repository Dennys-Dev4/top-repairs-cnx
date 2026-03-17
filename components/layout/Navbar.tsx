'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const navLinks = [
  { key: 'nav_home', href: '' },
  { key: 'nav_services', href: '/services' },
  { key: 'nav_booking', href: '/booking' },
  { key: 'nav_gallery', href: '/gallery' },
  { key: 'nav_about', href: '/about' },
  { key: 'nav_contact', href: '/contact' },
];

export default function Navbar({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    const full = `/${lang}${href}`;
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname.startsWith(full);
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(11, 17, 32, 0.75)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        borderBottom: '1px solid rgba(28, 42, 63, 0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[76px]">
          <Link href={`/${lang}`} className="hover:opacity-80 transition-opacity duration-300">
            <Image src="/logo.png" alt="Top Repairs CNX" width={180} height={45} priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${lang}${link.href}`}
                className={`px-4 py-2.5 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-orange/10 text-orange'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                }`}
              >
                {t(lang, link.key)}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-border">
              <LanguageSwitcher lang={lang} />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher lang={lang} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary p-2.5 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl hover:bg-white/[0.03] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            background: 'rgba(11, 17, 32, 0.95)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(28, 42, 63, 0.6)',
          }}
        >
          <div className="px-5 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${lang}${link.href}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center py-3.5 px-5 rounded-xl text-[15px] font-medium transition-all duration-300 min-h-[50px] ${
                  isActive(link.href)
                    ? 'bg-orange/10 text-orange'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                }`}
              >
                {t(lang, link.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
