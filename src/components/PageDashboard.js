import React from 'react';
import { Link } from 'react-router-dom';



const DetailDashboard = () => {
  return (
    <div className="hidden h-screen pt-12 md:block md:w-1/4 sm:w-48   bg-blue-900" style={{ position: "sticky", top: "0" }}>
      <div className="px-3">
        <div className="mb-20 ml-16">
          <Link to=''>
            <img className="w-40" src="/assets/decagonLogo.png" alt="Decagon Logo" />
          </Link>
        </div>
      </div>
      <div className="px-8 md:w-full h-fill">
        <Link to="/details/info">
          <div className="flex items-center justify-start w-full px-3 py-6 my-2 text-white cursor-pointer rounded-3xl hover:bg-blue-800 hover:text-white mb-5">
            <span className="pl-3 text-lg font-bold">
              My Application
            </span>
          </div>
        </Link>
          <Link to="/details/curriculumPage">
            <div className="flex items-center justify-start w-full px-3 py-6 my-2 text-white cursor-pointer rounded-3xl hover:bg-blue-800 hover:text-white mb-5">
              <span className="pl-3 text-lg font-bold">
                Home Study Curriculum
              </span>
            </div>
          </Link>
      </div>
    </div>
  );
};

export default DetailDashboard;
