import React from 'react';
import { Link } from 'react-router-dom';
import LandingPageHeader from '../components/Header';



const Home = () => {
  return (
    <>
      <LandingPageHeader content="Application Portal" />
      <div class="flex items-center mt-12">
        <div div class="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 class="block w-full text-center text-2xl mb-6 font-serif">
            Login.
          </h1>
          <h6 className="mb-8 text-base font-serif text-gray-600">
            Log in with your data that you entered during registration.
          </h6>
          <form class="md:flex md:flex-wrap md:justify-between " action="/" method="post">
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="email">
                Your e-mail
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com"/>
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="password">
                Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="password"
                name="password"
                id="password"
                placeholder="at least 8 characters"
                />
              <div>
              <input
                className="text-sm text-gray-700 mt-6 font-serif mb-6"
                type="checkbox"
                name="save_login_state"
                label="Keep me signed in"
                checked=''
                onChange='' />
              <label className="mb-2 text-sm text-gray-800 p-3 font-serif" for="password">
                  Keep me logged in
              </label>
              </div>
            <button class="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-24 rounded font-serif" type="submit">
                Log in
            </button>
          </div>
          </form>
            <p className="text-sm text-center text-gray-800">
              Don’t have an account? <Link to="/signup">
              <span className="text-sm text-green-500 font-serif"         target="_blank"
                rel="noopener noreferrer"
                href="/signup">Create account</span>
            </Link>
            </p>
          <div className="text-center mt-3">
            <Link to="/resetPassword">
              <span className="text-sm text-green-500 font-serif"
               target="_blank"
               rel="noopener noreferrer"
               >Forgot Password</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
