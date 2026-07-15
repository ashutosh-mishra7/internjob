import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/admin-login', { username, password });
      setUser(data);
      toast.success('Admin access granted');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
      backgroundColor: '#09090B',
    }}>
      <div style={{
        width: '100%', maxWidth: '380px',
        backgroundColor: '#111111',
        border: '1px solid rgba(220,38,38,0.2)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            border: '1px solid rgba(220,38,38,0.3)',
            backgroundColor: 'rgba(220,38,38,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(220,38,38,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.025em', color: 'rgba(250,250,250,0.9)', marginBottom: '6px' }}>
            Restricted Access
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(250,250,250,0.35)', margin: 0 }}>
            Authorized personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(250,250,250,0.35)', marginBottom: '6px' }}>
              Admin Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              style={{
                width: '100%', padding: '11px 14px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: 'rgba(250,250,250,0.9)',
                fontSize: '14px', fontFamily: 'monospace',
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(220,38,38,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(250,250,250,0.35)', marginBottom: '6px' }}>
              Access Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '11px 14px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: 'rgba(250,250,250,0.9)',
                fontSize: '14px', fontFamily: 'monospace',
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(220,38,38,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%', padding: '12px',
              borderRadius: '10px', border: 'none',
              backgroundColor: isLoading ? 'rgba(220,38,38,0.4)' : 'rgba(220,38,38,0.8)',
              color: '#fff',
              fontSize: '14px', fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease',
              fontFamily: 'inherit',
              marginTop: '4px',
            }}
            onMouseEnter={e => { if (!isLoading) e.target.style.backgroundColor = 'rgba(220,38,38,0.95)'; }}
            onMouseLeave={e => { if (!isLoading) e.target.style.backgroundColor = 'rgba(220,38,38,0.8)'; }}
          >
            {isLoading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
