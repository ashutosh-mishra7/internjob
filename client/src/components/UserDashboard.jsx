import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ savedListings: [], appliedListings: [] });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await axios.get('/api/users/my-listings');
      if (res.data.savedListings) setData(res.data);
      const recRes = await axios.get('/api/listings');
      const notApplied = recRes.data.filter(l => !res.data.appliedListings?.find(a => a._id === l._id));
      setRecommendations(notApplied.slice(0, 4));
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUserData(); }, []);

  const handleUnsave = async (listingId) => {
    try {
      await axios.post(`/api/listings/${listingId}/save`);
      toast.success('Listing unsaved');
      fetchUserData();
    } catch (error) {
      toast.error('Failed to unsave');
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: '100px', borderRadius: '16px' }} />
        ))}
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: '200px', borderRadius: '16px' }} />
      ))}
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
        <motion.div variants={itemVariants} className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', margin: 0 }}>Applications</p>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1 }}>{data.appliedListings?.length || 0}</div>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: '6px 0 0', fontWeight: 500 }}>Opportunities pursued</p>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', margin: 0 }}>Bookmarks</p>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1 }}>{data.savedListings?.length || 0}</div>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: '6px 0 0', fontWeight: 500 }}>Saved for later</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--text-primary)' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(250,250,250,0.45)', margin: '0 0 10px' }}>Resume</p>
            <p style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(250,250,250,0.9)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>Build your standout profile</p>
          </div>
          <Link
            to="/resume-builder"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: '20px', padding: '8px 16px', borderRadius: '8px',
              backgroundColor: 'rgba(250,250,250,0.1)', border: '1px solid rgba(250,250,250,0.15)',
              color: 'rgba(250,250,250,0.9)', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', transition: 'background-color 0.15s ease',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(250,250,250,0.18)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(250,250,250,0.1)'}
          >
            Open Builder
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </motion.div>
      </div>

      {/* ── Main + Sidebar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="lg-grid-3">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Applied */}
          <motion.div variants={itemVariants}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '4px', height: '20px', borderRadius: '2px', backgroundColor: 'var(--success)' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>Applied</h3>
              </div>
              <span className="badge badge-neutral">{data.appliedListings?.length || 0} total</span>
            </div>

            {(!data.appliedListings || data.appliedListings.length === 0) ? (
              <div style={{ padding: '40px 24px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 'var(--radius-card)', backgroundColor: 'var(--surface)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--text-tertiary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>No applications yet</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Start applying to see them tracked here.</p>
                <Link to="/listings" className="btn btn-primary btn-sm">Explore Roles</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '12px' }}>
                {data.appliedListings.map(listing => (
                  <div key={listing._id} className="card" style={{ padding: '18px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <span className="badge badge-success">Applied</span>
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', margin: '0 0 16px' }}>{listing.type} · {listing.location}</p>
                    <Link to="/listings" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>View listing →</Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Saved */}
          <motion.div variants={itemVariants}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '4px', height: '20px', borderRadius: '2px', backgroundColor: 'var(--warning)' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>Saved</h3>
              </div>
              <span className="badge badge-neutral">{data.savedListings?.length || 0} total</span>
            </div>

            {(!data.savedListings || data.savedListings.length === 0) ? (
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', padding: '24px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
                No bookmarks yet. Save listings to review them later.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '12px' }}>
                {data.savedListings.map(listing => (
                  <div key={listing._id} className="card" style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span className="badge badge-warning">Saved</span>
                      <button
                        onClick={() => handleUnsave(listing._id)}
                        style={{ fontSize: '12px', fontWeight: 600, color: 'var(--danger)', border: 'none', background: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: '6px', transition: 'background-color 0.1s' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--danger-bg)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Unsave
                      </button>
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{listing.type} · {listing.location}</p>
                    <Link to="/listings" className="btn btn-secondary btn-sm" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>View Details</Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1' }} className="lg-sidebar">
          <div className="card" style={{ padding: '24px', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <h3 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>Recommended</h3>
            </div>

            {recommendations.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', padding: '16px' }}>No new recommendations right now.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recommendations.map(rec => (
                  <div
                    key={rec._id}
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', cursor: 'pointer', transition: 'all 0.15s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.backgroundColor = 'var(--card)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
                  >
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>{rec.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{rec.type}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{rec.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link to="/listings" className="btn btn-secondary" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', marginTop: '16px', fontSize: '13px' }}>
              View Full Board
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-grid-3 { grid-template-columns: 1fr 1fr 1fr !important; }
          .lg-grid-3 > :first-child { grid-column: span 2; }
          .lg-sidebar { grid-column: auto !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default UserDashboard;
