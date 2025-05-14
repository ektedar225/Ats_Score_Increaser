import { loadScript } from './loadScript';

const RAZORPAY_KEY = 'rzp_test_YourTestKeyHere'; // Replace with your actual test key

export const initializeRazorpay = async () => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    alert('Razorpay SDK failed to load');
    return false;
  }
  return true;
};

export const createOrder = async (planDetails: {
  amount: number;
  currency: string;
  receipt: string;
}) => {
  // In production, this should be an API call to your backend
  // which creates the order using Razorpay's API
  return {
    id: `order_${Math.random().toString(36).substr(2, 9)}`,
    ...planDetails
  };
};

export const openRazorpayCheckout = async ({
  orderDetails,
  userDetails,
  onSuccess,
  onError
}: {
  orderDetails: {
    amount: number;
    currency: string;
    orderId: string;
  };
  userDetails: {
    name: string;
    email: string;
  };
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) => {
  const options = {
    key: RAZORPAY_KEY,
    amount: orderDetails.amount,
    currency: orderDetails.currency,
    name: 'ATS Score Increaser',
    description: 'Expert Resume Optimization Service',
    order_id: orderDetails.orderId,
    handler: (response: any) => {
      onSuccess(response);
    },
    prefill: {
      name: userDetails.name,
      email: userDetails.email,
    },
    theme: {
      color: '#2563EB'
    }
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.on('payment.failed', onError);
  paymentObject.open();
};