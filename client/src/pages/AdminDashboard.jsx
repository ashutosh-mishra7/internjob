import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState('orgs');
  const [orgs, setOrgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: '',
    inputValue: '',
    onConfirm: null
  });

  const loadData = async () => {
    try {
      if (tab === 'orgs') {
        const res = await axios.get('/api/admin/orgs');
        setOrgs(res.data);
      } else if (tab === 'users') {
        const res = await axios.get('/api/admin/users');
        setUsers(res.data);
      } else if (tab === 'admins' && user?.isSuperAdmin) {
        const res = await axios.get('/api/admin/admins');
        setAdmins(res.data);
      }
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    if (!loading && user && user.role === 'admin') loadData();
  }, [tab, loading, user]);

  if (loading) return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '28px', height: '28px', border: '2px solid var(--border)', borderTopColor: 'var(--text-primary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!user || user.role !== 'admin') return <AdminLogin />;

  const toggleApprove = async (id) => {
    await axios.put(`/api/admin/orgs/${id}/approve`);
    toast.success('Approval status updated');
    loadData();
  };

  const toggleVerify = async (id) => {
    await axios.put(`/api/admin/orgs/${id}/verify`);
    toast.success('Verification status updated');
    loadData();
  };

  const deleteEntity = (type, id) => {
    setDialogState({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Account',
      message: 'Are you sure you want to permanently delete this account? This will also remove any related postings.',
      inputValue: '',
      onConfirm: async () => {
        try {
          await axios.delete(`/api/admin/entity/${type}/${id}`);
          toast.success('Deleted successfully');
          loadData();
        } catch (e) {
          toast.error(e.response?.data?.message || 'Failed to delete');
        }
      }
    });
  };

  const toggleBlock = async (type, id) => {
    try {
      await axios.put(`/api/admin/entity/${type}/${id}/block`);
      toast.success('Block status updated');
      loadData();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to update block status');
    }
  };

  const resetPass = (type, id) => {
    setDialogState({
      isOpen: true,
      type: 'prompt',
      title: 'Reset Password',
      message: 'Please enter the new password for this account.',
      inputValue: '',
      onConfirm: async (newPassword) => {
        if (!newPassword || !newPassword.trim()) {
          toast.error('Password cannot be empty');
          return;
        }
        try {
          await axios.put(`/api/admin/entity/${type}/${id}/reset-password`, { newPassword });
          toast.success('Password reset successfully');
        } catch (e) {
          toast.error(e.response?.data?.message || 'Failed to reset password');
        }
      }
    });
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/admins', newAdmin);
      toast.success('Sub-admin created');
      setNewAdmin({ username: '', password: '' });
      loadData();
    } catch (e) { toast.error(e.response?.data?.message || 'Failed to create admin'); }
  };

  const delAdmin = (id) => {
    setDialogState({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Admin Account',
      message: 'Are you sure you want to delete this sub-admin?',
      inputValue: '',
      onConfirm: async () => {
        try {
          await axios.delete(`/api/admin/admins/${id}`);
          toast.success('Admin deleted successfully');
          loadData();
        } catch (e) { toast.error(e.response?.data?.message || 'Failed to delete admin'); }
      }
    });
  };

  const tabs = [
    { label: 'Organizations', value: 'orgs' },
    { label: 'Users', value: 'users' },
    ...(user.isSuperAdmin ? [{ label: 'Admins', value: 'admins' }] : []),
  ];

  const filteredOrgs = orgs.filter(org => 
    org.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmins = admins.filter(a => 
    a.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const actionBtn = (label, onClick, variant = 'neutral') => {
    const styles = {
      neutral: { bg: 'var(--surface)', color: 'var(--text-secondary)', border: 'var(--border)' },
      accent:  { bg: 'rgba(29,78,216,0.06)', color: 'var(--accent)', border: 'rgba(29,78,216,0.15)' },
      warning: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'rgba(217,119,6,0.2)' },
      danger:  { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'rgba(220,38,38,0.15)' },
    }[variant];
    return (
      <button
        onClick={onClick}
        style={{
          padding: '5px 10px', borderRadius: '7px', border: `1px solid ${styles.border}`,
          backgroundColor: styles.bg, color: styles.color, fontSize: '12px', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
          fontFamily: 'inherit',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
            <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
              Admin Control Panel
            </h1>
            <span className="badge badge-neutral" style={{ marginLeft: '4px' }}>
              {user.isSuperAdmin ? 'Super Admin' : 'Sub-Admin'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Logged in as: <strong style={{ color: 'var(--text-primary)' }}>@{user.username}</strong>
            </span>
            <button
              onClick={async () => {
                await logout();
                toast.success('Admin logged out');
              }}
              className="btn btn-secondary btn-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '28px' }}>
        {/* Tabs */}
        <div className="seg-control" style={{ marginBottom: '24px' }}>
          {tabs.map(t => (
            <button key={t.value} className={`seg-btn ${tab === t.value ? 'active' : ''}`} onClick={() => { setTab(t.value); setSearchQuery(''); }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <input
            type="text"
            className="input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${tab === 'orgs' ? 'organizations' : tab === 'users' ? 'users' : 'admins'}...`}
            style={{
              paddingLeft: '38px',
              height: '42px',
              fontSize: '14px',
            }}
          />
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        {/* Create sub-admin form */}
        {user.isSuperAdmin && tab === 'admins' && (
          <div className="card" style={{ padding: '20px 24px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Create Sub-Admin</h3>
            <form onSubmit={createAdmin} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 150px' }}>
                <label className="input-label">Username</label>
                <input
                  required
                  className="input"
                  value={newAdmin.username}
                  onChange={e => setNewAdmin({ ...newAdmin, username: e.target.value })}
                  placeholder="admin_username"
                />
              </div>
              <div style={{ flex: '1 1 150px' }}>
                <label className="input-label">Password</label>
                <input
                  required
                  type="password"
                  className="input"
                  value={newAdmin.password}
                  onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>Create Admin</button>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="card" style={{ overflow: 'hidden', overflowX: 'auto' }}>
          {tab === 'orgs' && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.length === 0 && (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>No organizations found</td></tr>
                )}
                {filteredOrgs.map(org => (
                  <tr key={org._id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{org.companyName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>@{org.username}</div>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{org.email}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className={`badge ${org.isApproved ? 'badge-success' : 'badge-warning'}`}>
                          {org.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        {org.isVerified && <span className="badge badge-accent">Verified</span>}
                        {org.isBlocked && <span className="badge badge-danger">Blocked</span>}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {actionBtn(org.isApproved ? 'Revoke' : 'Approve', () => toggleApprove(org._id), 'neutral')}
                        {actionBtn(org.isVerified ? 'Unverify' : 'Verify', () => toggleVerify(org._id), 'accent')}
                        {actionBtn('Reset Pass', () => resetPass('org', org._id), 'warning')}
                        {user.isSuperAdmin && (
                          <>
                            {actionBtn(org.isBlocked ? 'Unblock' : 'Block', () => toggleBlock('org', org._id), 'warning')}
                            {actionBtn('Delete', () => deleteEntity('org', org._id), 'danger')}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'users' && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 && (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>No users found</td></tr>
                )}
                {filteredUsers.map(u => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', flexShrink: 0 }}>
                          {u.name?.[0] || '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{u.name}</div>
                          {u.isBlocked && <span className="badge badge-danger">Blocked</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {actionBtn('Reset Pass', () => resetPass('user', u._id), 'warning')}
                        {user.isSuperAdmin && (
                          <>
                            {actionBtn(u.isBlocked ? 'Unblock' : 'Block', () => toggleBlock('user', u._id), 'warning')}
                            {actionBtn('Delete', () => deleteEntity('user', u._id), 'danger')}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {user.isSuperAdmin && tab === 'admins' && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.length === 0 && (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>No admins found</td></tr>
                )}
                {filteredAdmins.map(a => (
                  <tr key={a._id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.username}</td>
                    <td>
                      {a.isSuperAdmin ? (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(124,58,237,0.08)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.15)' }}>Super Admin</span>
                      ) : (
                        <span className="badge badge-neutral">Sub Admin</span>
                      )}
                    </td>
                    <td>
                      {!a.isSuperAdmin && actionBtn('Delete Admin', () => delAdmin(a._id), 'danger')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Custom Dialog Modal */}
        {dialogState.isOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card"
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '24px',
                boxShadow: 'var(--shadow-xl)',
                margin: '0 16px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {dialogState.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: dialogState.type === 'prompt' ? '16px' : '24px', lineHeight: 1.5 }}>
                {dialogState.message}
              </p>
              
              {dialogState.type === 'prompt' && (
                <input
                  type="text"
                  className="input"
                  value={dialogState.inputValue}
                  onChange={e => setDialogState({ ...dialogState, inputValue: e.target.value })}
                  placeholder="Enter new password"
                  autoFocus
                  style={{ marginBottom: '24px' }}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setDialogState({ ...dialogState, isOpen: false })}
                >
                  Cancel
                </button>
                <button
                  className={`btn btn-sm ${dialogState.type === 'prompt' ? 'btn-primary' : 'btn-danger'}`}
                  onClick={() => {
                    dialogState.onConfirm(dialogState.inputValue);
                    setDialogState({ ...dialogState, isOpen: false });
                  }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
