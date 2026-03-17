import { MetadataRoute } from 'next';

const baseUrl = 'https://toprepairscnx.com';
const langs = ['en', 'th', 'zh'];
const services = ['electrical', 'ac', 'cctv', 'general'];
const pages = ['', '/services', '/booking', '/gallery', '/about', '/contact'];

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      langs.map((l) => [l === 'zh' ? 'zh-Hans' : l, `${baseUrl}/${l}${path}`])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // One entry per page per language (no duplicates)
  for (const page of pages) {
    for (const lang of langs) {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: alternates(page),
      });
    }
  }

  for (const service of services) {
    for (const lang of langs) {
      entries.push({
        url: `${baseUrl}/${lang}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: alternates(`/services/${service}`),
      });
    }
  }

  return entries;
}
