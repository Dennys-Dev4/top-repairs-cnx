import Link from 'next/link';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { PHONE, PHONE_DISPLAY, LINE_ID } from '@/lib/contact';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-[24px] font-bold text-text-primary mb-4 tracking-tight">
              Top Repairs <span className="text-orange">CNX</span>
            </h3>
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
              <a href={`tel:${PHONE}`} className="block hover:text-orange transition-colors duration-300">
                {PHONE_DISPLAY}
              </a>
              <p>LINE: {LINE_ID}</p>
              <p>{t(lang, 'working_hours')}</p>
              <p>{t(lang, 'service_area')}</p>
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
