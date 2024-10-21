import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const u = JSON.parse(localStorage.getItem("user"));
            setUser(u);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {user ? (
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                    <div className="flex justify-center">
                        <img
                            className="w-24 h-24 rounded-full shadow-lg"
                            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                            alt="User Avatar"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center mt-4">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-center text-gray-600">@{user.username}</p>

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
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProfilePage;
