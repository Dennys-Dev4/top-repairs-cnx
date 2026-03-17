'use client';

import { useEffect, useCallback } from 'react';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { PHONE, LINE_URL } from '@/lib/contact';

interface EmergencyModalProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ lang, isOpen, onClose }: EmergencyModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-5" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-3xl p-10 md:p-12 max-w-md w-full text-center shadow-2xl shadow-black/40">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-text-muted hover:text-text-primary w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-[56px] mb-6">{'\uD83D\uDEA8'}</div>
        <h2 className="font-[family-name:var(--font-playfair)] text-[30px] font-bold mb-3 text-text-primary tracking-tight">
          {t(lang, 'emergency_title')}
        </h2>
        <p className="text-text-secondary text-[16px] mb-10 leading-relaxed">{t(lang, 'emergency_desc')}</p>

        <div className="space-y-4">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-3 w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-[16px] font-semibold transition-all duration-300 min-h-[60px] shadow-xl shadow-red-600/20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t(lang, 'emergency_call')}
          </a>

          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 bg-[#06C755] hover:bg-[#05b34d] text-white rounded-2xl text-[16px] font-semibold transition-all duration-300 min-h-[60px] shadow-xl shadow-[#06C755]/20"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            {t(lang, 'emergency_line')}
          </a>
        </div>

        <p className="text-text-muted text-[13px] mt-8 uppercase tracking-wider font-medium">{t(lang, 'emergency_available')}</p>
      </div>
    </div>
  );
}
