import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Home, MapPinned, MessageSquare, Trash2, Users, Plus, RefreshCw, LogOut, Search } from 'lucide-react';
import { createArea, createLandlord, createListing, deleteArea, deleteLandlord, deleteListing, deleteReview, getAreas, getLandlords, getListingReviews, getListings, getUsers, searchListings } from '../../api/api';

type Tab = 'landlords' | 'listings' | 'areas' | 'reviews' | 'users';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('landlords');
  const [landlords, setLandlords] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reviewListingId, setReviewListingId] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [landlordForm, setLandlordForm] = useState({ name: '', phone: '', email: '' });
  const [areaForm, setAreaForm] = useState({
    name: '',
    hospitals: '',
    pharmacies: '',
    libraries: '',
    playgrounds: '',
    gyms: '',
  });
  const [listingImage, setListingImage] = useState<File | null>(null);
  const [listingImageInputKey, setListingImageInputKey] = useState(0);
  const [listingForm, setListingForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'Hostel',
    area_id: '',
    landlord_id: '',
    latitude: '',
    longitude: '',
  });

  const load = async () => {
    setMessage('');
    try {
      const [landlordRows, listingRows, areaRows] = await Promise.all([getLandlords(), getListings(), getAreas()]);
      setLandlords(Array.isArray(landlordRows) ? landlordRows : []);
      setListings(Array.isArray(listingRows) ? listingRows : []);
      setAreas(Array.isArray(areaRows) ? areaRows : []);
    } catch (error) {
      setMessage('Could not load backend data. Check backend routes and login token.');
    }
  };

  const loadUsers = async () => {
    setMessage('');
    try {
      const userRows = await getUsers();
      setUsers(Array.isArray(userRows) ? userRows : []);
    } catch {
      setMessage('Could not load users. This requires a real backend admin token.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addLandlord = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createLandlord(landlordForm);
      setLandlordForm({ name: '', phone: '', email: '' });
      await load();
    } catch {
      setMessage('Add landlord failed. Admin token may be missing or expired.');
    }
  };

  const removeLandlord = async (id: number) => {
    try {
      await deleteLandlord(id);
      await load();
    } catch {
      setMessage('Delete landlord failed. Admin token may be missing or expired.');
    }
  };

  const removeListing = async (id: number) => {
    try {
      await deleteListing(id);
      await load();
    } catch {
      setMessage('Delete listing failed. Admin token may be missing or expired.');
    }
  };

  const addArea = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createArea({
        name: areaForm.name,
        hospitals: Number(areaForm.hospitals),
        pharmacies: Number(areaForm.pharmacies),
        libraries: Number(areaForm.libraries),
        playgrounds: Number(areaForm.playgrounds),
        gyms: Number(areaForm.gyms),
      });
      setAreaForm({ name: '', hospitals: '', pharmacies: '', libraries: '', playgrounds: '', gyms: '' });
      await load();
    } catch {
      setMessage('Add area failed. Admin token may be missing, or area data may be invalid.');
    }
  };

  const removeArea = async (id: number) => {
    try {
      await deleteArea(id);
      await load();
    } catch {
      setMessage('Delete area failed. Admin token may be missing or expired.');
    }
  };

  const addListing = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(listingForm).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (listingImage) {
      data.append('image', listingImage);
    }
    try {
      await createListing(data);
      setListingForm({ title: '', description: '', price: '', type: 'Hostel', area_id: '', landlord_id: '', latitude: '', longitude: '' });
      setListingImage(null);
      setListingImageInputKey((key) => key + 1);
      await load();
    } catch {
      setMessage('Add listing failed. Admin token may be missing, or area/landlord IDs may not exist.');
    }
  };

  const loadReviews = async () => {
    if (!selectedListing) {
      setMessage('Please select a listing first.');
      return;
    }

    try {
      const data = await getListingReviews(selectedListing.id);
      setReviews(Array.isArray(data?.reviews) ? data.reviews : Array.isArray(data) ? data : []);
      setMessage('');
    } catch {
      setMessage('Could not load reviews for this listing.');
    }
  };

  const searchListingsByTitle = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchListings(query);
      setSearchResults(Array.isArray(results) ? results : []);
    } catch {
      setSearchResults([]);
    }
  };

  const selectListing = (listing: any) => {
    setSelectedListing(listing);
    setSearchQuery(listing.title);
    setSearchResults([]);
  };

  const removeReview = async (id: number) => {
    try {
      await deleteReview(id);
      await loadReviews();
    } catch {
      setMessage('Delete review failed. Admin token may be missing or expired.');
    }
  };

  const tabs = [
    { id: 'landlords' as Tab, label: 'Landlords', icon: Building2 },
    { id: 'listings' as Tab, label: 'Listings', icon: Home },
    { id: 'areas' as Tab, label: 'Areas', icon: MapPinned },
    { id: 'reviews' as Tab, label: 'Reviews', icon: MessageSquare },
    { id: 'users' as Tab, label: 'Users', icon: Users },
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
            <h1 className="text-4xl font-bold mb-2">Admin Console</h1>
            <p className="text-gray-300">Single-admin management for landlords, listings, areas, reviews, and users.</p>
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
                onClick={() => {
                  setTab(item.id);
                  if (item.id === 'users') loadUsers();
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  tab === item.id ? 'bg-[#20272B] text-white border-[#20272B]' : 'bg-white text-[#20272B] border-[#DDE1E6]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
          <button onClick={load} className="ml-auto flex items-center gap-2 px-4 py-3 rounded-lg border border-[#DDE1E6] bg-white">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {message && <div className="mb-6 bg-white border border-[#DDE1E6] rounded-lg p-4 text-[#717684]">{message}</div>}

        {tab === 'landlords' && (
          <section className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            <form onSubmit={addLandlord} className="bg-white border border-[#DDE1E6] rounded-lg p-6 h-fit">
              <h2 className="text-2xl font-bold text-[#20272B] mb-4">Add Landlord</h2>
              {['name', 'phone', 'email'].map((field) => (
                <input
                  key={field}
                  required={field !== 'email'}
                  value={(landlordForm as any)[field]}
                  onChange={(e) => setLandlordForm({ ...landlordForm, [field]: e.target.value })}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  className="w-full mb-3 px-4 py-3 border border-[#DDE1E6] rounded-lg"
                />
              ))}
              <button className="w-full bg-[#20272B] text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Landlord
              </button>
            </form>

            <Table title="All Landlords" headers={['Name', 'Phone', 'Email', 'Action']}>
              {landlords.map((landlord) => (
                <tr key={landlord.id} className="border-t border-[#DDE1E6]">
                  <td className="p-4 font-medium">{landlord.name}</td>
                  <td className="p-4">{landlord.phone}</td>
                  <td className="p-4">{landlord.email || '-'}</td>
                  <td className="p-4">
                    <IconButton onClick={() => removeLandlord(landlord.id)} label="Delete" />
                  </td>
                </tr>
              ))}
            </Table>
          </section>
        )}

        {tab === 'listings' && (
          <section className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            <form onSubmit={addListing} className="bg-white border border-[#DDE1E6] rounded-lg p-6 h-fit">
              <h2 className="text-2xl font-bold text-[#20272B] mb-4">Add Listing</h2>
              {[
                ['title', 'Title'],
                ['description', 'Description'],
                ['price', 'Price'],
                ['type', 'Type'],
                ['area_id', 'Area ID'],
                ['landlord_id', 'Landlord ID'],
                ['latitude', 'Latitude'],
                ['longitude', 'Longitude'],
              ].map(([field, label]) => (
                <input
                  key={field}
                  required={['title', 'price', 'type', 'area_id', 'landlord_id'].includes(field)}
                  value={(listingForm as any)[field]}
                  onChange={(e) => setListingForm({ ...listingForm, [field]: e.target.value })}
                  placeholder={label}
                  className="w-full mb-3 px-4 py-3 border border-[#DDE1E6] rounded-lg"
                />
              ))}
              <label className="block mb-3">
                <span className="block text-sm font-medium text-[#717684] mb-2">Image optional</span>
                <input
                  key={listingImageInputKey}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setListingImage(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border border-[#DDE1E6] rounded-lg bg-white"
                />
              </label>
              {listingImage && (
                <p className="mb-3 text-sm text-[#717684]">
                  Selected: {listingImage.name}
                </p>
              )}
              <button className="w-full bg-[#20272B] text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Listing
              </button>
            </form>

            <Table title="Listings" headers={['Title', 'Type', 'Price', 'Area', 'Landlord', 'Action']}>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-t border-[#DDE1E6]">
                  <td className="p-4 font-medium">{listing.title}</td>
                  <td className="p-4">{listing.type}</td>
                  <td className="p-4">Rs. {listing.price}</td>
                  <td className="p-4">{listing.area?.name || 'N/A'}</td>
                  <td className="p-4">{listing.landlord?.name || 'N/A'}</td>
                  <td className="p-4">
                    <IconButton onClick={() => removeListing(listing.id)} label="Delete" />
                  </td>
                </tr>
              ))}
            </Table>
          </section>
        )}

        {tab === 'areas' && (
          <section className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            <form onSubmit={addArea} className="bg-white border border-[#DDE1E6] rounded-lg p-6 h-fit">
              <h2 className="text-2xl font-bold text-[#20272B] mb-4">Add Area</h2>
              {[
                ['name', 'Area Name'],
                ['hospitals', 'Hospitals'],
                ['pharmacies', 'Pharmacies'],
                ['libraries', 'Libraries'],
                ['playgrounds', 'Playgrounds'],
                ['gyms', 'Gyms'],
              ].map(([field, label]) => (
                <input
                  key={field}
                  required
                  type={field === 'name' ? 'text' : 'number'}
                  min={field === 'name' ? undefined : 0}
                  value={(areaForm as any)[field]}
                  onChange={(e) => setAreaForm({ ...areaForm, [field]: e.target.value })}
                  placeholder={label}
                  className="w-full mb-3 px-4 py-3 border border-[#DDE1E6] rounded-lg"
                />
              ))}
              <button className="w-full bg-[#20272B] text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Area
              </button>
            </form>

            <Table title="Areas" headers={['Name', 'Hospitals', 'Pharmacies', 'Libraries', 'Playgrounds', 'Gyms', 'Score', 'Action']}>
              {areas.map((area) => (
                <tr key={area.id} className="border-t border-[#DDE1E6]">
                  <td className="p-4 font-medium">{area.name}</td>
                  <td className="p-4">{area.hospitals}</td>
                  <td className="p-4">{area.pharmacies}</td>
                  <td className="p-4">{area.libraries}</td>
                  <td className="p-4">{area.playgrounds}</td>
                  <td className="p-4">{area.gyms}</td>
                  <td className="p-4">{area.score ?? '-'}</td>
                  <td className="p-4">
                    <IconButton onClick={() => removeArea(area.id)} label="Delete" />
                  </td>
                </tr>
              ))}
            </Table>
          </section>
        )}

        {tab === 'reviews' && (
          <section className="space-y-6">
            <div className="bg-white border border-[#DDE1E6] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#20272B] mb-4">Search Listings by Title</h3>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-[#20272B]">Listing Title</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        searchListingsByTitle(e.target.value);
                      }}
                      placeholder="Type listing title to search..."
                      className="w-full pl-10 pr-4 py-3 border border-[#DDE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20272B]"
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDE1E6] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((listing) => (
                        <div
                          key={listing.id}
                          onClick={() => selectListing(listing)}
                          className="px-4 py-3 hover:bg-[#F0F2F4] cursor-pointer border-b border-[#F0F2F4] last:border-b-0"
                        >
                          <div className="font-medium text-[#20272B]">{listing.title}</div>
                          <div className="text-sm text-gray-600">
                            {listing.area?.name || 'N/A'} • {listing.landlord?.name || 'N/A'} • Rs. {listing.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedListing && (
                  <div className="bg-[#F0F2F4] p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#20272B]">{selectedListing.title}</h4>
                        <p className="text-sm text-gray-600">
                          Area: {selectedListing.area?.name || 'N/A'} • Landlord: {selectedListing.landlord?.name || 'N/A'}
                        </p>
                      </div>
                      <button onClick={loadReviews} className="px-4 py-2 bg-[#20272B] text-white rounded-lg hover:bg-[#404040] transition-colors">
                        Load Reviews
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Table title="Reviews" headers={['User', 'Rating', 'Content', 'Action']}>
              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-[#DDE1E6]">
                  <td className="p-4">{review.user?.name || review.user?.email || '-'}</td>
                  <td className="p-4">{review.rating}</td>
                  <td className="p-4">{review.content}</td>
                  <td className="p-4">
                    <IconButton onClick={() => removeReview(review.id)} label="Delete" />
                  </td>
                </tr>
              ))}
            </Table>
          </section>
        )}

        {tab === 'users' && (
          <Table title="Users" headers={['Name', 'Email', 'Role', 'Status']}>
            {users.map((user) => (
              <tr key={user.email} className="border-t border-[#DDE1E6]">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.is_active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
}

function Table({ title, headers, children }: { title: string; headers: string[]; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden">
      <div className="p-6 border-b border-[#DDE1E6]">
        <h2 className="text-2xl font-bold text-[#20272B]">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F0F2F4]">
            <tr>{headers.map((header) => <th key={header} className="text-left p-4 text-[#20272B]">{header}</th>)}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function IconButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} title={label} className="p-2 border border-[#DDE1E6] rounded-lg hover:bg-[#F0F2F4]">
      <Trash2 className="w-4 h-4 text-[#20272B]" />
    </button>
  );
}
