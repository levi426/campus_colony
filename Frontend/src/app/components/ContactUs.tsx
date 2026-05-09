import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#121212] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">CONTACT US</h1>
          <p className="text-gray-300 text-lg">
            We're here to help! Reach out to us anytime
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#E9ECEF] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-[#121212]" />
            </div>
            <h3 className="font-bold text-[#121212] mb-3">Phone</h3>
            <p className="text-gray-600 mb-1">+92 300 1234567</p>
            <p className="text-gray-600">+92 42 37123456</p>
          </div>

          <div className="bg-white border border-[#E9ECEF] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#121212]" />
            </div>
            <h3 className="font-bold text-[#121212] mb-3">Email</h3>
            <p className="text-gray-600 mb-1">info@campuscolony.pk</p>
            <p className="text-gray-600">support@campuscolony.pk</p>
          </div>

          <div className="bg-white border border-[#E9ECEF] rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#121212]" />
            </div>
            <h3 className="font-bold text-[#121212] mb-3">Address</h3>
            <p className="text-gray-600 mb-1">Block A, Faisal Town</p>
            <p className="text-gray-600">Lahore, Pakistan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white border border-[#E9ECEF] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#121212] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#121212] font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] text-white py-3 rounded-xl hover:bg-[#2D2D2D] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E9ECEF] rounded-xl p-8">
              <Clock className="w-12 h-12 text-[#121212] mb-4" />
              <h3 className="text-xl font-bold text-[#121212] mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-8 border border-[#E9ECEF]">
              <h3 className="text-xl font-bold text-[#121212] mb-4">Quick Response</h3>
              <p className="text-gray-600 mb-6">
                Our team typically responds within 24 hours on business days. For urgent matters, please call us directly.
              </p>
              <button className="bg-[#121212] text-white px-6 py-3 rounded-lg hover:bg-[#2D2D2D] transition-colors w-full">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
