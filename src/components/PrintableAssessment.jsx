import React from 'react';
import { Printer } from 'lucide-react';

const PrintableAssessment = ({ answers, personalInfo, age, background, conductedTests, recommendations }) => {
  const handlePrint = () => {
    window.print();
  };

  const questions = [
    "respond to one-command commands while sitting in a chair for 5 minutes",
    "respond to simple instructions consisting of one command",
    "respond to simple instructions consisting of one command group 1",
    "respond to simple instructions consisting of one command group 2"
  ];

  return (
    <div>
      <div className="print:hidden p-6 max-w-4xl mx-auto">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Printer size={16} />
          Print Assessment
        </button>
      </div>
      
      {/* This div will be the only visible content when printing */}
      <div className="hidden print:block p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Assessment of ASD</h1>
       
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Name:</strong> {personalInfo.name}</p>
              <p><strong>Gender:</strong> {personalInfo.gender}</p>
            </div>
            <div>
              <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
              <p><strong>Age:</strong> {age.years} years, {age.months} months, {age.days} days</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Assessment Questions</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">No.</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Response</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{question}</td>
                  <td className="border p-2">
                    {answers[`q${index + 1}`]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Background</h2>
          <p className="whitespace-pre-wrap border p-4 rounded">{background}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Conducted Tests</h2>
          <ul className="list-disc pl-6">
            {conductedTests.map((test, index) => (
              test && <li key={index} className="mb-2">{test}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Recommendations</h2>
          <ul className="list-disc pl-6">
            {recommendations.map((rec, index) => (
              rec && <li key={index} className="mb-2">{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrintableAssessment;