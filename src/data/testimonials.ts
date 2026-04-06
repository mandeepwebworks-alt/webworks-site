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
    name: 'Arjun S.',
    business: 'Shine Auto Spa',
    location: 'Toronto, CA',
    quote: 'Working with SiteGenius remotely was seamless. They understood our brand straight away and delivered a site that truly reflects the premium service we offer.',
    rating: 5,
  },
  {
    name: 'Maria T.',
    business: 'Hume City Cleaners',
    location: 'Melbourne, AU',
    quote: "We needed something simple that gets customers calling us. SiteGenius delivered that and more — the enquiries started coming in within the first week.",
    rating: 5,
  },
];
