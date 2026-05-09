import { useParams, Link } from 'react-router';
import { Star, Utensils, Clock, MapPin, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MessDetails() {
  const { id } = useParams();

  const messData: Record<string, any> = {
    '1': {
      name: 'Faisal Town Tiffin',
      description: 'Premium Quality Meals',
      price: '8,000',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      location: 'Block A, Faisal Town',
      phone: '+92 300 1234567',
      menu: {
        breakfast: ['Paratha + Omelette', 'Halwa Puri', 'Tea/Coffee', 'Fresh Juice'],
        lunch: ['Chicken Karahi', 'Biryani', 'Dal Makhani', 'Mixed Vegetables', 'Raita', 'Salad'],
        dinner: ['Qeema', 'Chicken Tikka', 'Palak Paneer', 'Naan/Roti', 'Rice', 'Dessert'],
      },
      features: ['Hygienic Kitchen', 'Timely Delivery', 'Customizable Menu', 'Monthly Plans'],
    },
    '2': {
      name: 'Student Meal Express',
      description: 'Healthy Daily Nutrition',
      price: '7,500',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1583065756216-334ab22b5a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      location: 'Block B, Faisal Town',
      phone: '+92 300 7654321',
      menu: {
        lunch: ['Chicken Handi', 'Vegetable Pulao', 'Lentils', 'Chapati', 'Raita'],
        dinner: ['Beef Nihari', 'Aloo Gosht', 'Mixed Dal', 'Roti', 'Sweet Dish'],
      },
      features: ['Fresh Ingredients', 'Budget Friendly', 'Home-style Cooking', 'Weekly Menu'],
    },
    '3': {
      name: 'Campus Kitchen',
      description: 'Home-Style Cooking',
      price: '9,000',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1733410647375-3be1697aa4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      location: 'Block C, Faisal Town',
      phone: '+92 300 9876543',
      menu: {
        breakfast: ['Egg Sandwich', 'Cereals', 'Milk/Tea', 'Fresh Fruits'],
        lunch: ['BBQ Chicken', 'White Karahi', 'Chana Masala', 'Naan', 'Rice', 'Salad'],
        dinner: ['Mutton Korma', 'Chicken Jalfrezi', 'Dal Tadka', 'Roti', 'Kheer'],
      },
      features: ['Organic Ingredients', 'Premium Quality', 'Flexible Timing', 'Special Occasions Menu'],
    },
  };

  const mess = messData[id || '1'];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[#121212] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white border border-[#E9ECEF] rounded-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <ImageWithFallback
              src={mess.image}
              alt={mess.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Star className="w-5 h-5 fill-[#121212] text-[#121212]" />
              <span className="font-bold">{mess.rating}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#121212] mb-2">{mess.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{mess.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-[#F8F9FA] rounded-xl">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-[#121212]" />
                <span>{mess.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-[#121212]" />
                <span>{mess.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5 text-[#121212]" />
                <div>
                  <span className="text-2xl font-bold text-[#121212]">Rs. {mess.price}</span>
                  <span className="text-sm text-gray-600">/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white border border-[#E9ECEF] rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#121212] mb-6 flex items-center gap-2">
            <Utensils className="w-8 h-8" />
            Weekly Menu
          </h2>

          <div className="space-y-8">
            {Object.entries(mess.menu).map(([mealType, items]: [string, any]) => (
              <div key={mealType}>
                <h3 className="text-xl font-bold text-[#121212] mb-4 capitalize flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {mealType}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 bg-[#F8F9FA] px-4 py-3 rounded-lg border border-[#E9ECEF]">
                      <CheckCircle className="w-5 h-5 text-[#121212]" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-[#121212] mb-6">Features & Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mess.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#121212]" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 bg-[#121212] text-white py-4 rounded-xl hover:bg-[#2D2D2D] transition-colors">
            Subscribe Now
          </button>
          <button className="flex-1 border border-[#E9ECEF] text-[#121212] py-4 rounded-xl hover:bg-[#F8F9FA] transition-colors">
            Contact Provider
          </button>
        </div>
      </div>
    </div>
  );
}
