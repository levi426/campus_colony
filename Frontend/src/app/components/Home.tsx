import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Star, MapPin, Building2, Store, Pill, BookOpen, Baby, Dumbbell, ArrowRight, MessageSquare, FileCheck, AlertCircle, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { messProviders } from '../data/messProviders';
import { getAreas } from '../../api/api';

interface Area {
  id: number;
  name: string;
  score: number;
  hospitals: number;
  pharmacies: number;
  libraries: number;
  playgrounds: number;
  gyms: number;
}

export default function Home() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAreas();
        setAreas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch areas');
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const areaFeatures = [
    { icon: Pill, label: 'Hospitals', description: 'Medical support available in the area', color: '#121212' },
    { icon: Store, label: 'Pharmacies', description: 'Medicine access near student housing', color: '#121212' },
    { icon: BookOpen, label: 'Libraries', description: 'Study-friendly spaces nearby', color: '#121212' },
    { icon: Baby, label: 'Playgrounds', description: 'Open spaces for daily breaks', color: '#121212' },
    { icon: Dumbbell, label: 'Gyms', description: 'Fitness options around the area', color: '#121212' },
  ];

  const totalFacilities = areas.reduce(
    (sum, area) => sum + area.hospitals + area.pharmacies + area.libraries + area.playgrounds + area.gyms,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#373F43] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Smart<br />Rentals<br />Near Your<br />Campus
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Discover verified hostels and accommodation options with practical area insights based on nearby facilities.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/area-insight"
                  className="px-6 py-3 bg-white text-[#373F43] rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Explore Now
                </Link>
                <button className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-[#373F43] transition-colors">
                  View Hostels
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="bg-[#4A5258] px-4 py-3 rounded-lg text-center">
                  <div className="font-bold">Areas</div>
                  <div className="text-sm text-gray-400">Mapped</div>
                </div>
                <div className="bg-[#4A5258] px-4 py-3 rounded-lg text-center">
                  <div className="font-bold">Type</div>
                  <div className="text-sm text-gray-400">All</div>
                </div>
                <div className="bg-[#4A5258] px-4 py-3 rounded-lg text-center">
                  <div className="font-bold">AI</div>
                  <div className="text-sm text-gray-400">Enabled</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1772475385289-17fbb414ed74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Modern Apartment"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#373F43]">Apartment Living</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#373F43] text-[#373F43]" />
                    <span className="text-[#373F43]">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">Modern, fully-furnished student accommodation</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#F8F9FA] text-[#373F43] rounded-lg text-sm border border-[#717684]">Verified</span>
                  <span className="px-3 py-1 bg-[#F8F9FA] text-[#373F43] rounded-lg text-sm border border-[#717684]">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area Intelligence Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#373F43] mb-4">
              Know the Area<br />Before You Rent
            </h2>
            <p className="text-gray-600 text-lg">
              Compare each area by the facilities that matter in daily student life: hospitals, pharmacies, libraries, playgrounds, and gyms.
            </p>
          </div>

          <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-[#717684]">
            <h3 className="font-bold text-[#373F43] mb-4">Area Insight Factors</h3>
            <div className="space-y-3">
              {areaFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                <div key={feature.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#373F43]" />
                    <span className="text-gray-700">{feature.label}</span>
                  </div>
                  <span className="text-sm font-medium text-[#373F43]">Tracked</span>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {areaFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#717684] rounded-xl p-6 hover:shadow-lg transition-shadow text-center"
              >
                <Icon className="w-10 h-10 mx-auto mb-4" style={{ color: feature.color }} />
                <h3 className="font-bold text-[#373F43] mb-2">{feature.label}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Area Facilities Section */}
      <div className="bg-[#F8F9FA] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#DEE2E6] rounded-2xl p-12 relative h-96">
              <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-4 p-12">
                {areaFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                  <div
                    key={index}
                    className="bg-white border-2 border-[#717684] rounded-lg flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Icon className="w-7 h-7 mx-auto mb-2 text-[#373F43]" />
                      <div className="font-bold text-[#373F43]">{feature.label}</div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#373F43] mb-6">
                Area Facilities<br />Clearly Listed
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                See what each area offers before choosing a rental. Campus Colony shows facility counts for hospitals, pharmacies, libraries, playgrounds, and gyms.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#717684]">
                  <div className="text-2xl font-bold text-[#373F43]">{areas.length}</div>
                  <div className="text-sm text-gray-600">Areas Listed</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#717684]">
                  <div className="text-2xl font-bold text-[#373F43]">{totalFacilities}</div>
                  <div className="text-sm text-gray-600">Facilities Tracked</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/area-insight" className="px-6 py-3 bg-[#000000] text-white rounded-xl hover:bg-[#373F43] transition-colors">
                  Explore Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Areas Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-[#373F43] mb-2">Explore Areas</h2>
            <p className="text-gray-600">Discover neighborhoods with complete facility insights</p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#373F43] animate-spin mb-4" />
            <p className="text-gray-600">Loading areas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4 mb-8">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-1">Error Loading Areas</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && areas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No areas available at the moment</p>
          </div>
        )}

        {!loading && !error && areas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <div key={area.id} className="bg-white border border-[#717684] rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-[#373F43] to-[#4A5258] p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{area.name}</h3>
                    <div className="flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-white text-white" />
                      <span className="font-bold text-black">{area.score.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-200">Area Score & Rating</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F8F9FA] p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Pill className="w-4 h-4 text-[#373F43]" />
                        <span className="text-xs text-gray-600">Hospitals</span>
                      </div>
                      <p className="text-2xl font-bold text-[#373F43]">{area.hospitals}</p>
                    </div>
                    <div className="bg-[#F8F9FA] p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Store className="w-4 h-4 text-[#373F43]" />
                        <span className="text-xs text-gray-600">Pharmacies</span>
                      </div>
                      <p className="text-2xl font-bold text-[#373F43]">{area.pharmacies}</p>
                    </div>
                    <div className="bg-[#F8F9FA] p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-[#373F43]" />
                        <span className="text-xs text-gray-600">Libraries</span>
                      </div>
                      <p className="text-2xl font-bold text-[#373F43]">{area.libraries}</p>
                    </div>
                    <div className="bg-[#F8F9FA] p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Baby className="w-4 h-4 text-[#373F43]" />
                        <span className="text-xs text-gray-600">Playgrounds</span>
                      </div>
                      <p className="text-2xl font-bold text-[#373F43]">{area.playgrounds}</p>
                    </div>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Dumbbell className="w-5 h-5 text-[#373F43]" />
                      <span className="font-bold text-[#373F43]">Gyms</span>
                    </div>
                    <p className="text-3xl font-bold text-[#373F43]">{area.gyms}</p>
                  </div>

                  <Link
                    to={`/area-insight?id=${area.id}`}
                    className="w-full px-4 py-2 bg-[#373F43] text-white rounded-lg hover:bg-[#4A5258] transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mess Providers Section */}
      <div className="bg-[#F8F9FA] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#373F43] mb-4">Premium Mess Services</h2>
            <p className="text-gray-600 text-lg">Healthy, hygienic, and affordable meal plans for students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {messProviders.map((mess) => (
              <Link key={mess.id} to={`/mess/${mess.id}`} className="bg-white border border-[#717684] rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-56">
                  <ImageWithFallback
                    src={mess.image}
                    alt={mess.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 border border-[#717684]">
                    <Star className="w-4 h-4 fill-[#373F43] text-[#373F43]" />
                    <span className="font-bold">{mess.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#373F43] mb-2">{mess.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{mess.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#373F43]">Rs. {mess.price}</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#717684]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-[#373F43] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ask Anything About<br />Any Hostel or Area</h2>
          <p className="text-gray-300 text-lg mb-8">
            Our AI-powered assistant with area score prediction helps you find the perfect accommodation. Get instant answers about pricing, facilities, safety, and more.
          </p>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#373F43] rounded-xl hover:bg-gray-100 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Chat with AI Assistant
          </Link>
        </div>
      </div>

      {/* 2 Steps Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#373F43] mb-4">2 Steps to Your Dream Home</h2>
          <p className="text-gray-600 text-lg">Simple and transparent process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: FileCheck, title: 'Register & Verify', description: 'Create your account with university email for verified student status' },
            { icon: MapPin, title: 'Browse & Compare', description: 'Explore hostels in Faisal Town with area insights and transparent pricing' },
            { icon: Building2, title: 'Book & Move In', description: 'Secure your room with instant confirmation and flexible payment options' },
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#373F43] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#373F43] mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#373F43] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">Copyright © 2026 Campus Colony - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
