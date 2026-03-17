import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { getBreadcrumbJsonLd, getHreflangTags, getCanonicalUrl } from '@/lib/seo';
import { isValidLang } from '@/lib/services';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const hreflang = getHreflangTags('/about');
  return {
    title: `${t(lang as Lang, 'about_title')} | Top Repairs CNX`,
    description: t(lang as Lang, 'about_story').slice(0, 160),
    alternates: {
      canonical: getCanonicalUrl(lang as Lang, '/about'),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: `${t(lang as Lang, 'about_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'about_story').slice(0, 160),
      url: getCanonicalUrl(lang as Lang, '/about'),
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params;
  const lang = langStr as Lang;

  const stats = [
    { value: '10+', label: t(lang, 'years_experience') },
    { value: '2,000+', label: t(lang, 'jobs_completed') },
    { value: '4.9\u2605', label: t(lang, 'customer_rating') },
  ];

  const areas = t(lang, 'service_areas').split(', ');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbJsonLd([
              { name: t(lang, 'nav_home'), url: `/${lang}` },
              { name: t(lang, 'nav_about'), url: `/${lang}/about` },
            ])
          ),
        }}
      />

      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb orb-orange w-[350px] h-[350px] top-[-5%] right-[-10%] opacity-15" />
        <div className="orb orb-blue w-[250px] h-[250px] bottom-[15%] left-[-8%] opacity-15" />
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="section-label mb-5">{t(lang, 'nav_about')}</p>
              <h1 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
                {t(lang, 'about_title')}
              </h1>
            </div>
          </AnimateOnScroll>

          {/* Profile */}
          <AnimateOnScroll>
            <div className="card !p-10 mb-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-36 h-36 rounded-full bg-page-bg border-2 border-border flex items-center justify-center text-[56px] shrink-0">
                {'\uD83D\uDD27'}
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] heading-md mb-4">
                  {t(lang, 'about_meet')}
                </h2>
                <p className="text-text-secondary text-[16px] leading-[1.8]">{t(lang, 'about_story')}</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Stats */}
          <AnimateOnScroll>
            <div className="grid grid-cols-3 gap-5 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="card text-center">
                  <div className="text-[32px] md:text-[40px] font-bold text-orange mb-2">{stat.value}</div>
                  <div className="text-text-secondary text-[14px] md:text-[15px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Service Areas */}
          <AnimateOnScroll>
            <div className="card !p-10">
              <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold mb-6">
                {t(lang, 'contact_area')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {areas.map((area) => (
                  <span key={area} className="px-5 py-3 bg-page-bg border border-border rounded-2xl text-[15px] text-text-secondary">
                    {'\uD83D\uDCCD'} {area}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
