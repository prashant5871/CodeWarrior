import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgrammingGirl from "../assets/coding_girl.webp"
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const HomePage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { authUser } = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsAuthenticated(true);
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch(setAuthUser(user));
        }
    },[])

    return (
        <div className="bg-gray-100 min-h-screen">

            <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Level up your coding skills</h1>

                        <p className="text-lg md:text-xl mb-6">Join CodeWarrior and solve challenging problems, compete in contests, and grow as a developer.</p>
                        {!authUser &&
                            <Link to="/register" className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-400 hover:text-white transition-colors duration-300">Get Started</Link>
                        }
                        {authUser &&
                            <Link to="/problems" className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-400 hover:text-white transition-colors duration-300">Solve Problems</Link>
                        }
                    </div>
                    <div className="md:w-1/2 mt-10 md:mt-0">

                        <img src={ProgrammingGirl} alt="Coding Hero" className="w-full" />
                    </div>
                </div>
            </section>


            <section className="py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose CodeWarrior?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Practice Problems</h3>
                            <p className="text-gray-700">Access a wide range of practice problems categorized by difficulty level and topic.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Compete in Contests</h3>
                            <p className="text-gray-700">Participate in coding contests with peers from around the world and test your skills.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Track Your Progress</h3>
                            <p className="text-gray-700">Monitor your performance with detailed analytics and track your coding journey.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Community and Support</h3>
                            <p className="text-gray-700">Connect with a vibrant community of developers, share knowledge, and get support.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomePage;
