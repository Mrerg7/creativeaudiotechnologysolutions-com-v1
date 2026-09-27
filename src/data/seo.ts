import type { FaqItem } from './faq';
import { site } from './site';

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleLd(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'en-US',
    mainEntityOfPage: opts.url,
    image: site.ogImage,
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function productLd() {
  return {
    '@type': 'Product',
    '@id': `${site.url}/#domain-product`,
    name: site.domain,
    description: `Premium .com domain name ${site.domain} available for acquisition.`,
    url: `${site.url}/acquire/`,
    image: site.ogImage,
    brand: {
      '@type': 'Brand',
      name: site.name,
    },
    category: 'Domain Name',
    offers: {
      '@type': 'Offer',
      url: `${site.url}/acquire/`,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${site.url}/#seller` },
      description:
        'Make a confidential offer by email. No public asking price is posted.',
    },
  };
}
