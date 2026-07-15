import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Careers = () => {
  const openings = [
    { title: 'Full Stack Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
    { title: 'UI/UX Designer', dept: 'Design', location: 'New Delhi', type: 'Full-time' },
    { title: 'Content Marketing Intern', dept: 'Marketing', location: 'Remote', type: 'Internship' },
    { title: 'Customer Support Lead', dept: 'Support', location: 'Hybrid', type: 'Full-time' },
  ];

  const perks = [
    { label: 'Remote First', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { label: 'Growth Culture', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
    { label: 'Competitive Pay', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { label: 'Real Impact', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>
      {/* Hero */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '64px 0 48px', textAlign: 'center' }}>
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-label">Careers</p>
            <h1 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '16px' }}>Join our team</h1>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
              We're building the future of career discovery. If you love creating impact through great products, we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '48px', display: 'flex', flexDirection: 'column', gap: '48px' }}>

        {/* Perks */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '20px' }}>Why work with us</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {perks.map((perk, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  {perk.icon}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{perk.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '20px' }}>Open positions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {openings.map((job, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="card card-hover" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '5px', letterSpacing: '-0.01em' }}>{job.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{job.dept} · {job.location}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span className="badge badge-neutral">{job.type}</span>
                  <Link to="/contact" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>Apply</Link>
                </div>
              </motion.div>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '32px', textAlign: 'center' }}>
            Don't see your fit? Send us your resume at{' '}
            <a href="mailto:careers@internjob.in" style={{ color: 'var(--accent)', fontWeight: 600 }}>careers@internjob.in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
