import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const TestsList = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/tests/');
            setTests(response.data);  // Use response.data directly with Axios
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const handleStartTest = (testId) => {
        navigate(`/test/${testId}`);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white shadow-lg">
                {/* Top Bar */}
                <div className="bg-rose-800 text-white px-4 py-2 hidden md:block">
                    <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+1 (234) 567-8900</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@example.com</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-blue-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className="max-w-7xl mx-auto px-4 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-16 w-auto"
                            />
                            <div className="hidden md:flex items-center space-x-1">
                                <a href="/" className="px-3 py-2 text-gray-700 hover:text-rose-800 transition-colors relative group">
                                    Home
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-800 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                                </a>
                                <a href="/about" className="px-3 py-2 text-gray-700 hover:text-rose-800 transition-colors relative group">
                                    About
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-800 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                                </a>
                                <a href="/services" className="px-3 py-2 text-gray-700 hover:text-rose-800 transition-colors relative group">
                                    Services
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-800 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                                </a>
                                <a href="/contact" className="px-3 py-2 text-gray-700 hover:text-rose-800 transition-colors relative group">
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-800 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                                </a>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button className="px-4 py-2 text-gray-700 hover:text-rose-800 transition-colors">
                                Login
                            </button>
                            <button className="px-4 py-2 bg-rose-800 text-white rounded-lg hover:bg-rose-800 transition-colors">
                                Sign Up
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="text-gray-700 hover:text-blue-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Main Content */}
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Added Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-medium text-gray-800">
                            Change can start with a single step
                        </h2>
                        <p className="text-gray-600 mt-6">
                            Our online mental health tests can help make sense of your feelings and could be the first step towards getting the right help.
                        </p>
                        <p className="text-gray-500 mt-6">
                            <strong>Prof Uttom Chowdhury</strong> - MB ChB, MRC Psych - Consultant Child & Adolescent Psychiatrist
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                        {tests.map((test) => (
                            <div
                                key={test.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <h2 className="text-xl font-semibold mb-3">{test.name}</h2>
                                <p className="text-gray-600 mb-4">{test.description}</p>
                                <button
                                    onClick={() => handleStartTest(test.id)}
                                    className="w-full bg-pink-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Start Test
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>

    );
};

export default TestsList;


