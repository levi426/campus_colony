import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { User, Phone, Mail, Lock, MapPin, Home, DollarSign, ArrowLeft } from 'lucide-react';
import { signupUser } from '../../api/api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    block: '',
    roomPreference: '',
    budget: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signupUser(formData.name, formData.email, formData.password || 'student123', formData.block);
      localStorage.setItem('cc_name', formData.name);
      localStorage.setItem('cc_email', formData.email);
      navigate('/login');
    } catch {
      setError('Registration failed. This email may already exist or backend signup is unavailable.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E9ECEF]">
          <Link to="/home" className="inline-flex items-center gap-2 text-[#121212] hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#121212] mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join Campus Colony - Student Housing Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mandatory Fields Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#121212] uppercase tracking-wide">Mandatory Information</h3>

              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  University Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="your.email@university.edu.pk"
                />
              </div>
            </div>

            {/* Optional Fields Section */}
            <div className="space-y-4 pt-6 border-t border-[#E9ECEF]">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Optional Preferences</h3>

              <div>
                <label className="block text-gray-600 font-normal mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-60" />
                  Preferred Block
                </label>
                <select
                  value={formData.block}
                  onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#121212] bg-white text-gray-600"
                >
                  <option value="">Select a block</option>
                  <option value="block-a">Block A - Faisal Town</option>
                  <option value="block-b">Block B - Faisal Town</option>
                  <option value="block-c">Block C - Faisal Town</option>
                  <option value="block-d">Block D - Faisal Town</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-normal mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 opacity-60" />
                  Room Preference
                </label>
                <select
                  value={formData.roomPreference}
                  onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#121212] bg-white text-gray-600"
                >
                  <option value="">Select room type</option>
                  <option value="single">Single Room</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                  <option value="dormitory">Dormitory</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-normal mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 opacity-60" />
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#121212] bg-white text-gray-600"
                >
                  <option value="">Select your budget</option>
                  <option value="low">Under Rs. 12,000</option>
                  <option value="medium">Rs. 12,000 - 18,000</option>
                  <option value="high">Rs. 18,000 - 25,000</option>
                  <option value="premium">Above Rs. 25,000</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-normal mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 opacity-60" />
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#121212] bg-white text-gray-600"
                  placeholder="Create a password (optional)"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#121212] text-white py-3 rounded-xl hover:bg-[#2D2D2D] transition-colors mt-8"
            >
              Create Account
            </button>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#121212] font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
