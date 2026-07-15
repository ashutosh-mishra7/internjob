import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getAvatarSvg, AVATAR_KEYS } from '../utils/avatars';

const Profile = () => {
  const { user, setUser, loading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [initialized, setInitialized] = useState(false);

  if (loading) return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '28px', height: '28px', border: '2px solid var(--border)', borderTopColor: 'var(--text-primary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;

  if (!initialized) {
    setName(user.name || '');
    setCompanyName(user.companyName || '');
    setUsername(user.username || '');
    setAvatar(user.avatar || 'avatar1');
    setInitialized(true);
  }

  const isOrg = user.role === 'organization';

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      return toast.error("New passwords don't match");
    }
    setSaving(true);
    try {
      let res;
      if (isOrg) {
        const payload = { companyName, username };
        if (newPassword) { payload.oldPassword = oldPassword; payload.newPassword = newPassword; }
        res = await axios.put('/api/org/profile', payload);
      } else {
        const payload = { name, username, avatar };
        if (newPassword) { payload.oldPassword = oldPassword; payload.newPassword = newPassword; }
        res = await axios.put('/api/users/profile', payload);
      }
      setUser(res.data);
      toast.success('Profile updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              overflow: 'hidden', border: '2px solid var(--border)',
              backgroundColor: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '22px', color: 'var(--text-secondary)',
              flexShrink: 0,
            }}>
              {!isOrg && avatar ? (
                <div dangerouslySetInnerHTML={{ __html: getAvatarSvg(avatar) }} />
              ) : (
                companyName?.[0] || 'O'
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '2px' }}>
                My Profile
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0, fontWeight: 500 }}>
                <span style={{ textTransform: 'capitalize' }}>{user.role}</span> · {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '640px' }}
        >
          <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Basic Info */}
            <div className="card" style={{ padding: '24px 28px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                Basic Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="input-label">{isOrg ? 'Company Name' : 'Full Name'}</label>
                  {isOrg ? (
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="input" />
                  ) : (
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="input" />
                  )}
                </div>
                <div>
                  <label className="input-label">Username</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input" />
                </div>
                <div>
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="input"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--text-tertiary)', cursor: 'not-allowed' }}
                  />
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '5px' }}>Email cannot be changed.</p>
                </div>
              </div>
            </div>

            {/* Avatar */}
            {!isOrg && (
              <div className="card" style={{ padding: '24px 28px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  Avatar
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {AVATAR_KEYS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setAvatar(av)}
                      style={{
                        width: '52px', height: '52px', borderRadius: '50%',
                        overflow: 'hidden', cursor: 'pointer', padding: 0,
                        border: `2px solid ${avatar === av ? 'var(--accent)' : 'var(--border)'}`,
                        boxShadow: avatar === av ? '0 0 0 3px rgba(29,78,216,0.12)' : 'none',
                        transform: avatar === av ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                        backgroundColor: 'var(--surface)',
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: getAvatarSvg(av) }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Password */}
            <div className="card" style={{ padding: '24px 28px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)', marginBottom: '6px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                Change Password
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Leave blank to keep your current password.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label className="input-label">Current Password</label>
                  <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="••••••••" className="input" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                  <div>
                    <label className="input-label">New Password</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="input" />
                  </div>
                  <div>
                    <label className="input-label">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
                style={{ padding: '12px 32px', fontSize: '15px', opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
