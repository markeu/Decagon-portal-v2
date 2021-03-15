import React from 'react';

function Details() {
  return (
    <>
     <div className=" border border-gray-400 h-screen rounded-md bg-white px-16">
        <p className="m-10 font-base text-2xl">
            Your Application Details
        </p>
        <div className="w-full bg-white mt-20 ml-8">
          <p className="mb-8 w-4/5 leading-7 font-light">Kindly review the home study guide to navigate the appropriate chapters. It will guide you through what and when to study. Feel free to start studying home study guide
          </p>
          <span className="text-green-500 font-semibold">Home Study Guide</span>
        </div>
      </div>
    </>
  )
}

export default Details



