import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { getPageMeta, getBreadcrumbJsonLd, getHreflangTags, getCanonicalUrl, getOgLocale } from '@/lib/seo';
import { isValidLang } from '@/lib/services';
import ServiceCard from '@/components/ui/ServiceCard';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const meta = getPageMeta('services', lang);
  const hreflang = getHreflangTags('/services');
  return {
    title: `${t(lang as Lang, 'services_title')} | Top Repairs CNX`,
    description: meta.description,
    alternates: {
      canonical: getCanonicalUrl(lang as Lang, '/services'),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: `${t(lang as Lang, 'services_title')} | Top Repairs CNX`,
      description: meta.description,
      url: getCanonicalUrl(lang as Lang, '/services'),
      locale: getOgLocale(lang as Lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t(lang as Lang, 'services_title')} | Top Repairs CNX`,
      description: meta.description,
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params;
  const lang = langStr as Lang;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbJsonLd([
              { name: t(lang, 'nav_home'), url: `/${lang}` },
              { name: t(lang, 'nav_services'), url: `/${lang}/services` },
            ])
          ),
        }}
      />

      <section className="section-padding px-4 relative overflow-hidden">
        <div className="orb orb-orange w-[400px] h-[400px] top-[-5%] right-[-12%] opacity-20" />
        <div className="orb orb-blue w-[300px] h-[300px] bottom-[10%] left-[-10%] opacity-15" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="section-label mb-5">{t(lang, 'nav_services')}</p>
              <h1 className="font-[family-name:var(--font-playfair)] heading-lg mb-5 tracking-tight">
                {t(lang, 'services_title')}
              </h1>
              <p className="text-body-lg max-w-2xl mx-auto">{t(lang, 'services_desc')}</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(['electrical', 'ac', 'cctv', 'general'] as const).map((slug) => (
              <AnimateOnScroll key={slug}>
                <ServiceCard slug={slug} lang={lang} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
