import React, { useState } from 'react';
import AssessmentForm from './AssessmentForm';
const Questions = ({ onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({
      q1: '',
      q2: '',
      q3: '',
      q4: ''
    });
    const [showAssessment, setShowAssessment] = useState(false);
  
    const questions = [
      "respond to one-command commands while sitting in a chair for 5 minutes",
      "respond to simple instructions consisting of one command",
      "respond to simple instructions consisting of one command group 1",
      "respond to simple instructions consisting of one command group 2"
    ];
  
    const handleAnswer = (answer) => {
      setAnswers(prev => ({
        ...prev,
        [`q${currentQuestion + 1}`]: answer
      }));
      
      // Only auto-advance if not on the last question
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      }
    };

    const handleGenerateReport = () => {
      setShowAssessment(true);
    };
  
    if (showAssessment) {
      return <AssessmentForm initialAnswers={answers} />;
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="w-full bg-white shadow-sm">
          <div className="max-w-sm mx-auto p-4">
            <div className="flex items-center">
              <img 
                src="logo.png" 
                alt="ASD Test Logo" 
                className="h-24 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="w-full bg-white py-6 border-b">
          <h1 className="text-3xl font-serif text-gray-800 text-center">
            Get Your ASD Test Here
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
              <p className="text-gray-700 text-lg">{questions[currentQuestion]}</p>
            </div>
  
            {/* Answer Buttons */}
            <div className="flex justify-center gap-6 mb-8">
              <button
                className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                  answers[`q${currentQuestion + 1}`] === 'yes'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}
                onClick={() => handleAnswer('yes')}
              >
                Yes
              </button>
              <button
                className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                  answers[`q${currentQuestion + 1}`] === 'no'
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
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Questions;