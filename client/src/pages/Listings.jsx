import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const typeConfig = {
  Job:       { color: '#1D4ED8', bg: '#EFF6FF', label: 'Job' },
  Internship:{ color: '#16A34A', bg: '#F0FDF4', label: 'Internship' },
  Hackathon: { color: '#D97706', bg: '#FFFBEB', label: 'Hackathon' },
};

const SkeletonCard = () => (
  <div className="card" style={{ padding: '24px', overflow: 'hidden' }}>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
      <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '8px' }} />
        <div className="skeleton" style={{ height: '10px', width: '40%' }} />
      </div>
    </div>
    <div className="skeleton" style={{ height: '18px', width: '80%', marginBottom: '10px' }} />
    <div className="skeleton" style={{ height: '12px', width: '100%', marginBottom: '6px' }} />
    <div className="skeleton" style={{ height: '12px', width: '70%', marginBottom: '20px' }} />
    <div style={{ display: 'flex', gap: '8px' }}>
      <div className="skeleton" style={{ height: '28px', width: '80px', borderRadius: '8px' }} />
      <div className="skeleton" style={{ height: '28px', width: '60px', borderRadius: '8px' }} />
    </div>
  </div>
);

const Listings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', location: '', keyword: '', workType: '' });
  const [activeTab, setActiveTab] = useState('');

  const fetchListings = async (overrideType) => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (filters.keyword) query.append('keyword', filters.keyword);
      const typeToUse = overrideType !== undefined ? overrideType : filters.type;
      if (typeToUse) query.append('type', typeToUse);
      if (filters.location) query.append('location', filters.location);
      if (filters.workType) query.append('workType', filters.workType);
      const res = await axios.get(`/api/listings?${query.toString()}`);
      setListings(res.data);
    } catch (error) {
      toast.error('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchListings(); }, []);

  const handleTabSwitch = (type) => {
    setActiveTab(type);
    setFilters(prev => ({ ...prev, type }));
    fetchListings(type);
  };

  const handleApply = async (id) => {
    try {
      await axios.post(`/api/listings/${id}/apply`);
      toast.success('Applied successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    }
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.post(`/api/listings/${id}/save`);
      toast.success(res.data.message || 'Listing bookmarked!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    }
  };

  const tabs = [
    { label: 'All', value: '' },
    { label: 'Jobs', value: 'Job' },
    { label: 'Internships', value: 'Internship' },
    { label: 'Hackathons', value: 'Hackathon' },
  ];

  const isExpired = (deadline) => new Date(deadline) < new Date();

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: 'calc(100vh - 60px)', paddingBottom: '80px' }}>

      {/* ── Page Header ── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '48px 0 0' }}>
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <p className="section-label">Opportunities</p>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Discover your next role
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '28px' }}>
              Find jobs, internships, and hackathons from verified organizations.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="seg-control" style={{ marginBottom: '-1px' }}>
            {tabs.map(tab => (
              <button
                key={tab.value}
                className={`seg-btn ${activeTab === tab.value ? 'active' : ''}`}
                onClick={() => handleTabSwitch(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: '32px' }}>

        {/* ── Search & Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            padding: '8px',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Search input */}
          <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search roles, companies..."
              style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '14px', color: 'var(--text-primary)', width: '100%', fontFamily: 'inherit' }}
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && fetchListings()}
            />
          </div>

          {/* Location input */}
          <div style={{ flex: '1 1 160px', display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <input
              type="text"
              placeholder="Location"
              style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '14px', color: 'var(--text-primary)', width: '100%', fontFamily: 'inherit' }}
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && fetchListings()}
            />
          </div>

          {/* Work type */}
          <div style={{ flex: '0 1 160px', padding: '4px' }}>
            <select
              className="select"
              style={{ border: '1px solid var(--border)', borderRadius: '10px', backgroundColor: 'var(--surface)', height: '100%', padding: '8px 36px 8px 12px' }}
              value={filters.workType}
              onChange={(e) => setFilters({ ...filters, workType: e.target.value })}
            >
              <option value="">Any Mode</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <button
            onClick={() => fetchListings()}
            className="btn btn-primary"
            style={{ flexShrink: 0, padding: '10px 24px' }}
          >
            Search
          </button>
        </motion.div>

        {/* Results count */}
        {!loading && (
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '20px', fontWeight: 500 }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{listings.length}</span> {listings.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* ── Content ── */}
        {loading ? (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : listings.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-card)',
            backgroundColor: 'var(--surface)',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              border: '1px solid var(--border)', backgroundColor: 'var(--card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: 'var(--text-tertiary)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>No results found</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}
          >
            {listings.map((listing, idx) => {
              const cfg = typeConfig[listing.type] || typeConfig.Job;
              const expired = isExpired(listing.deadline);
              return (
                <motion.div
                  key={listing._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="card card-hover"
                  style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                  {/* Type accent stripe */}
                  <div style={{ height: '3px', backgroundColor: cfg.color, flexShrink: 0 }} />

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '10px',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--surface)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: '16px', color: 'var(--text-secondary)',
                          overflow: 'hidden', flexShrink: 0,
                        }}>
                          {listing.organization?.logo ? (
                            <img src={listing.organization.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            listing.organization?.companyName?.[0] || '?'
                          )}
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>{listing.organization?.companyName}</p>
                          {listing.organization?.isVerified && (
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', backgroundColor: cfg.bg, color: cfg.color, flexShrink: 0, letterSpacing: '0.02em' }}>
                        {listing.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {listing.title}
                    </h2>

                    {/* Description */}
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                      {listing.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: listing.salary ? '10px' : '0' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                        {listing.location}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                        {listing.workType}
                      </span>
                    </div>

                    {listing.salary && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '7px', backgroundColor: '#F0FDF4', border: '1px solid rgba(22,163,74,0.15)', color: '#16A34A', fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        {listing.salary}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--surface)' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', margin: '0 0 2px' }}>Deadline</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: expired ? 'var(--danger)' : 'var(--text-primary)', margin: 0 }}>
                        {new Date(listing.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {user?.role === 'user' && (
                        <>
                          <button
                            title="Save listing"
                            onClick={() => handleSave(listing._id)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '7px' }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                          </button>
                          {listing.applyLink ? (
                            <a
                              href={listing.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                              style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
                            >
                              Apply
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                          ) : (
                            <button onClick={() => handleApply(listing._id)} className="btn btn-primary btn-sm">
                              Apply Now
                            </button>
                          )}
                        </>
                      )}
                      {(!user || user?.role !== 'user') && (
                        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Login to apply</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Listings;
