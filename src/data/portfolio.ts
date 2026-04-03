export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
}

export const projects: Project[] = [
  {
    title: 'AutoPro Workshop',
    category: 'Automotive',
    description: 'Modern website for a local auto repair workshop with online booking and service listings.',
    tags: ['Web Design', 'SEO', 'Booking System'],
    gradient: 'from-cyan-500/30 via-blue-500/20 to-slate-900',
  },
  {
    title: 'Bloom & Co Florist',
    category: 'Retail',
    description: 'Elegant online presence for a boutique florist with a product gallery and contact form.',
    tags: ['Web Design', 'Gallery', 'Mobile-First'],
    gradient: 'from-pink-500/30 via-rose-400/20 to-slate-900',
  },
  {
    title: 'TradeForce Plumbing',
    category: 'Trade',
    description: 'Professional site for a plumbing company with service areas and quote requests.',
    tags: ['Web Design', 'Lead Generation', 'SEO'],
    gradient: 'from-orange-500/30 via-amber-400/20 to-slate-900',
  },
  {
    title: 'The Daily Grind Cafe',
    category: 'Hospitality',
    description: 'Warm cafe website featuring the menu, location, and online ordering info.',
    tags: ['Web Design', 'Branding', 'Responsive'],
    gradient: 'from-yellow-500/30 via-amber-400/20 to-slate-900',
  },
  {
    title: 'Peak Fitness Gym',
    category: 'Health',
    description: 'High-energy fitness website with class schedules and membership info.',
    tags: ['Web Design', 'CMS', 'Performance'],
    gradient: 'from-emerald-500/30 via-green-400/20 to-slate-900',
  },
  {
    title: 'Kiwi Legal Advisors',
    category: 'Professional',
    description: 'Clean, trustworthy website for a law firm with practice areas and team profiles.',
    tags: ['Web Design', 'SEO', 'Accessibility'],
    gradient: 'from-violet-500/30 via-indigo-500/20 to-slate-900',
  },
];

export const categories = ['All', 'Automotive', 'Retail', 'Trade', 'Hospitality', 'Health', 'Professional'];
