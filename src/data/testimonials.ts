export interface Testimonial {
  name: string;
  business: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    business: 'The Flower Shed',
    location: 'Hamilton',
    quote: 'SiteGenius made the whole process so easy. I had no idea where to start, and now I have a beautiful website that my customers love. Highly recommend!',
    rating: 5,
  },
  {
    name: 'James R.',
    business: 'AutoPro Workshop',
    location: 'Auckland',
    quote: "As a fellow car guy, he just got it. The website looks mint and we've had heaps more enquiries since it went live. Top bloke to work with.",
    rating: 5,
  },
  {
    name: 'Priya K.',
    business: 'Kiwi Legal Advisors',
    location: 'Wellington',
    quote: 'Professional, responsive, and delivered exactly what we needed. The website perfectly represents our brand and has helped us attract new clients.',
    rating: 5,
  },
  {
    name: 'Dave T.',
    business: 'TradeForce Plumbing',
    location: 'Christchurch',
    quote: "I was paying way too much for a rubbish website before. SiteGenius sorted me out with something that actually works. Worth every cent.",
    rating: 5,
  },
];
