'use client'

import React, { useState } from 'react';

const Sidebar = ({isOpen, toggleSidebar}) => {


    return (
        <div className={`flex flex-col gap-3 fixed left-0 h-full bg-gray-100 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16 overflow-hidden'}`}>
            <button 
                onClick={toggleSidebar} 
                className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                {isOpen ? '←' : '→'}
            </button>
            <div className="p-4">
                <ul className="space-y-4">
                    <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                        <span>🏠</span>
                        {isOpen && <span>Dashboard</span>}
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                        <span>👤</span>
                        {isOpen && <span>Profile</span>}
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                        <span>⚙️</span>
                        {isOpen && <span>Settings</span>}
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                        <span>🚪</span>
                        {isOpen && <span>Logout</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
