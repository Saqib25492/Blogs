import React from "react";
import Sidebar from "./components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="h-full w-64 top-6 left-0"></div>
      <div className="grow bg-slate-700">
        <div className="grid grid-cols-4 w-[98%] gap-4 p-4 mx-auto h-[30%]">
          <div className="bg-white rounded shadow">Item 1</div>
          <div className="bg-white rounded shadow">Item 2</div>
          <div className="bg-white rounded shadow">Item 3</div>
          <div className="bg-white rounded shadow">Item 4</div>
        </div>
        <div className="flex gap-4 w-[98%] h-[70%] p-4 mx-auto">
          <div className="bg-white rounded shadow w-2/4">Item 5</div>
          <div className="bg-white rounded shadow w-2/4">
            <div className="grid grid-cols-2 p-4 gap-4 h-full">
              <div className="bg-gray-200 rounded shadow">Box 1</div>
              <div className="bg-gray-200 rounded shadow">Box 2</div>
              <div className="bg-gray-200 rounded shadow">Box 3</div>
              <div className="bg-gray-200 rounded shadow">Box 4</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
