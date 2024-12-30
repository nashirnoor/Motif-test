import React, { useState, useEffect } from 'react';
import AssessmentForm from './AssessmentForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Questions = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
  });
  const [showAssessment, setShowAssessment] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tests/${testId}/questions/`);
      // const data = await response.json();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  // const questions = [
  //     "respond to one-command commands while sitting in a chair for 5 minutes",
  //     "respond to simple instructions consisting of one command",
  //     "respond to simple instructions consisting of one command group 1",
  //     "respond to simple instructions consisting of one command group 2",
  //     "respond to simple instructions consisting of one command group 3",
  //     "respond to complex instructions consisting of one command group 5",
  //     "respond to complex 2 instructions consisting of one command group 4",
  //     "respond to two complex instructions consisting of one command group 3",
  //     "respond to multi instructions consisting of one command group 2",
  //     "respond to multi instructions consisting of one command group 5",
  // ];

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [`q${currentQuestion + 1}`]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePaymentClick = () => {
    setShowPayment(true);
  };


  const handlePaymentComplete = async () => {
    try {
      setPaymentComplete(true);
      setShowPayment(false);
      setShowAssessment(true)
      handleGenerateReport();  // Add this line to generate report after payment
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleGenerateReport = () => {
    if (paymentComplete) {
      setShowAssessment(true);
    }
  };

  if (showAssessment) {
    return <AssessmentForm initialAnswers={answers} />;
  }
  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="bg-blue-500 text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-center">Complete Your Payment</h2>
            <p className="text-center mt-2 text-blue-100">Secure Payment Processing</p>
          </div>
  
          {/* Order Summary */}
          <div className="p-6 border-b">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Assessment Report</span>
                <span className="font-semibold">QAR 30</span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Processing Fee</span>
                <span>QAR 0.00</span>
              </div>
              <div className="border-t mt-2 pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>QAR 30</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Payment Form */}
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Payment Details</h3>
            
            {/* Card Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
  
              {/* Billing Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
  
            {/* Security Notice */}
            <div className="mt-6 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure 256-bit SSL encrypted payment
              </div>
            </div>
  
            {/* Action Buttons */}
            <button
              onClick={handlePaymentComplete}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              Pay QAR 30
            </button>
            
            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-4 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Questions
            </button>
  
            {/* Payment Methods */}
            {/* <div className="mt-6 flex items-center justify-center space-x-4">
              <img src="/visa.svg" alt="Visa" className="h-8" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
              <img src="/amex.svg" alt="American Express" className="h-8" />
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-sm mx-auto p-4">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="ASD Test Lo"
              className="h-24 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full bg-white py-6 border-b">
        <h1 className="text-3xl font-serif text-gray-800 text-center">
          GET YOUR TEST HERE
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6 mt-8">
        <div className="border rounded-xl p-8 shadow-lg bg-white">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-500">{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold mb-6">Question {currentQuestion + 1}</h2>
            <p className="text-gray-700 text-lg">
              {questions[currentQuestion]?.text}
            </p>
          </div>

          {/* Answer Buttons */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${answers[`q${currentQuestion + 1}`] === 'yes'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}
              onClick={() => handleAnswer('yes')}
            >
              Yes
            </button>
            <button
              className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${answers[`q${currentQuestion + 1}`] === 'no'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}
              onClick={() => handleAnswer('no')}
            >
              No
            </button>
          </div>

          {/* Generate Report Button - Only show on last question after answering */}
          {currentQuestion === questions.length - 1 && answers[`q${currentQuestion + 1}`] && (
  <div className="flex justify-center">
    <button
      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
      onClick={handlePaymentClick}  // Changed from handleGenerateReport to handlePaymentClick
    >
      Generate Report ($29.99)
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Questions;