import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Calendar, MessageSquare, FileCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}

const SubscriptionPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: SubscriptionPlan[] = [
    {
      id: 'one-day',
      name: '24-Hour Access',
      price: 499,
      duration: '24 hours',
      features: [
        'One expert consultation session',
        'Resume ATS score analysis',
        'Chat with expert for 24 hours',
        'Share documents and links',
        'Personalized improvement tips'
      ],
      recommended: true
    },
    {
      id: 'three-day',
      name: '3-Day Package',
      price: 1299,
      duration: '3 days',
      features: [
        'Three expert consultation sessions',
        'Extended chat support for 3 days',
        'Detailed ATS score breakdown',
        'Priority appointment slots',
        'Resume template suggestions'
      ]
    },
    {
      id: 'week',
      name: 'Weekly Access',
      price: 2499,
      duration: '7 days',
      features: [
        'Unlimited expert consultations',
        '7-day chat support',
        'Complete ATS optimization',
        'Industry-specific keywords',
        'Mock interview preparation'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    if (!selectedPlan) return;
    navigate('/success', { 
      state: { 
        plan: plans.find(plan => plan.id === selectedPlan),
        user: currentUser?.displayName || currentUser?.email
      } 
    });
  };

  return (
    <div className="page-transition bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Boost Your Resume's ATS Score
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect with industry experts who will help optimize your resume for ATS systems
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`card relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.recommended ? 'border-2 border-primary-500 ring-4 ring-primary-100' : 'border border-gray-200'
              } ${selectedPlan === plan.id ? 'ring-4 ring-primary-300' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -right-12 top-6 w-36 rotate-45 bg-primary-500 py-1 text-center text-sm font-semibold text-white">
                  Best Value
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900">₹{plan.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/{plan.duration}</span>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-primary-600">
                    <Calendar className="h-5 w-5" />
                    <span>Expert Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-600">
                    <MessageSquare className="h-5 w-5" />
                    <span>Chat Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-600">
                    <FileCheck className="h-5 w-5" />
                    <span>ATS Analysis</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`mt-8 w-full rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-700 ring-1 ring-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handlePayment}
            disabled={!selectedPlan}
            className={`group inline-flex items-center rounded-md bg-primary-600 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              !selectedPlan && 'cursor-not-allowed opacity-50'
            }`}
          >
            <span>Proceed to Payment</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          {!selectedPlan && (
            <p className="mt-2 text-sm text-gray-600">Please select a plan to continue</p>
          )}
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Book Appointment</h3>
                <p className="text-gray-600">Schedule a consultation with our ATS experts at your preferred time</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Chat Support</h3>
                <p className="text-gray-600">Get continuous guidance through our chat support system</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Optimize Resume</h3>
                <p className="text-gray-600">Receive personalized suggestions to improve your ATS score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;