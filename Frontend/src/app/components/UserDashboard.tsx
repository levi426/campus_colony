import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Edit3, Home, ListFilter, LogOut, Map, Search, User } from 'lucide-react';
import AIAssistant from './AIAssistant';
import { createReview, getListings, resolveImageUrl } from '../../api/api';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Tab = 'profile' | 'home' | 'assistant' | 'browse';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('profile');
  const [listings, setListings] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState({
    name: localStorage.getItem('cc_name') || 'Student User',
    email: localStorage.getItem('cc_email') || 'student@university.edu.pk',
    block: 'Block A',
    room: 'Single Room',
    budget: 'Rs. 12,000 - 18,000',
  });

  useEffect(() => {
    getListings().then((data) => setListings(Array.isArray(data) ? data : [])).catch(() => setListings([]));
  }, []);

  const fallbackListings = [
    { id: 1, title: 'Faisal Block-A Premium', type: 'Hostel', price: 15000, area_id: 'Block A', description: 'WiFi, security, and power backup' },
    { id: 2, title: 'B-Block Residence', type: 'Hostel', price: 14000, area_id: 'Block B', description: 'Budget friendly student rooms' },
    { id: 3, title: 'D-Block Executive Studio', type: 'Studio', price: 16500, area_id: 'Block D', description: 'Private studio option' },
  ];

  const rows = uniqueListings(listings.length ? listings : fallbackListings);
  const filtered = useMemo(() => {
    const value = query.toLowerCase();
    return rows.filter((item) => `${item.title} ${item.type} ${item.description}`.toLowerCase().includes(value));
  }, [rows, query]);

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'home' as Tab, label: 'My Rentals', icon: Home },
    { id: 'assistant' as Tab, label: 'AI Assistant', icon: Bot },
    { id: 'browse' as Tab, label: 'Browse Rentals', icon: Search },
  ];

  const goHome = () => {
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_role');
    localStorage.removeItem('cc_email');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="bg-[#20272B] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">User Dashboard</h1>
            <p className="text-gray-300">Manage profile, preferences, AI help, and rental browsing.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={goHome} className="px-4 py-3 bg-white text-[#20272B] rounded-lg flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </button>
            <button onClick={logout} className="px-4 py-3 border border-white text-white rounded-lg flex items-center gap-2 hover:bg-white hover:text-[#20272B] transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  tab === item.id ? 'bg-[#20272B] text-white border-[#20272B]' : 'bg-white text-[#20272B] border-[#DDE1E6]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {tab === 'profile' && (
          <section className="bg-white border border-[#DDE1E6] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Edit3 className="w-5 h-5 text-[#20272B]" />
              <h2 className="text-2xl font-bold text-[#20272B]">Profile & Preferences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(profile).map(([key, value]) => (
                <label key={key} className="block">
                  <span className="block text-sm font-medium text-[#717684] mb-2 capitalize">{key}</span>
                  <input
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    className="w-full px-4 py-3 border border-[#DDE1E6] rounded-lg"
                  />
                </label>
              ))}
            </div>
            <button className="mt-6 px-6 py-3 bg-[#20272B] text-white rounded-lg">Save Profile</button>
          </section>
        )}

        {tab === 'home' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#20272B]">Previous Selected or Searched Rentals</h2>
            <RentalGrid rows={rows.slice(0, 3)} />
          </section>
        )}

        {tab === 'assistant' && <AIAssistant />}

        {tab === 'browse' && (
          <section className="space-y-6">
            <div className="bg-white border border-[#DDE1E6] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <ListFilter className="w-5 h-5 text-[#20272B]" />
                <h2 className="text-2xl font-bold text-[#20272B]">Browse Rentals</h2>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, type, price, or requirement"
                className="w-full px-4 py-3 border border-[#DDE1E6] rounded-lg"
              />
            </div>
            <RentalGrid rows={filtered} />
          </section>
        )}
      </div>
    </div>
  );
}

function RentalGrid({ rows }: { rows: any[] }) {
  const navigate = useNavigate();
  const [reviewDrafts, setReviewDrafts] = useState<Record<number, { content: string; rating: number }>>({});
  const [submittingReviews, setSubmittingReviews] = useState<Record<number, boolean>>({});
  const [message, setMessage] = useState('');

  const updateDraft = (id: number, patch: Partial<{ content: string; rating: number }>) => {
    const existing = reviewDrafts[id] || { content: '', rating: 5 };
    setReviewDrafts({ ...reviewDrafts, [id]: { ...existing, ...patch } });
  };

  const submitReview = async (id: number) => {
    const draft = reviewDrafts[id] || { content: '', rating: 5 };
    if (!draft.content.trim()) {
      setMessage('Write a short review before submitting.');
      return;
    }
    try {
      setSubmittingReviews({ ...submittingReviews, [id]: true });
      await createReview(id, draft.content, Number(draft.rating));
      setMessage('Review added successfully.');
      setReviewDrafts({ ...reviewDrafts, [id]: { content: '', rating: 5 } });
    } catch {
      setMessage('Review failed. You may already have reviewed this hostel, or this listing does not exist.');
    } finally {
      setSubmittingReviews((current) => ({ ...current, [id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {message && <div className="bg-white border border-[#DDE1E6] rounded-lg p-4 text-[#717684]">{message}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rows.map((item) => {
          const draft = reviewDrafts[item.id] || { content: '', rating: 5 };
          const imageSrc = resolveImageUrl(item.image_url);
          return (
            <div key={item.id} className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden">
              <div className="h-40 bg-[#E9ECEF]">
                {imageSrc ? (
                  <ImageWithFallback src={imageSrc} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-[#717684]">No picture</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#20272B] mb-2">{item.title}</h3>
                <p className="text-[#717684] mb-4">{item.description || item.type}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-[#20272B]">Rs. {item.price}</span>
                  <span className="text-sm text-[#717684]">{item.area_id}</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => navigate(`/user/hostel/${item.id}`, { state: { hostel: item } })}
                    className="flex-1 px-4 py-2 bg-[#20272B] text-white rounded-lg"
                  >
                    Visit
                  </button>
                  <button className="px-4 py-2 border border-[#DDE1E6] rounded-lg" title="Map will be connected later">
                    <Map className="w-4 h-4" />
                  </button>
                </div>
                <div className="border-t border-[#DDE1E6] pt-4 space-y-3">
                  <select
                    value={draft.rating}
                    onChange={(event) => updateDraft(item.id, { rating: Number(event.target.value) })}
                    className="w-full px-3 py-2 border border-[#DDE1E6] rounded-lg"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>{rating} star</option>
                    ))}
                  </select>
                  <textarea
                    value={draft.content}
                    onChange={(event) => updateDraft(item.id, { content: event.target.value })}
                    placeholder="Write review"
                    className="w-full px-3 py-2 border border-[#DDE1E6] rounded-lg"
                    rows={3}
                  />
                  <button
                    disabled={Boolean(submittingReviews[item.id])}
                    onClick={() => submitReview(item.id)}
                    className="w-full px-4 py-2 bg-[#20272B] text-white rounded-lg disabled:opacity-60"
                  >
                    {submittingReviews[item.id] ? 'Adding...' : 'Add Review'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function uniqueListings(rows: any[]) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = row.id ?? `${row.title}-${row.price}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
