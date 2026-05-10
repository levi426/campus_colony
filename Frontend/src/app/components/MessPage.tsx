import { Link } from 'react-router';
import { Star, Utensils, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { messProviders } from '../data/messProviders';

export default function MessPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="bg-[#20272B] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-4">Mess Options</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Static mess cards for now. You can later update each card with your own money, breakfast, lunch, and dinner details.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {messProviders.map((mess) => (
            <Link
              key={mess.id}
              to={`/mess/${mess.id}`}
              className="bg-white border border-[#DDE1E6] rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <ImageWithFallback src={mess.image} alt={mess.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 border border-[#DDE1E6]">
                  <Star className="w-4 h-4 fill-[#20272B] text-[#20272B]" />
                  <span className="font-bold">{mess.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-[#20272B]">{mess.name}</h3>
                  <ArrowRight className="w-4 h-4 text-[#717684] shrink-0 mt-1" />
                </div>
                <p className="text-sm text-[#717684] mb-4">{mess.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#20272B]">Rs. {mess.price}</span>
                  <span className="flex items-center gap-1 text-sm text-[#717684]">
                    <Utensils className="w-4 h-4" />
                    {mess.meals.length} meals
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
