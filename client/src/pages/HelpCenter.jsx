import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  const faqs = [
    { q: 'How do I create an account?', a: "Click the 'Get Started' button on the top right corner. Choose whether you're a Job Seeker or an Organization, fill in your details, and you're good to go!" },
    { q: 'How do I apply for a job or internship?', a: "Navigate to the 'Listings' page, find an opportunity you like, and click 'Apply Now'. If the organization has an external link, you'll be redirected to their application page." },
    { q: 'How does organization verification work?', a: 'After an organization registers, our admin team manually reviews their application. Once approved, the organization can post listings. They can also receive a Verified badge after thorough vetting.' },
    { q: 'Can I save listings for later?', a: 'Yes! When browsing listings, click the bookmark icon on any listing to save it. You can view all your saved listings from your Dashboard.' },
    { q: 'How do I unsave a listing?', a: "Go to your Dashboard, find the listing under 'Saved', and click the 'Unsave' button to remove it from your bookmarks." },
    { q: "I'm an organization. How do I post a job?", a: "Log in to your organization account, go to your Dashboard, and click 'Post Opportunity'. Fill in the details and hit Publish." },
    { q: 'Can I edit or delete my posted listings?', a: 'Yes! From your Organization Dashboard, each listing has Edit and Delete buttons.' },
    { q: 'Is InternJob.in free to use?', a: 'Yes, InternJob.in is completely free for job seekers. Organizations can post listings at no cost during our launch period.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '56px 0 40px' }}>
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-label">Help Center</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '10px' }}>Frequently Asked Questions</h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '440px' }}>
              Can't find what you need?{' '}
              <Link to="/contact" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Contact us</Link>
              {' '}and we'll help right away.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '40px', maxWidth: '720px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="card"
              style={{ overflow: 'hidden' }}
            >
              <summary style={{
                padding: '18px 24px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                listStyle: 'none',
                userSelect: 'none',
              }}>
                <span>{faq.q}</span>
                <span style={{ marginLeft: '16px', color: 'var(--text-tertiary)', fontSize: '20px', fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>+</span>
              </summary>
              <div style={{
                padding: '0 24px 20px',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                borderTop: '1px solid var(--border)',
                marginTop: 0,
                paddingTop: '16px',
              }}>
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
