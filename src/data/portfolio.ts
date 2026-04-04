export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  url?: string;
  live?: boolean;
}

export const projects: Project[] = [
  // ── Real Client Sites ──
  {
    title: 'Online Appraisal',
    category: 'Real Estate',
    description: 'Instant property valuation platform for NZ homeowners. Get accurate, data-driven appraisals online in seconds.',
    tags: ['Web App', 'API Integration', 'SEO'],
    gradient: 'from-cyan-500/30 via-teal-500/20 to-slate-900',
    url: 'https://onlineappraisal.co.nz',
    live: true,
  },
  {
    title: 'Melbourne Scratch Repairs',
    category: 'Automotive',
    description: 'Premium paint & panel repair specialists in Melbourne. Mobile service with lifetime guarantee on all repairs.',
    tags: ['Web Design', 'Lead Gen', 'Gallery'],
    gradient: 'from-slate-400/30 via-zinc-500/20 to-slate-900',
    url: 'https://melbournescratchrepairs.com.au',
    live: true,
  },
  {
    title: 'Shine Auto Spa',
    category: 'Automotive',
    description: 'Canada\'s premier auto detailing studio. Ceramic coating, PPF, and luxury vehicle care with online booking.',
    tags: ['E-Commerce', 'Booking System', 'Branding'],
    gradient: 'from-amber-500/30 via-yellow-400/20 to-slate-900',
    url: 'https://shineautospa.ca',
    live: true,
  },
  // ── Demo Showcase Sites ──
  {
    title: 'Crystal Beauty Salon',
    category: 'Beauty',
    description: 'Luxury beauty salon offering haircuts, facials, and nail art. Online booking with real-time availability.',
    tags: ['Web Design', 'Booking', 'Mobile-First'],
    gradient: 'from-pink-500/30 via-rose-400/20 to-slate-900',
    url: '/portfolio/crystal-beauty-salon',
  },
  {
    title: 'Peak Fitness Gym',
    category: 'Health',
    description: 'High-energy fitness centre with class schedules, membership sign-up, and personal trainer profiles.',
    tags: ['Web Design', 'CMS', 'Performance'],
    gradient: 'from-lime-500/30 via-green-400/20 to-slate-900',
    url: '/portfolio/peak-fitness-gym',
  },
  {
    title: 'The Daily Grind Cafe',
    category: 'Hospitality',
    description: 'Cosy neighbourhood cafe with full menu, Google Maps, online ordering, and loyalty programme.',
    tags: ['Web Design', 'Branding', 'Responsive'],
    gradient: 'from-yellow-600/30 via-amber-500/20 to-slate-900',
    url: '/portfolio/daily-grind-cafe',
  },
  {
    title: 'TradeForce Plumbing',
    category: 'Trade',
    description: 'Trusted Wellington plumbers with service area maps, instant quotes, and 24/7 emergency callout.',
    tags: ['Web Design', 'Lead Generation', 'SEO'],
    gradient: 'from-orange-500/30 via-amber-400/20 to-slate-900',
    url: '/portfolio/tradeforce-plumbing',
  },
  {
    title: 'Bloom & Co Florist',
    category: 'Retail',
    description: 'Boutique Auckland florist with product gallery, same-day delivery ordering, and seasonal collections.',
    tags: ['E-Commerce', 'Gallery', 'Mobile-First'],
    gradient: 'from-fuchsia-500/30 via-pink-400/20 to-slate-900',
    url: '/portfolio/bloom-florist',
  },
  {
    title: 'Kiwi Legal Advisors',
    category: 'Professional',
    description: 'Authoritative law firm site with practice areas, team profiles, client testimonials, and consultation booking.',
    tags: ['Web Design', 'SEO', 'Accessibility'],
    gradient: 'from-violet-500/30 via-indigo-500/20 to-slate-900',
    url: '/portfolio/kiwi-legal',
  },
];

export const categories = ['All', 'Real Estate', 'Automotive', 'Beauty', 'Health', 'Hospitality', 'Trade', 'Retail', 'Professional'];
