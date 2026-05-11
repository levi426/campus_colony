import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, MapPin } from 'lucide-react';
import { getFavourites, getListingDetails, removeFavourite, resolveImageUrl } from '../../api/api';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Listing {
  id: number;
  title: string;
  description?: string;
  price: number;
  type: string;
  image_url?: string;
  area?: { id: number; name: string } | null;
  landlord?: { id: number; name: string; phone?: string } | null;
}

interface FavouriteListing {
  id: number;
  listing_id: number;
  listing: Listing;
}

export default function MyRentals({ onBrowse }: { onBrowse?: () => void }) {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState<FavouriteListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      setLoading(true);
      const data = await getFavourites();
      const rows = Array.isArray(data) ? data : [];
      const resolved = await Promise.all(
        rows.map(async (fav) => {
          const listingId = Number(fav.listing_id ?? fav.listing?.id ?? fav.id);
          const listing = fav.listing || (listingId ? await getListingDetails(listingId) : null);

          return listing
            ? {
                id: Number(fav.id ?? listingId),
                listing_id: listingId || listing.id,
                listing,
              }
            : null;
        })
      );
      setFavourites(resolved.filter(Boolean) as FavouriteListing[]);
    } catch (err) {
      console.error('Failed to load favourites:', err);
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (listingId: number) => {
    try {
      await removeFavourite(listingId);
      setMessage('Removed from favourites');
      setFavourites(fav => fav.filter(f => f.listing_id !== listingId));
    } catch (err) {
      console.error('Failed to remove favourite:', err);
      setMessage('Failed to remove');
    }
  };

  if (loading) {
    return (
      <section className="bg-white border border-[#DDE1E6] rounded-lg p-6">
        <div className="text-center text-[#717684]">Loading your favourites...</div>
      </section>
    );
  }

  if (favourites.length === 0) {
    return (
      <section className="bg-white border border-[#DDE1E6] rounded-lg p-6">
        <div className="text-center">
          <Heart className="w-12 h-12 text-[#DDE1E6] mx-auto mb-3" />
          <p className="text-[#717684] mb-2">No favourite rentals yet</p>
          <button
            onClick={() => onBrowse ? onBrowse() : navigate('/user')}
            className="text-[#0066CC] hover:text-[#0052A3]"
          >
            Browse rentals
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="bg-white border border-[#DDE1E6] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-5 h-5 text-[#20272B]" />
          <h2 className="text-2xl font-bold text-[#20272B]">My Favourite Rentals</h2>
        </div>
        {message && (
          <p className="text-sm text-[#0066CC] mb-4">{message}</p>
        )}
        <p className="text-[#717684]">You have {favourites.length} favourite listing{favourites.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              onClick={() => navigate(`/listing/${fav.listing_id}`)}
              className="cursor-pointer"
            >
              <ImageWithFallback
                src={resolveImageUrl(fav.listing.image_url)}
                alt={fav.listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-[#20272B] mb-2 line-clamp-2">{fav.listing.title}</h3>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-lg font-bold text-[#0066CC]">Rs. {fav.listing.price.toLocaleString()}</span>
                  <span className="text-xs px-2 py-1 bg-[#E8F0FE] text-[#0066CC] rounded">{fav.listing.type}</span>
                </div>
                {fav.listing.area && (
                  <div className="flex items-center gap-1 text-sm text-[#717684] mb-3">
                    <MapPin className="w-4 h-4" />
                    {fav.listing.area.name}
                  </div>
                )}
                {fav.listing.landlord && (
                  <p className="text-sm text-[#717684] mb-3">Landlord: {fav.listing.landlord.name}</p>
                )}
                <p className="text-sm text-[#717684] line-clamp-2 mb-4">{fav.listing.description}</p>
              </div>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => navigate(`/listing/${fav.listing_id}`)}
                className="flex-1 px-3 py-2 bg-[#20272B] text-white rounded-lg hover:bg-[#404040] transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => handleRemove(fav.listing_id)}
                className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-red-600" />
                Remove from Favourite
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
