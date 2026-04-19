export function softwareApplicationSchema(spec: {
  title: string;
  metaDescription: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: spec.title,
    description: spec.metaDescription,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `https://reicalcs.com/${spec.slug}`,
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(slug: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://reicalcs.com/' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://reicalcs.com/#calculators' },
      { '@type': 'ListItem', position: 3, name: title,         item: `https://reicalcs.com/${slug}` },
    ],
  };
}
