import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserDashboard from '../components/UserDashboard';
import OrgDashboard from '../components/OrgDashboard';
import { getAvatarSvg } from '../utils/avatars';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '2px solid var(--border)', borderTopColor: 'var(--text-primary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>Loading...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              overflow: 'hidden', border: '2px solid var(--border)',
              flexShrink: 0, backgroundColor: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '18px', color: 'var(--text-secondary)',
            }}>
              {user.role === 'user' && user.avatar ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: getAvatarSvg(user.avatar) }} />
              ) : (
                user.companyName?.[0] || 'O'
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '2px' }}>
                Welcome back, {user.name || user.companyName}
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'capitalize', margin: 0 }}>
                {user.role} account
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '32px' }}>
        {user.role === 'user' && <UserDashboard />}
        {user.role === 'organization' && <OrgDashboard user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
