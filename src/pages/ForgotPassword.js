import React from 'react';
import { Link } from 'react-router-dom';
import LandingPageHeader from '../../components/ApplicationHeader';

const ForgotPassword = () => {
  return (
    <>
      <LandingPageHeader content="Application Portal" />
      <div className="flex items-center mt-12">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Reset Password.
          </h1>
          <form class="md:flex md:flex-wrap md:justify-between" action="/" method="post">
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" htmlFor="email">
                Your e-mail
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com"
                />
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif" type="submit">
               Send reset password email
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-800">
            Remember your password?
            <Link to="/">
                <span className="text-sm text-green-500 font-serif"
                  target="_blank"
                  rel="noopener noreferrer"> Login</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
