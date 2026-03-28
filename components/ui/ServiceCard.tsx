import Link from 'next/link';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { getServiceBySlug } from '@/lib/pricing';

interface ServiceCardProps {
  slug: string;
  lang: Lang;
}

const glowClass: Record<string, string> = {
  electrical: 'card-glow-amber',
  ac: 'card-glow-blue',
  cctv: 'card-glow-purple',
  general: 'card-glow-green',
};

const accentColors: Record<string, string> = {
  electrical: '#F59E0B',
  ac: '#3B82F6',
  cctv: '#8B5CF6',
  general: '#10B981',
};

const serviceIcons: Record<string, React.ReactNode> = {
  electrical: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  ac: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  cctv: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  general: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1.5 1.5 0 014.5 17.09V6.91a1.5 1.5 0 011.536-1.26l5.384 3.18M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
    </svg>
  ),
};

export default function ServiceCard({ slug, lang }: ServiceCardProps) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const minPrice = Math.min(...service.items.filter((i) => !i.isFree).map((i) => i.price));
  const accent = accentColors[slug] || '#F97316';

  return (
    <Link
      href={`/${lang}/services/${slug}`}
      className={`card card-lift ${glowClass[slug] || ''} block group relative overflow-hidden`}
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: 0.4 }}
      />

      {/* Subtle orb glow behind icon */}
      <div
        className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: accent }}
      />

      <div className="relative">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}15`, color: accent }}
        >
          {serviceIcons[slug] || <span className="text-[28px]">{service.icon}</span>}
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold mb-3 text-text-primary group-hover:text-orange transition-colors duration-300 tracking-tight">
          {t(lang, `service_${slug}`)}
        </h3>
        <p className="text-text-secondary text-[14px] mb-6 leading-[1.8] line-clamp-2">
          {t(lang, `desc_${slug}`)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-text-muted text-[13px] uppercase tracking-wider font-medium">{t(lang, 'starting_from')}</span>
            <span className="text-[22px] font-bold tracking-tight" style={{ color: accent }}>
              {'\u0E3F'}{minPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-text-muted group-hover:text-orange group-hover:translate-x-1 transition-all duration-300 text-[18px]">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
