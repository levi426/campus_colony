import { useState } from 'react';
import { Link } from 'react-router';
import { Bot, Building2, Loader2, MapPin, MessageSquare, Search, Send, Sparkles } from 'lucide-react';
import { chatbotSearch, resolveImageUrl } from '../../api/api';

interface ListingResult {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  type?: string | null;
  image_url?: string | null;
  area_id?: number | null;
  area?: { id: number; name: string } | null;
  landlord?: { id: number; name: string; phone?: string } | null;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  results?: ListingResult[];
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! Ask me for rentals by area, property type, rent range, or rating. I will search the live Campus Colony listings from the backend.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    setInput('');
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: query }]);

    try {
      const data = await chatbotSearch(query);
      const results = Array.isArray(data?.results) ? data.results : [];
      const count = Number(data?.count ?? results.length);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            count > 0
              ? `I found ${count} listing${count === 1 ? '' : 's'} from the database for "${query}".`
              : `I could not find matching listings in the database for "${query}". Try changing the area, type, or rent range.`,
          results,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I could not reach the backend chatbot right now. Please check that the backend server is running.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#373F43] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            AI Rental<br />Assistant
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Ask natural questions and get answers from the actual Campus Colony listing database.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Live listing search</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Area and type filters</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Backend powered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#717684] rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#F8F9FA] p-4 border-b border-[#717684]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#373F43] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#373F43]">Campus Colony Assistant</h3>
                <p className="text-xs text-[#717684]">Connected to backend listing search</p>
              </div>
            </div>
          </div>

          <div className="h-[560px] overflow-y-auto p-6 space-y-4 bg-[#FAFAFA]">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-3xl px-6 py-4 rounded-xl whitespace-pre-line ${
                    message.role === 'user'
                      ? 'bg-[#373F43] text-white'
                      : 'bg-white text-[#373F43] border border-[#717684]'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5" />
                      <span className="font-bold">AI Assistant</span>
                    </div>
                  )}
                  <p className="leading-relaxed">{message.content}</p>

                  {message.results && message.results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {message.results.map((listing) => (
                        <Link
                          key={listing.id}
                          to={`/listing/${listing.id}`}
                          className="block bg-[#F8F9FA] border border-[#DDE1E6] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          {listing.image_url && (
                            <img
                              src={resolveImageUrl(listing.image_url)}
                              alt={listing.title}
                              className="w-full h-32 object-cover"
                            />
                          )}
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-bold text-[#20272B]">{listing.title}</h4>
                              <span className="text-sm font-bold text-[#0066CC] whitespace-nowrap">
                                Rs. {Number(listing.price).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2 text-xs">
                              {listing.type && (
                                <span className="px-2 py-1 bg-white border border-[#DDE1E6] rounded text-[#373F43]">
                                  {listing.type}
                                </span>
                              )}
                              <span className="px-2 py-1 bg-white border border-[#DDE1E6] rounded text-[#373F43] flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {listing.area?.name || (listing.area_id ? `Area ${listing.area_id}` : 'Area N/A')}
                              </span>
                            </div>
                            {listing.description && (
                              <p className="text-sm text-[#717684] line-clamp-2">{listing.description}</p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-[#373F43] border border-[#717684] px-6 py-4 rounded-xl flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching database...
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 border-t border-[#717684]">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about rent, area, hostel type, or rating..."
                className="flex-1 px-4 py-3 border border-[#717684] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#373F43] bg-white"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#373F43] text-white px-8 py-3 rounded-xl hover:bg-[#4A5258] transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Ask
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border border-[#717684] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#717684]">
              <Search className="w-8 h-8 text-[#373F43]" />
            </div>
            <h3 className="font-bold text-[#373F43] mb-2">Database Results</h3>
            <p className="text-sm text-[#717684]">Answers come from backend listing search, not static frontend data.</p>
          </div>

          <div className="bg-white border border-[#717684] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#717684]">
              <Building2 className="w-8 h-8 text-[#373F43]" />
            </div>
            <h3 className="font-bold text-[#373F43] mb-2">Rental Matching</h3>
            <p className="text-sm text-[#717684]">Search by budget, property type, area name, and supported backend filters.</p>
          </div>

          <div className="bg-white border border-[#717684] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#717684]">
              <MessageSquare className="w-8 h-8 text-[#373F43]" />
            </div>
            <h3 className="font-bold text-[#373F43] mb-2">Natural Questions</h3>
            <p className="text-sm text-[#717684]">Type normal requests and the backend interprets the search intent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
