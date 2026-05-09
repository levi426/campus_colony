import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Phone, Lock, Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: (isAdmin: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = phone === 'admin';
    onLogin(isAdmin);
    navigate(isAdmin ? '/admin' : '/home');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Left Panel - Dark */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121212] text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <Building2 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">CampusColony</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
              <p className="text-gray-300 text-lg">Access your account to manage hostels, bookings, and area insights.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#121212] font-bold text-sm mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Verified Listings</h3>
                  <p className="text-gray-400 text-sm">All hostels are thoroughly vetted</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#121212] font-bold text-sm mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Area Intelligence</h3>
                  <p className="text-gray-400 text-sm">Complete insights for Faisal Town</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#121212] font-bold text-sm mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Smart recommendations & support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-sm">
          Copyright © 2026 Campus Colony
        </div>
      </div>

      {/* Right Panel - Light */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E9ECEF]">
            <h2 className="text-3xl font-bold text-[#121212] mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Login to your Campus Colony account</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="w-4 h-4 accent-[#121212]" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#121212] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] text-white py-3 rounded-xl hover:bg-[#2D2D2D] transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#121212] font-medium hover:underline">
                Register now
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-[#E9ECEF]">
              <p className="text-xs text-center text-gray-500">
                Demo: Use phone "admin" for admin dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
