export const site = {
  name: 'Creative Audio Technology Solutions',
  shortName: 'Creative Audio Tech',
  domain: 'creativeaudiotechnologysolutions.com',
  host: 'creativeaudiotechnologysolutions.com',
  url: 'https://creativeaudiotechnologysolutions.com',
  email: 'sales@desertrich.com',
  seller: 'Desert Rich',
  updated: '2026-09-27',
  published: '2026-08-03',
  description:
    'creativeaudiotechnologysolutions.com is for sale. A premium .com for AI audio platforms, generative music tools, production software, and creative-tech brands. Inquire at sales@desertrich.com.',
  ogImage: 'https://creativeaudiotechnologysolutions.com/og-image.jpg',
  ogImageAlt:
    'creativeaudiotechnologysolutions.com — premium AI audio technology domain for sale',
  heroImage: '/hero.jpg',
  verification: '9HaFc-wUc4BydI4hO3TvUbY5uUJe0HttYaoc4nx9ivs',
} as const;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  `Domain Inquiry — ${site.domain}`,
)}`;

export const mailtoOffer = `mailto:${site.email}?subject=${encodeURIComponent(
  `Domain Inquiry — ${site.domain}`,
)}&body=${encodeURIComponent(
  `Hello,\n\nI am interested in acquiring the domain ${site.domain}.\n\nPlease provide availability and pricing details.\n\nThank you.`,
)}`;

export const nav = [
  { href: '/insights/', label: 'Insights' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/acquire/', label: 'Acquire' },
] as const;

export const uses = [
  {
    id: 'platform',
    title: 'AI audio platform',
    text: 'A generative music, voice, or sound-design product that needs a category-clear .com for product, docs, and press.',
  },
  {
    id: 'studio',
    title: 'Production studio or agency',
    text: 'A boutique that sells AI-assisted scoring, podcasts, games audio, or post — and wants a name that signals the craft.',
  },
  {
    id: 'tools',
    title: 'Plugin or tools company',
    text: 'DAW plugins, mixing agents, mastering SaaS, or room-calibration software looking for an authoritative brand home.',
  },
  {
    id: 'research',
    title: 'Research or education brand',
    text: 'A lab, course, or conference covering computational audio, spatial audio, or generative sound.',
  },
  {
    id: 'media',
    title: 'Media or newsletter',
    text: 'A publication covering AI audio startups, models, and workflows — with a domain that matches the beat.',
  },
  {
    id: 'defensive',
    title: 'Defensive hold',
    text: 'An incumbent audio or creative-tech company that would rather own this exact phrase than watch a competitor build on it.',
  },
] as const;
