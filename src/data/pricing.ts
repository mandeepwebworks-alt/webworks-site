export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  cta: string;
  ctaLink: string;
}

export const websitePackages: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$499',
    badge: 'One-off fee',
    description: 'A clean, professional single-page site to get you online fast.',
    features: [
      '1-page responsive website',
      'Mobile-friendly design',
      'Contact form',
      'Basic SEO setup',
      '1 round of revisions',
      'Google Analytics',
      '2-week turnaround',
    ],
    cta: 'Get Started',
    ctaLink: '/get-a-quote',
  },
  {
    name: 'Essential',
    price: '$1,499',
    badge: 'One-off fee',
    description: 'A full small business website — yours to keep, forever.',
    features: [
      '3–4 page website',
      'Custom responsive design',
      'Content management system',
      'Contact & enquiry forms',
      'Full SEO setup',
      'Google Analytics & Search Console',
      '2 rounds of revisions',
      'Social media integration',
      '3-week turnaround',
    ],
    popular: true,
    cta: 'Get Started',
    ctaLink: '/get-a-quote',
  },
  {
    name: 'Professional',
    price: '$2,499',
    badge: 'One-off fee',
    description: 'A larger site with advanced features — built to grow with you.',
    features: [
      '5–7 page website',
      'Everything in Essential',
      'Blog / news section',
      'Advanced SEO & schema markup',
      'Speed & performance optimisation',
      '3 rounds of revisions',
      '1 month free hosting',
      'Priority support for 30 days',
      '4-week turnaround',
    ],
    cta: 'Get Started',
    ctaLink: '/get-a-quote',
  },
];

export const hostingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$25',
    period: '/month',
    description: 'Simple hosting for a single website.',
    features: [
      '1 website',
      '2 GB storage',
      'Free SSL certificate',
      'Daily backups',
      'Email support',
    ],
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
  {
    name: 'Business',
    price: '$45',
    period: '/month',
    description: 'More power for growing businesses.',
    features: [
      '1 website',
      '5 GB storage',
      'Free SSL',
      'Daily backups',
      'Staging environment',
      'Priority support',
    ],
    popular: true,
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
  {
    name: 'Premium',
    price: '$75',
    period: '/month',
    description: 'Top-tier hosting with all extras.',
    features: [
      'Up to 3 websites',
      '10 GB storage',
      'Free SSL',
      'Daily backups',
      'Staging environment',
      'Priority phone support',
      'Performance monitoring',
    ],
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
];

export const emailPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$5',
    period: '/month',
    description: 'One professional email address.',
    features: [
      '1 mailbox',
      '5 GB storage',
      'Spam filtering',
      'Webmail access',
      'Mobile sync',
    ],
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
  {
    name: 'Business',
    price: '$15',
    period: '/month',
    description: 'Multiple mailboxes for your team.',
    features: [
      '5 mailboxes',
      '10 GB each',
      'Advanced spam filtering',
      'Webmail access',
      'Mobile & desktop sync',
      'Shared contacts',
    ],
    popular: true,
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
  {
    name: 'Pro',
    price: '$35',
    period: '/month',
    description: 'Enterprise-grade email.',
    features: [
      '10 mailboxes',
      '25 GB each',
      'Advanced spam filtering',
      'Webmail access',
      'Mobile & desktop sync',
      'Shared contacts & calendars',
      'Priority support',
    ],
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
];

export const carePlans: PricingPlan[] = [
  {
    name: 'Basic Care',
    price: '$49',
    period: '/month',
    description: 'Essential maintenance and monitoring.',
    features: [
      'Security updates',
      'Uptime monitoring',
      'Monthly backups',
      'Email support',
    ],
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
  {
    name: 'Growth Care',
    price: '$99',
    period: '/month',
    description: 'Full maintenance with content updates.',
    features: [
      'Everything in Basic',
      'Content updates (up to 2hrs/month)',
      'Monthly SEO reports',
      'Priority support',
      'Performance optimisation',
    ],
    popular: true,
    cta: 'Choose Plan',
    ctaLink: '/contact',
  },
];
