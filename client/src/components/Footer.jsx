import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Mock subscription success toast/alert
      alert(`Thank you for subscribing, ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#0A1931',
      color: '#B3CFE5',
      paddingTop: '72px',
      paddingBottom: '40px',
      borderTop: '1px solid rgba(179, 207, 229, 0.1)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="page-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}>
          {/* Brand & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="/logo.svg" 
                alt="InternJob Logo" 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: '#F6FAFD',
                }} 
              />
              <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.03em', color: '#F6FAFD' }}>
                InternJob<span style={{ color: '#B3CFE5' }}>.in</span>
              </span>
            </div>
            <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#B3CFE5', margin: 0, opacity: 0.85 }}>
              Connecting ambitious talent with the world's most innovative organizations.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              {[
                {
                  name: 'Twitter',
                  href: '#',
                  svg: (
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )
                },
                {
                  name: 'LinkedIn',
                  href: '#',
                  svg: (
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )
                },
                {
                  name: 'GitHub',
                  href: '#',
                  svg: (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  )
                }
              ].map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#B3CFE5',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#B3CFE5';
                    e.currentTarget.style.transform = 'none';
                  }}
                  aria-label={social.name}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F6FAFD', marginBottom: '20px' }}>Platform</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Explore Jobs', to: '/listings' },
                { label: 'Internships', to: '/listings' },
                { label: 'Hackathons', to: '/listings' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={{ fontSize: '14px', color: '#B3CFE5', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#B3CFE5'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F6FAFD', marginBottom: '20px' }}>Company</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Careers', to: '/careers' },
                { label: 'Privacy Policy', to: '/privacy' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={{ fontSize: '14px', color: '#B3CFE5', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#B3CFE5'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Subscription */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F6FAFD', marginBottom: '4px' }}>Stay Updated</p>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#B3CFE5', margin: 0, opacity: 0.85 }}>
              Subscribe to our newsletter for the latest opportunities and career insights.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(179, 207, 229, 0.25)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#B3CFE5'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(179, 207, 229, 0.25)'}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#F6FAFD',
                  color: '#0A1931',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B3CFE5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F6FAFD'}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(179, 207, 229, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '13px', color: '#B3CFE5', margin: 0, opacity: 0.75 }}>
            © {year} InternJob.in. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.75 }}>
            <span style={{ fontSize: '13px', color: '#B3CFE5' }}>Managed by</span>

            <span style={{ fontSize: '13px', color: '#B3CFE5' }}>Bytebound</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
