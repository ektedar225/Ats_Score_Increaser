import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send } from 'lucide-react';

interface LocationState {
  plan?: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };
  user?: string;
}

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state || !state.plan) {
      navigate('/subscriptions');
    }
    
    // Simulate confetti effect with JS or use a library like canvas-confetti
    const createConfetti = () => {
      // Simple confetti effect for demo purposes
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.getElementById('confetti-container')?.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    };
    
    createConfetti();
  }, [navigate, state]);

  if (!state || !state.plan) {
    return null;
  }

  return (
    <div className="page-transition relative min-h-[calc(100vh-16rem)] bg-gradient-to-br from-primary-50 to-white py-16">
      <div id="confetti-container" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      <div className="container-custom">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success-50">
              <CheckCircle size={48} className="text-success-500" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="mb-6 text-xl text-gray-600">
              Thank you for subscribing to our premium Telegram channel.
            </p>
            
            <div className="mb-8 rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-gray-900">{state.plan.name}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-gray-900">₹{state.plan.price}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">{state.plan.duration === 'monthly' ? 'Monthly' : 'Lifetime'}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Subscriber:</span>
                <span className="font-medium text-gray-900">{state.user || 'Subscriber'}</span>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{state.plan.price}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8 rounded-lg border border-primary-100 bg-primary-50 p-6">
              <h3 className="mb-3 text-lg font-medium text-primary-800">Next Steps</h3>
              <p className="text-primary-700">
                You'll receive an email with instructions on how to join our premium Telegram channel within the next 24 hours. Please check your inbox (and spam folder).
              </p>
              <div className="mt-4 flex items-center justify-center">
                <button className="btn flex items-center space-x-2 bg-primary-600 px-6 py-2 text-white hover:bg-primary-700">
                  <Send size={16} />
                  <span>Join Telegram Channel</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button 
                onClick={() => navigate('/about')}
                className="btn btn-outline flex items-center justify-center"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-secondary"
              >
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            top: -10px;
            border-radius: 50%;
            animation: confetti-fall linear forwards;
          }
          
          @keyframes confetti-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SuccessPage;