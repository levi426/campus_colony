import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Heart, MapPin, Phone, Star } from 'lucide-react';
import { getListingDetails, getListingReviews, addFavourite, removeFavourite, createReview, getFavourites } from '../../api/api';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { resolveImageUrl } from '../../api/api';
import ListingMap from './ListingMap';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  image_url: string;
  latitude?: number | null;
  longitude?: number | null;
  area?: { id: number; name: string };
  landlord?: { id: number; name: string; phone: string };
}

interface Review {
  id: number;
  content: string;
  rating: number;
  user_id: number;
  created_at: string;
}

interface ListingReviews {
  average_rating: number;
  total_reviews: number;
  reviews: Review[];
}

export default function ListingDetails() {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<ListingReviews | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const id = parseInt(listingId || '0');
        if (!id) {
          setListing(null);
          return;
        }
        const [listingData, reviewsData, favouritesData] = await Promise.all([
          getListingDetails(id),
          getListingReviews(id),
          getFavourites().catch(() => [])
        ]);
        setListing(listingData);
        setReviews(reviewsData);
        const favouriteIds = Array.isArray(favouritesData)
          ? favouritesData.map((fav) => Number(fav.listing_id ?? fav.listing?.id ?? fav.id)).filter(Boolean)
          : [];
        setIsFavourite(favouriteIds.includes(id));
      } catch (err) {
        console.error('Failed to load listing details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [listingId]);

  const toggleFavourite = async () => {
    if (!listing) return;
    try {
      if (isFavourite) {
        await removeFavourite(listing.id);
      } else {
        await addFavourite(listing.id);
      }
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.error('Failed to toggle favourite:', err);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing || !reviewContent.trim()) {
      setMessage('Please write a review');
      return;
    }

    try {
      setSubmitting(true);
      await createReview(listing.id, reviewContent, reviewRating);
      setMessage('Review added successfully');
      setReviewContent('');
      setReviewRating(5);
      // Refresh reviews
      const reviewsData = await getListingReviews(listing.id);
      setReviews(reviewsData);
    } catch (err) {
      setMessage('Failed to add review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] p-6">
        <div className="max-w-4xl mx-auto text-center">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] p-6">
        <div className="max-w-4xl mx-auto text-center">Listing not found</div>
      </div>
    );
  }

  const latitude = listing.latitude == null ? null : Number(listing.latitude);
  const longitude = listing.longitude == null ? null : Number(listing.longitude);
  const hasLocation = latitude !== null && longitude !== null && Number.isFinite(latitude) && Number.isFinite(longitude);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#20272B] mb-6 hover:text-[#404040]"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden mb-6">
          <div className="relative">
            <ImageWithFallback
              src={resolveImageUrl(listing.image_url)}
              alt={listing.title}
              className="w-full h-96 object-cover"
            />
            <button
              onClick={toggleFavourite}
              className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                isFavourite
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-[#20272B] hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-6 h-6" fill={isFavourite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-[#20272B] mb-2">{listing.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-[#0066CC]">Rs. {listing.price.toLocaleString()}</span>
                <span className="px-3 py-1 bg-[#E8F0FE] text-[#0066CC] rounded-full text-sm font-medium">{listing.type}</span>
              </div>
            </div>

            <p className="text-[#717684]">{listing.description}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={toggleFavourite}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isFavourite
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-[#20272B] bg-[#20272B] text-white hover:bg-[#404040]'
                }`}
              >
                <Heart className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} />
                {isFavourite ? 'Remove Favourite' : 'Add to Favourite'}
              </button>
              {hasLocation ? (
                <button
                  onClick={() => setShowMap((current) => !current)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#DDE1E6] bg-white text-[#20272B] hover:bg-[#F7F8FA] transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  {showMap ? 'Hide Map' : 'Show on Map'}
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#DDE1E6] bg-[#F7F8FA] text-[#717684]">
                  <MapPin className="w-5 h-5" />
                  Location not available
                </span>
              )}
            </div>

            {showMap && hasLocation && (
              <ListingMap latitude={latitude} longitude={longitude} title={listing.title} />
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DDE1E6]">
              <div>
                <p className="text-sm text-[#717684] mb-1">Area</p>
                <p className="font-semibold text-[#20272B]">{listing.area?.name || 'N/A'}</p>
              </div>
              {listing.landlord && (
                <div>
                  <p className="text-sm text-[#717684] mb-1">Landlord</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-[#20272B]">{listing.landlord.name}</p>
                    <a
                      href={`tel:${listing.landlord.phone}`}
                      className="flex items-center gap-2 text-[#0066CC] hover:text-[#0052A3]"
                    >
                      <Phone className="w-4 h-4" />
                      {listing.landlord.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#DDE1E6] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-5 h-5 text-[#20272B]" />
            <h2 className="text-2xl font-bold text-[#20272B]">Reviews</h2>
          </div>

          {reviews && (
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-[#20272B]">{reviews.average_rating.toFixed(1)}</span>
                <span className="text-[#717684]">out of 5 ({reviews.total_reviews} reviews)</span>
              </div>
            </div>
          )}

          <form onSubmit={submitReview} className="mb-8 p-4 bg-[#F7F8FA] rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#717684] mb-2">Rating</label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDE1E6] rounded-lg"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} star{r !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#717684] mb-2">Your Review</label>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Share your experience..."
                className="w-full px-3 py-2 border border-[#DDE1E6] rounded-lg"
                rows={4}
              />
            </div>
            {message && (
              <p className="mb-2 text-sm text-[#0066CC]">{message}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#20272B] text-white rounded-lg disabled:opacity-60"
            >
              {submitting ? 'Adding...' : 'Add Review'}
            </button>
          </form>

          <div className="space-y-4">
            {reviews?.reviews && reviews.reviews.length > 0 ? (
              reviews.reviews.map((review) => (
                <div key={review.id} className="p-4 border border-[#DDE1E6] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[#DDE1E6]'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#717684]">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[#20272B]">{review.content}</p>
                </div>
              ))
            ) : (
              <p className="text-[#717684]">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
