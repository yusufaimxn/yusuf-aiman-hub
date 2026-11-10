import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { products } from './data/catalog/products';
import { applications, applicationCategories } from './data/catalog/applications';
import { serviceDivisions } from './data/services/divisions';
import { serviceCapabilities, projectProcess } from './data/services/capabilities';
import { services as serviceCatalog, serviceByCode } from './data/services/services';
import './styles.css';

const logo = '/logo.png';
const whatsappNumber = '601158955662';

const navItems = [
  ['Resources', '/resources'], ['Courses', '/courses'],
  ['Apps & Tools', '/apps'], ['Services', '/services'], ['About', '/about']
];

const courses = [
  { title: 'Digital Technology Basics', level: 'Beginner', description: 'A learning map for understanding everyday technology concepts and terms.', topics: ['Systems', 'Apps', 'Data'] },
  { title: 'AI for Everyone', level: 'Beginner', description: 'Learn how AI works, understand its limits and evaluate it more critically.', topics: ['AI basics', 'Use cases', 'Responsible use'] },
  { title: 'Thinking in Digital Systems', level: 'Intermediate', description: 'Learn to see the relationship between input, process, data and output.', topics: ['Workflows', 'Automation', 'Architecture'] },
];

function getCardTags(product) {
  if (product.category === 'Cheat Sheets') return ['Malay', `${product.pages} pages`];
  if (product.category === 'Infographics') return product.tags || [];
  return [];
}

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 5.5v12"/></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/><path d="m19 16 .6 1.4L21 18l-1.4.6L19 20l-.6-1.4L17 18l1.4-.6z"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></>,
    moon: <path d="M20.8 15.5A8.5 8.5 0 0 1 8.5 3.2 8.5 8.5 0 1 0 20.8 15.5Z"/>,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}

function Button({ children, href, variant = 'primary', onClick, type = 'button' }) {
  const className = `button button-${variant}`;
  if (href) return <a className={className} href={href}>{children}<Icon name="arrow" /></a>;
  return <button className={className} onClick={onClick} type={type}>{children}</button>;
}

function whatsappHref(serviceName = 'a digital project') {
  const message = `Hi, I am interested in ${serviceName}. I would like to discuss my project requirements and get more information.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({ children = 'Discuss your project', serviceName, variant = 'primary' }) {
  return <a className={`button button-${variant}`} href={whatsappHref(serviceName)} target="_blank" rel="noopener noreferrer">{children}<Icon name="arrow" /></a>;
}

function servicePath(item) {
  const division = serviceDivisions.find(entry => entry.id === item.division);
  return `/services/${division.slug}/${item.slug}`;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('yusuf-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('yusuf-theme', theme);
  }, [theme]);
  const dark = theme === 'dark';
  return <button className="theme-toggle" type="button" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}><Icon name={dark ? 'moon' : 'sun'} /></button>;
}

function AutoRail({ children, className }) {
  const railRef = useRef(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;
    let timer;
    let resumeTimer;
    let paused = false;
    const hasOverflow = () => rail.scrollWidth > rail.clientWidth + 4;
    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { paused = false; }, 5200);
    };
    const advance = () => {
      if (paused || !hasOverflow()) return;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
      if (atEnd) rail.scrollTo({ left: 0, behavior: 'smooth' });
      else rail.scrollBy({ left: Math.max(170, rail.clientWidth * 0.5), behavior: 'smooth' });
    };
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, 2800);
    };
    const stop = () => window.clearInterval(timer);
    const onPointerEnter = () => { paused = true; };
    const onPointerLeave = () => { paused = false; };
    rail.addEventListener('mouseenter', onPointerEnter);
    rail.addEventListener('mouseleave', onPointerLeave);
    rail.addEventListener('pointerdown', pause);
    rail.addEventListener('touchstart', pause, { passive: true });
    rail.addEventListener('focusin', pause);
    start();
    return () => {
      stop();
      window.clearTimeout(resumeTimer);
      rail.removeEventListener('mouseenter', onPointerEnter);
      rail.removeEventListener('mouseleave', onPointerLeave);
      rail.removeEventListener('pointerdown', pause);
      rail.removeEventListener('touchstart', pause);
      rail.removeEventListener('focusin', pause);
    };
  }, []);
  return <div ref={railRef} className={className} role="region" aria-label="Scrollable resources">{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = () => setOpen(false); window.addEventListener('hashchange', close); return () => window.removeEventListener('hashchange', close); }, []);
  return <header className="site-header">
    <div className="container header-inner">
      <a href="/" className="brand" aria-label="Yusuf Aiman home"><img src={logo} alt="Yusuf Aiman" /><span><strong>yusufaimxn</strong><small>Technology, Made Understandable.</small></span></a>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="/resources" onClick={() => setOpen(false)}>Explore Resources <Icon name="arrow" /></a>
      </nav>
      <div className="header-actions"><ThemeToggle /><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><Icon name={open ? 'close' : 'menu'} /></button></div>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><a className="brand footer-brand" href="/"><img src={logo} alt="Yusuf Aiman" /><span><strong>yusufaimxn</strong><small>Technology, Made Understandable.</small></span></a><p className="footer-copy">Making technology clearer, more practical and closer to everyday life.</p></div>
    <div><h4>Explore</h4><a href="/resources">Resources</a><a href="/courses">Courses</a><a href="/apps">Apps & Tools</a></div>
    <div><h4>Brand</h4><a href="/about">About Yusuf Aiman</a><a href="/services">Services</a><a href="/faq">FAQ</a><a href="/contact">Contact</a></div>
    <div className="footer-note"><span className="eyebrow">Stay curious</span><h3>Technology becomes easier to understand when we break it down clearly.</h3><a href="/resources" className="text-link">Explore resources <Icon name="arrow" /></a></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Yusuf Aiman. All rights reserved.</span><span><a href="/privacy-policy">Privacy</a><a href="/terms">Terms</a></span></div></footer>;
}

function PageShell({ children, title, description }) {
  useEffect(() => {
    document.title = title.includes('|') ? title : `${title} | Yusuf Aiman`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description || 'Yusuf Aiman Digital Hub | Technology, learning and digital resources made easier to understand.';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description]);
  return <><Header /><main>{children}</main><Footer /><ResourceDownloadModal /></>;
}

function SectionHeading({ eyebrow, title, text, action }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}

function ProductVisual({ product, large = false }) {
  if (product.coverImage) return <div className={`product-visual product-cover-image ${large ? 'large' : ''}`}><img src={product.coverImage} alt={`${product.title} cover`} /></div>;
  return <div className={`product-visual tone-${product.tone} ${large ? 'large' : ''}`}><div className="visual-top"><span>{product.category}</span><span>{product.mark}</span></div><div className="visual-mark">{product.mark}</div><div className="visual-lines"><i/><i/><i/></div><div className="visual-caption">YUSUF AIMAN / VISUAL LEARNING</div></div>;
}

function openResourceDownload(resource) {
  window.dispatchEvent(new CustomEvent('resource-download-request', { detail: resource }));
}

async function saveResourceLead({ resource, email, marketingConsent }) {
  const payload = {
    email: email.trim().toLowerCase(),
    resource_id: resource.slug,
    resource_title: resource.title,
    resource_category: resource.category,
    marketing_consent: marketingConsent,
    resource_consent: true,
    consent_timestamp: new Date().toISOString(),
  };
  const endpoint = import.meta.env.VITE_RESOURCE_LEAD_ENDPOINT;
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Lead submission failed');
    return { persisted: true };
  }
  const storageKey = 'yusuf-resource-download-leads';
  const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
  const exists = saved.some(lead => lead.email === payload.email && lead.resource_id === payload.resource_id);
  if (!exists) window.localStorage.setItem(storageKey, JSON.stringify([...saved, { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, ...payload, created_at: new Date().toISOString() }]));
  return { persisted: false };
}

function ProductCard({ product }) {
  return <article className="product-card"><a className="product-card-main" href={`/resources/${product.slug}`}><ProductVisual product={product} /><div className="product-card-body"><div className="card-meta"><span>{product.category}</span></div><h3>{product.title}</h3><p>{product.description}</p></div></a><div className="product-card-action"><ProductAction product={product} /></div></article>;
}

function CardTags({ product, className = '' }) {
  const tags = getCardTags(product);
  if (!tags.length) return null;
  const visibleTags = tags.slice(0, 2);
  const hiddenCount = tags.length - visibleTags.length;
  return <div className={`card-tags ${className}`} aria-label="Product tags">{visibleTags.map(tag => <span className="card-tag" key={tag}>{tag}</span>)}{hiddenCount > 0 && <span className="card-tag card-tag-more">+{hiddenCount}</span>}</div>;
}

function ProductAction({ product, variant = 'primary' }) {
  if (product.fileUrl) {
    const fileType = product.fileType || 'pdf';
    const downloadLabel = 'Download';
    const downloadName = product.downloadName || `${product.slug}.${fileType}`;
    return <button className={`button button-${variant}`} type="button" onClick={() => openResourceDownload(product)}>{downloadLabel} <Icon name="arrow" /></button>;
  }
  return <Button href="/contact" variant={variant}>Register interest</Button>;
}

function ResourceDownloadModal() {
  const [resource, setResource] = useState(null);
  const [email, setEmail] = useState('');
  const [resourceConsent, setResourceConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState('default');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleRequest = event => {
      setResource(event.detail);
      setEmail('');
      setResourceConsent(false);
      setMarketingConsent(false);
      setStatus('default');
      setError('');
    };
    window.addEventListener('resource-download-request', handleRequest);
    return () => window.removeEventListener('resource-download-request', handleRequest);
  }, []);

  useEffect(() => {
    if (!resource) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = event => { if (event.key === 'Escape' && status !== 'loading') setResource(null); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [resource, status]);

  if (!resource) return null;
  const downloadName = resource.downloadName || `${resource.slug}.${resource.fileType || 'pdf'}`;
  const submit = async event => {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!validEmail) { setError('Please enter a valid email address.'); return; }
    if (!resourceConsent) { setError('Please agree to receive the requested resource.'); return; }
    setError('');
    setStatus('loading');
    try {
      await saveResourceLead({ resource, email, marketingConsent });
      setStatus('success');
    } catch {
      setStatus('error');
      setError('We could not process your request. Please try again.');
    }
  };
  return <div className="resource-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && status !== 'loading') setResource(null); }}>
    <section className="resource-modal" role="dialog" aria-modal="true" aria-labelledby="resource-modal-title" aria-describedby="resource-modal-description">
      <button className="resource-modal-close" type="button" onClick={() => setResource(null)} disabled={status === 'loading'} aria-label="Close download dialog"><Icon name="close" /></button>
      <div className="resource-modal-content">
        <span className="eyebrow">Free learning resource</span>
        {status === 'success' ? <>
          <h2 id="resource-modal-title">Your resource is ready.</h2>
          <p id="resource-modal-description">Thank you. You can now access your learning material.</p>
          <a className="button button-primary resource-modal-download" href={resource.fileUrl} download={downloadName}>Download Now <Icon name="arrow" /></a>
        </> : <>
          <h2 id="resource-modal-title">Where should we send your resource?</h2>
          <p id="resource-modal-description">Enter your email address to access this learning material.</p>
          <div className="resource-modal-resource"><div className="resource-modal-thumb"><ProductVisual product={resource} /></div><div><strong>{resource.title}</strong><span>{resource.category}</span><p>{resource.description}</p></div></div>
          <form className="resource-modal-form" onSubmit={submit} noValidate>
            <label htmlFor="resource-email">Email Address</label>
            <input id="resource-email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus disabled={status === 'loading'} />
            <label className="resource-checkbox"><input type="checkbox" checked={resourceConsent} onChange={event => setResourceConsent(event.target.checked)} disabled={status === 'loading'} /><span>I agree to receive the requested resource and acknowledge the <a href="/privacy-policy">Privacy Policy</a>.</span></label>
            <label className="resource-checkbox"><input type="checkbox" checked={marketingConsent} onChange={event => setMarketingConsent(event.target.checked)} disabled={status === 'loading'} /><span>Send me occasional technology insights and new learning resources.</span></label>
            {error && <p className="resource-modal-error" role="alert">{error}</p>}
            <button className="button button-primary resource-modal-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing your resource...' : 'Get My Resource'} {!status || status !== 'loading' ? <Icon name="arrow" /> : null}</button>
          </form>
          <small className="resource-modal-note">No account required. Your email will only be used according to our privacy policy.</small>
        </>}
        {status === 'error' && <button className="resource-modal-retry" type="button" onClick={() => { setStatus('default'); setError(''); }}>Try again</button>}
      </div>
    </section>
  </div>;
}

function StoreProductCard({ product, featured = false }) {
  return <article className={`store-product-card ${featured ? 'is-featured' : ''}`}>
    <a className="store-product-main" href={`/resources/${product.slug}`}><div className="store-product-art"><ProductVisual product={product} /></div><div className="store-product-body"><div className="store-product-type"><span>{product.category}</span><span>{product.type}</span></div><h3>{product.title}</h3><p>{product.description}</p></div></a>
    <div className="store-product-action"><ProductAction product={product} /></div>
  </article>;
}

function ApplicationCard({ application }) {
  const available = application.status === 'available' && application.downloadUrl;
  return <article className="application-card">
    <div className="application-card-top">
      <div className="application-logo-frame"><img src={application.logo} alt={`${application.name} logo`} /></div>
      <span className="application-status"><i />{available ? 'Available' : 'Coming Soon'}</span>
    </div>
    <div className="application-card-body">
      <div className="application-meta"><span>{application.category}</span><span>Omni</span></div>
      <h3>{application.name}</h3>
      <p>{application.description}</p>
    </div>
    <div className="application-card-action">
      {available ? <a className="button button-primary" href={application.downloadUrl} download>{'Download'} <Icon name="arrow" /></a> : <button className="button button-app-disabled" type="button" disabled aria-disabled="true">Coming Soon <Icon name="arrow" /></button>}
    </div>
  </article>;
}

function Home() {
  return <PageShell title="Yusuf Aiman | Making Technology Easier to Understand" description="Explore simple explanations of technology, software, IT concepts, digital systems and emerging technologies through accessible educational content.">
    <div className="storefront-home">
      <section className="store-hero"><div className="container store-hero-grid"><div className="store-hero-copy"><span className="eyebrow">Yusuf Aiman Technology Education</span><h1>Making<br />Technology<br /><em>Easier to Understand.</em></h1><p>Technology can be complicated. I break down software, IT concepts and digital systems into simple explanations that are easier to understand.</p><div className="hero-actions"><Button href="/resources">Explore Resources</Button><Button href="/services" variant="secondary">Explore What I Do</Button></div><div className="store-trust"><span><Icon name="check" /> Simple explanations</span><span><Icon name="check" /> Practical knowledge</span><span><Icon name="check" /> Technology for everyone</span></div></div><div className="store-hero-products mobile-catalogue"><div className="store-hero-heading"><span>Featured resources</span><a href="/resources">View all <Icon name="arrow" /></a></div><AutoRail className="hero-product-stack"><StoreProductCard product={products[0]} featured /><StoreProductCard product={products[1]} /><StoreProductCard product={products[2]} /></AutoRail></div></div></section>
      <section className="store-section store-products"><div className="container"><div className="store-section-head"><div><span className="eyebrow">01 / Featured resources</span><h2>Explore, learn and understand.</h2><p className="section-note">Useful learning materials designed to make technology concepts clearer.</p></div><a className="text-link" href="/resources">Explore all resources <Icon name="arrow" /></a></div><AutoRail className="store-product-grid">{products.slice(0, 5).map(p => <StoreProductCard key={p.slug} product={p} />)}</AutoRail></div></section>
      <section className="store-section store-purpose"><div className="container"><div className="store-section-head"><div><span className="eyebrow">02 / The purpose</span><h2>Making the complex, clear.</h2><p className="section-note">From the software we use every day to the systems powering the digital world, my goal is to make technology easier to understand through simple explanations, practical examples and visual learning.</p></div></div><div className="purpose-values"><div><span>01</span><h3>Understand first</h3><p>Build a clear mental map before jumping into implementation.</p></div><div><span>02</span><h3>Learn visually</h3><p>Use structure, examples and visuals to make ideas stick.</p></div><div><span>03</span><h3>Grow confident</h3><p>Turn complicated terms into knowledge you can use.</p></div></div></div></section>
      <section className="store-section store-apps"><div className="container"><div className="store-section-head"><div><span className="eyebrow">03 / Apps &amp; tools</span><h2>Useful tools, made usable.</h2></div><a className="text-link" href="/apps">Explore apps <Icon name="arrow" /></a></div><AutoRail className="homepage-applications-grid">{applications.slice(0, 4).map(applicationItem => <ApplicationCard key={applicationItem.id} application={applicationItem} />)}</AutoRail></div></section>
      <section className="store-section store-services"><div className="container"><div className="store-section-head"><div><span className="eyebrow">04 / Services</span><h2>Make the next step clearer.</h2></div><a className="text-link" href="/services">Explore services <Icon name="arrow" /></a></div><div className="service-list homepage-service-list">{serviceDivisions.map((division, index) => <a href={`/services/${division.slug}`} className="service-row" key={division.id}><span>0{index + 1}</span><h3>{division.name}</h3><p>{division.description}</p><Icon name="arrow" /></a>)}</div></div></section>
      <section className="store-final-cta"><div className="container"><div><span className="eyebrow eyebrow-light">05 / Keep exploring</span><h2>Find the right resources<br /><em>to understand more.</em></h2><p>Explore guides, infographics and tools designed to make learning technology easier.</p></div><Button href="/resources">Explore Resources</Button></div></section>
    </div>
  </PageShell>;
}

function ResourcesPage() {
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = useMemo(() => products.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.description} ${p.type} ${p.category} ${(p.tags || []).join(' ')}`.toLowerCase().includes(query.toLowerCase().trim())), [query, category]);
  const countFor = (value) => value === 'All' ? products.length : products.filter(p => p.category === value).length;
  const hasFilters = Boolean(query.trim() || category !== 'All');
  const clearFilters = () => { setQuery(''); setCategory('All'); };
  return <PageShell title="Technology Learning Resources | Yusuf Aiman" description="Explore ebooks, infographics, visual guides and cheatsheets designed to make complex technology concepts easier to understand."><PageIntro eyebrow="Learning resources" title={<>Understand <em>technology</em><br />one concept at a time.</>} text="Explore visual guides, ebooks, infographics and practical learning materials that simplify complex technology concepts." /><section className="section section-after-intro"><div className="container"><div className="product-discovery"><div className="search-box"><Icon name="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics, concepts and learning resources..." aria-label="Search topics, concepts and learning resources" />{query && <button className="search-clear" type="button" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}<kbd>/</kbd></div><div className="filter-tabs" role="tablist" aria-label="Resource categories">{categories.map(c => <button className={category === c ? 'active' : ''} onClick={() => setCategory(c)} key={c} role="tab" aria-selected={category === c}><span>{c === 'All' ? 'All Resources' : c}</span><small>{countFor(c)}</small></button>)}</div><div className="results-row"><span>Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'resource' : 'resources'}</span>{category !== 'All' && <span className="active-filter">in {category}</span>}{hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters <Icon name="close" /></button>}</div></div>{filtered.length ? <div className="product-grid product-grid-wide">{filtered.map(p => <ProductCard key={p.slug} product={p} />)}</div> : <EmptyState text="No resources found." onClear={clearFilters} />}</div></section></PageShell>;
}

function PageIntro({ eyebrow, title, text, actions }) { return <section className="page-intro"><div className="container page-intro-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{actions && <div className="page-intro-actions">{actions}</div>}</div></section>; }
function EmptyState({ text, onClear }) { return <div className="empty-state"><Icon name="search" /><h3>{text}</h3><p>Try another keyword or clear your filters.</p>{onClear && <button className="empty-clear" type="button" onClick={onClear}>Clear filters <Icon name="close" /></button>}</div>; }

function ProductDetail({ product }) {
  const isDownloadable = Boolean(product.fileUrl);
  return <PageShell title={product.title}>
    <section className="detail-hero">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/resources">Resources</a><span>›</span><span>{product.category}</span><span>›</span><strong>{product.title}</strong></nav>
        <div className="detail-grid"><div><span className="eyebrow">{product.category} / {product.type}</span><h1>{product.title}</h1><p className="detail-lede">{product.description} Written in clear language with visuals that make complex ideas easier to understand.</p><CardTags product={product} className="detail-tags" /><div className="hero-actions"><ProductAction product={product} /></div></div><ProductVisual product={product} large /></div>
      </div>
    </section>
    {!isDownloadable && <>
      <section id="included" className="section"><div className="container"><SectionHeading eyebrow="What you get" title="One idea explained from several angles." text="Each format helps you read, see and reuse the idea according to your needs." /><div className="feature-columns"><InfoCard number="01" title="Visual breakdown" text="Diagrams and comparisons that give structure to abstract concepts."/><InfoCard number="02" title="Practical context" text="Examples that connect technology ideas to real situations."/><InfoCard number="03" title="Easy to revisit" text="A clean structure you can return to whenever you need it."/></div></div></section>
      <section className="section section-blue"><div className="container detail-story"><div><span className="eyebrow">The approach</span><h2>Clarity is a design choice.</h2></div><div><p>Good explanations do more than shorten terminology. They show relationships, add context and leave you with understanding you can use.</p><div className="process-row"><span>Concept</span><i>→</i><span>Context</span><i>→</i><span>Confidence</span></div></div></div></section>
      <section className="section"><div className="container"><div className="purchase-panel"><div><span className="eyebrow">Next step</span><h2>Ready when you are.</h2><p>Register your interest to receive more information when this resource is ready to explore.</p></div><div className="purchase-side"><ProductAction product={product} /></div></div></div></section>
    </>}
  </PageShell>;
}

function InfoCard({ number, title, text }) { return <div className="info-card"><span className="info-number">{number}</span><h3>{title}</h3><p>{text}</p></div>; }

function CoursesPage() { return <PageShell title="Courses"><PageIntro eyebrow="Learning paths" title={<>Build understanding, <em>step by step.</em></>} text="Structured learning for anyone moving from terminology to practical understanding." /><section className="section section-after-intro"><div className="container course-layout"><div className="course-aside"><span className="eyebrow">Learning philosophy</span><h2>You do not need to know everything to begin.</h2><p>Start with the right question, build a mental map and revisit the idea with useful context.</p><Button href="/contact" variant="secondary">Ask about learning</Button></div><div className="course-list">{courses.map((c, i) => <div className="course-card" key={c.title}><span className="course-no">0{i + 1}</span><div><div className="card-meta"><span>{c.level}</span><span className="course-status">Coming Soon</span></div><h3>{c.title}</h3><p>{c.description}</p><div className="topic-list">{c.topics.map(t => <span key={t}>{t}</span>)}</div></div><span className="course-coming-soon">Coming Soon</span></div>)}</div></div></section></PageShell>; }

function AppsPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const filteredApplications = useMemo(() => {
    const search = query.trim().toLowerCase();
    return applications.filter(app => {
      const matchesCategory = category === 'All' || app.category === category;
      const matchesSearch = !search || [app.name, app.description, app.category].some(value => value.toLowerCase().includes(search));
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);
  const clearFilters = () => { setCategory('All'); setQuery(''); };
  return <PageShell title="Apps & Tools">
    <PageIntro eyebrow="Digital tools" title={<>Useful ideas, <em>made usable.</em></>} text="Explore applications, utilities and digital tools designed to simplify everyday tasks, improve productivity and make technology more useful." />
    <section className="section section-after-intro apps-catalogue-section">
      <div className="container">
        <div className="apps-catalogue-head"><div><span className="eyebrow">Application catalogue</span><h2>Tools for the way you work.</h2></div><span className="apps-catalogue-count">{filteredApplications.length} applications</span></div>
        <div className="application-search search-box"><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search applications and tools..." aria-label="Search applications and tools" />{query && <button className="search-clear" type="button" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}<kbd>/</kbd></div>
        <div className="application-filter-tabs" role="tablist" aria-label="Application categories">
          {applicationCategories.map(item => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}<small>{item === 'All' ? applications.length : applications.filter(app => app.category === item).length}</small></button>)}
        </div>
        <div className="application-results"><span>Showing <strong>{filteredApplications.length}</strong> applications</span>{(category !== 'All' || query) ? <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters <Icon name="close" /></button> : <span>All applications are coming soon</span>}</div>
        <div className="applications-grid">{filteredApplications.map(app => <ApplicationCard key={app.id} application={app} />)}</div>
      </div>
    </section>
  </PageShell>;
}

function ServiceBreadcrumbs({ division, item }) {
  return <nav className="breadcrumbs service-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/services">Services</a>{division && <><span>›</span><a href={`/services/${division.slug}`}>{division.name}</a></>}{item && <><span>›</span><strong>{item.name}</strong></>}</nav>;
}

function ServiceDivisionCard({ division, number }) {
  const divisionServices = serviceCatalog.filter(item => item.division === division.id);
  return <a className="service-division-row" href={`/services/${division.slug}`}>
    <div className="service-division-row-code"><span>{number}</span></div>
    <div className="service-division-row-copy"><span className="eyebrow">Division {division.code}</span><h3>{division.name}</h3><p>{division.description}</p></div>
    <div className="service-division-row-meta"><span>{divisionServices.length} services</span><Icon name="arrow" /></div>
  </a>;
}

function ServiceCard({ item }) {
  return <a className="service-list-item" href={servicePath(item)}><span className="service-list-code">{item.code}</span><span className="service-list-copy"><h3>{item.name}</h3><p>{item.shortDescription}</p></span><span className="service-list-action">View service <Icon name="arrow" /></span></a>;
}

function ServiceListSection({ eyebrow, title, items, className = '' }) {
  return <section className={`service-detail-section ${className}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><div className="service-bullet-list">{items.map(item => <div className="service-bullet" key={item}><Icon name="check" /><span>{item}</span></div>)}</div></section>;
}

function ServiceCTA({ serviceName }) {
  return <section className="service-final-cta"><div className="container service-final-cta-inner"><div><span className="eyebrow eyebrow-light">Start with a clear conversation</span><h2>Have a project in mind?</h2><p>Tell us what you are trying to build. We will discuss your requirements and identify a suitable approach.</p></div><div className="service-final-actions"><WhatsAppButton serviceName={serviceName}>Discuss Your Project on WhatsApp</WhatsAppButton></div></div></section>;
}

function ServicesPage() {
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState('All');
  const divisionFilters = [['All', 'All Services'], ...serviceDivisions.map(item => [item.id, item.name])];
  const filteredServices = useMemo(() => {
    const search = query.trim().toLowerCase();
    return serviceCatalog.filter(item => {
      const matchesDivision = division === 'All' || item.division === division;
      const matchesSearch = !search || [item.code, item.name, item.shortDescription, item.overview, ...item.capabilities].some(value => value.toLowerCase().includes(search));
      return matchesDivision && matchesSearch;
    });
  }, [division, query]);
  const clearFilters = () => { setDivision('All'); setQuery(''); };
  return <PageShell title="Services" description="Digital services for websites, web applications, desktop software and mobile applications.">
    <PageIntro eyebrow="Digital services" title={<>Build something <em>that works.</em></>} text="From digital experiences to custom software systems, we help turn business requirements into practical technology solutions." actions={<div className="page-intro-actions-row"><WhatsAppButton serviceName="a digital project">Discuss Your Project</WhatsAppButton></div>} />
    <section id="service-divisions" className="section service-divisions-section"><div className="container"><SectionHeading eyebrow="Service divisions" title={<>Choose the right <em>foundation.</em></>} text="Four service divisions cover the main ways digital products and systems are designed, built and improved." /><div className="service-division-grid">{serviceDivisions.map((divisionItem, index) => <ServiceDivisionCard key={divisionItem.id} division={divisionItem} number={`0${index + 1}`} />)}</div></div></section>
    <section id="service-catalogue" className="section service-catalogue-section"><div className="container"><SectionHeading eyebrow="48 services" title="Find the right scope." text="Search by service name, code or keyword, then open a dedicated page for the details." /><div className="service-discovery"><div className="search-box"><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search services..." aria-label="Search services" />{query && <button className="search-clear" type="button" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}<kbd>/</kbd></div><div className="service-filter-tabs" role="tablist" aria-label="Service divisions">{divisionFilters.map(([id, label]) => <button key={id} type="button" className={division === id ? 'active' : ''} onClick={() => setDivision(id)} role="tab" aria-selected={division === id}>{label}<small>{id === 'All' ? serviceCatalog.length : serviceCatalog.filter(item => item.division === id).length}</small></button>)}</div><div className="service-results"><span>Showing <strong>{filteredServices.length}</strong> services</span>{division !== 'All' || query ? <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters <Icon name="close" /></button> : <span>Request a quotation after assessment</span>}</div></div>{filteredServices.length ? <div className="service-catalogue-grid">{filteredServices.map(item => <ServiceCard item={item} key={item.code} />)}</div> : <EmptyState text="No services found." onClear={clearFilters} />}</div></section>
    <section className="section service-capabilities-section"><div className="container"><SectionHeading eyebrow="More than development" title="The parts that bring a project together." text="Beyond the core service divisions, we can also support the technical components required to bring digital projects together." /><div className="capability-grid">{serviceCapabilities.map(([number, title]) => <div className="capability-card" key={number}><span>{number}</span><h3>{title}</h3><p>May be included in a project or scoped separately according to the requirements.</p></div>)}</div></div></section>
    <section className="section service-process-section"><div className="container"><SectionHeading eyebrow="How we work" title="From first conversation to delivery." text="A clear process helps everyone understand what happens next and what decisions need to be made." /><div className="process-grid">{projectProcess.map(([number, title, text]) => <div className="process-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
    <section className="section service-quote-section"><div className="container service-quote-panel"><div><span className="eyebrow">Pricing and quotation</span><h2>Every project deserves the right scope.</h2><p>Every project is assessed according to its requirements, functionality, integrations, technical complexity and delivery scope. A quotation will be prepared after the necessary assessment.</p></div><div className="service-final-actions"><WhatsAppButton serviceName="a project quotation">Request a Quotation</WhatsAppButton></div></div></section>
    <ServiceCTA serviceName="a digital project" />
  </PageShell>;
}

function ServiceDivisionPage({ division }) {
  const divisionServices = serviceCatalog.filter(item => item.division === division.id);
  return <PageShell title={division.name} description={division.description}>
    <section className="service-division-hero"><div className="container"><ServiceBreadcrumbs division={division} /><div className="service-division-hero-grid"><div><span className="eyebrow">{division.code} / Digital services</span><h1>{division.name}</h1><p>{division.description}</p><div className="hero-actions"><WhatsAppButton serviceName={division.name}>Discuss Your Project</WhatsAppButton></div></div></div></div></section>
    <section id="division-services" className="section"><div className="container"><SectionHeading eyebrow={`${division.count} services`} title="Explore this division." text="Open any service to understand the approach, typical deliverables, suitable customers and scope considerations." /><div className="service-catalogue-grid">{divisionServices.map(item => <ServiceCard item={item} key={item.code} />)}</div></div></section>
    <ServiceCTA serviceName={division.name} />
  </PageShell>;
}

function ServiceDetailPage({ item, division }) {
  const relatedServices = item.relatedServices.map(code => serviceByCode[code]).filter(Boolean);
  return <PageShell title={item.name} description={item.shortDescription}>
    <section className="service-detail-hero"><div className="container"><ServiceBreadcrumbs division={division} item={item} /><div className="service-detail-hero-content"><span className="eyebrow">{item.code} / {division.name}</span><h1>{item.name}</h1><p>{item.shortDescription}</p><div className="hero-actions"><WhatsAppButton serviceName={item.name}>Discuss This Project</WhatsAppButton></div></div></div></section>
    <section className="service-detail-main"><div className="container service-detail-layout"><div className="service-detail-primary"><ServiceListSection eyebrow="Overview" title="What this service does." items={[item.overview]} className="service-overview" /><ServiceListSection eyebrow="What we can build" title="A scope shaped around the real need." items={item.capabilities} /><ServiceListSection eyebrow="Typical deliverables" title="What you may receive." items={item.deliverables} /></div><aside className="service-detail-aside"><ServiceListSection eyebrow="Who this is for" title="A good fit for teams that need." items={item.suitableFor} /><ServiceListSection eyebrow="Scope considerations" title="Things to clarify early." items={item.scopeConsiderations} /></aside></div></section>
    <section className="section related-services-section"><div className="container"><SectionHeading eyebrow="Related services" title="Explore nearby solutions." text="These services may be useful depending on your requirements and project direction." /><div className="service-catalogue-grid related-services-grid">{relatedServices.map(related => <ServiceCard item={related} key={related.code} />)}</div></div></section>
    <ServiceCTA serviceName={item.name} />
  </PageShell>;
}

function AboutPage() { return <PageShell title="About"><section className="about-hero"><div className="container about-grid"><div><span className="eyebrow">About Yusuf Aiman</span><h1>Technology becomes useful when it becomes <em>understandable.</em></h1><p className="detail-lede">Yusuf Aiman is a technology educator and digital creator focused on making software, applications, information systems and modern technology easier to understand.</p></div><div className="about-portrait"><img src={logo} alt="Yusuf Aiman" /><span>yusufaimxn<br /><small>Technology, Made Understandable.</small></span></div></div></section><section className="section"><div className="container about-story"><div><span className="eyebrow">The philosophy</span><h2>Explain the thing.<br /><em>Respect the learner.</em></h2></div><div><p>This brand began with a simple observation. People are often capable of understanding technology, but have not found an explanation that starts in the right place.</p><p>Through infographics, guides and learning resources, the goal is to reshape complex ideas into something calmer, clearer and easier to share.</p></div></div></section><section className="section section-blue"><div className="container values-grid"><InfoCard number="01" title="Clarity" text="Clean language, clear structure and visuals that help."/><InfoCard number="02" title="Context" text="Concepts explained with why they matter and when they are used."/><InfoCard number="03" title="Curiosity" text="Every explanation should open the door to better questions."/></div></section></PageShell>; }

function ContactPage() { const [sent, setSent] = useState(false); const [error, setError] = useState(''); function submit(e) { e.preventDefault(); const data = new FormData(e.currentTarget); if (!data.get('name') || !data.get('email') || !data.get('message')) { setError('Please enter your name, email and message before sending.'); return; } setError(''); setSent(true); } return <PageShell title="Contact"><PageIntro eyebrow="Contact" title={<>Let’s make something <em>clear.</em></>} text="Have a question, idea or context to discuss? Send a message and I will take a look." /><section className="section section-after-intro"><div className="container contact-grid"><div className="contact-aside"><span className="eyebrow">Get in touch</span><h2>Start with a short story.</h2><p>This form is ready to connect to an email service or backend when the final workflow is decided.</p><div className="contact-detail"><span><Icon name="mail" /></span><div><b>Email</b><a href="mailto:hello@yusufaiman.me">hello@yusufaiman.me</a></div></div></div><form className="contact-form" onSubmit={submit} noValidate>{sent ? <div className="success-state"><span className="success-icon"><Icon name="check" /></span><h2>Your message is ready.</h2><p>In production, this message will be sent through the connected email service or backend.</p><Button href="/">Back to home</Button></div> : <><label>Name<input name="name" placeholder="Your name" /></label><label>Email<input name="email" type="email" placeholder="you@example.com" /></label><label>Subject<input name="subject" placeholder="What would you like to discuss?" /></label><label>Message<textarea name="message" rows="5" placeholder="Write your message here..." /></label>{error && <p className="form-error">{error}</p>}<Button type="submit">Send message</Button></>}</form></div></section></PageShell>; }

function FAQPage() { const faqs = [['How do the learning resources work?', 'Each resource is structured as content you can explore, revisit and use to build a clearer understanding.'], ['Can I work with Yusuf Aiman?', 'Yes. Send a short context through the Contact page and we can see whether the scope is a good fit.'], ['Is this a course platform?', 'It is a technology education hub with resources, learning paths and practical explanations. Full courses will be added when the content is ready.'], ['Can I suggest a topic?', 'Yes. Topic suggestions help keep the content close to the real questions people are trying to answer.']]; const [open, setOpen] = useState(0); return <PageShell title="FAQ"><PageIntro eyebrow="Frequently asked" title={<>Questions that often <em>come up.</em></>} text="Short answers about the hub, its content and how to get started." /><section className="section section-after-intro"><div className="container faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${open === i ? 'open' : ''}`} key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>0{i + 1}</span><b>{q}</b><Icon name="chevron" /></button>{open === i && <div className="faq-answer"><p>{a}</p></div>}</div>)}</div></section></PageShell>; }

function SimplePage({ title, eyebrow, heading, text }) { return <PageShell title={title}><PageIntro eyebrow={eyebrow} title={heading} text={text} /><section className="section section-after-intro"><div className="container legal-copy"><h2>Important note</h2><p>This page is an early content framework for the Yusuf Aiman Digital Hub. Official content and final terms should be reviewed before the site launches in production.</p><p>Use the Contact page for questions while the full information is being prepared.</p></div></section></PageShell>; }

function LegacyProductsRedirect({ slug }) {
  useEffect(() => {
    const target = slug ? `/resources/${slug}` : '/resources';
    window.history.replaceState({}, '', target);
  }, [slug]);
  return slug ? <ProductDetail product={products.find(product => product.slug === slug) || products[0]} /> : <ResourcesPage />;
}

function resolveDivision(slug) {
  const aliases = { web: 'website-development', desktop: 'desktop-software', mobile: 'mobile-applications' };
  const canonicalSlug = aliases[slug] || slug;
  return serviceDivisions.find(division => division.slug === canonicalSlug);
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const segments = path.split('/').filter(Boolean);
  if (path === '/') return <Home />;
  if (path === '/resources') return <ResourcesPage />;
  if (path.startsWith('/resources/')) { const product = products.find(p => p.slug === path.split('/')[2]) || products[0]; return <ProductDetail product={product} />; }
  if (path === '/products') return <LegacyProductsRedirect />;
  if (path.startsWith('/products/')) return <LegacyProductsRedirect slug={path.split('/')[2]} />;
  if (path === '/courses') return <CoursesPage />;
  if (path === '/apps') return <AppsPage />;
  if (segments[0] === 'services') {
    if (segments.length === 1) return <ServicesPage />;
    const division = resolveDivision(segments[1]);
    if (!division) return <ServicesPage />;
    if (segments.length === 2) return <ServiceDivisionPage division={division} />;
    const item = serviceCatalog.find(service => service.division === division.id && service.slug === segments[2]);
    return item ? <ServiceDetailPage item={item} division={division} /> : <ServiceDivisionPage division={division} />;
  }
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/faq') return <FAQPage />;
  if (path === '/privacy-policy') return <SimplePage title="Privacy Policy" eyebrow="Legal" heading={<>Privacy, explained with <em>care.</em></>} text="A short privacy policy framework for this hub." />;
  if (path === '/terms') return <SimplePage title="Terms" eyebrow="Legal" heading={<>Simple terms for a <em>clear experience.</em></>} text="A short terms framework for using this hub." />;
  return <Home />;
}

createRoot(document.getElementById('root')).render(<App />);
