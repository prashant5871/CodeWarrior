import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'; // For formatting time

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [submissions, setSubmissions] = useState([]); // For storing recent submissions

    const navigate = useNavigate();

    // Fetching problems and submissions
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const u = JSON.parse(localStorage.getItem("user"));
            setUser(u);

            const fetchSubmissions = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/submit/submissions/${u._id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch submissions');
                    }
                    const data = await response.json();
                    console.log(data);
                    setSubmissions(data?.reverse()); // Set recent submissions
                } catch (error) {
                    console.error(error);
                }
            };

            fetchSubmissions();
        } else {
            navigate("/login");
        }
    }, [navigate]);

    // Function to format the time (e.g., "2 hours ago", "1 day ago")
    const formatTimeAgo = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {user ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
                    <div className="flex max-h-96">
                        {/* User Info on the left side */}
                        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                            <div className="flex flex-col items-center">
                                <img
                                    className="w-24 h-24 rounded-full shadow-lg"
                                    src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                                    alt="User Avatar"
                                />
                                <h2 className="text-2xl font-bold text-center mt-4">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-center text-gray-600">@{user.username}</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-semibold">Email:</span>
                                    <span className="text-gray-900">{user.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-semibold">Username:</span>
                                    <span className="text-gray-900">{user.username}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Submissions on the right side */}
                        <div className="w-2/3 pl-6 overflow-auto">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Submissions</h3>
                            <div className="space-y-4">
                                {submissions.length > 0 ? (
                                    submissions.map((submission) => (
                                        <Link to={`/problem/${submission.problem._id}`} >
                                            <div key={submission._id} className="p-4 bg-gray-50 rounded-md shadow-md hover:bg-gray-100 transition">
                                                <div className="flex justify-between">
                                                    <h4 className="text-lg font-semibold text-blue-600">
                                                        {submission.problem.title}
                                                    </h4>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-bold ${submission.result === 'Success'
                                                                ? 'bg-green-200 text-green-800'
                                                                : submission.result === 'Compile Error'
                                                                    ? 'bg-red-200 text-yellow-800'
                                                                : submission.result === "Failed" 
                                                                    ? 'bg-red-600 text-white mt-auto'
                                                                    : 'bg-yello-600 text-white'
                                                            }`}
                                                    >
                                                        {submission.result}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Submitted {formatTimeAgo(submission.submissionDate)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600">No recent submissions.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProfilePage;
