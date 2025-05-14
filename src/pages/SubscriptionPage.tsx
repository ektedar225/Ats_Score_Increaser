import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
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
      id: 'basic',
      name: 'Basic',
      price: 1999,
      duration: 'monthly',
      features: [
        'Access to premium Telegram channel',
        'Daily market updates',
        'Basic analysis reports',
        'Email support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 2999,
      duration: 'monthly',
      features: [
        'Everything in Basic',
        'Weekly expert insights',
        'Trading signals',
        'Priority support',
        'Educational resources',
      ],
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 4999,
      duration: 'two months',
      features: [
        'Everything in Pro',
        'Exclusive investment opportunities',
        '24/7 support',
        'Members-only webinars',
        'One-on-one consultation',
        'Early access to new features',
      ],
    },
    {
      id: 'lifetime',
      name: 'cheaper',
      price: 3499,
      duration: 'three months',
      features: [
       'Access to premium Telegram channel',
        'Daily market updates',
        'Basic analysis reports',
        'Email support',
      ],
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    if (!selectedPlan) return;

    // In a real application, we would integrate with Razorpay here
    // For this demo, we'll just navigate to the success page
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: plans.find(plan => plan.id === selectedPlan)?.price ? plans.find(plan => plan.id === selectedPlan)!.price * 100 : 0, // Amount in paise
      currency: 'INR',
      name: 'Premium Subscription',
      description: `${plans.find(plan => plan.id === selectedPlan)?.name} Plan`,
      image: 'https://your-company-logo.png',
      order_id: 'order_123456', // This should be generated from your backend
      handler: function() {
        navigate('/success', { 
          state: { 
            plan: plans.find(plan => plan.id === selectedPlan),
            user: currentUser?.displayName || currentUser?.email
          } 
        });
      },
      prefill: {
        name: currentUser?.displayName || '',
        email: currentUser?.email || '',
      },
      theme: {
        color: '#2563EB',
      },
    };

    // In a real application, we would load Razorpay and open the payment modal
    // const razorpayWindow = new (window as any).Razorpay(options);
    // razorpayWindow.open();

    // For this demo, we'll just navigate to the success page
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
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-700">Pricing Plans</span>
          <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Choose Your Premium Subscription
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Select the plan that best fits your needs and get instant access to our premium Telegram channel.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`card relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.recommended ? 'border-2 border-primary-500 ring-4 ring-primary-100' : 'border border-gray-200'
              } ${selectedPlan === plan.id ? 'ring-4 ring-primary-300' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -right-10 top-7 w-40 rotate-45 bg-primary-500 py-1 text-center text-sm font-semibold text-white">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900">₹{plan.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/{plan.duration}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {plan.duration === 'monthly' ? 'Billed monthly' : 'One-time payment'}
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    className={`w-full rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
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
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <dl className="mt-8 space-y-6 text-left">
              <div>
                <dt className="text-lg font-medium text-gray-900">How do I access the premium Telegram channel?</dt>
                <dd className="mt-2 text-gray-600">After successful payment, you'll receive an invitation link to join our private Telegram channel within 24 hours.</dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Can I cancel my subscription?</dt>
                <dd className="mt-2 text-gray-600">Yes, you can cancel your monthly subscription at any time. Your access will remain active until the end of your billing period.</dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">What payment methods do you accept?</dt>
                <dd className="mt-2 text-gray-600">We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway, Razorpay.</dd>
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">Is there a refund policy?</dt>
                <dd className="mt-2 text-gray-600">We offer a 7-day money-back guarantee for monthly plans. The lifetime plan is non-refundable after purchase.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;