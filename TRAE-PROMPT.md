# SiteGenius.co.nz — Full Website Build Prompt

Build a complete, production-ready website for a web design business called **SiteGenius** (sitegenius.co.nz) based in New Zealand. The owner builds websites for local businesses using AI tools, and also has a background in the automotive industry. The website needs to look like a professional UI/UX designer built it — futuristic dark theme with playful elements.

---

## TECH STACK

- **Astro 4.x** (static site generator — supports Node 20)
- **Tailwind CSS 3.x** (utility-first CSS)
- **@astrojs/react** (React islands for interactive components)
- **@astrojs/sitemap** (auto sitemap)
- **@astrojs/tailwind** (Tailwind integration)
- **No backend** — forms use Web3Forms (access key: placeholder `YOUR_WEB3FORMS_KEY`)
- **Deploy target**: Cloudflare Pages / Netlify

The project is already initialized at the current directory with these packages installed. `package.json` already has scripts for `dev`, `build`, `preview`. Config files (`astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`) already exist — update them if needed but don't recreate from scratch.

---

## DESIGN SYSTEM — "Electric Midnight"

### Colors
```
Background:
  space-900: #0A0E1A  (main bg)
  space-800: #111827  (secondary bg)
  space-700: #1A1F35  (cards)
  space-600: #232946  (elevated surfaces)

Text:
  muted-100: #F0F0F5  (primary text — near white)
  muted-200: #A0A6C0  (secondary text)
  muted-300: #6B7280  (subtle labels)

Accents:
  neon-cyan: #00E5FF   (primary CTA, links, highlights)
  neon-purple: #A855F7 (secondary accent)
  neon-teal: #22D3EE   (hover states)
  neon-glow: #06B6D4   (glow effects)
```

### Typography
- **Headings**: `Space Grotesk` (Google Fonts) — bold, futuristic
- **Body**: `Inter` (Google Fonts) — clean, readable
- Import from Google Fonts CDN

### Design Elements
1. **Glassmorphism cards**: `bg-space-700/50 backdrop-blur-xl border border-white/5` with `hover:border-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]`
2. **Gradient text**: `bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent`
3. **Grid background**: Faint grid lines overlay on hero sections using CSS background-image with 60px grid
4. **Glow borders**: Animated gradient border that appears on hover using mask-composite technique
5. **Buttons**:
   - Primary: solid neon-cyan bg, dark text, glow on hover, scale-105 transform
   - Secondary: transparent with neon-cyan border, fills on hover
6. **Scrollbar**: Custom styled — thin, space-600 thumb, neon-glow on hover

### Animations & Playful Elements
1. **Hero typing effect**: Rotating words — "We build websites for [plumbers | cafes | mechanics | florists | builders | salons]" with a typing/deleting animation in CSS or JS
2. **Scroll-triggered reveals**: Elements fade up (translateY 30px → 0, opacity 0 → 1) when they enter viewport using IntersectionObserver
3. **Floating animation**: Subtle up-down float on decorative elements (6s ease-in-out infinite)
4. **Animated gradient**: Slow-moving background gradient on hero (15s infinite)
5. **Counter animation**: Numbers count up from 0 when visible (e.g., "50+ Sites Launched", "99.9% Uptime", "100% NZ Based")
6. **Card hover glow**: Cards emit soft cyan glow border on hover
7. **Staggered reveals**: Multiple cards animate in sequence with 100ms delay between each
8. **Smooth scroll**: `scroll-behavior: smooth` on html

---

## PAGES TO BUILD (7 + 404)

### Shared Layout (`src/layouts/BaseLayout.astro`)
- Full HTML document with SEO meta tags (title, description, Open Graph, Twitter cards)
- Google Fonts link for Space Grotesk + Inter
- Global CSS import
- Header component
- `<slot />` for page content
- Footer component
- Scroll animation initialization script (IntersectionObserver)
- LocalBusiness JSON-LD structured data

### Header (`src/components/layout/Header.astro`)
- Fixed/sticky top, glass background (blur + semi-transparent)
- Logo: "SiteGenius" text in Space Grotesk with a small cyan lightning bolt or code bracket icon (use SVG inline or emoji alternative ⚡)
- Nav links: Home, Services, Pricing, Portfolio, About, Contact
- "Get a Quote" CTA button (primary style, smaller)
- Mobile hamburger menu that opens a full-screen overlay nav
- Active page indicator (cyan underline)
- Header becomes more opaque on scroll

### Footer (`src/components/layout/Footer.astro`)
- Dark bg (space-800)
- 4-column grid: Company (logo + tagline), Quick Links, Services, Contact Info
- Social media icon links (placeholder hrefs)
- Bottom bar: "© 2026 SiteGenius. All rights reserved." + "Based in New Zealand 🇳🇿"
- Subtle top border gradient line (cyan to purple)

---

### PAGE 1: Home (`src/pages/index.astro`)

**Hero Section**
- Full viewport height (min-h-screen), grid background overlay
- Animated gradient mesh blob in background (CSS radial gradients or pseudo-elements with blur, slowly animating position)
- Small badge/pill at top: "🚀 NZ's Smartest Web Design" with glass style
- Main headline: `Websites That Work` (line break) `As Hard As You Do`
- Subtitle with typing effect: "We build websites for " + rotating words ["plumbers", "cafes", "mechanics", "florists", "builders", "salons"] in neon-cyan color
- Paragraph: "Professional, lightning-fast websites for New Zealand businesses. No jargon. No nonsense. Just results."
- Two CTAs: "Get a Free Quote" (primary) | "See Our Work" (secondary, links to /portfolio)
- Stats bar below hero or at bottom: "50+ Sites Launched" | "99.9% Uptime" | "100% NZ Based" with counter animation

**Services Overview Section**
- Section heading: "What We Do" with gradient underline
- 4 cards in a grid (2x2 on desktop, 1 column mobile):
  1. **Web Design & Development** — icon: code brackets `</>`, description, "Learn More →" link
  2. **Web Hosting** — icon: server/cloud, description, "Learn More →"
  3. **Business Email** — icon: mail, description, "Learn More →"
  4. **Website Care Plans** — icon: shield, description, "Learn More →"
- Each card: glass style, icon with cyan accent, hover glow effect
- Staggered scroll reveal

**How We Work Section**
- Heading: "Simple Process, Stunning Results"
- 4-step horizontal timeline (vertical on mobile):
  1. "Chat" — We learn about your business
  2. "Design" — We create your dream website
  3. "Build" — We bring it to life
  4. "Launch" — You go live and grow
- Each step: numbered circle (gradient border), title, description
- Connecting line between steps (dashed, cyan)
- Scroll reveal animation

**Pricing Teaser Section**
- Heading: "Pricing That Makes Sense"
- Subheading: "Choose a one-time build or a monthly plan — whatever works for your business."
- Show 3 subscription plan cards (Basic $79/mo, Growth $149/mo, Premium $249/mo) — brief version with 3-4 key features each
- "Most Popular" badge on Growth plan
- CTA: "See All Pricing Options →" linking to /pricing
- Scroll reveal

**Testimonials Section**
- Heading: "What Our Clients Say"
- Carousel or grid of testimonial cards (show 3 at a time on desktop)
- Each card: star rating (5 yellow stars), quote text in italics, client name, business name, location
- Glass card style
- Testimonials data:
  - Sarah M., The Flower Shed, Hamilton: "SiteGenius made the whole process so easy. I had no idea where to start, and now I have a beautiful website that my customers love. Highly recommend!"
  - James R., AutoPro Workshop, Auckland: "As a fellow car guy, he just got it. The website looks mint and we've had heaps more enquiries since it went live. Top bloke to work with."
  - Priya K., Kiwi Legal Advisors, Wellington: "Professional, responsive, and delivered exactly what we needed. The website perfectly represents our brand and has helped us attract new clients."
  - Dave T., TradeForce Plumbing, Christchurch: "I was paying way too much for a rubbish website before. SiteGenius sorted me out with something that actually works. Worth every cent."

**CTA Banner Section**
- Full-width gradient background (subtle cyan-to-purple gradient or dark with gradient border top/bottom)
- Heading: "Ready to Get Online?"
- Subtext: "Let's build something your customers will love."
- CTA button: "Get Your Free Quote" (primary, large)

---

### PAGE 2: Services (`src/pages/services.astro`)

**Page Hero**
- Heading: "What We Do"
- Subtext: "Everything you need to get your business online and keep it running smoothly."
- Grid background

**Web Design & Development Section**
- Detailed description with icon
- What's included grid (6 items): Mobile-responsive design, SEO optimised from day one, Contact forms & enquiry systems, Google Analytics setup, Speed optimised for fast loading, Content management system
- Special callout: "We also work with automotive businesses — from panel beaters to car dealerships, we understand your industry." (with a subtle car icon)

**Web Hosting Section**
- Heading: "Reliable NZ Hosting"
- 3 hosting plan cards side by side:
  - Basic: $25/mo — 1 website, 2 GB storage, Free SSL, Daily backups, Email support
  - Business: $45/mo — 1 website, 5 GB storage, Free SSL, Daily backups, Staging environment, Priority support — "Popular" badge
  - Premium: $75/mo — Up to 3 websites, 10 GB storage, Free SSL, Daily backups, Staging environment, Priority phone support, Performance monitoring
- "All plans include SSL, daily backups, and 99.9% uptime guarantee"

**Business Email Section**
- Heading: "Professional Email"
- Subtext: "Look legit with you@yourbusiness.co.nz"
- 3 email plan cards:
  - Starter: $5/mo — 1 mailbox, 5 GB storage, Spam filtering, Webmail access, Mobile sync
  - Business: $15/mo — 5 mailboxes, 10 GB each, Advanced spam filtering, Webmail, Mobile & desktop sync, Shared contacts — "Popular" badge
  - Pro: $35/mo — 10 mailboxes, 25 GB each, Advanced spam filtering, Webmail, Mobile & desktop sync, Shared contacts & calendars, Priority support

**Website Care Plans Section**
- Heading: "Keep Your Site in Top Shape"
- 2 cards:
  - Basic Care: $49/mo — Security updates, Uptime monitoring, Monthly backups, Email support
  - Growth Care: $99/mo — Everything in Basic, Content updates (up to 2hrs/month), Monthly SEO reports, Priority support, Performance optimisation

**CTA Section**
- "Not sure what you need? We'll figure it out together."
- Button: "Book a Free Chat"

---

### PAGE 3: Pricing (`src/pages/pricing.astro`)

**Page Hero**
- Heading: "Simple, Honest Pricing"
- Subtext: "No hidden fees. No lock-in surprises. Just great websites."

**Monthly Subscription Plans Section** (featured/primary)
- Heading: "Monthly Plans" with a pill badge: "Recommended"
- Subtext: "No big upfront cost. Everything included. Cancel after 12 months anytime."
- 3 cards:
  - **Basic — $79/mo** (12-month minimum): 3-page website, Mobile-responsive design, Contact form, Basic SEO, Hosting included, SSL certificate, 1 content edit per month, Email support
  - **Growth — $149/mo** (12-month minimum, "Most Popular" badge): 5-page website, Custom responsive design, Blog / news section, Full SEO setup, Google Business setup, Hosting included, SSL certificate, 2 content edits per month, Priority support
  - **Premium — $249/mo** (12-month minimum): Custom design (up to 7 pages), Everything in Growth, E-commerce basics, Monthly performance reports, Priority phone support, Unlimited minor edits
- Note below: "All plans include hosting, SSL, and domain setup. 12-month minimum term, then month-to-month. Prices exclude GST."

**One-Time Website Packages Section**
- Heading: "Prefer to Pay Upfront?"
- Subtext: "One-time fee, your website forever. Hosting and maintenance charged separately."
- 3 cards:
  - **Starter — $499**: 1-page responsive website, Mobile-friendly design, Contact form, Basic SEO setup, 1 round of revisions, Google Analytics, 2-week turnaround
  - **Essential — $1,499** ("Most Popular"): 3–4 page website, Custom responsive design, Content management system, Contact & enquiry forms, Full SEO setup, Google Analytics & Search Console, 2 rounds of revisions, Social media integration, 3-week turnaround
  - **Professional — $2,499**: 5–7 page website, Everything in Essential, Blog / news section, Advanced SEO & schema markup, Speed & performance optimisation, 3 rounds of revisions, 1 month free hosting, Priority support for 30 days, 4-week turnaround
- Note: "Prices exclude GST. Hosting from $25/month extra."

**Custom Projects Section**
- Heading: "Need Something Bigger?"
- Paragraph about e-commerce, booking systems, custom features
- Large "Get a Custom Quote" button

**What's Always Included Section**
- 6-item icon grid: Mobile-Responsive, SSL Certificate, NZ Hosting, SEO Basics, Speed Optimised, Ongoing Support

**FAQ Section**
- Accordion-style (click to expand, one open at a time)
- Questions & answers:
  1. "How long does it take to build a website?" — "A Starter site typically takes about 2 weeks, an Essential site around 3 weeks, and a Professional site about 4 weeks. Custom projects vary — we'll give you a clear timeline upfront."
  2. "Do I own my website?" — "Yes, 100%. Once your website is built and paid for, it's yours. If you ever want to move it, we'll hand over all the files — no questions asked."
  3. "What about domain names?" — "We can help you register and set up your .co.nz or .com domain. Registration is typically around $30–$40 NZD per year."
  4. "Can I update the website myself?" — "For Essential and Professional packages, we include a CMS that lets you update text, images, and blog posts easily — no coding skills needed."
  5. "What if I need changes after launch?" — "Small tweaks? No worries. For ongoing updates, our Website Care Plans cover regular changes from just $49/month."
  6. "What's included in the monthly subscription plans?" — "Everything — website design, hosting, email, updates, and support — all for one predictable monthly payment. No large upfront cost."
  7. "Are prices GST inclusive?" — "All prices shown exclude GST. GST (15%) will be added to your invoice."
  8. "Do you work with automotive businesses?" — "Yes! We have a background in the automotive industry, so we understand mechanics, panel beaters, car dealerships, and auto parts businesses."
  9. "What happens after the 12-month subscription?" — "After 12 months, your plan continues month-to-month. You can cancel anytime with 30 days notice. Your website stays yours."

---

### PAGE 4: Portfolio (`src/pages/portfolio.astro`)

**Page Hero**
- Heading: "Our Work"
- Subtext: "A showcase of websites we've built for New Zealand businesses."

**Filter Bar**
- Horizontal pills/tabs: All | Automotive | Retail | Trade | Hospitality | Health | Professional
- Active filter has cyan bg

**Portfolio Grid**
- 6 project cards in 2x3 or 3x2 grid
- Each card:
  - Placeholder image area (create a colored gradient placeholder with the project initials — since we don't have real screenshots, make stylish SVG or CSS gradient placeholders with the project name)
  - Project title
  - Category badge
  - Short description
  - Tags as small pills
  - Hover: slight scale up, glow border
- Projects:
  1. AutoPro Workshop — Automotive — "Modern website for a local auto repair workshop with online booking and service listings." — Tags: Web Design, SEO, Booking System
  2. Bloom & Co Florist — Retail — "Elegant online presence for a boutique florist with a product gallery and contact form." — Tags: Web Design, Gallery, Mobile-First
  3. TradeForce Plumbing — Trade — "Professional site for a plumbing company with service areas and quote requests." — Tags: Web Design, Lead Generation, SEO
  4. The Daily Grind Cafe — Hospitality — "Warm cafe website featuring the menu, location, and online ordering info." — Tags: Web Design, Branding, Responsive
  5. Peak Fitness Gym — Health — "High-energy fitness website with class schedules and membership info." — Tags: Web Design, CMS, Performance
  6. Kiwi Legal Advisors — Professional — "Clean, trustworthy website for a law firm with practice areas and team profiles." — Tags: Web Design, SEO, Accessibility
- Note: These are example/placeholder projects. Make them look real and professional.

**CTA**
- "Want your business here? Let's make it happen."
- Button: "Start Your Project"

---

### PAGE 5: About (`src/pages/about.astro`)

**Page Hero**
- Heading: "The Person Behind the Pixels"
- Grid bg

**About Section**
- Two-column layout (image area left, text right)
- Left: Placeholder for owner photo (create a stylish gradient placeholder with initials or a silhouette icon)
- Right:
  - "Hey, I'm the person behind SiteGenius."
  - Story about combining IT/web skills with automotive background
  - "I started SiteGenius because I saw too many local businesses either paying way too much for a basic website, or struggling with DIY builders that never quite looked right."
  - "With a background in both the automotive industry and IT, I bring a unique perspective. I understand what it's like to run a hands-on business — and I know that your website should work as hard as you do."
  - "I use the latest AI-powered tools and modern web technologies to build websites faster and more affordably than traditional agencies — and I pass those savings directly on to you."
  - "Based in New Zealand, working with businesses across the country."

**Why Choose SiteGenius Section**
- Heading: "Why Work With Us?"
- 4 glass cards in a grid:
  1. "One Point of Contact" — "You deal directly with me. No account managers, no runarounds. Just straight-up honest communication."
  2. "NZ-Based Support" — "I'm right here in New Zealand. Same timezone, same understanding of local business."
  3. "Plain English" — "No jargon, no tech-speak. I explain everything in words that actually make sense."
  4. "Fair, Transparent Pricing" — "What you see is what you pay. No hidden fees, no surprise invoices."

**Skills / Tech Section**
- Heading: "Tools of the Trade"
- A row of tech/tool icons or badges (HTML5, CSS3, JavaScript, React, WordPress, Shopify, Google Analytics, Figma — use text badges with glass style, no need for actual logo images)

---

### PAGE 6: Contact (`src/pages/contact.astro`)

**Page Hero**
- Heading: "Let's Chat"
- Subtext: "Whether you need a website, hosting, or just want to pick our brain — we're here."

**Two-Column Layout**
- Left column: Contact form
  - Fields: Name (text), Email (email), Phone (tel, optional), Subject (select: General Enquiry, New Website, Hosting, Email, Website Care, Other), Message (textarea)
  - Submit button (primary)
  - Form submits to Web3Forms (use hidden input with access key placeholder)
  - Success/error states
- Right column:
  - Email: hello@sitegenius.co.nz (with mail icon)
  - Phone: placeholder number
  - Location: "New Zealand 🇳🇿"
  - Response time: "We typically reply within a few hours"
  - Social links (placeholder): Facebook, Instagram, LinkedIn icons

---

### PAGE 7: Get a Quote (`src/pages/get-a-quote.astro`)

**Page Hero**
- Heading: "Tell Us About Your Project"
- Subtext: "Fill out the form below and we'll get back to you within 24 hours with a free, no-obligation quote."

**Multi-Step Quote Form (React component)**
- Progress bar at top showing current step (4 steps)
- Animated transitions between steps (slide/fade)

- **Step 1 — Your Details**: Name, Email, Phone, Business Name
- **Step 2 — Project Type**: Radio buttons — New Website, Website Redesign, E-commerce, Monthly Subscription Plan, Hosting & Email, Other
- **Step 3 — Requirements**:
  - How many pages? (dropdown: 1, 2-4, 5-7, 8+, Not Sure)
  - Features needed (checkboxes): Contact Form, Photo Gallery, Blog, Online Booking, E-commerce, Social Media Integration, SEO, Other
  - Do you have an existing website? (text input for URL, optional)
  - Budget range (dropdown): Under $500, $500-$1,500, $1,500-$3,000, $3,000+, Monthly subscription preferred, Not sure yet
  - Timeline (dropdown): ASAP, 2-4 weeks, 1-2 months, No rush, Just exploring
- **Step 4 — Anything Else**: Free text textarea, "Tell us anything else about your project"
- Submit button on last step
- Form submits to Web3Forms

---

### PAGE 8: 404 (`src/pages/404.astro`)

- Centered content, full viewport
- Large "404" text with glitch animation effect (CSS text-shadow trick with cyan and purple offset, animating)
- Subtitle: "This page got lost in cyberspace"
- Paragraph: "Looks like you've taken a wrong turn. Let's get you back on track."
- Button: "Take Me Home" (primary, links to /)
- Grid background
- Maybe a subtle floating animation on the 404 text

---

## IMPORTANT IMPLEMENTATION NOTES

1. **All prices are in NZD and exclude GST** — make this clear wherever prices appear
2. **The site must be fully responsive** — mobile-first approach, looks perfect on phones, tablets, and desktops
3. **Performance matters** — this is a web design business, so the site itself must score 90+ on Lighthouse. Minimize JS, optimize images, use proper semantic HTML
4. **SEO** — every page needs unique title, meta description, Open Graph tags. Add LocalBusiness JSON-LD structured data
5. **Accessibility** — proper heading hierarchy, alt text, keyboard navigation, sufficient contrast ratios
6. **The testimonials and portfolio are placeholder/example data** — make them look realistic but they'll be replaced with real content later
7. **Forms**: Use Web3Forms with a hidden access key input. The key will be replaced later. Show success/error states after submission
8. **No real images needed** — create beautiful CSS gradient placeholders, SVG patterns, or use CSS art for portfolio thumbnails and profile images. The site should look stunning even without photographs
9. **Mobile menu**: Hamburger icon that opens a full-screen overlay with nav links, smooth animation
10. **Scroll animations**: Use IntersectionObserver API to add a `.visible` class to `.animate-on-scroll` elements when they enter the viewport with a threshold of 0.1

## FILE STRUCTURE

```
src/
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── GlassCard.astro
│   │   ├── PricingCard.astro
│   │   ├── ServiceCard.astro
│   │   ├── TestimonialCard.astro
│   │   ├── PortfolioCard.astro
│   │   └── FAQItem.astro
│   └── sections/
│       ├── Hero.astro
│       ├── ServicesOverview.astro
│       ├── Process.astro
│       ├── PricingTeaser.astro
│       ├── Testimonials.astro
│       └── CTABanner.astro
├── pages/
│   ├── index.astro
│   ├── services.astro
│   ├── pricing.astro
│   ├── portfolio.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── get-a-quote.astro
│   └── 404.astro
├── styles/
│   └── global.css
└── data/
    ├── services.ts
    ├── pricing.ts
    ├── portfolio.ts
    ├── testimonials.ts
    └── faq.ts
```

Build everything. Make it beautiful. Make it fast. Make it look like a $10,000 agency built it.
