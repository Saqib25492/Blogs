  'use client'

  import React from "react";
  import Sidebar from "./components/sidebar";
  import { useState } from "react";


  const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    console.log(isOpen);

    return (
      <div className="flex w-full h-screen bg-gray-100">
        
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        
        <div className={`grow bg-slate-300 transition-all top-11 duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>

          <div className="grid grid-cols-4 w-[98%] gap-4 p-4 mx-auto h-[30%]">
            <div className="bg-white p-2 rounded shadow">Item 1</div>
            <div className="bg-white p-2 rounded shadow">Item 2</div>
            <div className="bg-white p-2 rounded shadow">Item 3</div>
            <div className="bg-white p-2 rounded shadow">Item 4</div>
          </div>
          <div className="flex gap-4 w-[98%] h-[70%] p-4 mx-auto">
            <div className="bg-white rounded shadow w-2/4">Item 5</div>
            <div className="bg-white rounded shadow w-2/4">
              <div className="grid grid-cols-2 p-4 gap-4 h-full">
                <div className="bg-gray-200 p-2 rounded shadow">Box 1</div>
                <div className="bg-gray-200 p-2 rounded shadow">Box 2</div>
                <div className="bg-gray-200 p-2 rounded shadow">Box 3</div>
                <div className="bg-gray-200 p-2 rounded shadow">Box 4</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
