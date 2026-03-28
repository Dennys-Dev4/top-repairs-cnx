import Link from 'next/link';
import Image from 'next/image';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { PHONE, PHONE_DISPLAY, LINE_ID, LINE_URL } from '@/lib/contact';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="Top Repairs CNX" width={180} height={45} className="mb-4" />
            <p className="text-text-secondary text-[15px] leading-[1.8]">{t(lang, 'footer_tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="section-label !mb-5">{t(lang, 'nav_services')}</p>
            <div className="space-y-3.5">
              {(['electrical', 'ac', 'cctv', 'general'] as const).map((slug) => (
                <Link
                  key={slug}
                  href={`/${lang}/services/${slug}`}
                  className="block text-text-secondary hover:text-orange text-[15px] transition-colors duration-300"
                >
                  {t(lang, `service_${slug}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label !mb-5">{t(lang, 'contact_info')}</p>
            <div className="space-y-3.5 text-[15px] text-text-secondary">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2.5 hover:text-orange transition-colors duration-300">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE_DISPLAY}
              </a>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#06C755] transition-colors duration-300">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE: {LINE_ID}
              </a>
              <p className="flex items-center gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t(lang, 'working_hours')}
              </p>
              <p className="flex items-center gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {t(lang, 'service_area')}
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider mt-14 mb-8" />
        <p className="text-center text-text-muted text-[13px] tracking-wide">
          &copy; {new Date().getFullYear()} Top Repairs CNX. {t(lang, 'all_rights')}
        </p>
      </div>
    </footer>
  );
}
