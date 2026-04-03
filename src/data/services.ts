export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    title: 'Web Design & Development',
    description: 'Beautiful, fast websites built to turn visitors into customers. From single-page sites to full business platforms.',
    icon: 'code',
    features: [
      'Mobile-responsive design',
      'SEO optimised from day one',
      'Contact forms & enquiry systems',
      'Google Analytics setup',
      'Speed optimised for fast loading',
      'Content management system',
    ],
  },
  {
    title: 'Web Hosting',
    description: 'Reliable, NZ-based hosting to keep your website fast and secure. No technical knowledge required — we handle everything.',
    icon: 'server',
    features: [
      'NZ-based servers',
      'Free SSL certificate',
      'Daily backups',
      '99.9% uptime guarantee',
      'Email included',
      '24/7 monitoring',
    ],
  },
  {
    title: 'Business Email',
    description: 'Professional email addresses using your domain name. Look legit with you@yourbusiness.co.nz.',
    icon: 'mail',
    features: [
      'Custom domain email',
      'Spam & virus filtering',
      'Mobile & desktop sync',
      'Webmail access anywhere',
      'Generous storage',
      'Easy setup & migration',
    ],
  },
  {
    title: 'Website Care Plans',
    description: 'Keep your website secure, up-to-date, and running smoothly with our ongoing maintenance packages.',
    icon: 'shield',
    features: [
      'Monthly content updates',
      'Security patches & updates',
      'Performance monitoring',
      'Monthly reports',
      'Priority support',
      'Uptime monitoring',
    ],
  },
];
