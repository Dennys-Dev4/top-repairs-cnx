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
        <div className="text-[48px] mb-6 leading-none">{service.icon}</div>
        <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold mb-3 text-text-primary group-hover:text-orange transition-colors duration-300 tracking-tight">
          {t(lang, `service_${slug}`)}
        </h3>
        <p className="text-text-secondary text-[14px] mb-6 leading-[1.8] line-clamp-2">
          {t(lang, `desc_${slug}`)}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-text-muted text-[13px] uppercase tracking-wider font-medium">{t(lang, 'starting_from')}</span>
          <span className="text-[22px] font-bold tracking-tight" style={{ color: accent }}>
            {'\u0E3F'}{minPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
