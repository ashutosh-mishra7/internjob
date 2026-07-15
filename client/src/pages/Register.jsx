import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { getAvatarSvg, AVATAR_KEYS } from '../utils/avatars';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [tab, setTab] = useState('user'); // 'user' or 'org'
  const [formData, setFormData] = useState({
    name: '', companyName: '', email: '', username: '', password: '', avatar: 'avatar1',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (tab === 'user') {
        await axios.post('/api/auth/register-user', formData);
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        const res = await axios.post('/api/auth/register-org', formData);
        toast.success(res.data.message || 'Request submitted successfully.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
  };

  const benefits = [
    { title: 'Elite Network', desc: 'Connect directly with decision makers and highly vetted talents globally.' },
    { title: 'Fast-Track Hiring', desc: 'Skip the line with verified credentialing and rapid-apply technology.' },
    { title: 'Zero Gatekeeping', desc: 'Every verified company and candidate gets equal access to opportunities.' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', backgroundColor: 'var(--bg)' }}>

      {/* ── Left Panel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex"
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
          order: 1,
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.45,
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '15%', width: '320px', height: '320px',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)',
          opacity: 0.04,
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '380px' }}
        >
          <h2 style={{
            fontSize: '30px', fontWeight: 700, letterSpacing: '-0.04em',
            color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '36px',
          }}>
            Join the ecosystem of innovators.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: '2px',
                  color: 'var(--text-secondary)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{b.title}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right Form ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        order: 2,
      }}>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <div style={{ marginBottom: '32px' }}>
            <Link
              to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '28px', color: 'var(--text-tertiary)', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to home
            </Link>
            <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '6px' }}>Create your account</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Select your role to get started.</p>
          </div>

          {/* Role Tabs */}
          <div className="seg-control" style={{ width: '100%', marginBottom: '28px' }}>
            <button className={`seg-btn ${tab === 'user' ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setTab('user')}>Candidate</button>
            <button className={`seg-btn ${tab === 'org' ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setTab('org')}>Organization</button>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {tab === 'user' ? (
                <motion.div
                  key="user-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div>
                    <label className="input-label">Full Name</label>
                    <input name="name" required onChange={handleChange} className="input" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="input-label">Email Address</label>
                    <input name="email" type="email" required onChange={handleChange} className="input" placeholder="john@example.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    <div>
                      <label className="input-label">Username</label>
                      <input name="username" required onChange={handleChange} className="input" placeholder="johndoe" />
                    </div>
                    <div>
                      <label className="input-label">Password</label>
                      <input name="password" type="password" required onChange={handleChange} className="input" placeholder="••••••••" />
                    </div>
                  </div>

                  {/* Avatar picker */}
                  <div>
                    <label className="input-label">Choose Avatar</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {AVATAR_KEYS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setFormData({ ...formData, avatar: av })}
                          style={{
                            width: '44px', height: '44px', borderRadius: '50%',
                            overflow: 'hidden', cursor: 'pointer', padding: 0,
                            border: `2px solid ${formData.avatar === av ? 'var(--accent)' : 'var(--border)'}`,
                            boxShadow: formData.avatar === av ? '0 0 0 3px rgba(29,78,216,0.12)' : 'none',
                            transition: 'all 0.15s ease',
                            transform: formData.avatar === av ? 'scale(1.1)' : 'scale(1)',
                          }}
                        >
                          <div dangerouslySetInnerHTML={{ __html: getAvatarSvg(av) }} />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="org-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div>
                    <label className="input-label">Company Name</label>
                    <input name="companyName" required onChange={handleChange} className="input" placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label className="input-label">Corporate Email</label>
                    <input name="email" type="email" required onChange={handleChange} className="input" placeholder="hr@acme.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    <div>
                      <label className="input-label">Username</label>
                      <input name="username" required onChange={handleChange} className="input" placeholder="acmecorp" />
                    </div>
                    <div>
                      <label className="input-label">Password</label>
                      <input name="password" type="password" required onChange={handleChange} className="input" placeholder="••••••••" />
                    </div>
                  </div>
                  <div style={{
                    padding: '12px 14px', borderRadius: '10px',
                    backgroundColor: 'var(--warning-bg)',
                    border: '1px solid rgba(217, 119, 6, 0.15)',
                  }}>
                    <p style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 500, margin: 0, lineHeight: 1.55 }}>
                      Organization accounts require manual admin approval before you can post opportunities.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '15px', marginTop: '24px', opacity: isLoading ? 0.6 : 1 }}
            >
              {isLoading ? 'Creating account...' : tab === 'user' ? 'Create Account' : 'Apply for Org Access'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '20px', marginBottom: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                Log in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
