// AssessmentForm.jsx
import React, { useState, useEffect,useCallback } from 'react';
import { Printer } from 'lucide-react';
import TreatmentPlan1 from './TreatmentPlan1';
import TreatmentPlan2 from './TreatmentPlan2';
import TreatmentPlan3 from './TreatmentPlan3';
import TreatmentPlan4 from './TreatmentPlan4';
import TreatmentPlan5 from './TreatmentPlan5';
import TreatmentPlan6 from './TreatmentPlan6';
import TreatmentPlan7 from './TreatmentPlan7';
import TreatmentPlan8 from './TreatmentPlan8';
import TreatmentPlan9 from './TreatmentPlan9';
import TreatmentPlan10 from './TreatmentPlan10';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// import PrintableAssessment from './PrintableAssessment';

const AssessmentForm = ({ initialAnswers }) => {
    const [answers] = useState(initialAnswers || {
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

    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        gender: '',
        dob: ''
    });
    const [questions, setQuestions] = useState([]);
    const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
    const [background, setBackground] = useState('');
    const [conductedTests, setConductedTests] = useState(['']);
    const [recommendations, setRecommendations] = useState(['']);
    const { testId } = useParams();


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

    const fetchQuestions = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/tests/${testId}/questions/`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }, [testId]);
    
    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

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
                case 5:
                    return <TreatmentPlan5 />;
                case 6:
                    return <TreatmentPlan6 />;
                case 7:
                    return <TreatmentPlan7 />;
                case 8:
                    return <TreatmentPlan8 />;
                case 9:
                    return <TreatmentPlan9 />;
                case 10:
                    return <TreatmentPlan10 />;
                default:
                    return null;
            }
        }
        return null;
    };

    return (
        <div className="relative">
             <div className="absolute top-4 left-4 print:hidden">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
            <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            Back
        </Link>
    </div>
            {/* Form Section */}
            <div className="print:hidden">
                <div className="p-6 max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Assessment of Questions</h1>

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
                                        <td className="border p-2">{question.text}</td>
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

            <div className="hidden print:block w-full px-8 py-6">
                {/* Logo and Title Section */}
                <div className="mb-8">
                    <img
                        src="logo.png"
                        alt="ASD Test Logo"
                        className="h-24 w-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold">
                        Assessment of ADHD
                    </h1>
                </div>

                {/* Personal Information */}
                <div className="mb-8 break-inside-avoid">
                    <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">
                        Personal Information
                    </h2>
                    <div>
                        <div className="flex">
                            <div className="w-[120px]"><strong>Name</strong></div>
                            <div>: {personalInfo.name}</div>
                        </div>
                        <div className="flex">
                            <div className="w-[120px]"><strong>Gender</strong></div>
                            <div>: {personalInfo.gender}</div>
                        </div>
                        <div className="flex">
                            <div className="w-[120px]"><strong>D.O.B</strong></div>
                            <div>: {personalInfo.dob}</div>
                        </div>
                        <div className="flex">
                            <div className="w-[120px]"><strong>Age</strong></div>
                            <div>: {age.years} years, {age.months} months, {age.days} days</div>
                        </div>
                    </div>
                </div>

                {/* Assessment Questions */}
                <div className="mb-8 break-inside-avoid">
                    <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">
                        Assessment Questions
                    </h2>
                    <div>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4 pl-0">
                                <div className="flex">
                                    <span className="mr-2"><strong>{index + 1}.</strong></span>
                                    <div>
                                        <p className="mb-2">
                                            {question.text} - <strong>{answers[`q${index + 1}`]?.toUpperCase()}</strong>
                                        </p>                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background */}
                {background && (
                    <div className="mb-8 break-inside-avoid">
                        <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">
                            Background
                        </h2>
                        <div className="flex mb-2">
                            {/* <span className="mr-2">•</span> */}
                            <p className='flex mr-2'>{background}</p>
                        </div>
                    </div>
                )}

                {/* Conducted Tests */}
                {conductedTests.filter(test => test).length > 0 && (
                    <div className="mb-8 break-inside-avoid">
                        <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">
                            Conducted Tests
                        </h2>
                        <div>
                            {conductedTests.filter(test => test).map((test, index) => (
                                <div key={index} className="flex mb-2">
                                    <span className="mr-2">{index + 1}.</span>
                                    <p>{test}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                {recommendations.filter(rec => rec).length > 0 && (
                    <div className="mb-8 break-inside-avoid">
                        <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">
                            Recommendations
                        </h2>
                        <div>
                            {recommendations.filter(rec => rec).map((rec, index) => (
                                <div key={index} className="flex mb-2">
                                    <span className="mr-2">{index + 1}.</span>
                                    <p>{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Treatment Plans */}
                {Object.values(answers).some(answer => answer === 'no') && (
                    <div className="mb-8">
                        <div>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((questionNumber) => (
                                <div key={questionNumber}>
                                    {answers[`q${questionNumber}`] === 'no' && (
                                        <div className="mb-4 break-inside-avoid-page print:break-inside-avoid-page">
                                            <div className="flex">
                                                <span className="mr-2"></span>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        Treatment Plan
                                                    </h3>
                                                    {renderTreatmentPlan(questionNumber)}
                                                </div>
                                            </div>
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