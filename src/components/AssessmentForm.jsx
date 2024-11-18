// AssessmentForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import PrintView from './PrintView';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import TreatmentPlan1 from './TreatmentPlan1';
import TreatmentPlan2 from './TreatmentPlan2';
import TreatmentPlan3 from './TreatmentPlan3';
import TreatmentPlan4 from './TreatmentPlan4';
// import PrintableAssessment from './PrintableAssessment';

const AssessmentForm = ({ initialAnswers }) => {
    const [answers] = useState(initialAnswers || {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
    });

    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        gender: '',
        dob: ''
    });

    const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
    const [background, setBackground] = useState('');
    const [conductedTests, setConductedTests] = useState(['']);
    const [recommendations, setRecommendations] = useState(['']);

    const questions = [
        "respond to one-command commands while sitting in a chair for 5 minutes",
        "respond to simple instructions consisting of one command",
        "respond to simple instructions consisting of one command group 1",
        "respond to simple instructions consisting of one command group 2"
    ];

    useEffect(() => {
        if (personalInfo.dob) {
            calculateAge(personalInfo.dob);
        }
    }, [personalInfo.dob]);

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
            days += lastMonth.getDate();
        }

        setAge({ years, months, days });
    };

    const handleTestAdd = () => {
        setConductedTests([...conductedTests, '']);
    };

    const handleRecommendationAdd = () => {
        setRecommendations([...recommendations, '']);
    };

    const renderTreatmentPlan = (questionNumber) => {
        if (answers[`q${questionNumber}`] === 'no') {
            switch (questionNumber) {
                case 1:
                    return <TreatmentPlan1 />;
                case 2:
                    return <TreatmentPlan2 />;
                case 3:
                    return <TreatmentPlan3 />;
                case 4:
                    return <TreatmentPlan4 />;
                default:
                    return null;
            }
        }
        return null;
    };

    return (
        <div className="relative">
            {/* Form Section */}
            <div className="print:hidden">
                <div className="p-6 max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Assessment of ASD</h1>

                    <div className="mb-8">
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
                                            <div className="w-full p-2">
                                                {answers[`q${index + 1}`]}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-8 grid grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={personalInfo.name}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Gender</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={personalInfo.gender}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Date of Birth</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={personalInfo.dob}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                            />
                            {age.years > 0 && (
                                <p className="mt-2 text-sm">
                                    Age: {age.years} years, {age.months} months, {age.days} days
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Background</h2>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="4"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                        />

                        <h3 className="font-bold mt-4 mb-2">Conducted Tests</h3>
                        {conductedTests.map((test, index) => (
                            <div key={index} className="mb-2 flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 p-2 border rounded"
                                    value={test}
                                    onChange={(e) => {
                                        const newTests = [...conductedTests];
                                        newTests[index] = e.target.value;
                                        setConductedTests(newTests);
                                    }}
                                />
                                {index === conductedTests.length - 1 && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={handleTestAdd}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Recommendations</h2>
                        {recommendations.map((rec, index) => (
                            <div key={index} className="mb-2 flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 p-2 border rounded"
                                    value={rec}
                                    onChange={(e) => {
                                        const newRecs = [...recommendations];
                                        newRecs[index] = e.target.value;
                                        setRecommendations(newRecs);
                                    }}
                                />
                                {index === recommendations.length - 1 && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={handleRecommendationAdd}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Print button */}
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <Printer size={16} />
                        Print Assessment
                    </button>
                </div>
            </div>

            <div className="hidden print:block p-6">
                {/* Logo and Title Section */}
                <div className="flex justify-between mb-8">
                    <img
                        src="logo.png"
                        alt="ASD Test Logo"
                        className="h-24 w-auto"
                    />
                    <h1 className="text-3xl font-bold flex-grow text-center">Assessment of ASD</h1>
                </div>
                {/* Personal Information */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-center">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4 pl-4">
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
                {/* Assessment Questions */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-center">Assessment Questions</h2>
                    <div className="pl-1">
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <div className="border p-4 rounded">
                                    <p><strong>Question {index + 1}:</strong> {question}</p>
                                    <p><strong>Response:</strong> {answers[`q${index + 1}`]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background */}
                {background && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-center">Background</h2>
                        <p className="whitespace-pre-wrap border p-4 rounded pl-4">{background}</p>
                    </div>
                )}
                {/* Conducted Tests - Only show if there are tests */}
                {conductedTests.filter(test => test).length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-center">Conducted Tests</h2>
                        <ul className="list-disc pl-10">
                            {conductedTests.filter(test => test).map((test, index) => (
                                <li key={index} className="mb-2">{test}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Recommendations - Only show if there are recommendations */}
                {recommendations.filter(rec => rec).length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-center">Recommendations</h2>
                        <ul className="list-disc pl-10">
                            {recommendations.filter(rec => rec).map((rec, index) => (
                                <li key={index} className="mb-2">{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* Treatment Plans - Only show if there are any 'no' answers */}
                {Object.values(answers).some(answer => answer === 'no') && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-center">Treatment Plans</h2>
                        <div className="pl-4">
                            {[1, 2, 3, 4].map((questionNumber) => (
                                <div key={questionNumber}>
                                    {answers[`q${questionNumber}`] === 'no' && (
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold mb-2">
                                                Treatment Plan for Question {questionNumber}
                                            </h3>
                                            {renderTreatmentPlan(questionNumber)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssessmentForm;