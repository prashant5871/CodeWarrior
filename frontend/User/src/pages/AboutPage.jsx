import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 mt-10">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold">About CodeWarrior</h1>
          <p className="mt-4 text-xl">
            Empowering programmers to become warriors of code!
          </p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            At <strong>CodeWarrior</strong>, our mission is to provide an engaging and challenging platform for
            competitive programmers to sharpen their skills, collaborate with peers, and prepare for top coding competitions and interviews.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m5 5H6a2 2 0 01-2-2V7a2 2 0 012-2h6m2 2h6a2 2 0 012 2v11a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">Real-Time Coding Challenges</h3>
              <p className="text-gray-600 mt-4 text-center">
                Solve coding problems in real-time, with live rankings and results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v1m0 8h.01M20.94 11A9 9 0 1121 12h-.06m-2.93-6.34A8.961 8.961 0 0112 4.062V12h8.938a8.96 8.96 0 01-2.938-6.34z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">Comprehensive Problem Sets</h3>
              <p className="text-gray-600 mt-4 text-center">
                Wide range of problems, from easy to advanced, across various domains.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.341A8 8 0 114.57 8.659M15 9h.01M12 3v2M21 12h2M3 12H1m12 9v2m7.071-7.071l-1.414-1.414M4.929 4.929L3.515 6.343" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">Global Rankings</h3>
              <p className="text-gray-600 mt-4 text-center">
                Compete with programmers around the world and track your rankings.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m5 5H6a2 2 0 01-2-2V7a2 2 0 012-2h6m2 2h6a2 2 0 012 2v11a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">Detailed Analytics</h3>
              <p className="text-gray-600 mt-4 text-center">
                View performance metrics, improve coding skills, and gain insights.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">Interview Preparation</h3>
              <p className="text-gray-600 mt-4 text-center">
                Prepare for technical interviews with our curated challenges.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m5 5H6a2 2 0 01-2-2V7a2 2 0 012-2h6m2 2h6a2 2 0 012 2v11a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">Community & Collaboration</h3>
              <p className="text-gray-600 mt-4 text-center">
                Connect with other coders, collaborate, and learn together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-indigo-600 text-white text-center">
        <div className="container mx-auto px-6">
          <p>&copy; 2024 CodeWarrior. All rights reserved.</p>
          <p className="mt-2">Join the code battle today and unleash your inner warrior!</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
