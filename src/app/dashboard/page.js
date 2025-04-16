import React from "react";
import Sidebar from "./components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-full gap-4 h-screen bg-gray-100">
      <div className="h-full w-64  top-5">
        <Sidebar />
      </div>
      <div className="grow p-4 bg-slate-700"></div>
    </div>
  );
};

export default Dashboard;
