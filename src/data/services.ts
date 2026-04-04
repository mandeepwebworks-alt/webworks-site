export interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export const services: Service[] = [
  {
    title: 'Custom Web Development',
    description: 'Beautiful, fast websites built to turn visitors into customers. From single-page sites to full business platforms.',
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    color: 'neon-cyan',
    features: [
      'Mobile-responsive design',
      'SEO optimised from day one',
      'High conversion layouts',
      'Google Analytics setup',
      'Speed optimised for fast loading',
      'Content management system',
    ],
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Powerful online stores that drive sales and revenue. We build secure, easy-to-manage e-commerce websites.',
    icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
    color: 'neon-purple',
    features: [
      'Stripe & PayPal integration',
      'Inventory management',
      'Secure checkout process',
      'Abandoned cart recovery',
      'Discount & promo codes',
      'Sales analytics dashboard',
    ],
  },
  {
    title: 'SEO & Performance',
    description: 'Rank higher on Google and dominate your local market. We optimise your site structure and speed for search engines.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    color: 'emerald-400',
    features: [
      'Technical SEO audits',
      'Keyword research',
      'On-page optimisation',
      'Local SEO (Google Business)',
      'Page speed improvements',
      'Monthly traffic reports',
    ],
  },
  {
    title: 'Web App Development',
    description: 'Complex browser-based applications, dashboards, or portals tailored specifically to your business workflows.',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75',
    color: 'amber-400',
    features: [
      'Custom dashboards',
      'Third-party API integrations',
      'User authentication',
      'Real-time databases',
      'Client portals',
      'Automated workflows',
    ],
  },
];
