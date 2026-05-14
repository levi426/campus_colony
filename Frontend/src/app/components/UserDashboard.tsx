import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Home, ListFilter, LogOut, Search, TrendingUp, Heart, MapPin } from 'lucide-react';
import AIAssistant from './AIAssistant';
import MyRentals from './MyRentals';
import { clearStoredAuth, getFavourites, getListings, logoutUser, resolveImageUrl, predictRent, addFavourite, removeFavourite } from '../../api/api';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Tab = 'home' | 'assistant' | 'browse' | 'prediction';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('home');
  const [listings, setListings] = useState<any[]>([]);
  const [query, setQuery] = useState('');

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
    { id: 'home' as Tab, label: 'My Rentals', icon: Home },
    { id: 'assistant' as Tab, label: 'AI Assistant', icon: Bot },
    { id: 'browse' as Tab, label: 'Browse Rentals', icon: Search },
    { id: 'prediction' as Tab, label: 'Rent Prediction', icon: TrendingUp },
  ];

  const goHome = () => {
    navigate('/home');
  };

  const logout = async () => {
    await logoutUser().catch(() => undefined);
    clearStoredAuth();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="bg-[#20272B] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">User Dashboard</h1>
            <p className="text-gray-300">Manage rentals, AI help, and rental browsing.</p>
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

        {tab === 'home' && (
          <MyRentals onBrowse={() => setTab('browse')} />
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

        {tab === 'prediction' && <RentPrediction />}
      </div>
    </div>
  );
}

function RentalGrid({ rows }: { rows: any[] }) {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState<Set<number>>(new Set());
  const [togglingFav, setTogglingFav] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getFavourites()
      .then((data) => {
        const favouriteIds = Array.isArray(data)
          ? data.map((fav) => Number(fav.listing_id ?? fav.listing?.id ?? fav.id)).filter(Boolean)
          : [];
        setFavourites(new Set(favouriteIds));
      })
      .catch(() => setFavourites(new Set()));
  }, []);

  const handleFavouriteToggle = async (listingId: number) => {
    try {
      setTogglingFav(prev => ({ ...prev, [listingId]: true }));
      if (favourites.has(listingId)) {
        await removeFavourite(listingId);
        setFavourites(prev => {
          const newSet = new Set(prev);
          newSet.delete(listingId);
          return newSet;
        });
      } else {
        await addFavourite(listingId);
        setFavourites(prev => new Set(prev).add(listingId));
      }
    } catch (err) {
      console.error('Failed to toggle favourite:', err);
    } finally {
      setTogglingFav(prev => ({ ...prev, [listingId]: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rows.map((item) => {
        const imageSrc = resolveImageUrl(item.image_url);
        const isFavourite = favourites.has(item.id);
        const areaName = item.area?.name || item.area_name || 'N/A';
        const landlordName = item.landlord?.name || item.landlord_name || 'N/A';
        return (
          <div key={item.id} className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-[#E9ECEF]">
              {imageSrc ? (
                <ImageWithFallback src={imageSrc} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-[#717684]">No image</div>
              )}
              <button
                onClick={() => handleFavouriteToggle(item.id)}
                disabled={togglingFav[item.id]}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  isFavourite
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-[#20272B] hover:bg-red-500 hover:text-white'
                } disabled:opacity-60`}
              >
                <Heart className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#20272B] mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xl font-bold text-[#0066CC]">Rs. {(item.price || 0).toLocaleString()}</span>
                <span className="text-xs px-2 py-1 bg-[#E8F0FE] text-[#0066CC] rounded">{item.type}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#717684] mb-2">
                <MapPin className="w-4 h-4" />
                {areaName}
              </div>
              <p className="text-sm text-[#717684] mb-2">Landlord: {landlordName}</p>
              <p className="text-sm text-[#717684] line-clamp-2 mb-4">{item.description || item.type}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/listing/${item.id}`)}
                  className="flex-1 px-4 py-2 bg-[#20272B] text-white rounded-lg hover:bg-[#404040] transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleFavouriteToggle(item.id)}
                  disabled={togglingFav[item.id]}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors disabled:opacity-60 ${
                    isFavourite
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-[#DDE1E6] text-[#20272B] hover:bg-[#F7F8FA]'
                  }`}
                >
                  {isFavourite ? 'Remove Favourite' : 'Add to Favourite'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
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

function RentPrediction() {
  const [formData, setFormData] = useState({
    area_name: '',
    area_category: '',
    property_type: '',
    total_area: '',
    bedrooms: '',
    bathrooms: '',
    kitchens: '',
    floors: '',
    parking: '',
    furnished: '',
    electricity_backup: '',
    gas_available: '',
    distance_city_center: '',
    near_school: '',
    near_market: '',
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Convert string values to appropriate types
      const requestData = {
        area_name: formData.area_name,
        area_category: formData.area_category,
        property_type: formData.property_type,
        total_area: parseFloat(formData.total_area),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        kitchens: parseInt(formData.kitchens),
        floors: parseInt(formData.floors),
        parking: parseInt(formData.parking),
        furnished: formData.furnished,
        electricity_backup: formData.electricity_backup,
        gas_available: formData.gas_available,
        distance_city_center: parseFloat(formData.distance_city_center),
        near_school: formData.near_school,
        near_market: formData.near_market,
      };

      const response = await predictRent(requestData);
      setPrediction(response.predicted_rent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to predict rent');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { key: 'area_name', label: 'Area Name', type: 'text', placeholder: 'e.g., Faisal Town' },
    { key: 'area_category', label: 'Area Category', type: 'select', options: ['High', 'Low', 'Medium'] },
    { key: 'property_type', label: 'Property Type', type: 'select', options: ['Hostel', 'House', 'Flat'] },
    { key: 'total_area', label: 'Total Area (marlas)', type: 'number', placeholder: 'e.g., 1200' },
    { key: 'bedrooms', label: 'Bedrooms', type: 'number', placeholder: 'e.g., 2' },
    { key: 'bathrooms', label: 'Bathrooms', type: 'number', placeholder: 'e.g., 1' },
    { key: 'kitchens', label: 'Kitchens', type: 'number', placeholder: 'e.g., 1' },
    { key: 'floors', label: 'Floors', type: 'number', placeholder: 'e.g., 1' },
    { key: 'parking', label: 'Parking Spaces', type: 'number', placeholder: 'e.g., 1' },
    { key: 'furnished', label: 'Furnished', type: 'select', options: ['Yes', 'No'] },
    { key: 'electricity_backup', label: 'Electricity Backup', type: 'select', options: ['Yes', 'No'] },
    { key: 'gas_available', label: 'Gas Available', type: 'select', options: ['Yes', 'No'] },
    { key: 'distance_city_center', label: 'Distance to City Center (km)', type: 'number', step: '0.1', placeholder: 'e.g., 5.2' },
    { key: 'near_school', label: 'Near School', type: 'select', options: ['Yes', 'No'] },
    { key: 'near_market', label: 'Near Market', type: 'select', options: ['Yes', 'No'] },
  ];

  return (
    <section className="space-y-6">
      <div className="bg-white border border-[#DDE1E6] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-[#20272B]" />
          <h2 className="text-2xl font-bold text-[#20272B]">Rent Prediction</h2>
        </div>

        <p className="text-[#717684] mb-6">
          Fill in the property details below to get an AI-powered rent prediction for your desired accommodation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formFields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-[#717684] mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full px-4 py-3 border border-[#DDE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20272B]"
                    required
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    step={field.step}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-[#DDE1E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20272B]"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#20272B] text-white rounded-lg hover:bg-[#404040] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Predicting...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Predict Rent
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-red-600">⚠️</div>
              <p className="text-red-800 font-medium">Prediction Error</p>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {prediction !== null && !error && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Predicted Rent</h3>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                Rs. {prediction.toLocaleString()}
              </div>
              <p className="text-green-700">
                This is an AI-powered estimate based on current market data and property features.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
