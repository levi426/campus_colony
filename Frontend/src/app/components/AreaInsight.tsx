import { useEffect, useState } from 'react';
import { MapPin, Pill, Store, BookOpen, Baby, Dumbbell, AlertCircle, Loader2, TrendingUp } from 'lucide-react';
import { getAreas } from '../../api/api';

interface Area {
  id: number;
  name: string;
  city?: string;
  score: number;
  hospitals: number;
  pharmacies: number;
  libraries: number;
  playgrounds: number;
  gyms: number;
}

export default function AreaInsight() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-4">Area Insights for<br />Lahore Students</h1>
          <p className="text-gray-300 text-lg">
            Comprehensive data-driven insights for student neighborhoods with complete facility statistics
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#121212] animate-spin mb-4" />
            <p className="text-gray-600">Loading areas...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4 mb-8">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-1">Error Loading Areas</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && areas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No areas available at the moment</p>
          </div>
        )}

        {/* Areas Display */}
        {!loading && !error && areas.length > 0 && (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#121212] mb-2">All Areas</h2>
              <p className="text-gray-600">Showing {areas.length} neighborhoods with facility information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white border border-[#E9ECEF] rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Header with Score */}
                  <div className="bg-gradient-to-r from-[#121212] to-[#2D2D2D] p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{area.name}</h3>
                        {area.city && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{area.city}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <TrendingUp className="w-5 h-5" />
                          <span className="text-sm">Area Score</span>
                        </div>
                        <div style={{ color: '#000000' }} className="text-4xl font-bold bg-white rounded-lg px-4 py-2">
                          {area.score.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Facilities Grid */}
                  <div className="p-6">
                    <h4 className="font-bold text-[#121212] mb-4">Facilities & Amenities</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Hospitals */}
                      <div className="bg-[#F8F9FA] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="w-5 h-5 text-[#121212]" />
                          <span className="text-sm font-medium text-[#121212]">Hospitals</span>
                        </div>
                        <div className="text-3xl font-bold text-[#121212]">{area.hospitals}</div>
                      </div>

                      {/* Pharmacies */}
                      <div className="bg-[#F8F9FA] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Store className="w-5 h-5 text-[#121212]" />
                          <span className="text-sm font-medium text-[#121212]">Pharmacies</span>
                        </div>
                        <div className="text-3xl font-bold text-[#121212]">{area.pharmacies}</div>
                      </div>

                      {/* Libraries */}
                      <div className="bg-[#F8F9FA] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-5 h-5 text-[#121212]" />
                          <span className="text-sm font-medium text-[#121212]">Libraries</span>
                        </div>
                        <div className="text-3xl font-bold text-[#121212]">{area.libraries}</div>
                      </div>

                      {/* Playgrounds */}
                      <div className="bg-[#F8F9FA] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Baby className="w-5 h-5 text-[#121212]" />
                          <span className="text-sm font-medium text-[#121212]">Playgrounds</span>
                        </div>
                        <div className="text-3xl font-bold text-[#121212]">{area.playgrounds}</div>
                      </div>

                      {/* Gyms */}
                      <div className="bg-[#F8F9FA] p-4 rounded-lg col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Dumbbell className="w-5 h-5 text-[#121212]" />
                          <span className="text-sm font-medium text-[#121212]">Gyms</span>
                        </div>
                        <div className="text-3xl font-bold text-[#121212]">{area.gyms}</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#E9ECEF]">
                    <p className="text-sm text-gray-600">
                      Complete facility statistics for informed neighborhood selection
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
