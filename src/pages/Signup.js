import React from 'react';
import { Link } from 'react-router-dom';
import LandingPageHeader from '../components/Header';

const Signup = () => {


  return (
    <>
      <LandingPageHeader content="Application Portal" />
      <div class="flex items-center mt-6">
        <div div class="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 class="block w-full text-center text-2xl mb-6 font-serif">
            Create Account.
          </h1>
          <form class="mb-4 md:flex md:flex-wrap md:justify-between" action="/" method="post">
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="title">
                Title
              </label>
               <select
                  name="gender"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                  value=''
                  onChange=''
                  //style={{ border: errors.gender && "1px solid #d07d7d" }}
                >
                  <option value="" >Choose your title</option>
                  <option value="">Mr</option>
                  <option value="">Mrs</option>
                  <option value="">Miss</option>
                </select>
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="first_name">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                />
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="last_name">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
              />
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="email">
                E-mail
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 mb-8"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com" />
              <button class="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif" type="submit">
              Create Account
              </button>
            </div>
          </form>
            <p className="text-sm text-center text-gray-800">
            Already have an account?
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

export default Signup;
