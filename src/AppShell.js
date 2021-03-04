import React from 'react';
import GradientBar from './components/common/GradientBar';
import Navbar from './components/Navbar';


const AppShell = ({ children }) => {
  return (
    <>
      <GradientBar />
      <div className="flex h-screen">
        <div className="sm:w-64 px-4 sm:px-8 pt-6 bg-blue-300">
          <h1>Am the sidebar section</h1>
        </div>
        <div className="flex flex-col w-full border-l border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-white">
            <Navbar />
          </div>
          <div className="px-4 sm:px-8 py-2 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppShell;
