import { Outlet, Link, useLocation } from 'react-router';
import { Building2 } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/mess', label: 'Mess' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/area-insight', label: 'Area Insight' },
    { path: '/ai-assistant', label: 'AI Assistant' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <header className="bg-white border-b border-[#DDE1E6] px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <Link to="/home" className="flex items-center gap-3 text-[#20272B]">
            <div className="w-10 h-10 bg-[#20272B] rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Campus Colony</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-[#20272B] text-white'
                    : 'hover:bg-[#F0F2F4] text-[#373F43]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 border border-[#AAB1BA] text-[#373F43] rounded-lg hover:bg-[#F0F2F4] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#20272B] text-white rounded-lg hover:bg-[#373F43] transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
        <nav className="lg:hidden flex items-center gap-1 overflow-x-auto pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-[#000000] text-white'
                  : 'hover:bg-[#F8F9FA] text-[#373F43]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
