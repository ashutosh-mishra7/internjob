import { motion } from 'framer-motion';

const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, submit an application, post a listing, or contact us for support. This includes your name, email address, username, and any other information you choose to provide.',
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, to process applications and job postings, to send you technical notices and support messages, and to respond to your comments and questions.',
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification regarding visitors and users with our business partners and trusted affiliates.',
    },
    {
      title: '4. Data Security',
      content: 'We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our platform.',
    },
    {
      title: '5. Cookies',
      content: 'Our platform uses cookies to enhance your experience and enable authentication. Cookies are used to maintain your login session securely. You can choose to set your web browser to refuse cookies, but this may limit functionality.',
    },
    {
      title: '6. Third-Party Services',
      content: 'We do not sell personal information to third parties. However, we may use third-party service providers to help us operate our business and the platform or administer activities on our behalf.',
    },
    {
      title: '7. Changes to This Policy',
      content: 'InternJob.in has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage users to frequently check this page for any changes.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '56px 0 40px' }}>
        <div className="page-container" style={{ maxWidth: '760px' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-label">Legal</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '8px' }}>Privacy Policy</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: '0 0 12px', fontWeight: 500 }}>Effective Date: January 1, 2025</p>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.65 }}>
              Your privacy is critically important to us. This policy outlines what data we collect, how we use it, and how we protect it.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '40px', maxWidth: '760px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="card"
              style={{ padding: '24px 28px' }}
            >
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{section.title}</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{section.content}</p>
            </motion.div>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '32px' }}>
          Last updated: January 2025 · Questions? Email us at{' '}
          <a href="mailto:support@internjob.in" style={{ color: 'var(--accent)', fontWeight: 500 }}>support@internjob.in</a>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
