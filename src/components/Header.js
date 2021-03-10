import React from 'react';
import logo from '../images/logo-dark.png';

const MainHeader = ({content}) => {
    return (
      <>
        <div className="w-full top-0 px-10 py-6 bg-gray-100">
          <div className="flex justify-between w-3/5">
            <img
              className="w-40 h-full"
              src={logo}
              alt="Logo"
            />
            <h1 className="text-3xl text-green-500 font-bold text-primary">
              {content}
            </h1>
          </div>
        </div>
      </>
    )
}

export default MainHeader
