import { Link } from 'react-router';
import { Star, MapPin, Shield, Bus, Wifi, Heart, Users, Building2, Utensils, Store, Pill, BookOpen, Music, Baby, Dumbbell, ArrowRight, MessageSquare, FileCheck, Map } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { messProviders } from '../data/messProviders';

export default function Home() {
  const areaFeatures = [
    { icon: Bus, label: 'Nearby Parking', description: 'Secure parking within 500m', color: '#121212' },
    { icon: Shield, label: 'Insurance Policy', description: 'Comprehensive coverage', color: '#121212' },
    { icon: MapPin, label: 'Travel Cost', description: 'Affordable transport links', color: '#121212' },
    { icon: Store, label: 'Online Shops', description: 'Delivery available 24/7', color: '#121212' },
    { icon: Pill, label: 'Medical Care', description: 'Clinics & hospitals nearby', color: '#121212' },
    { icon: Dumbbell, label: 'Gym', description: 'Fitness centers in area', color: '#121212' },
    { icon: Baby, label: 'Kids Play', description: 'Safe play areas', color: '#121212' },
    { icon: Music, label: 'Music Class', description: 'Cultural & arts centers', color: '#121212' },
  ];

  const hostels = [
    {
      id: 1,
      name: 'Faisal Block-A Premium',
      block: 'Block A',
      location: 'Faisal Town, Lahore',
      price: '15,000',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1772475385327-ae6212f900aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      beds: 50,
      lat: 31.4217,
      lng: 74.2776,
    },
    {
      id: 2,
      name: 'The Residency (Block C)',
      block: 'Block C',
      location: 'Faisal Town, Lahore',
      price: '18,000',
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      beds: 40,
      lat: 31.4197,
      lng: 74.2756,
    },
    {
      id: 3,
      name: 'D-Block Executive Studio',
      block: 'Block D',
      location: 'Faisal Town, Lahore',
      price: '16,500',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      beds: 60,
      lat: 31.4237,
      lng: 74.2796,
    },
  ];

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
                Discover verified hostels and accommodation options in Faisal Town with complete area insights and transparent pricing.
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
                  <div className="font-bold">Location</div>
                  <div className="text-sm text-gray-400">Faisal Town</div>
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
              Get detailed insights about facilities, transport, safety, and amenities in each block of Faisal Town. Make informed decisions with our comprehensive area intelligence data.
            </p>
          </div>

          <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-[#717684]">
            <h3 className="font-bold text-[#373F43] mb-4">Popular Filters & Scores</h3>
            <div className="space-y-3">
              {['WiFi Coverage', 'Security', 'Transport Access', 'Power Backup'].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#717684] rounded-full" style={{ width: `${90 - index * 5}%` }} />
                    </div>
                    <span className="font-bold text-[#373F43]">{90 - index * 5}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Faisal Town Map Section */}
      <div className="bg-[#F8F9FA] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#DEE2E6] rounded-2xl p-12 relative h-96">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-12">
                {['Block A', 'Block B', 'Block C', 'Block D'].map((block, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-[#717684] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#373F43] hover:text-white transition-all group"
                  >
                    <div className="text-center">
                      <MapPin className="w-6 h-6 mx-auto mb-2 group-hover:text-white" />
                      <div className="font-bold">{block}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#373F43] mb-6">
                Your Local Area<br />Fully Mapped
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Explore each block of Faisal Town with our interactive map. See hostel density, average pricing, and area scores for Blocks A, B, C, and D.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#717684]">
                  <div className="text-2xl font-bold text-[#373F43]">Rs. 16,500</div>
                  <div className="text-sm text-gray-600">Avg. Block Price</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#717684]">
                  <div className="text-2xl font-bold text-[#373F43]">47</div>
                  <div className="text-sm text-gray-600">Total Hostels</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/area-insight" className="px-6 py-3 bg-[#000000] text-white rounded-xl hover:bg-[#373F43] transition-colors">
                  Explore Blocks
                </Link>
                <button className="px-6 py-3 border border-[#717684] text-[#373F43] rounded-xl hover:bg-[#F8F9FA] transition-colors">
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Picks Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-[#373F43] mb-2">Top Picks in Faisal Town</h2>
            <p className="text-gray-600">Verified & highly-rated student accommodation</p>
          </div>
          <Link to="/area-insight" className="flex items-center gap-2 text-[#373F43] hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <div key={hostel.id} className="bg-white border border-[#717684] rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <ImageWithFallback
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 border border-[#717684]">
                  <Star className="w-4 h-4 fill-[#373F43] text-[#373F43]" />
                  <span className="font-bold">{hostel.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-[#000000] text-white px-3 py-1 rounded-full text-sm">
                  {hostel.block}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#373F43] mb-2">{hostel.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{hostel.location}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-[#373F43]">Rs. {hostel.price}</span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`https://www.google.com/maps?q=${hostel.lat},${hostel.lng}`, '_blank')}
                    className="flex-1 px-4 py-2 bg-[#373F43] text-white rounded-lg hover:bg-[#4A5258] transition-colors flex items-center justify-center gap-2"
                  >
                    <Map className="w-4 h-4" />
                    Show on Map
                  </button>
                  <button className="px-4 py-2 border border-[#717684] text-[#373F43] rounded-lg hover:bg-[#F8F9FA] transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
