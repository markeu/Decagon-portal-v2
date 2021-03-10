import React from 'react';
import LandingPageHeader from '../components/Header';



const Home = () => {
  return (
    <>
      <LandingPageHeader content="Application Portal" />
      <div class="flex items-center mt-12">
        <div div class="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 class="block w-full text-center text-2xl mb-6 font-serif">
            Create Password.
          </h1>
          <form class="mb-8 md:flex md:flex-wrap md:justify-between" action="/" method="post">
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="password">
                Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="password"
                name="password"
                id="email"
                />
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="password">
                Confirm Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="confirm_password"
                name="password"
                id="password"
                />

          </div>
            <button class="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif" type="submit">
              Create Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;