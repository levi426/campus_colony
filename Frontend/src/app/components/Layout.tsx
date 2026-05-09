import { Outlet, Link, useLocation } from 'react-router';
import { Home, MapPin, MessageSquare, Users, Phone, Menu, X, LayoutDashboard, Building2, BarChart3, FileText, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  isAdmin: boolean;
}

export default function Layout({ isAdmin }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/ai-assistant', label: 'AI Assistant' },
    { path: '/area-insight', label: 'Area Insight' },
  ];

  const sidebarLinks = isAdmin ? [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/hostels', label: 'Hostel Management', icon: Building2 },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/reports', label: 'Area Report', icon: BarChart3 },
    { path: '/admin/bookings', label: 'Bookings', icon: FileText },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ] : [
    { path: '/home', label: 'Browse Hostels', icon: Home },
    { path: '/area-insight', label: 'Area Score', icon: MapPin },
    { path: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-[#717684] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5 text-[#373F43]" /> : <Menu className="w-5 h-5 text-[#373F43]" />}
          </button>
          <h1 className="text-2xl font-bold text-[#373F43]">Campus Colony</h1>
        </div>

        <nav className="hidden md:flex items-center gap-1">
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

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-[#717684] text-[#373F43] rounded-lg hover:bg-[#373F43] hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#373F43] transition-colors"
          >
            Register
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-[#373F43] text-white h-[calc(100vh-73px)] sticky top-[73px] transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          <div className="p-6 space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all ${
                    isActive
                      ? 'bg-white text-[#000000]'
                      : 'hover:bg-[#4A5258] text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-6 mt-6 border-t border-[#717684]">
              <button className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#4A5258] text-white w-full transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
