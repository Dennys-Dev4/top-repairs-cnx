'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Lang } from '@/lib/types';

const languages: { code: Lang; flag: string; label: string }[] = [
  { code: 'en', flag: '\uD83C\uDDEC\uD83C\uDDE7', label: 'EN' },
  { code: 'th', flag: '\uD83C\uDDF9\uD83C\uDDED', label: 'TH' },
  { code: 'zh', flag: '\uD83C\uDDE8\uD83C\uDDF3', label: 'ZH' },
];

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();

  function getLocalizedPath(targetLang: Lang) {
    const segments = pathname.split('/');
    segments[1] = targetLang;
    return segments.join('/');
  }

  return (
    <div className="flex items-center gap-0.5 bg-card/80 border border-border rounded-full p-1">
      {languages.map((l) => (
        <Link
          key={l.code}
          href={getLocalizedPath(l.code)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 ${
            lang === l.code
              ? 'bg-orange text-white shadow-md shadow-orange/20'
              : 'text-text-muted hover:text-text-secondary'
          }`}
          aria-label={`Switch to ${l.label}`}
        >
          <span className="text-[13px]">{l.flag}</span>
          <span className="hidden sm:inline">{l.label}</span>
        </Link>
      ))}
    </div>
  );
}
