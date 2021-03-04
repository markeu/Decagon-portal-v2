import React from 'react'
import Sidebar from './Sidebar';


function DashboardLayout({children}) {
 return (
    <div className="items-start justify-start w-full h-full bg-gradient-to-b from-green-200 via-white to-green-100 md:flex">
      <Sidebar />
      <div className="grid w-3/4 overflow-y-auto bg-gray-100">
        <div className='border border-gray-400 mb-4 font-bold bg-gray-200 font-muli flex flex-row-reverse'>
          <button
          onClick=""
          className="flex items-center justify-start  cursor-pointer hover:text-blue-600 text-green-600"
          >
            <span className="pr-3 text-lg font-bold ">
              Log Out
            </span>
          </button>
         <div className="m-6"
           style={{
             "border": "1px solid black",
             "height": "30px"
         }}></div>
          <p className="text-xl py-6">
           Welcome Uchay
          </p>
        </div>
        <div className="w-full px-5">
          {children}
        </div>
      </div>
    </div>
  );

}

export default DashboardLayout




