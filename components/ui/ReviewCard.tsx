import { Lang } from '@/lib/types';

interface ReviewCardProps {
  name: string;
  flag: string;
  rating: number;
  text: Record<string, string>;
  lang: Lang;
}

export default function ReviewCard({ name, flag, rating, text, lang }: ReviewCardProps) {
  return (
    <div className="card card-lift card-glow-orange group">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-amber text-[16px]">{'\u2605'}</span>
          ))}
        </div>
        <span className="text-orange/20 text-[32px] font-serif leading-none group-hover:text-orange/30 transition-colors duration-300">&ldquo;</span>
      </div>
      <p className="text-text-secondary text-[15px] leading-[1.8] mb-6">
        &ldquo;{text[lang] || text.en}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-5 border-t border-border">
        <span className="text-[22px]">{flag}</span>
        <span className="font-semibold text-text-primary text-[15px]">{name}</span>
      </div>
    </div>
  );
}
