import { Bot, Send, MessageSquare, Zap, Clock, TrendingUp, MapPin, DollarSign, Home, Filter, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface AreaScore {
  block: string;
  overall: number;
  wifi: number;
  security: number;
  transport: number;
  powerBackup: number;
  avgPrice: string;
  hostels: number;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Campus Colony AI Assistant with Area Score Prediction. I can help you find the perfect hostel in Faisal Town by analyzing your requirements and predicting the best match. What are you looking for?'
    },
  ]);
  const [input, setInput] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    budget: '',
    block: '',
    facilities: [] as string[],
    roomType: '',
  });

  // Area Score Prediction Engine
  const areaScores: AreaScore[] = [
    {
      block: 'Block A',
      overall: 92,
      wifi: 95,
      security: 90,
      transport: 88,
      powerBackup: 92,
      avgPrice: '15,500',
      hostels: 12,
    },
    {
      block: 'Block B',
      overall: 89,
      wifi: 92,
      security: 94,
      transport: 85,
      powerBackup: 88,
      avgPrice: '17,200',
      hostels: 10,
    },
    {
      block: 'Block C',
      overall: 87,
      wifi: 90,
      security: 88,
      transport: 92,
      powerBackup: 85,
      avgPrice: '16,000',
      hostels: 14,
    },
    {
      block: 'Block D',
      overall: 85,
      wifi: 88,
      security: 86,
      transport: 90,
      powerBackup: 83,
      avgPrice: '14,500',
      hostels: 11,
    },
  ];

  const quickQuestions = [
    'Find hostels under Rs. 15,000',
    'Show Block A area scores',
    'Compare all blocks',
    'Best security in Faisal Town',
  ];

  const predictBestMatch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    // Budget-based filtering
    if (lowerQuery.includes('under') || lowerQuery.includes('budget') || lowerQuery.includes('cheap')) {
      const budgetMatch = query.match(/(\d+[,\d]*)/);
      if (budgetMatch) {
        const budget = parseInt(budgetMatch[1].replace(/,/g, ''));
        const matches = areaScores.filter(score =>
          parseInt(score.avgPrice.replace(/,/g, '')) <= budget
        );
        return {
          type: 'budget',
          matches,
          query: budget,
        };
      }
    }

    // Block-specific query
    if (lowerQuery.includes('block')) {
      const blockMatch = lowerQuery.match(/block\s*([a-d])/i);
      if (blockMatch) {
        const block = `Block ${blockMatch[1].toUpperCase()}`;
        const match = areaScores.find(score => score.block === block);
        return {
          type: 'block',
          matches: match ? [match] : [],
          query: block,
        };
      }
    }

    // Facility-based filtering
    if (lowerQuery.includes('wifi') || lowerQuery.includes('internet')) {
      const sorted = [...areaScores].sort((a, b) => b.wifi - a.wifi);
      return {
        type: 'facility',
        matches: sorted.slice(0, 3),
        query: 'WiFi Coverage',
      };
    }

    if (lowerQuery.includes('security') || lowerQuery.includes('safe')) {
      const sorted = [...areaScores].sort((a, b) => b.security - a.security);
      return {
        type: 'facility',
        matches: sorted.slice(0, 3),
        query: 'Security',
      };
    }

    if (lowerQuery.includes('transport') || lowerQuery.includes('location')) {
      const sorted = [...areaScores].sort((a, b) => b.transport - a.transport);
      return {
        type: 'facility',
        matches: sorted.slice(0, 3),
        query: 'Transport Access',
      };
    }

    // Compare all blocks
    if (lowerQuery.includes('compare') || lowerQuery.includes('all')) {
      return {
        type: 'compare',
        matches: areaScores,
        query: 'All Blocks',
      };
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);

    const prediction = predictBestMatch(input);

    setTimeout(() => {
      if (prediction) {
        let responseContent = '';

        if (prediction.type === 'budget') {
          responseContent = `Based on your budget of Rs. ${prediction.query.toLocaleString()}, I found ${prediction.matches.length} blocks:\n\n`;
          prediction.matches.forEach((match: AreaScore) => {
            responseContent += `• ${match.block}: Rs. ${match.avgPrice}/month (Score: ${match.overall}/100)\n`;
          });
        } else if (prediction.type === 'block') {
          const match = prediction.matches[0];
          if (match) {
            responseContent = `Area Score Analysis for ${match.block}:\n\n`;
            responseContent += `Overall Score: ${match.overall}/100\n`;
            responseContent += `WiFi: ${match.wifi}/100\n`;
            responseContent += `Security: ${match.security}/100\n`;
            responseContent += `Transport: ${match.transport}/100\n`;
            responseContent += `Power Backup: ${match.powerBackup}/100\n\n`;
            responseContent += `Average Price: Rs. ${match.avgPrice}/month\n`;
            responseContent += `Total Hostels: ${match.hostels}`;
          }
        } else if (prediction.type === 'facility') {
          responseContent = `Top 3 blocks for ${prediction.query}:\n\n`;
          prediction.matches.forEach((match: AreaScore, index: number) => {
            const score = prediction.query === 'WiFi Coverage' ? match.wifi :
                         prediction.query === 'Security' ? match.security :
                         match.transport;
            responseContent += `${index + 1}. ${match.block}: ${score}/100 (Rs. ${match.avgPrice}/month)\n`;
          });
        } else if (prediction.type === 'compare') {
          responseContent = 'Here\'s a comparison of all blocks in Faisal Town:\n\n';
          prediction.matches.forEach((match: AreaScore) => {
            responseContent += `${match.block}: ${match.overall}/100 - Rs. ${match.avgPrice}/month\n`;
          });
        }

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: responseContent || `I found information about "${input}". Would you like me to show you detailed area scores or filter hostels based on specific criteria?`,
          },
        ]);
        setShowPrediction(true);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I can help you with:\n• Budget-based filtering\n• Block-specific area scores\n• Facility comparisons (WiFi, Security, Transport)\n• Complete block analysis\n\nWhat would you like to know?`,
          },
        ]);
      }
    }, 1000);

    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#373F43] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            AI-Powered Area Score<br />Prediction for Faisal Town
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Get intelligent hostel recommendations based on real-time area analysis and your preferences
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>Area Score Prediction</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Smart Filtering</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Area Score Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {areaScores.map((score) => (
            <div key={score.block} className="bg-white border border-[#717684] rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[#373F43]">{score.block}</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-[#373F43] mb-2">{score.overall}</div>
              <div className="text-sm text-[#717684] mb-4">Overall Score</div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#717684]">Avg. Price</span>
                  <span className="font-bold text-[#373F43]">Rs. {score.avgPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#717684]">Hostels</span>
                  <span className="font-bold text-[#373F43]">{score.hostels}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="bg-white border border-[#717684] rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#F8F9FA] p-4 border-b border-[#717684]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#373F43] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#373F43]">AI Area Score Assistant</h3>
                <p className="text-xs text-[#717684]">Powered by predictive analytics</p>
              </div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-[#FAFAFA]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-6 py-4 rounded-xl whitespace-pre-line ${
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
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 border-t border-[#717684]">
            <div className="mb-4">
              <p className="text-sm text-[#717684] mb-3 font-medium">Quick Predictions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-4 py-2 bg-[#F8F9FA] border border-[#717684] text-[#373F43] rounded-xl hover:bg-[#373F43] hover:text-white transition-colors text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about area scores, budgets, or filter hostels..."
                className="flex-1 px-4 py-3 border border-[#717684] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#373F43] bg-white"
              />
              <button
                type="submit"
                className="bg-[#373F43] text-white px-8 py-3 rounded-xl hover:bg-[#4A5258] transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Analyze
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border border-[#717684] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#717684]">
              <BarChart3 className="w-8 h-8 text-[#373F43]" />
            </div>
            <h3 className="font-bold text-[#373F43] mb-2">Predictive Scores</h3>
            <p className="text-sm text-[#717684]">AI analyzes WiFi, security, transport, and power backup across all blocks</p>
          </div>

          <div className="bg-white border border-[#717684] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#717684]">
              <Filter className="w-8 h-8 text-[#373F43]" />
            </div>
            <h3 className="font-bold text-[#373F43] mb-2">Smart Filtering</h3>
            <p className="text-sm text-[#717684]">Filter hostels by budget, facilities, location, and room preferences</p>
          </div>

          <div className="bg-white border border-[#717684] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#717684]">
              <TrendingUp className="w-8 h-8 text-[#373F43]" />
            </div>
            <h3 className="font-bold text-[#373F43] mb-2">Best Match</h3>
            <p className="text-sm text-[#717684]">Get personalized recommendations based on your requirements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
