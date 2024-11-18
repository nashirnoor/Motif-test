// PrintView.jsx
import React,{ forwardRef } from 'react';
import TreatmentPlan1 from './TreatmentPlan1';
import TreatmentPlan2 from './TreatmentPlan2';
import TreatmentPlan3 from './TreatmentPlan3';
import TreatmentPlan4 from './TreatmentPlan4';

const PrintView = ({ 
    answers, 
    personalInfo, 
    age, 
    background, 
    conductedTests, 
    recommendations 
  }) => {
    return (
    <div className="p-8 max-w-4xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">ASD Assessment Report</h1>
        <p className="text-gray-600 mt-2">Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {personalInfo.name}</p>
          <p><strong>Gender:</strong> {personalInfo.gender}</p>
          <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
          <p><strong>Age:</strong> {age.years} years, {age.months} months, {age.days} days</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Assessment Results</h2>
        <table className="w-full border-collapse border mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Question</th>
              <th className="border p-2 text-center w-24">Response</th>
            </tr>
          </thead>
          <tbody>
            {[
              "respond to one-command commands while sitting in a chair for 5 minutes",
              "respond to simple instructions consisting of one command",
              "respond to simple instructions consisting of one command group 1",
              "respond to simple instructions consisting of one command group 2"
            ].map((question, index) => (
              <tr key={index}>
                <td className="border p-2">{question}</td>
                <td className="border p-2 text-center">
                  {answers[`q${index + 1}`]?.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Treatment Plans</h2>
        {answers.q1 === 'no' && <TreatmentPlan1 />}
        {answers.q2 === 'no' && <TreatmentPlan2 />}
        {answers.q3 === 'no' && <TreatmentPlan3 />}
        {answers.q4 === 'no' && <TreatmentPlan4 />}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Background</h2>
        <p className="whitespace-pre-wrap">{background}</p>
        
        <h3 className="font-bold mt-6 mb-2">Conducted Tests</h3>
        <ul className="list-disc pl-6">
          {conductedTests.filter(test => test).map((test, index) => (
            <li key={index} className="mb-1">{test}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Recommendations</h2>
        <ul className="list-disc pl-6">
          {recommendations.filter(rec => rec).map((rec, index) => (
            <li key={index} className="mb-1">{rec}</li>
          ))}
        </ul>
      </div>
      </div>
    );
};

PrintView.displayName = 'PrintView';

export default PrintView;