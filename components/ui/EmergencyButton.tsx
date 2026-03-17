'use client';

import { useState } from 'react';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import EmergencyModal from './EmergencyModal';

export default function EmergencyButton({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-7 right-7 z-50 flex items-center gap-2.5 bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-pulse-glow transition-all duration-300 min-h-[56px] cursor-pointer"
        aria-label={t(lang, 'emergency_title')}
      >
        <span className="text-[20px]">{'\uD83D\uDEA8'}</span>
        <span className="hidden sm:inline font-semibold text-[14px] tracking-wide uppercase">
          {t(lang, 'hero_emergency')}
        </span>
      </button>

      <EmergencyModal lang={lang} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
