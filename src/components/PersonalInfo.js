import React from 'react'

const defaultState = {
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phoneNumber: ''
  };
function PersonalInfo() {
  return (
    <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-12 font-base text-2xl">
        Personal Information
      </p>
      <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        <form class="mb-4 md:flex md:flex-wrap md:justify-between"
          action="/" method="post">
           <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="first_name">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="last_name">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
              />
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="title">
                Gender
              </label>
               <select
                  name="gender"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="" >Choose your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="dob">
                Date of Birth
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-gray-500"
                type="date"
                max="2003-07-01"
                name="dob"
                id="dob"
                placeholder="Pick a date"
              />
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="email">
                Phone Number
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm mb-8"
                type="text"
                name="phone_number"
                id="phone_number"
              placeholder="Phone Number" />
            <div className="flex justify-between mt-3">
              <button className="block bg-green-500 hover:bg-teal-dark text-white w-2/5 h-8 text-sm rounded font-serif "
                type="submit">
                Save As Draft
              </button>
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-sm   w-2/5 h-8 rounded font-serif"
                type="submit">
                Save And Continue
              </button>
            </div>
            </div>
          </form>
      </div>
    </div>
  )
}

export default PersonalInfo
