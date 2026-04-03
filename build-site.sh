#!/bin/bash
# SiteGenius.co.nz — Full Site Generator
set -e

BASE="/Users/mandeep/Downloads/Projects/WebWorks"
cd "$BASE"

# ─── Global CSS ───
cat > src/styles/global.css << 'CSSEOF'
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { @apply bg-space-900 text-muted-100 font-body; overflow-x: hidden; }
  h1,h2,h3,h4,h5,h6 { @apply font-heading font-bold; }
  ::selection { background: rgba(0,229,255,0.2); color: #F0F0F5; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { @apply bg-space-900; }
  ::-webkit-scrollbar-thumb { @apply bg-space-600 rounded-full; }
  ::-webkit-scrollbar-thumb:hover { @apply bg-neon-glow; }
}
@layer components {
  .glass { @apply bg-space-700/50 backdrop-blur-xl border border-white/5 rounded-xl; }
  .glass-hover { @apply glass transition-all duration-300; }
  .glass-hover:hover { @apply border-neon-cyan/20 shadow-glow; }
  .gradient-text { @apply bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent; }
  .btn-primary { @apply relative inline-flex items-center justify-center px-8 py-4 font-heading font-semibold text-space-900 bg-neon-cyan rounded-lg transition-all duration-300 hover:shadow-glow-strong hover:scale-105; }
  .btn-secondary { @apply inline-flex items-center justify-center px-8 py-4 font-heading font-semibold text-neon-cyan border border-neon-cyan/30 rounded-lg transition-all duration-300 hover:border-neon-cyan/60 hover:bg-neon-cyan/10 hover:shadow-glow; }
  .section-padding { @apply py-20 md:py-28 lg:py-32; }
  .container-custom { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
  .grid-bg {
    background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .animate-on-scroll { opacity:0; transform:translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .animate-on-scroll.visible { opacity:1; transform:translateY(0); }
}
CSSEOF

# ─── Base Layout ───
cat > src/layouts/BaseLayout.astro << 'EOF'
---
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props { title: string; description?: string; }
const { title, description = "Professional web design for New Zealand businesses. Fast, affordable websites from $79/month." } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href={canonicalURL} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>{title}</title>
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SiteGenius",
    "url": "https://sitegenius.co.nz",
    "description": description,
    "address": { "@type": "PostalAddress", "addressCountry": "NZ" },
    "priceRange": "$$"
  })} />
</head>
<body class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1"><slot /></main>
  <Footer />
  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  </script>
</body>
</html>
EOF

# ─── Header ───
mkdir -p src/components/layout src/components/ui src/components/sections
cat > src/components/layout/Header.astro << 'EOF'
---
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
const currentPath = Astro.url.pathname;
---
<header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="container-custom">
    <nav class="flex items-center justify-between h-20">
      <a href="/" class="flex items-center gap-2 group">
        <span class="text-2xl">⚡</span>
        <span class="text-xl font-heading font-bold text-muted-100 group-hover:text-neon-cyan transition-colors">SiteGenius</span>
      </a>
      <div class="hidden md:flex items-center gap-8">
        {navLinks.map(link => (
          <a href={link.href} class={`text-sm font-medium transition-colors hover:text-neon-cyan ${currentPath === link.href ? 'text-neon-cyan' : 'text-muted-200'}`}>{link.name}</a>
        ))}
        <a href="/get-a-quote" class="btn-primary !px-6 !py-2.5 text-sm">Get a Quote</a>
      </div>
      <button id="menu-toggle" class="md:hidden text-muted-100 hover:text-neon-cyan transition-colors" aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </nav>
  </div>
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="fixed inset-0 bg-space-900/95 backdrop-blur-xl z-50 hidden flex-col items-center justify-center gap-8">
    <button id="menu-close" class="absolute top-6 right-6 text-muted-100 hover:text-neon-cyan" aria-label="Close">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    {navLinks.map(link => (
      <a href={link.href} class="text-2xl font-heading font-semibold text-muted-100 hover:text-neon-cyan transition-colors">{link.name}</a>
    ))}
    <a href="/get-a-quote" class="btn-primary text-lg mt-4">Get a Quote</a>
  </div>
</header>
<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('menu-close');
  const header = document.getElementById('header');
  toggle?.addEventListener('click', () => menu?.classList.replace('hidden','flex'));
  close?.addEventListener('click', () => menu?.classList.replace('flex','hidden'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu?.classList.replace('flex','hidden')));
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { header?.classList.add('bg-space-900/80','backdrop-blur-xl','border-b','border-white/5'); }
    else { header?.classList.remove('bg-space-900/80','backdrop-blur-xl','border-b','border-white/5'); }
  });
</script>
EOF

# ─── Footer ───
cat > src/components/layout/Footer.astro << 'EOF'
<footer class="bg-space-800 border-t border-white/5">
  <div class="h-px bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan"></div>
  <div class="container-custom py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <a href="/" class="flex items-center gap-2 mb-4">
          <span class="text-2xl">⚡</span>
          <span class="text-xl font-heading font-bold">SiteGenius</span>
        </a>
        <p class="text-muted-200 text-sm leading-relaxed">Professional web design for New Zealand businesses. Fast, affordable, and built to perform.</p>
      </div>
      <div>
        <h4 class="text-sm font-heading font-semibold text-muted-100 uppercase tracking-wider mb-4">Quick Links</h4>
        <div class="flex flex-col gap-2">
          {['Home:/', 'Services:/services', 'Pricing:/pricing', 'Portfolio:/portfolio', 'About:/about'].map(l => {
            const [name, href] = l.split(':');
            return <a href={href} class="text-sm text-muted-200 hover:text-neon-cyan transition-colors">{name}</a>;
          })}
        </div>
      </div>
      <div>
        <h4 class="text-sm font-heading font-semibold text-muted-100 uppercase tracking-wider mb-4">Services</h4>
        <div class="flex flex-col gap-2">
          {['Web Design', 'Web Hosting', 'Business Email', 'Website Care Plans'].map(s => (
            <a href="/services" class="text-sm text-muted-200 hover:text-neon-cyan transition-colors">{s}</a>
          ))}
        </div>
      </div>
      <div>
        <h4 class="text-sm font-heading font-semibold text-muted-100 uppercase tracking-wider mb-4">Get in Touch</h4>
        <div class="flex flex-col gap-2 text-sm text-muted-200">
          <a href="mailto:hello@sitegenius.co.nz" class="hover:text-neon-cyan transition-colors">hello@sitegenius.co.nz</a>
          <p>New Zealand 🇳🇿</p>
          <div class="flex gap-4 mt-2">
            {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
              <a href="#" class="text-muted-300 hover:text-neon-cyan transition-colors text-xs">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-muted-300">&copy; 2026 SiteGenius. All rights reserved.</p>
      <p class="text-sm text-muted-300">Based in New Zealand 🇳🇿</p>
    </div>
  </div>
</footer>
EOF

# ─── UI Components ───
cat > src/components/ui/GlassCard.astro << 'EOF'
---
interface Props { class?: string; hover?: boolean; }
const { class: cls = '', hover = true } = Astro.props;
---
<div class={`${hover ? 'glass-hover' : 'glass'} rounded-xl p-6 ${cls}`}>
  <slot />
</div>
EOF

cat > src/components/ui/PricingCard.astro << 'EOF'
---
interface Props { name: string; price: string; period?: string; description: string; features: string[]; popular?: boolean; cta: string; ctaLink: string; }
const { name, price, period = '', description, features, popular = false, cta, ctaLink } = Astro.props;
---
<div class={`glass rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:border-neon-cyan/20 hover:shadow-glow ${popular ? 'border-neon-cyan/30 shadow-glow ring-1 ring-neon-cyan/20' : ''}`}>
  {popular && <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-neon-purple text-space-900 text-xs font-heading font-bold px-4 py-1 rounded-full">Most Popular</div>}
  <h3 class="text-xl font-heading font-bold text-muted-100">{name}</h3>
  <div class="mt-4 mb-2">
    <span class="text-4xl font-heading font-bold gradient-text">{price}</span>
    {period && <span class="text-muted-300 text-sm">{period}</span>}
  </div>
  <p class="text-muted-200 text-sm mb-6">{description}</p>
  <ul class="flex-1 space-y-3 mb-8">
    {features.map(f => (
      <li class="flex items-start gap-2 text-sm text-muted-200">
        <svg class="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        {f}
      </li>
    ))}
  </ul>
  <a href={ctaLink} class={popular ? 'btn-primary text-center' : 'btn-secondary text-center'}>{cta}</a>
</div>
EOF

cat > src/components/ui/ServiceCard.astro << 'EOF'
---
interface Props { title: string; description: string; icon: string; }
const { title, description, icon } = Astro.props;
const icons: Record<string, string> = {
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  server: 'M5 12H3m18 0h-2M5 12a7 7 0 0114 0M5 12a7 7 0 0014 0M12 5V3m0 18v-2',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
};
---
<div class="glass-hover rounded-xl p-8 group">
  <div class="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-5 group-hover:bg-neon-cyan/20 transition-colors">
    <svg class="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={icons[icon] || icons.code}/></svg>
  </div>
  <h3 class="text-lg font-heading font-bold text-muted-100 mb-2">{title}</h3>
  <p class="text-muted-200 text-sm leading-relaxed mb-4">{description}</p>
  <a href="/services" class="text-neon-cyan text-sm font-medium hover:text-neon-teal transition-colors">Learn More →</a>
</div>
EOF

cat > src/components/ui/TestimonialCard.astro << 'EOF'
---
interface Props { name: string; business: string; location: string; quote: string; rating: number; }
const { name, business, location, quote, rating } = Astro.props;
---
<div class="glass rounded-xl p-8">
  <div class="flex gap-1 mb-4">
    {Array.from({length: rating}).map(() => <span class="text-yellow-400">★</span>)}
  </div>
  <p class="text-muted-200 italic leading-relaxed mb-6">"{quote}"</p>
  <div>
    <p class="font-heading font-semibold text-muted-100">{name}</p>
    <p class="text-sm text-muted-300">{business}, {location}</p>
  </div>
</div>
EOF

cat > src/components/ui/PortfolioCard.astro << 'EOF'
---
interface Props { title: string; category: string; description: string; tags: string[]; gradient: string; }
const { title, category, description, tags, gradient } = Astro.props;
---
<div class="glass-hover rounded-xl overflow-hidden group">
  <div class={`h-48 ${gradient} flex items-center justify-center relative overflow-hidden`}>
    <span class="text-4xl font-heading font-bold text-white/20 group-hover:text-white/30 transition-colors">{title.split(' ').map(w => w[0]).join('')}</span>
    <div class="absolute inset-0 bg-space-900/0 group-hover:bg-space-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
      <span class="text-sm font-heading font-semibold text-white">View Project</span>
    </div>
  </div>
  <div class="p-6">
    <span class="text-xs font-medium text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded-full">{category}</span>
    <h3 class="text-lg font-heading font-bold text-muted-100 mt-3 mb-2">{title}</h3>
    <p class="text-sm text-muted-200 leading-relaxed mb-4">{description}</p>
    <div class="flex flex-wrap gap-2">
      {tags.map(t => <span class="text-xs text-muted-300 bg-space-600/50 px-2 py-1 rounded">{t}</span>)}
    </div>
  </div>
</div>
EOF

cat > src/components/ui/FAQItem.astro << 'EOF'
---
interface Props { question: string; answer: string; }
const { question, answer } = Astro.props;
const id = question.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
---
<div class="border-b border-white/5">
  <button class="faq-toggle w-full flex items-center justify-between py-5 text-left group" data-target={id}>
    <span class="font-heading font-semibold text-muted-100 group-hover:text-neon-cyan transition-colors pr-4">{question}</span>
    <svg class="w-5 h-5 text-muted-300 transition-transform faq-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
  </button>
  <div id={id} class="faq-content hidden pb-5">
    <p class="text-muted-200 text-sm leading-relaxed">{answer}</p>
  </div>
</div>
EOF

# ─── HOME PAGE ───
cat > src/pages/index.astro << 'HOMEEOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ServiceCard from '../components/ui/ServiceCard.astro';
import PricingCard from '../components/ui/PricingCard.astro';
import TestimonialCard from '../components/ui/TestimonialCard.astro';
---
<BaseLayout title="SiteGenius — Web Design for NZ Businesses">
  <!-- Hero -->
  <section class="relative min-h-screen flex items-center grid-bg overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[128px] animate-pulse"></div>
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px] animate-pulse" style="animation-delay:1s"></div>
    </div>
    <div class="container-custom relative z-10 pt-32 pb-20">
      <div class="max-w-3xl">
        <div class="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span>🚀</span>
          <span class="text-sm text-muted-200">NZ's Smartest Web Design</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 animate-slide-up">
          Websites That Work<br/><span class="gradient-text">As Hard As You Do</span>
        </h1>
        <p class="text-lg md:text-xl text-muted-200 mb-4 animate-slide-up" style="animation-delay:0.2s">
          We build websites for <span id="typed-text" class="text-neon-cyan font-semibold">local businesses</span>
        </p>
        <p class="text-muted-200 mb-8 max-w-xl animate-slide-up" style="animation-delay:0.3s">Professional, lightning-fast websites for New Zealand businesses. No jargon. No nonsense. Just results.</p>
        <div class="flex flex-col sm:flex-row gap-4 animate-slide-up" style="animation-delay:0.4s">
          <a href="/get-a-quote" class="btn-primary">Get a Free Quote</a>
          <a href="/portfolio" class="btn-secondary">See Our Work</a>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-8 mt-20 max-w-2xl animate-slide-up" style="animation-delay:0.6s">
        <div class="text-center"><p class="text-3xl font-heading font-bold gradient-text counter" data-target="50">0</p><p class="text-sm text-muted-300 mt-1">Sites Launched</p></div>
        <div class="text-center"><p class="text-3xl font-heading font-bold gradient-text">99.9%</p><p class="text-sm text-muted-300 mt-1">Uptime</p></div>
        <div class="text-center"><p class="text-3xl font-heading font-bold gradient-text">100%</p><p class="text-sm text-muted-300 mt-1">NZ Based</p></div>
      </div>
    </div>
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-muted-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
    </div>
  </section>

  <!-- Services -->
  <section class="section-padding">
    <div class="container-custom">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">What We <span class="gradient-text">Do</span></h2>
        <p class="text-muted-200 max-w-2xl mx-auto">Everything you need to get your business online and keep it running smoothly.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="animate-on-scroll"><ServiceCard title="Web Design & Development" description="Beautiful, fast websites built to turn visitors into customers." icon="code" /></div>
        <div class="animate-on-scroll"><ServiceCard title="Web Hosting" description="Reliable NZ-based hosting. We handle the tech, you run your business." icon="server" /></div>
        <div class="animate-on-scroll"><ServiceCard title="Business Email" description="Professional email with your domain. Look legit from day one." icon="mail" /></div>
        <div class="animate-on-scroll"><ServiceCard title="Website Care Plans" description="Keep your site secure, updated, and running at peak performance." icon="shield" /></div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">Simple Process, <span class="gradient-text">Stunning Results</span></h2>
      </div>
      <div class="grid md:grid-cols-4 gap-8">
        {[
          { step: '01', title: 'Chat', desc: 'We learn about your business and what you need.' },
          { step: '02', title: 'Design', desc: 'We create your dream website layout and look.' },
          { step: '03', title: 'Build', desc: 'We bring the design to life with clean code.' },
          { step: '04', title: 'Launch', desc: 'You go live and start getting customers.' },
        ].map(item => (
          <div class="text-center animate-on-scroll">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/20 flex items-center justify-center mx-auto mb-4">
              <span class="text-lg font-heading font-bold gradient-text">{item.step}</span>
            </div>
            <h3 class="text-lg font-heading font-bold text-muted-100 mb-2">{item.title}</h3>
            <p class="text-sm text-muted-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Pricing Teaser -->
  <section class="section-padding">
    <div class="container-custom">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">Pricing That <span class="gradient-text">Makes Sense</span></h2>
        <p class="text-muted-200 max-w-2xl mx-auto">Choose a one-time build or a monthly plan — whatever works for your business.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="animate-on-scroll"><PricingCard name="Basic" price="$79" period="/month" description="Get online with a professional 3-page site." features={['3-page website', 'Hosting included', 'SSL certificate', '1 edit/month']} cta="Get Started" ctaLink="/get-a-quote" /></div>
        <div class="animate-on-scroll"><PricingCard name="Growth" price="$149" period="/month" description="The full package for growing businesses." features={['5-page website', 'Blog & SEO', 'Hosting included', '2 edits/month']} popular={true} cta="Get Started" ctaLink="/get-a-quote" /></div>
        <div class="animate-on-scroll"><PricingCard name="Premium" price="$249" period="/month" description="Custom design with all the extras." features={['Up to 7 pages', 'E-commerce ready', 'Priority support', 'Unlimited edits']} cta="Get Started" ctaLink="/get-a-quote" /></div>
      </div>
      <div class="text-center mt-8 animate-on-scroll">
        <p class="text-sm text-muted-300 mb-4">12-month minimum. Prices excl. GST.</p>
        <a href="/pricing" class="text-neon-cyan hover:text-neon-teal transition-colors font-medium">See All Pricing Options →</a>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">What Our <span class="gradient-text">Clients Say</span></h2>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="animate-on-scroll"><TestimonialCard name="Sarah M." business="The Flower Shed" location="Hamilton" quote="SiteGenius made the whole process so easy. I had no idea where to start, and now I have a beautiful website that my customers love." rating={5} /></div>
        <div class="animate-on-scroll"><TestimonialCard name="James R." business="AutoPro Workshop" location="Auckland" quote="As a fellow car guy, he just got it. The website looks mint and we've had heaps more enquiries since it went live." rating={5} /></div>
        <div class="animate-on-scroll"><TestimonialCard name="Priya K." business="Kiwi Legal Advisors" location="Wellington" quote="Professional, responsive, and delivered exactly what we needed. The website perfectly represents our brand." rating={5} /></div>
        <div class="animate-on-scroll"><TestimonialCard name="Dave T." business="TradeForce Plumbing" location="Christchurch" quote="I was paying way too much for a rubbish website before. SiteGenius sorted me out with something that actually works." rating={5} /></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5"></div>
    <div class="container-custom relative z-10 text-center">
      <h2 class="text-3xl md:text-5xl font-heading font-bold mb-6 animate-on-scroll">Ready to <span class="gradient-text">Get Online?</span></h2>
      <p class="text-xl text-muted-200 mb-8 animate-on-scroll">Let's build something your customers will love.</p>
      <div class="animate-on-scroll"><a href="/get-a-quote" class="btn-primary text-lg">Get Your Free Quote</a></div>
    </div>
  </section>
</BaseLayout>

<script>
  // Typing effect
  const words = ['plumbers', 'cafes', 'mechanics', 'florists', 'builders', 'salons', 'tradies', 'restaurants'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  const el = document.getElementById('typed-text');
  function type() {
    if (!el) return;
    const word = words[wordIndex];
    el.textContent = isDeleting ? word.substring(0, charIndex--) : word.substring(0, charIndex++);
    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex > word.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIndex < 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 300; }
    setTimeout(type, delay);
  }
  type();

  // Counter animation
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || '0');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = target / 40;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { counter.textContent = target + '+'; clearInterval(timer); }
            else { counter.textContent = Math.floor(current) + '+'; }
          }, 40);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(counter);
  });
</script>
HOMEEOF

# ─── SERVICES PAGE ───
cat > src/pages/services.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PricingCard from '../components/ui/PricingCard.astro';
---
<BaseLayout title="Services — SiteGenius" description="Web design, hosting, email, and website care plans for NZ businesses.">
  <section class="pt-32 pb-16 grid-bg">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-up">What We <span class="gradient-text">Do</span></h1>
      <p class="text-xl text-muted-200 max-w-2xl animate-slide-up" style="animation-delay:0.1s">Everything you need to get your business online and keep it running smoothly.</p>
    </div>
  </section>

  <!-- Web Design -->
  <section class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="animate-on-scroll">
          <div class="w-14 h-14 rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
          </div>
          <h2 class="text-3xl font-heading font-bold mb-4">Web Design & <span class="gradient-text">Development</span></h2>
          <p class="text-muted-200 leading-relaxed mb-6">Beautiful, fast websites built to turn visitors into customers. We handle everything from design to deployment.</p>
          <div class="glass rounded-xl p-4 inline-flex items-center gap-3 mb-6">
            <span class="text-2xl">🚗</span>
            <p class="text-sm text-muted-200"><strong class="text-muted-100">Automotive specialists</strong> — panel beaters, mechanics, dealerships. We understand your industry.</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 animate-on-scroll">
          {['Mobile-responsive design', 'SEO optimised from day one', 'Contact forms & enquiries', 'Google Analytics setup', 'Speed optimised', 'Content management'].map(f => (
            <div class="glass rounded-lg p-4 flex items-start gap-3">
              <svg class="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-sm text-muted-200">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <!-- Hosting -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <div class="text-center mb-12 animate-on-scroll">
        <h2 class="text-3xl font-heading font-bold mb-4">Reliable <span class="gradient-text">NZ Hosting</span></h2>
        <p class="text-muted-200">All plans include SSL, daily backups, and 99.9% uptime guarantee.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="animate-on-scroll"><PricingCard name="Basic" price="$25" period="/month" description="Simple hosting for a single website." features={['1 website', '2 GB storage', 'Free SSL', 'Daily backups', 'Email support']} cta="Choose Plan" ctaLink="/contact" /></div>
        <div class="animate-on-scroll"><PricingCard name="Business" price="$45" period="/month" description="More power for growing businesses." features={['1 website', '5 GB storage', 'Free SSL', 'Daily backups', 'Staging environment', 'Priority support']} popular={true} cta="Choose Plan" ctaLink="/contact" /></div>
        <div class="animate-on-scroll"><PricingCard name="Premium" price="$75" period="/month" description="Top-tier hosting with all extras." features={['Up to 3 websites', '10 GB storage', 'Free SSL', 'Daily backups', 'Staging environment', 'Phone support', 'Performance monitoring']} cta="Choose Plan" ctaLink="/contact" /></div>
      </div>
    </div>
  </section>

  <!-- Email -->
  <section class="section-padding">
    <div class="container-custom">
      <div class="text-center mb-12 animate-on-scroll">
        <h2 class="text-3xl font-heading font-bold mb-4">Professional <span class="gradient-text">Email</span></h2>
        <p class="text-muted-200">Look legit with you@yourbusiness.co.nz</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="animate-on-scroll"><PricingCard name="Starter" price="$5" period="/month" description="One professional email address." features={['1 mailbox', '5 GB storage', 'Spam filtering', 'Webmail access', 'Mobile sync']} cta="Choose Plan" ctaLink="/contact" /></div>
        <div class="animate-on-scroll"><PricingCard name="Business" price="$15" period="/month" description="Multiple mailboxes for your team." features={['5 mailboxes', '10 GB each', 'Advanced spam filtering', 'Webmail access', 'Mobile & desktop sync', 'Shared contacts']} popular={true} cta="Choose Plan" ctaLink="/contact" /></div>
        <div class="animate-on-scroll"><PricingCard name="Pro" price="$35" period="/month" description="Enterprise-grade email." features={['10 mailboxes', '25 GB each', 'Advanced spam filtering', 'Webmail access', 'Mobile & desktop sync', 'Shared contacts & calendars', 'Priority support']} cta="Choose Plan" ctaLink="/contact" /></div>
      </div>
    </div>
  </section>

  <!-- Care Plans -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <div class="text-center mb-12 animate-on-scroll">
        <h2 class="text-3xl font-heading font-bold mb-4">Website <span class="gradient-text">Care Plans</span></h2>
        <p class="text-muted-200">Keep your site secure, updated, and running at peak performance.</p>
      </div>
      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div class="animate-on-scroll"><PricingCard name="Basic Care" price="$49" period="/month" description="Essential maintenance and monitoring." features={['Security updates', 'Uptime monitoring', 'Monthly backups', 'Email support']} cta="Choose Plan" ctaLink="/contact" /></div>
        <div class="animate-on-scroll"><PricingCard name="Growth Care" price="$99" period="/month" description="Full maintenance with content updates." features={['Everything in Basic', 'Content updates (2hrs/mo)', 'Monthly SEO reports', 'Priority support', 'Performance optimisation']} popular={true} cta="Choose Plan" ctaLink="/contact" /></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section-padding">
    <div class="container-custom text-center">
      <h2 class="text-3xl font-heading font-bold mb-4 animate-on-scroll">Not sure what you need?</h2>
      <p class="text-xl text-muted-200 mb-8 animate-on-scroll">We'll figure it out together.</p>
      <div class="animate-on-scroll"><a href="/contact" class="btn-primary text-lg">Book a Free Chat</a></div>
    </div>
  </section>
</BaseLayout>
EOF

# ─── PRICING PAGE ───
cat > src/pages/pricing.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PricingCard from '../components/ui/PricingCard.astro';
import FAQItem from '../components/ui/FAQItem.astro';
---
<BaseLayout title="Pricing — SiteGenius" description="Simple, honest pricing for NZ web design. Monthly plans from $79/mo or one-time from $499.">
  <section class="pt-32 pb-16 grid-bg">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-up">Simple, Honest <span class="gradient-text">Pricing</span></h1>
      <p class="text-xl text-muted-200 max-w-2xl animate-slide-up" style="animation-delay:0.1s">No hidden fees. No lock-in surprises. Just great websites.</p>
    </div>
  </section>

  <!-- Monthly Subscriptions -->
  <section class="section-padding">
    <div class="container-custom">
      <div class="text-center mb-12 animate-on-scroll">
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/20 rounded-full px-4 py-1.5 mb-4">
          <span class="text-sm font-heading font-semibold gradient-text">Recommended</span>
        </div>
        <h2 class="text-3xl font-heading font-bold mb-4">Monthly <span class="gradient-text">Plans</span></h2>
        <p class="text-muted-200 max-w-2xl mx-auto">No big upfront cost. Everything included. Cancel after 12 months anytime.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="animate-on-scroll"><PricingCard name="Basic" price="$79" period="/month" description="Get online with a professional 3-page site." features={['3-page website', 'Mobile-responsive design', 'Contact form', 'Basic SEO', 'Hosting included', 'SSL certificate', '1 content edit/month', 'Email support']} cta="Get Started" ctaLink="/get-a-quote" /></div>
        <div class="animate-on-scroll"><PricingCard name="Growth" price="$149" period="/month" description="The full package for growing businesses." features={['5-page website', 'Custom responsive design', 'Blog / news section', 'Full SEO setup', 'Google Business setup', 'Hosting included', 'SSL certificate', '2 content edits/month', 'Priority support']} popular={true} cta="Get Started" ctaLink="/get-a-quote" /></div>
        <div class="animate-on-scroll"><PricingCard name="Premium" price="$249" period="/month" description="Custom design with all the extras." features={['Custom design (up to 7 pages)', 'Everything in Growth', 'E-commerce basics', 'Monthly performance reports', 'Priority phone support', 'Unlimited minor edits']} cta="Get Started" ctaLink="/get-a-quote" /></div>
      </div>
      <p class="text-center text-sm text-muted-300 mt-8 animate-on-scroll">12-month minimum term, then month-to-month. Prices exclude GST.</p>
    </div>
  </section>

  <!-- One-Time -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <div class="text-center mb-12 animate-on-scroll">
        <h2 class="text-3xl font-heading font-bold mb-4">Prefer to <span class="gradient-text">Pay Upfront?</span></h2>
        <p class="text-muted-200 max-w-2xl mx-auto">One-time fee, your website forever. Hosting and maintenance charged separately.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="animate-on-scroll"><PricingCard name="Starter" price="$499" description="Quick one-page site to get you online." features={['1-page responsive website', 'Mobile-friendly design', 'Contact form', 'Basic SEO setup', '1 round of revisions', 'Google Analytics', '2-week turnaround']} cta="Get Started" ctaLink="/get-a-quote" /></div>
        <div class="animate-on-scroll"><PricingCard name="Essential" price="$1,499" description="Full small business website." features={['3–4 page website', 'Custom responsive design', 'Content management system', 'Contact & enquiry forms', 'Full SEO setup', 'Google Analytics & Search Console', '2 rounds of revisions', 'Social media integration', '3-week turnaround']} popular={true} cta="Get Started" ctaLink="/get-a-quote" /></div>
        <div class="animate-on-scroll"><PricingCard name="Professional" price="$2,499" description="Bigger site with advanced features." features={['5–7 page website', 'Everything in Essential', 'Blog / news section', 'Advanced SEO & schema markup', 'Speed optimisation', '3 rounds of revisions', '1 month free hosting', 'Priority support (30 days)', '4-week turnaround']} cta="Get Started" ctaLink="/get-a-quote" /></div>
      </div>
      <p class="text-center text-sm text-muted-300 mt-8 animate-on-scroll">Prices exclude GST. Hosting from $25/month extra.</p>
    </div>
  </section>

  <!-- Custom -->
  <section class="section-padding">
    <div class="container-custom text-center">
      <div class="glass rounded-2xl p-12 max-w-3xl mx-auto animate-on-scroll">
        <h2 class="text-3xl font-heading font-bold mb-4">Need Something <span class="gradient-text">Bigger?</span></h2>
        <p class="text-muted-200 mb-8">E-commerce stores, booking systems, custom features — we'll build exactly what you need.</p>
        <a href="/get-a-quote" class="btn-primary text-lg">Get a Custom Quote</a>
      </div>
    </div>
  </section>

  <!-- Always Included -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <h2 class="text-3xl font-heading font-bold text-center mb-12 animate-on-scroll">Always <span class="gradient-text">Included</span></h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {[
          { icon: '📱', label: 'Mobile-Responsive' },
          { icon: '🔒', label: 'SSL Certificate' },
          { icon: '🇳🇿', label: 'NZ Hosting' },
          { icon: '🔍', label: 'SEO Basics' },
          { icon: '⚡', label: 'Speed Optimised' },
          { icon: '🛟', label: 'Ongoing Support' },
        ].map(item => (
          <div class="glass rounded-xl p-6 text-center animate-on-scroll">
            <span class="text-3xl mb-3 block">{item.icon}</span>
            <p class="text-sm font-heading font-semibold text-muted-100">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section-padding">
    <div class="container-custom max-w-3xl">
      <h2 class="text-3xl font-heading font-bold text-center mb-12 animate-on-scroll">Frequently Asked <span class="gradient-text">Questions</span></h2>
      <div class="animate-on-scroll">
        <FAQItem question="How long does it take to build a website?" answer="A Starter site typically takes about 2 weeks, an Essential site around 3 weeks, and a Professional site about 4 weeks. Custom projects vary — we'll give you a clear timeline upfront." />
        <FAQItem question="Do I own my website?" answer="Yes, 100%. Once it's built and paid for, it's yours. If you ever want to move it, we'll hand over all the files — no questions asked." />
        <FAQItem question="What about domain names?" answer="We can help you register and set up your .co.nz or .com domain. Registration is typically around $30–$40 NZD per year." />
        <FAQItem question="Can I update the website myself?" answer="For Essential and Professional packages, we include a CMS that lets you update text, images, and blog posts easily — no coding skills needed." />
        <FAQItem question="What if I need changes after launch?" answer="Small tweaks? No worries. For ongoing updates, our Website Care Plans cover regular changes from just $49/month." />
        <FAQItem question="What's included in the monthly subscription?" answer="Everything — website design, hosting, SSL, updates, and support — all for one predictable monthly payment. No large upfront cost." />
        <FAQItem question="What happens after 12 months?" answer="Your plan continues month-to-month. Cancel anytime with 30 days notice. Your website stays yours." />
        <FAQItem question="Are prices GST inclusive?" answer="All prices shown exclude GST. GST (15%) will be added to your invoice." />
        <FAQItem question="Do you work with automotive businesses?" answer="Yes! We have a background in the automotive industry, so we understand mechanics, panel beaters, car dealerships, and auto parts businesses." />
      </div>
    </div>
  </section>
</BaseLayout>

<script>
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      const content = document.getElementById(target!);
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !content?.classList.contains('hidden');
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));
      if (!isOpen) { content?.classList.remove('hidden'); icon?.classList.add('rotate-180'); }
    });
  });
</script>
EOF

# ─── PORTFOLIO PAGE ───
cat > src/pages/portfolio.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PortfolioCard from '../components/ui/PortfolioCard.astro';
---
<BaseLayout title="Portfolio — SiteGenius" description="See websites we've built for NZ businesses.">
  <section class="pt-32 pb-16 grid-bg">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-up">Our <span class="gradient-text">Work</span></h1>
      <p class="text-xl text-muted-200 max-w-2xl animate-slide-up" style="animation-delay:0.1s">A showcase of websites we've built for New Zealand businesses.</p>
    </div>
  </section>

  <section class="section-padding">
    <div class="container-custom">
      <!-- Filter -->
      <div class="flex flex-wrap gap-3 mb-12 animate-on-scroll">
        {['All', 'Automotive', 'Retail', 'Trade', 'Hospitality', 'Health', 'Professional'].map((cat, i) => (
          <button class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-neon-cyan text-space-900' : 'bg-space-700/50 text-muted-200 hover:bg-space-600/50 hover:text-muted-100'}`}>{cat}</button>
        ))}
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="animate-on-scroll"><PortfolioCard title="AutoPro Workshop" category="Automotive" description="Modern website for a local auto repair workshop with online booking and service listings." tags={['Web Design', 'SEO', 'Booking']} gradient="bg-gradient-to-br from-blue-600/40 to-cyan-600/40" /></div>
        <div class="animate-on-scroll"><PortfolioCard title="Bloom & Co Florist" category="Retail" description="Elegant online presence for a boutique florist with product gallery and contact form." tags={['Web Design', 'Gallery', 'Mobile-First']} gradient="bg-gradient-to-br from-pink-600/40 to-rose-600/40" /></div>
        <div class="animate-on-scroll"><PortfolioCard title="TradeForce Plumbing" category="Trade" description="Professional site for a plumbing company with service areas and quote requests." tags={['Web Design', 'Lead Gen', 'SEO']} gradient="bg-gradient-to-br from-orange-600/40 to-amber-600/40" /></div>
        <div class="animate-on-scroll"><PortfolioCard title="The Daily Grind Cafe" category="Hospitality" description="Warm cafe website featuring the menu, location, and online ordering info." tags={['Web Design', 'Branding', 'Responsive']} gradient="bg-gradient-to-br from-amber-700/40 to-yellow-600/40" /></div>
        <div class="animate-on-scroll"><PortfolioCard title="Peak Fitness Gym" category="Health" description="High-energy fitness website with class schedules and membership info." tags={['Web Design', 'CMS', 'Performance']} gradient="bg-gradient-to-br from-green-600/40 to-emerald-600/40" /></div>
        <div class="animate-on-scroll"><PortfolioCard title="Kiwi Legal Advisors" category="Professional" description="Clean, trustworthy website for a law firm with practice areas and team profiles." tags={['Web Design', 'SEO', 'Accessibility']} gradient="bg-gradient-to-br from-indigo-600/40 to-violet-600/40" /></div>
      </div>
    </div>
  </section>

  <section class="section-padding bg-space-800/50">
    <div class="container-custom text-center">
      <h2 class="text-3xl font-heading font-bold mb-4 animate-on-scroll">Want your business <span class="gradient-text">here?</span></h2>
      <p class="text-xl text-muted-200 mb-8 animate-on-scroll">Let's make it happen.</p>
      <div class="animate-on-scroll"><a href="/get-a-quote" class="btn-primary text-lg">Start Your Project</a></div>
    </div>
  </section>
</BaseLayout>
EOF

# ─── ABOUT PAGE ───
cat > src/pages/about.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="About — SiteGenius" description="Meet the person behind SiteGenius. NZ-based web design with automotive industry expertise.">
  <section class="pt-32 pb-16 grid-bg">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-up">The Person Behind <span class="gradient-text">the Pixels</span></h1>
    </div>
  </section>

  <section class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="animate-on-scroll">
          <div class="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-white/5 flex items-center justify-center">
            <div class="text-center">
              <span class="text-6xl mb-4 block">👨‍💻</span>
              <p class="text-muted-300 text-sm">Photo coming soon</p>
            </div>
          </div>
        </div>
        <div class="animate-on-scroll">
          <h2 class="text-2xl font-heading font-bold mb-6">Hey, I'm the person behind <span class="gradient-text">SiteGenius</span>.</h2>
          <div class="space-y-4 text-muted-200 leading-relaxed">
            <p>I started SiteGenius because I saw too many local businesses either paying way too much for a basic website, or struggling with DIY builders that never quite looked right.</p>
            <p>With a background in both the <strong class="text-muted-100">automotive industry</strong> and <strong class="text-muted-100">IT</strong>, I bring a unique perspective. I understand what it's like to run a hands-on business — and I know that your website should work as hard as you do.</p>
            <p>I use the latest <strong class="text-muted-100">modern web technologies</strong> to build websites faster and more affordably than traditional agencies — and I pass those savings directly on to you.</p>
            <p>Based in <strong class="text-muted-100">New Zealand</strong>, working with businesses across the country.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose -->
  <section class="section-padding bg-space-800/50">
    <div class="container-custom">
      <h2 class="text-3xl font-heading font-bold text-center mb-12 animate-on-scroll">Why Work <span class="gradient-text">With Us?</span></h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: '🤝', title: 'One Point of Contact', desc: 'You deal directly with me. No account managers, no runarounds.' },
          { icon: '🇳🇿', title: 'NZ-Based Support', desc: "Same timezone, same understanding of local business." },
          { icon: '💬', title: 'Plain English', desc: 'No jargon, no tech-speak. Everything explained clearly.' },
          { icon: '💰', title: 'Fair Pricing', desc: 'What you see is what you pay. No hidden fees.' },
        ].map(item => (
          <div class="glass-hover rounded-xl p-8 text-center animate-on-scroll">
            <span class="text-4xl mb-4 block">{item.icon}</span>
            <h3 class="text-lg font-heading font-bold text-muted-100 mb-2">{item.title}</h3>
            <p class="text-sm text-muted-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Tech -->
  <section class="section-padding">
    <div class="container-custom">
      <h2 class="text-3xl font-heading font-bold text-center mb-12 animate-on-scroll">Tools of the <span class="gradient-text">Trade</span></h2>
      <div class="flex flex-wrap justify-center gap-4 animate-on-scroll">
        {['HTML5', 'CSS3', 'JavaScript', 'React', 'Astro', 'Tailwind CSS', 'WordPress', 'Shopify', 'Google Analytics', 'Figma', 'Node.js', 'Git'].map(t => (
          <span class="glass rounded-lg px-4 py-2 text-sm text-muted-200 font-mono">{t}</span>
        ))}
      </div>
    </div>
  </section>

  <section class="section-padding bg-space-800/50">
    <div class="container-custom text-center">
      <h2 class="text-3xl font-heading font-bold mb-4 animate-on-scroll">Ready to <span class="gradient-text">work together?</span></h2>
      <p class="text-xl text-muted-200 mb-8 animate-on-scroll">Let's have a chat about your project.</p>
      <div class="animate-on-scroll"><a href="/contact" class="btn-primary text-lg">Get in Touch</a></div>
    </div>
  </section>
</BaseLayout>
EOF

# ─── CONTACT PAGE ───
cat > src/pages/contact.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Contact — SiteGenius" description="Get in touch with SiteGenius for web design, hosting, and email services.">
  <section class="pt-32 pb-16 grid-bg">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-up">Let's <span class="gradient-text">Chat</span></h1>
      <p class="text-xl text-muted-200 max-w-2xl animate-slide-up" style="animation-delay:0.1s">Whether you need a website, hosting, or just want to pick our brain — we're here.</p>
    </div>
  </section>

  <section class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <!-- Form -->
        <div class="animate-on-scroll">
          <form action="https://api.web3forms.com/submit" method="POST" class="space-y-6" id="contact-form">
            <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
            <input type="hidden" name="subject" value="New Contact from SiteGenius" />
            <div>
              <label class="block text-sm font-medium text-muted-200 mb-2">Name *</label>
              <input type="text" name="name" required class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-200 mb-2">Email *</label>
              <input type="email" name="email" required class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-200 mb-2">Phone</label>
              <input type="tel" name="phone" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-200 mb-2">Subject</label>
              <select name="subject_type" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors">
                <option>General Enquiry</option>
                <option>New Website</option>
                <option>Hosting</option>
                <option>Email</option>
                <option>Website Care</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-200 mb-2">Message *</label>
              <textarea name="message" required rows="5" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors resize-none"></textarea>
            </div>
            <button type="submit" class="btn-primary w-full">Send Message</button>
          </form>
          <div id="form-success" class="hidden glass rounded-xl p-8 text-center">
            <span class="text-4xl mb-4 block">✅</span>
            <h3 class="text-xl font-heading font-bold text-muted-100 mb-2">Message Sent!</h3>
            <p class="text-muted-200">We'll get back to you within a few hours.</p>
          </div>
        </div>
        <!-- Info -->
        <div class="animate-on-scroll">
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-heading font-bold text-muted-100 mb-4">Contact Info</h3>
              <div class="space-y-4">
                <a href="mailto:hello@sitegenius.co.nz" class="flex items-center gap-3 text-muted-200 hover:text-neon-cyan transition-colors">
                  <svg class="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  hello@sitegenius.co.nz
                </a>
                <div class="flex items-center gap-3 text-muted-200">
                  <svg class="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  New Zealand 🇳🇿
                </div>
              </div>
            </div>
            <div class="glass rounded-xl p-6">
              <h3 class="text-lg font-heading font-bold text-muted-100 mb-2">Response Time</h3>
              <p class="text-muted-200 text-sm">We typically reply within a few hours during business days.</p>
            </div>
            <div>
              <h3 class="text-lg font-heading font-bold text-muted-100 mb-4">Follow Us</h3>
              <div class="flex gap-4">
                {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
                  <a href="#" class="glass rounded-lg px-4 py-2 text-sm text-muted-200 hover:text-neon-cyan hover:border-neon-cyan/20 transition-all">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const success = document.getElementById('form-success');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      if (res.ok) { form.classList.add('hidden'); success?.classList.remove('hidden'); }
    } catch(err) { alert('Something went wrong. Please try again.'); }
  });
</script>
EOF

# ─── GET A QUOTE PAGE ───
cat > src/pages/get-a-quote.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Get a Quote — SiteGenius" description="Get a free, no-obligation quote for your website project.">
  <section class="pt-32 pb-16 grid-bg">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-up">Tell Us About <span class="gradient-text">Your Project</span></h1>
      <p class="text-xl text-muted-200 max-w-2xl animate-slide-up" style="animation-delay:0.1s">Fill out the form and we'll get back within 24 hours with a free, no-obligation quote.</p>
    </div>
  </section>

  <section class="section-padding">
    <div class="container-custom max-w-3xl">
      <!-- Progress -->
      <div class="flex items-center gap-2 mb-12 animate-on-scroll" id="progress-bar">
        {[1,2,3,4].map(n => (
          <div class="flex items-center flex-1">
            <div class={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all step-dot ${n === 1 ? 'bg-neon-cyan text-space-900' : 'bg-space-600 text-muted-300'}`} data-step={n}>{n}</div>
            {n < 4 && <div class="flex-1 h-0.5 bg-space-600 mx-2 step-line" data-step={n}></div>}
          </div>
        ))}
      </div>

      <form action="https://api.web3forms.com/submit" method="POST" id="quote-form">
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
        <input type="hidden" name="subject" value="New Quote Request from SiteGenius" />

        <!-- Step 1 -->
        <div class="quote-step space-y-6" data-step="1">
          <h2 class="text-2xl font-heading font-bold mb-6">Your <span class="gradient-text">Details</span></h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div><label class="block text-sm font-medium text-muted-200 mb-2">Name *</label><input type="text" name="name" required class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" /></div>
            <div><label class="block text-sm font-medium text-muted-200 mb-2">Email *</label><input type="email" name="email" required class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" /></div>
            <div><label class="block text-sm font-medium text-muted-200 mb-2">Phone</label><input type="tel" name="phone" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" /></div>
            <div><label class="block text-sm font-medium text-muted-200 mb-2">Business Name</label><input type="text" name="business" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-colors" /></div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="quote-step hidden space-y-6" data-step="2">
          <h2 class="text-2xl font-heading font-bold mb-6">Project <span class="gradient-text">Type</span></h2>
          <div class="grid md:grid-cols-2 gap-4">
            {['New Website', 'Website Redesign', 'E-commerce', 'Monthly Subscription Plan', 'Hosting & Email', 'Other'].map(opt => (
              <label class="glass-hover rounded-xl p-5 cursor-pointer flex items-center gap-3 has-[:checked]:border-neon-cyan/30 has-[:checked]:shadow-glow">
                <input type="radio" name="project_type" value={opt} class="w-4 h-4 accent-neon-cyan" />
                <span class="text-muted-100 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <!-- Step 3 -->
        <div class="quote-step hidden space-y-6" data-step="3">
          <h2 class="text-2xl font-heading font-bold mb-6">Your <span class="gradient-text">Requirements</span></h2>
          <div><label class="block text-sm font-medium text-muted-200 mb-2">How many pages?</label><select name="pages" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 transition-colors"><option>1</option><option>2-4</option><option>5-7</option><option>8+</option><option>Not sure</option></select></div>
          <div>
            <label class="block text-sm font-medium text-muted-200 mb-3">Features needed</label>
            <div class="grid grid-cols-2 gap-3">
              {['Contact Form', 'Photo Gallery', 'Blog', 'Online Booking', 'E-commerce', 'Social Media', 'SEO', 'Other'].map(f => (
                <label class="flex items-center gap-2 text-sm text-muted-200 cursor-pointer"><input type="checkbox" name="features" value={f} class="w-4 h-4 accent-neon-cyan rounded" />{f}</label>
              ))}
            </div>
          </div>
          <div><label class="block text-sm font-medium text-muted-200 mb-2">Existing website URL (optional)</label><input type="url" name="existing_url" placeholder="https://" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 transition-colors" /></div>
          <div class="grid md:grid-cols-2 gap-6">
            <div><label class="block text-sm font-medium text-muted-200 mb-2">Budget range</label><select name="budget" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 transition-colors"><option>Under $500</option><option>$500 – $1,500</option><option>$1,500 – $3,000</option><option>$3,000+</option><option>Monthly subscription preferred</option><option>Not sure yet</option></select></div>
            <div><label class="block text-sm font-medium text-muted-200 mb-2">Timeline</label><select name="timeline" class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 transition-colors"><option>ASAP</option><option>2-4 weeks</option><option>1-2 months</option><option>No rush</option><option>Just exploring</option></select></div>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="quote-step hidden space-y-6" data-step="4">
          <h2 class="text-2xl font-heading font-bold mb-6">Anything <span class="gradient-text">Else?</span></h2>
          <div><label class="block text-sm font-medium text-muted-200 mb-2">Tell us anything else about your project</label><textarea name="additional" rows="6" placeholder="Any inspiration, ideas, or specific requirements..." class="w-full bg-space-700/50 border border-white/10 rounded-lg px-4 py-3 text-muted-100 focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"></textarea></div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-10">
          <button type="button" id="prev-btn" class="btn-secondary hidden">← Back</button>
          <div class="ml-auto flex gap-4">
            <button type="button" id="next-btn" class="btn-primary">Next →</button>
            <button type="submit" id="submit-btn" class="btn-primary hidden">Submit Quote Request</button>
          </div>
        </div>
      </form>

      <div id="quote-success" class="hidden glass rounded-xl p-12 text-center">
        <span class="text-5xl mb-6 block">🎉</span>
        <h2 class="text-2xl font-heading font-bold text-muted-100 mb-4">Quote Request Sent!</h2>
        <p class="text-muted-200 mb-8">We'll review your project details and get back to you within 24 hours.</p>
        <a href="/" class="btn-secondary">Back to Home</a>
      </div>
    </div>
  </section>
</BaseLayout>

<script>
  let current = 1;
  const total = 4;
  const steps = document.querySelectorAll('.quote-step');
  const dots = document.querySelectorAll('.step-dot');
  const lines = document.querySelectorAll('.step-line');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const form = document.getElementById('quote-form') as HTMLFormElement;
  const success = document.getElementById('quote-success');

  function showStep(n: number) {
    steps.forEach(s => s.classList.add('hidden'));
    document.querySelector(`.quote-step[data-step="${n}"]`)?.classList.remove('hidden');
    dots.forEach(d => {
      const step = parseInt(d.getAttribute('data-step')!);
      if (step <= n) { d.classList.add('bg-neon-cyan', 'text-space-900'); d.classList.remove('bg-space-600', 'text-muted-300'); }
      else { d.classList.remove('bg-neon-cyan', 'text-space-900'); d.classList.add('bg-space-600', 'text-muted-300'); }
    });
    lines.forEach(l => {
      const step = parseInt(l.getAttribute('data-step')!);
      if (step < n) l.classList.add('bg-neon-cyan'); else l.classList.remove('bg-neon-cyan');
    });
    prevBtn?.classList.toggle('hidden', n === 1);
    nextBtn?.classList.toggle('hidden', n === total);
    submitBtn?.classList.toggle('hidden', n !== total);
  }

  nextBtn?.addEventListener('click', () => { if (current < total) showStep(++current); });
  prevBtn?.addEventListener('click', () => { if (current > 1) showStep(--current); });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      if (res.ok) { form.classList.add('hidden'); document.getElementById('progress-bar')?.classList.add('hidden'); success?.classList.remove('hidden'); }
    } catch(err) { alert('Something went wrong. Please try again.'); }
  });
</script>
EOF

# ─── 404 PAGE ───
cat > src/pages/404.astro << 'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="404 — Page Not Found">
  <section class="min-h-screen flex items-center justify-center grid-bg">
    <div class="text-center">
      <h1 class="text-8xl md:text-9xl font-heading font-bold mb-6 glitch-text" data-text="404">404</h1>
      <p class="text-2xl font-heading text-muted-200 mb-4">This page got lost in cyberspace</p>
      <p class="text-muted-300 mb-8">Looks like you've taken a wrong turn. Let's get you back on track.</p>
      <a href="/" class="btn-primary text-lg">Take Me Home</a>
    </div>
  </section>
</BaseLayout>

<style>
  .glitch-text {
    position: relative;
    animation: float 6s ease-in-out infinite;
    background: linear-gradient(135deg, #00E5FF, #A855F7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glitch-text::before, .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #00E5FF, #A855F7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glitch-text::before { animation: glitch1 2s infinite; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
  .glitch-text::after { animation: glitch2 2s infinite; clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
  @keyframes glitch1 { 0%,100% { transform: translate(0); } 20% { transform: translate(-3px, 3px); } 40% { transform: translate(3px, -3px); } 60% { transform: translate(-2px, 1px); } 80% { transform: translate(2px, -1px); } }
  @keyframes glitch2 { 0%,100% { transform: translate(0); } 20% { transform: translate(3px, -3px); } 40% { transform: translate(-3px, 3px); } 60% { transform: translate(2px, -1px); } 80% { transform: translate(-2px, 1px); } }
</style>
EOF

# ─── Favicon ───
cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0A0E1A"/><text x="16" y="22" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="16" fill="#00E5FF">S</text></svg>
EOF

echo "✅ SiteGenius website built successfully!"
echo "Run: ./dev-site.sh"
