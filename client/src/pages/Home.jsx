import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const Home = () => {
  const { user } = useAuth();

  const stats = [
    { value: '10K+', label: 'Placements' },
    { value: '500+', label: 'Companies' },
    { value: '95%',  label: 'Success Rate' },
    { value: '24/7', label: 'Support' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Sign up in seconds as a job seeker or organization. Build your professional profile.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Discover & Apply',
      desc: 'Browse thousands of curated opportunities. Apply directly or via external links.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Get Hired',
      desc: 'Organizations review top candidates and connect directly. Track applications from your dashboard.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: 'Precision Matching',
      desc: 'Advanced algorithms pair candidates with opportunities that perfectly align with their skills and career goals.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
    },
    {
      title: 'Instant Applications',
      desc: 'Apply to multiple roles or link outward instantly. Your profile acts as your passport across the platform.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
    },
    {
      title: 'Verified Organizations',
      desc: 'Every organization is manually vetted. Look for the verification badge to ensure complete legitimacy.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
  ];

  const logos = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay', 'Zomato'];

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
      {/* Subtle dot grid across the entire homepage */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.6,
        zIndex: 0,
      }} />

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0 100px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}>
        {/* Soft ambient glow */}
        <div style={{
          position: 'absolute', top: 0, right: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(26,61,99,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div variants={stagger} initial="initial" animate="animate">

            {/* Pill badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px 6px 10px', border: '1px solid var(--border)', borderRadius: '100px', backgroundColor: 'var(--card)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  backgroundColor: '#16A34A', display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(22,163,74,0.15)',
                }} />
              </span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}>
                Trusted by <strong style={{ color: 'var(--text-primary)' }}>500+</strong> companies worldwide
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} style={{
              fontSize: 'clamp(42px, 7vw, 80px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              marginBottom: '24px',
              maxWidth: '900px',
              margin: '0 auto 24px',
            }}>
              Find Your Next<br />
              <span style={{ color: 'var(--accent)' }}>Big Opportunity</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0 auto 40px',
              fontWeight: 400,
              lineHeight: 1.65,
            }}>
              The premier platform connecting ambitious talent with verified organizations.
              Land your dream internship, full-time role, or hackathon.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link to="/listings" className="btn btn-primary btn-lg">
                Explore Opportunities
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-secondary btn-lg">
                  I'm an Employer
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Trusted Logos ── */}
      <section style={{ padding: '28px 0', position: 'relative', zIndex: 1 }}>
        <div className="page-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', margin: 0 }}>Trusted by teams at</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
              {logos.map(name => (
                <span key={name} style={{
                  fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em',
                  color: 'var(--text-primary)', opacity: 0.22,
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.22'}
                >{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '80px 0', backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="stat-card"
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <p className="section-label">How It Works</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Three steps to your dream career
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
              Simple, fast, and built for how modern hiring works.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', position: 'relative' }}>
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card"
                style={{ padding: '32px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--border)', lineHeight: 1 }}>{item.step}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '96px 0', backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <p className="section-label">Why InternJob</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Built for serious professionals
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
              We provide an ecosystem where top companies and brilliant minds converge seamlessly.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card card-hover"
                style={{ padding: '32px' }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >

        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              lineHeight: 1.1,
            }}>
              Ready to start?
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              marginBottom: '36px',
              maxWidth: '420px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}>
              Join thousands of professionals who found their dream roles through InternJob.in
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Free Account
              </Link>
              <Link to="/listings" className="btn btn-secondary btn-lg">
                Browse Listings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
