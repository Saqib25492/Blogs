'use client';
import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-col gap-3 fixed       top-6 left-0 h-full bg-gray-100 transition-all duration-300 ${isOpen ? 'w-64' : 'w-24 overflow-hidden'}`}>
            <button 
                onClick={toggleSidebar} 
                className="m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>
            <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
                <ul className="space-y-4">
                    <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
                    <li className="hover:text-blue-500 cursor-pointer">Profile</li>
                    <li className="hover:text-blue-500 cursor-pointer">Settings</li>
                    <li className="hover:text-blue-500 cursor-pointer">Logout</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
