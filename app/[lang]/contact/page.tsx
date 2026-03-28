import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { t } from '@/lib/translations';
import { getHreflangTags, getCanonicalUrl, getOgLocale } from '@/lib/seo';
import { isValidLang } from '@/lib/services';
import ContactContent from './ContactContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const hreflang = getHreflangTags('/contact');
  return {
    title: `${t(lang as Lang, 'contact_title')} | Top Repairs CNX`,
    description: t(lang as Lang, 'contact_desc'),
    alternates: {
      canonical: getCanonicalUrl(lang as Lang, '/contact'),
      languages: Object.fromEntries(hreflang.map((h) => [h.hrefLang, h.href])),
    },
    openGraph: {
      title: `${t(lang as Lang, 'contact_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'contact_desc'),
      url: getCanonicalUrl(lang as Lang, '/contact'),
      locale: getOgLocale(lang as Lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t(lang as Lang, 'contact_title')} | Top Repairs CNX`,
      description: t(lang as Lang, 'contact_desc'),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langStr } = await params;
  const lang = langStr as Lang;

  return <ContactContent lang={lang} />;
}
