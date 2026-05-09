import { Target, Users, Award, Heart, Shield, TrendingUp } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#121212] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">ABOUT US</h1>
          <p className="text-gray-300 text-lg">
            Connecting students with quality accommodation since 2024
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Content */}
        <div className="bg-white border border-[#E9ECEF] rounded-xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-[#121212] mb-6">About Campus Colony</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Campus Colony is Lahore's premier platform connecting students with verified, safe, and affordable
            hostel accommodations and mess services. We focus exclusively on Faisal Town, ensuring the highest
            quality standards for student living.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our mission is to make finding student accommodation simple, transparent, and reliable. We verify
            every property, provide detailed area insights, and use AI technology to match students with their
            perfect home away from home.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#F8F9FA] rounded-xl p-8 border border-[#E9ECEF]">
            <Target className="w-12 h-12 text-[#121212] mb-4" />
            <h2 className="text-2xl font-bold text-[#121212] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide every student in Faisal Town with access to safe, comfortable, and affordable living
              spaces that support their academic journey through verified listings and comprehensive area
              intelligence.
            </p>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-8 border border-[#E9ECEF]">
            <Heart className="w-12 h-12 text-[#121212] mb-4" />
            <h2 className="text-2xl font-bold text-[#121212] mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become Pakistan's most trusted student accommodation platform, setting new standards for
              quality, transparency, and student welfare through technology and verified partnerships.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white border border-[#E9ECEF] rounded-xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-[#121212] mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E9ECEF]">
                <Award className="w-8 h-8 text-[#121212]" />
              </div>
              <h3 className="font-bold text-[#121212] mb-3">Verified Listings</h3>
              <p className="text-gray-600">All hostels and mess providers are thoroughly vetted and verified for quality and safety</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E9ECEF]">
                <Users className="w-8 h-8 text-[#121212]" />
              </div>
              <h3 className="font-bold text-[#121212] mb-3">Student-Focused</h3>
              <p className="text-gray-600">Designed specifically for student needs, budgets, and lifestyle requirements</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E9ECEF]">
                <Shield className="w-8 h-8 text-[#121212]" />
              </div>
              <h3 className="font-bold text-[#121212] mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our team is always ready to assist you with any questions or concerns</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: '2,000+', label: 'Happy Students' },
            { value: '47', label: 'Verified Hostels' },
            { value: '15+', label: 'Mess Providers' },
            { value: '4.8', label: 'Average Rating' },
          ].map((stat, index) => (
            <div key={index} className="bg-white border border-[#E9ECEF] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[#121212] mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#121212] rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Find your perfect student accommodation today
          </p>
          <button className="bg-white text-[#121212] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
