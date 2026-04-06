export interface Testimonial {
  name: string;
  business: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Raj P.',
    business: 'Online Appraisal',
    location: 'Auckland, NZ',
    quote: 'SiteGenius built exactly what we needed — fast, clean, and professional. The platform has been running smoothly and our users love how easy it is. Couldn\'t be happier.',
    rating: 5,
  },
  {
    name: 'Chris D.',
    business: 'Melbourne Scratch Repairs',
    location: 'Melbourne, AU',
    quote: "They just got what we were after. The site looks sharp, loads fast, and we've had a noticeable jump in enquiries since it went live. Great team to work with.",
    rating: 5,
  },
  {
    name: 'Priya K.',
    business: 'Kiwi Legal Advisors',
    location: 'Wellington, NZ',
    quote: 'Professional, responsive, and delivered exactly what we needed. The website perfectly represents our brand and has helped us attract new clients.',
    rating: 5,
  },
  {
    name: 'Dave T.',
    business: 'TradeForce Plumbing',
    location: 'Christchurch, NZ',
    quote: "I was paying way too much for a rubbish website before. SiteGenius sorted me out with something that actually works. Worth every cent.",
    rating: 5,
  },
];
