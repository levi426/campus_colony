import { useState } from 'react';
import { Search, MapPin, Filter, Star, Wifi, Shield, Bus, Zap, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';


export default function AreaInsight() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const blocks = ['all', 'Block A', 'Block B', 'Block C', 'Block D'];
  const budgets = ['all', 'Under 12k', '12k-18k', '18k-25k', 'Above 25k'];

  const hostels = [
    {
      id: 1,
      name: 'Faisal Block-A Premium',
      block: 'Block A',
      location: 'Faisal Town, Lahore',
      price: '15,000',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1772475385327-ae6212f900aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      facilities: ['WiFi', 'Security', 'Transport', 'Power Backup'],
      occupancy: 92,
    },
    {
      id: 2,
      name: 'The Residency (Block C)',
      block: 'Block C',
      location: 'Faisal Town, Lahore',
      price: '18,000',
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      facilities: ['WiFi', 'Security', 'Gym', 'Power Backup'],
      occupancy: 88,
    },
    {
      id: 3,
      name: 'D-Block Executive Studio',
      block: 'Block D',
      location: 'Faisal Town, Lahore',
      price: '16,500',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      facilities: ['WiFi', 'Security', 'Transport', 'Cafeteria'],
      occupancy: 75,
    },
    {
      id: 4,
      name: 'B-Block Residence',
      block: 'Block B',
      location: 'Faisal Town, Lahore',
      price: '14,000',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1772475385289-17fbb414ed74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      facilities: ['WiFi', 'Security', 'Transport'],
      occupancy: 95,
    },
  ];

  const facilityScores = [
    { name: 'WiFi Coverage', score: 92, icon: Wifi },
    { name: 'Security Systems', score: 90, icon: Shield },
    { name: 'Transport Access', score: 88, icon: Bus },
    { name: 'Power Backup', score: 94, icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-4">Area Insights for<br />Lahore Students</h1>
          <p className="text-gray-300 text-lg mb-8">
            Comprehensive data-driven insights for student accommodation in Faisal Town
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Block A, B, C, or D"
                className="w-full pl-12 pr-4 py-4 bg-white text-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="bg-[#F8F9FA] rounded-xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#121212]" />
            <h3 className="font-bold text-[#121212]">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#121212] font-medium mb-2">Block</label>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
              >
                {blocks.map((block) => (
                  <option key={block} value={block}>
                    {block === 'all' ? 'All Blocks' : block}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#121212] font-medium mb-2">Budget</label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
              >
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget === 'all' ? 'All Budgets' : `Rs. ${budget}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Facility Ratings */}
        <div className="bg-white border border-[#E9ECEF] rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#121212] mb-6">Facilities in Faisal Town</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilityScores.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#121212]" />
                      </div>
                      <span className="font-medium text-[#121212]">{facility.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#121212] text-lg">{facility.score}</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#121212] h-full rounded-full transition-all duration-500"
                      style={{ width: `${facility.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hostel Listings */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#121212] mb-2">Available Hostels</h2>
              <p className="text-gray-600">Showing {hostels.length} verified properties</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#E9ECEF] rounded-lg hover:bg-[#F8F9FA] transition-colors">
              <Filter className="w-4 h-4" />
              Sort by
            </button>
          </div>

          <div className="space-y-6">
            {hostels.map((hostel) => (
              <div
                key={hostel.id}
                className="bg-white border border-[#E9ECEF] rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-72 h-64 md:h-auto">
                    <ImageWithFallback
                      src={hostel.image}
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#121212] text-[#121212]" />
                      <span className="font-bold">{hostel.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#121212] text-white px-3 py-1 rounded-full text-sm">
                      {hostel.block}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#121212] mb-2">{hostel.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{hostel.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-sm">{hostel.reviews} reviews</span>
                          <span className="text-sm">•</span>
                          <span className="text-sm">{hostel.occupancy}% occupied</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#121212] mb-1">Rs. {hostel.price}</div>
                        <div className="text-sm text-gray-600">per month</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {hostel.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#F8F9FA] text-[#121212] rounded-lg text-sm border border-[#E9ECEF]"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-[#121212] text-white rounded-xl hover:bg-[#2D2D2D] transition-colors">
                        View Details
                      </button>
                      <button className="px-6 py-3 border border-[#E9ECEF] text-[#121212] rounded-xl hover:bg-[#F8F9FA] transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
