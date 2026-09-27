export type FaqItem = {
  question: string;
  answer: string;
};

export const buyerFaqs: FaqItem[] = [
  {
    question: 'Is creativeaudiotechnologysolutions.com for sale?',
    answer:
      'Yes. The domain is available for acquisition. This website demonstrates the name and the category. You are buying the domain registration, not a separate operating company, product, or audience.',
  },
  {
    question: 'How do I make an offer?',
    answer:
      'Email sales@desertrich.com or use the inquiry form on the Acquire page. The form opens a pre-addressed message in your email app. Include who you are, how you would use the name, and a budget if you have one. Negotiations stay confidential.',
  },
  {
    question: 'Is there a public asking price?',
    answer:
      'No price is posted publicly. Ask for the current asking price, or send a range with your inquiry. Serious buyers receive a direct reply, typically within one to two business days.',
  },
  {
    question: 'What exactly transfers?',
    answer:
      'The creativeaudiotechnologysolutions.com domain name, moved with a standard registrar authorization code. After the transfer completes, you control the DNS. A typical release takes a few days once both registrars approve it. Escrow is welcome.',
  },
  {
    question: 'Does the sale include a business, audience, or trademark?',
    answer:
      'No. Unless a written agreement says otherwise, the sale is the domain only. It does not include customers, revenue, social accounts, content licenses, or a trademark assignment. Run your own trademark search before you build a brand on the name.',
  },
  {
    question: 'Who is this name a fit for?',
    answer:
      'AI audio platforms, production studios, plugin and tools companies, research or education brands, media properties, and incumbents acquiring the phrase defensively. It is a long, descriptive .com — strongest when the buyer will use the full phrase in public.',
  },
  {
    question: 'Do you work with domain brokers?',
    answer:
      'Yes. Name the principal and the broker in the first email so the conversation stays simple.',
  },
];

export const categoryFaqs: FaqItem[] = [
  {
    question: 'What is creative audio technology?',
    answer:
      'Creative audio technology covers software and systems that generate, edit, mix, master, spatialize, or distribute sound — increasingly powered by machine learning. It spans generative music and voice models, AI mixing agents, immersive/spatial formats, and personalized listening.',
  },
  {
    question: 'Is this website an operating audio company?',
    answer:
      'No. This is a demonstration and informational site for a domain that is for sale. References to models, vendors, and industry shifts are background context, not an offer of services or a partnership claim.',
  },
  {
    question: 'Will buying the domain improve my search rankings?',
    answer:
      'A domain is a web address, not a ranking guarantee. Authority is earned after you own it — mainly through useful content and links from other sites. This demonstration site is structured for clarity and crawlability; your results after transfer depend on what you publish and how the web links to you.',
  },
];

export const allFaqs: FaqItem[] = [...buyerFaqs, ...categoryFaqs];
