import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const NavBar = ({isAuthenticated,setIsAuthenticated}) => {
    const {authUser} = useSelector(state => state.user);
    const dispatch = useDispatch();

    
    const handleLogOut = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        dispatch(setAuthUser(null));
        console.log("Logout button clicked...");
    }
    
    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center bg-gray-950 text-white p-4 shadow-md">
            <NavLink to="/">
                <Logo />
            </NavLink>
            <div className="flex items-center space-x-6">
                <NavLink
                    to="/problems"
                    className={({ isActive }) => isActive ? "text-purple-300 font-bold" : "font-bold hover:text-gray-300"}
                >
                    Problems
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) => isActive ? "text-purple-300 font-bold" : "font-bold hover:text-gray-300"}
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? "text-purple-300 font-bold" : "font-bold hover:text-gray-300"}
                >
                    About
                </NavLink>
            </div>
            { !isAuthenticated && 
            <NavLink
                to="/login"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-transform transform "
            >
                Login
            </NavLink>
            }
            { isAuthenticated && 
            <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-transform transform "
                onClick={handleLogOut}
            >
                Log out
            </button>
            }

            
        </nav>
    );
}

export default NavBar;
