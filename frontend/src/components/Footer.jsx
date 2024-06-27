import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white py-8 text-center">
            <div className="flex items-center justify-center space-x-4">
                <Link to="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
                <Link to="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact Us</Link>
            </div>
            <p className="mt-4">&copy; 2024 CodeWarrior. All rights reserved.</p>
        </footer>
    )
}

export default Footer
