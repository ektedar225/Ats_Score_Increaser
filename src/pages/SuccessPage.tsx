import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Calendar, MessageSquare } from 'lucide-react';

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
  }, [navigate, state]);

  if (!state || !state.plan) {
    return null;
  }

  return (
    <div className="page-transition relative min-h-[calc(100vh-16rem)] bg-gradient-to-br from-primary-50 to-white py-16">
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
              Thank you for choosing our ATS Score Improvement service.
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
                <span className="font-medium text-gray-900">{state.plan.duration}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">User:</span>
                <span className="font-medium text-gray-900">{state.user || 'User'}</span>
              </div>
            </div>
            
            <div className="mb-8 space-y-6">
              <div className="rounded-lg border border-primary-100 bg-primary-50 p-6">
                <h3 className="mb-3 text-lg font-medium text-primary-800">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <p className="text-primary-700">
                      Schedule your expert consultation through the dashboard
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary-600" />
                    <p className="text-primary-700">
                      Access the chat portal to connect with our ATS experts
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-primary"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate('/chat')}
                  className="btn btn-secondary"
                >
                  Open Chat Portal
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/about')}
              className="btn btn-outline flex items-center justify-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;