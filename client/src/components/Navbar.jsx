import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAvatarSvg } from '../utils/avatars';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authDropOpen, setAuthDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const authRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setAuthDropOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (authRef.current && !authRef.current.contains(e.target)) setAuthDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    color: isActive(path) ? 'var(--text-primary)' : 'var(--text-secondary)',
    backgroundColor: isActive(path) ? 'var(--surface)' : 'transparent',
    transition: 'all 0.15s ease',
    textDecoration: 'none',
  });

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all duration-200 ${
        scrolled
          ? 'bg-white/85 border-b border-gray-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>

          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img 
              src="/logo.svg" 
              alt="InternJob Logo" 
              style={{
                width: '28px',
                height: '28px',
                flexShrink: 0,
              }} 
            />
            <span style={{
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}>
              InternJob<span style={{ color: 'var(--accent)' }}>.in</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div style={{ gap: '4px' }} className="hidden md:flex items-center">
            <Link to="/" style={navLinkStyle('/')}>Home</Link>
            <Link to="/listings" style={navLinkStyle('/listings')}>Listings</Link>
            {user && (
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                style={navLinkStyle(user.role === 'admin' ? '/admin' : '/dashboard')}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div style={{ gap: '8px' }} className="hidden md:flex items-center">
            {user ? (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 12px 5px 5px',
                    border: '1px solid var(--border)',
                    borderRadius: '40px',
                    backgroundColor: 'var(--card)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: 'var(--surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                  }}>
                    {user.role === 'user' && user.avatar ? (
                      <div dangerouslySetInnerHTML={{ __html: getAvatarSvg(user.avatar) }} />
                    ) : (
                      <span>{user.name?.[0] || user.companyName?.[0] || 'U'}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name || user.companyName}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', flexShrink: 0 }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 8px)',
                        width: '220px',
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-dialog)',
                        boxShadow: 'var(--shadow-dialog)',
                        overflow: 'hidden',
                        zIndex: 100,
                      }}
                    >
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: '2px' }}>Signed in as</p>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                      </div>
                      <div style={{ padding: '8px' }}>
                        <Link
                          to="/profile"
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', transition: 'background-color 0.1s ease' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          My Profile
                        </Link>
                        <Link
                          to={user.role === 'admin' ? '/admin' : '/dashboard'}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', transition: 'background-color 0.1s ease' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                          Dashboard
                        </Link>
                        <div style={{ margin: '8px 0', borderTop: '1px solid var(--border)' }} />
                        <button
                          onClick={handleLogout}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--danger)', border: 'none', cursor: 'pointer', width: '100%', backgroundColor: 'transparent', transition: 'background-color 0.1s ease' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--danger-bg)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div ref={authRef} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div style={{ gap: '8px' }} className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: '34px', height: '34px', borderRadius: '8px',
                border: '1px solid var(--border)', backgroundColor: 'var(--card)',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--text-primary)',
              }}
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
            }}
          >
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link to="/" style={{ padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', backgroundColor: isActive('/') ? 'var(--surface)' : 'transparent' }}>Home</Link>
              <Link to="/listings" style={{ padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', backgroundColor: isActive('/listings') ? 'var(--surface)' : 'transparent' }}>Listings</Link>
              {user && (
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} style={{ padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>Dashboard</Link>
              )}
              <div style={{ margin: '8px 0', borderTop: '1px solid var(--border)' }} />

              {user ? (
                <>
                  <Link to="/profile" style={{ padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>My Profile</Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    style={{ padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--danger)', border: 'none', cursor: 'pointer', backgroundColor: 'var(--danger-bg)', textAlign: 'left', marginTop: '4px' }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <Link to="/login" className="btn btn-secondary" style={{ justifyContent: 'center' }}>Log in</Link>
                  <Link to="/register" className="btn btn-primary" style={{ justifyContent: 'center' }}>Get started</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
