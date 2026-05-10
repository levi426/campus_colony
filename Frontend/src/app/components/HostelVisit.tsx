import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { getListings, resolveImageUrl } from '../../api/api';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function HostelVisit() {
  const { id } = useParams();
  const location = useLocation();
  const [hostel, setHostel] = useState<any | null>((location.state as any)?.hostel || null);
  const [loading, setLoading] = useState(!hostel);

  useEffect(() => {
    if (hostel) return;

    getListings()
      .then((rows) => {
        const match = Array.isArray(rows) ? rows.find((item) => String(item.id) === id) : null;
        setHostel(match || null);
      })
      .finally(() => setLoading(false));
  }, [hostel, id]);

  if (loading) {
    return <div className="min-h-screen bg-[#F7F8FA] p-8 text-[#20272B]">Loading hostel...</div>;
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] p-8">
        <Link to="/user" className="inline-flex items-center gap-2 text-[#20272B] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to User Dashboard
        </Link>
        <div className="bg-white border border-[#DDE1E6] rounded-lg p-6">Hostel not found.</div>
      </div>
    );
  }

  const imageSrc = resolveImageUrl(hostel.image_url);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="bg-[#20272B] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link to="/user" className="inline-flex items-center gap-2 text-white hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to User Dashboard
          </Link>
          <h1 className="text-4xl font-bold">{hostel.title}</h1>
          <p className="text-gray-300 mt-2">{hostel.type || 'Rental listing'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden">
          <div className="h-80 bg-[#E9ECEF]">
            {imageSrc ? (
              <ImageWithFallback src={imageSrc} alt={hostel.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#717684]">
                <Building2 className="w-16 h-16 mb-3" />
                <span>No picture returned from backend for this listing.</span>
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              <div>
                <h2 className="text-2xl font-bold text-[#20272B] mb-3">Hostel Details</h2>
                <p className="text-[#717684] leading-relaxed mb-6">
                  {hostel.description || 'No description added yet.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem label="Type" value={hostel.type || '-'} />
                  <DetailItem label="Area ID" value={hostel.area_id || '-'} />
                  <DetailItem label="Landlord ID" value={hostel.landlord_id || '-'} />
                  <DetailItem label="Listing ID" value={hostel.id || '-'} />
                </div>
              </div>

              <aside className="bg-[#F7F8FA] border border-[#DDE1E6] rounded-lg p-6 h-fit">
                <div className="text-sm text-[#717684] mb-1">Monthly Rent</div>
                <div className="text-3xl font-bold text-[#20272B] mb-6">Rs. {hostel.price}</div>

                {(hostel.latitude || hostel.longitude) && (
                  <div className="space-y-3 text-[#20272B]">
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin className="w-4 h-4" />
                      Location Coordinates
                    </div>
                    <DetailItem label="Latitude" value={hostel.latitude || '-'} />
                    <DetailItem label="Longitude" value={hostel.longitude || '-'} />
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-[#DDE1E6] rounded-lg p-4">
      <div className="text-sm text-[#717684] mb-1">{label}</div>
      <div className="font-bold text-[#20272B]">{value}</div>
    </div>
  );
}
