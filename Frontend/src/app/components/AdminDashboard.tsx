import { TrendingUp, Building2, Users, DollarSign, Star, MapPin, BarChart3, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Hostels', value: '+2,847', subValue: '+3 this week', icon: Building2, color: '#121212', trend: '+12%' },
    { label: 'Active Users', value: '+2,100', subValue: 'Active', icon: Users, color: '#121212', trend: '+5%' },
    { label: 'Monthly Revenue', value: '+1,243', subValue: 'Revenue', icon: DollarSign, color: '#121212', trend: '+15%' },
  ];

  const hostelData = [
    {
      hostel: 'Faisal Block-A Premium',
      location: 'Block A, Faisal Town',
      beds: '40/50',
      revenue: '12,500',
      rating: '4.8',
      status: 'Active',
      occupancy: 80
    },
    {
      hostel: 'The Residency',
      location: 'Block C, Faisal Town',
      beds: '35/40',
      revenue: '15,200',
      rating: '4.9',
      status: 'Active',
      occupancy: 87
    },
    {
      hostel: 'D-Block Executive',
      location: 'Block D, Faisal Town',
      beds: '45/60',
      revenue: '18,000',
      rating: '4.7',
      status: 'Active',
      occupancy: 75
    },
    {
      hostel: 'B-Block Residence',
      location: 'Block B, Faisal Town',
      beds: '52/55',
      revenue: '11,800',
      rating: '4.6',
      status: 'Active',
      occupancy: 95
    },
    {
      hostel: 'Elite Hostel A-Block',
      location: 'Block A, Faisal Town',
      beds: '28/35',
      revenue: '9,500',
      rating: '4.5',
      status: 'Active',
      occupancy: 80
    },
  ];

  const userManagement = [
    { name: 'Ahmed Ali', email: 'ahmed@university.edu.pk', hostel: 'Block A Premium', status: 'Paid', joined: '2026-01-15' },
    { name: 'Fatima Khan', email: 'fatima@university.edu.pk', hostel: 'The Residency', status: 'Paid', joined: '2026-02-20' },
    { name: 'Hassan Raza', email: 'hassan@university.edu.pk', hostel: 'D-Block Executive', status: 'Pending', joined: '2026-03-10' },
    { name: 'Ayesha Malik', email: 'ayesha@university.edu.pk', hostel: 'B-Block Residence', status: 'Paid', joined: '2026-04-05' },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#121212] mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Manage your student accommodation platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#E9ECEF] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[#F8F9FA] rounded-lg">
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#121212] mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
                <div className="text-sm text-gray-500 mt-2">{stat.subValue}</div>
              </div>
            );
          })}
        </div>

        {/* Hostel Performance Table */}
        <div className="bg-white border border-[#E9ECEF] rounded-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-[#E9ECEF]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#121212] mb-1">Hostel Performance - Latest</h2>
                <p className="text-gray-600">Real-time occupancy and revenue data</p>
              </div>
              <button className="px-4 py-2 border border-[#E9ECEF] rounded-lg hover:bg-[#F8F9FA] transition-colors">
                Export Data
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Hostel</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Location</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Beds</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Revenue</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Rating</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {hostelData.map((hostel, index) => (
                  <tr key={index} className="border-t border-[#E9ECEF] hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#121212]">{hostel.hostel}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{hostel.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{hostel.beds}</td>
                    <td className="py-4 px-6 font-medium text-[#121212]">Rs. {hostel.revenue}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#121212] text-[#121212]" />
                        <span className="font-medium">{hostel.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        {hostel.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#121212] rounded-full"
                            style={{ width: `${hostel.occupancy}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-[#121212]">{hostel.occupancy}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white border border-[#E9ECEF] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#E9ECEF]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#121212] mb-1">User Management</h2>
                <p className="text-gray-600">Recent user registrations and payment status</p>
              </div>
              <button className="px-4 py-2 bg-[#121212] text-white rounded-lg hover:bg-[#2D2D2D] transition-colors">
                Add New User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Name</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Email</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Hostel</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Payment Status</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Joined Date</th>
                  <th className="text-left py-4 px-6 font-medium text-[#121212]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userManagement.map((user, index) => (
                  <tr key={index} className="border-t border-[#E9ECEF] hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="font-medium text-[#121212]">{user.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{user.email}</td>
                    <td className="py-4 px-6 text-gray-600">{user.hostel}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${
                        user.status === 'Paid'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status === 'Paid' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{user.joined}</td>
                    <td className="py-4 px-6">
                      <button className="px-3 py-1 border border-[#E9ECEF] rounded-lg hover:bg-[#F8F9FA] transition-colors text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
