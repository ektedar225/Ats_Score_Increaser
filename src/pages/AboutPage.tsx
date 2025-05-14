import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Users, TrendingUp, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const achievements = [
    {
      title: '10,000+ Subscribers',
      description: 'Trusted by thousands of users worldwide for premium content delivery',
      icon: <Users className="h-8 w-8 text-primary-500" />,
    },
    {
      title: 'Award Winning Content',
      description: 'Recognized for excellence in providing high-quality premium content',
      icon: <Award className="h-8 w-8 text-primary-500" />,
    },
    {
      title: 'Consistent Growth',
      description: '200% growth in subscriber base in the last year alone',
      icon: <TrendingUp className="h-8 w-8 text-primary-500" />,
    },
    {
      title: '5+ Years Experience',
      description: 'Delivering premium content since 2020 with a proven track record',
      icon: <Calendar className="h-8 w-8 text-primary-500" />,
    },
  ];

  const features = [
    'Exclusive market insights and analysis',
    'Real-time updates and notifications',
    'Direct access to industry experts',
    'Premium educational resources',
    'Members-only events and webinars',
    'Priority customer support',
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-20 text-white">
        <div className="container-custom">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Premium <span className="text-accent-400">Insights</span> At Your Fingertips
              </h1>
              <p className="mb-8 text-lg text-gray-200">
                Join our exclusive Telegram channel for premium content, market insights, and expert analysis delivered directly to you.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  onClick={() => navigate('/subscriptions')}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative btn bg-accent-500 px-6 py-3 text-base font-medium text-white transition-all hover:bg-accent-600"
                >
                  <span className={`inline-flex items-center transition-transform duration-300 ${isHovered ? 'translate-x-[-8px]' : ''}`}>
                    Subscribe Now
                  </span>
                  <ArrowRight className={`absolute right-6 h-5 w-5 transform opacity-0 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4'}`} />
                </button>
                <a href="#learn-more" className="btn btn-outline border-white bg-transparent text-white hover:bg-white/10">
                  Learn More
                </a>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <img 
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Premium Content" 
                className="rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105 md:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="learn-more" className="py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-700">About Our Company</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Empowering You With Premium Knowledge
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              We're dedicated to providing high-quality, exclusive content through our premium Telegram channel, helping you stay ahead with expert insights and analysis.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="card group p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 rounded-full bg-primary-50 p-3 transition-colors duration-300 group-hover:bg-primary-100">
                  {achievement.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-700">Why Choose Us</span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                The Ultimate Telegram Channel Experience
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Our premium Telegram channel offers exclusive benefits and content that you won't find anywhere else.
              </p>
              
              <div className="mt-8 grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-accent-500" />
                    <p className="text-lg text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button 
                  onClick={() => navigate('/subscriptions')}
                  className="btn bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700"
                >
                  Explore Subscriptions
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent-200 opacity-60"></div>
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-primary-200 opacity-60"></div>
                <img 
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Premium Features" 
                  className="relative z-10 rounded-lg shadow-xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 py-16 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Access Premium Content?
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Join thousands of satisfied subscribers and get access to our premium Telegram channel today.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => navigate('/subscriptions')}
                className="btn bg-accent-500 px-8 py-3 text-base font-medium text-white hover:bg-accent-600"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;