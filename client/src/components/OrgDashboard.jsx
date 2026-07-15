import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrgDashboard = ({ user }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '', type: 'Job', location: '', workType: 'Onsite',
    salary: '', deadline: '', description: '', applyLink: '',
  });

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/listings/org/my-listings');
      setListings(res.data);
    } catch (error) {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.isApproved) fetchListings();
    else setLoading(false);
  }, [user]);

  const openPostModal = (listing = null) => {
    if (listing) {
      setEditingId(listing._id);
      setFormData({
        title: listing.title || '',
        type: listing.type || 'Job',
        location: listing.location || '',
        workType: listing.workType || 'Onsite',
        salary: listing.salary || '',
        deadline: listing.deadline ? new Date(listing.deadline).toISOString().split('T')[0] : '',
        description: listing.description || '',
        applyLink: listing.applyLink || '',
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', type: 'Job', location: '', workType: 'Onsite', salary: '', deadline: '', description: '', applyLink: '' });
    }
    setShowPostModal(true);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/listings/${editingId}`, formData);
        toast.success('Opportunity Updated!');
      } else {
        await axios.post('/api/listings', formData);
        toast.success('Opportunity Posted!');
      }
      setShowPostModal(false);
      fetchListings();
    } catch (err) {
      toast.error(editingId ? 'Failed to update' : 'Failed to post');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`/api/listings/${id}`);
      toast.success('Listing deleted');
      fetchListings();
    } catch (err) {
      toast.error('Failed to delete listing');
    }
  };

  const isExpired = (deadline) => new Date(deadline) < new Date();

  const inputStyle = {
    width: '100%', padding: '10px 13px', border: '1px solid var(--border)',
    borderRadius: '10px', backgroundColor: 'var(--surface)', color: 'var(--text-primary)',
    fontSize: '14px', outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: '72px', borderRadius: '12px' }} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Pending approval banner */}
      {!user.isApproved ? (
        <div style={{
          padding: '20px 24px', borderRadius: '12px',
          backgroundColor: 'var(--warning-bg)',
          border: '1px solid rgba(217,119,6,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--warning)', marginBottom: '4px' }}>Verification Pending</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                Your organization account is under admin review. You can post opportunities once approved.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Verification status */}
          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>Verification Status</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                {user.isVerified ? 'Your organization is verified — you attract 40% more applicants.' : 'Not verified yet. Contact admin for the verification badge.'}
              </p>
            </div>
            {user.isVerified && (
              <span className="badge badge-success" style={{ flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
              </span>
            )}
          </div>

          {/* Postings header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '2px' }}>Your Postings</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>{listings.length} {listings.length === 1 ? 'listing' : 'listings'} posted</p>
            </div>
            <button onClick={() => openPostModal()} className="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Post Opportunity
            </button>
          </div>

          {/* Listings */}
          {listings.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 'var(--radius-card)', backgroundColor: 'var(--surface)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--text-tertiary)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>No postings yet</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Create your first job, internship, or hackathon listing.</p>
              <button onClick={() => openPostModal()} className="btn btn-primary btn-sm">Post Opportunity</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {listings.map(listing => (
                <div
                  key={listing._id}
                  className="card"
                  style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{listing.title}</h4>
                        <span className="badge badge-neutral">{listing.type}</span>
                        {isExpired(listing.deadline) ? (
                          <span className="badge badge-danger">Expired</span>
                        ) : (
                          <span className="badge badge-success">Active</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {listing.location}
                        </span>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{listing.workType}</span>
                        {listing.applyLink && (
                          <a href={listing.applyLink} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            External link
                          </a>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0, justifyContent: 'space-between' }} className="w-full md:w-auto md:justify-end border-t md:border-t-0 border-default pt-3 md:pt-0">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>{listing.applicants?.length || 0}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '2px' }}>Applicants</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => openPostModal(listing)} className="btn btn-secondary btn-sm">Edit</button>
                        <button onClick={() => handleDelete(listing._id)} className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Post Modal */}
          {showPostModal && (
            <div style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px', backgroundColor: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
            }}
              onClick={(e) => { if (e.target === e.currentTarget) setShowPostModal(false); }}
            >
              <div style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-dialog)',
                boxShadow: 'var(--shadow-dialog)',
                width: '100%', maxWidth: '600px',
                maxHeight: '90vh', overflowY: 'auto',
              }}>
                {/* Modal header */}
                <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
                    {editingId ? 'Edit Opportunity' : 'Create Opportunity'}
                  </h2>
                  <button
                    onClick={() => setShowPostModal(false)}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                <form onSubmit={handlePost} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                    <div>
                      <label className="input-label">Title</label>
                      <input required className="input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Frontend Engineer" />
                    </div>
                    <div>
                      <label className="input-label">Type</label>
                      <select className="select" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                        <option value="Job">Job</option>
                        <option value="Internship">Internship</option>
                        <option value="Hackathon">Hackathon</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                    <div>
                      <label className="input-label">Location</label>
                      <input required className="input" placeholder="e.g. Remote, Bangalore" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                    </div>
                    <div>
                      <label className="input-label">Work Mode</label>
                      <select className="select" value={formData.workType} onChange={e => setFormData({ ...formData, workType: e.target.value })}>
                        <option value="Remote">Remote</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                    <div>
                      <label className="input-label">Salary / Stipend</label>
                      <input className="input" placeholder="e.g. ₹50k/mo or Unpaid" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                    </div>
                    <div>
                      <label className="input-label">Deadline</label>
                      <input required type="date" className="input" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="input-label">External Apply Link <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px' }}>(optional)</span></label>
                    <input type="url" placeholder="https://..." className="input" value={formData.applyLink} onChange={e => setFormData({ ...formData, applyLink: e.target.value })} />
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>If provided, applicants will be redirected to this link.</p>
                  </div>

                  <div>
                    <label className="input-label">Description</label>
                    <textarea
                      required
                      rows="4"
                      className="input"
                      style={{ resize: 'vertical', lineHeight: 1.6 }}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                    <button type="button" onClick={() => setShowPostModal(false)} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update Listing' : 'Publish Listing'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrgDashboard;
