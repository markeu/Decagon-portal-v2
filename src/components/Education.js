import React from 'react'

function Education() {
  return (
     <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-10 font-base text-2xl">
        Education/NYSC
      </p>
      <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        <form class="mb-4 md:flex md:flex-wrap md:justify-between"
          action="/" method="post">
           <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="qualification">
                Highest Qualification
              </label>
               <select
                  name="qualification"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="">Select an option</option>
                  <option value="Phd">Phd</option>
                  <option value="Masters">Masters</option>
                  <option value="HND/Bachelors">HND/Bachelors</option>
                  <option value="other">Other</option>
                </select>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="last_name">Institution</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="Institution"
                id="Institution"
                placeholder="Name of Institution"
              />
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="degree">
                Grade Achieved
              </label>
               <select
                  name="degree"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="">Select an option</option>
                  <option value="first class">First class</option>
                  <option value="second class upper">Second class upper</option>
                  <option value="second class lower">Second class lower</option>
                  <option value="third class">Third class</option>
                </select>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="course">Course of Study</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="course"
                id="course"
                placeholder="Course of Study"
              />
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="nysc">
                NYSC Status
              </label>
               <select
                  name="nysc"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="">Select an option</option>
                  <option value="I have completed nysc">I have completed service</option>
                  <option value="exemption">I have got an exemption</option>
                  <option value="awaiting service">I am awaiting service</option>
                  <option value="serving currently">I am currently serving</option>
                </select>
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="experience">
                Programming Experience
              </label>
               <select
                  name="experience"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="">Select an option</option>
                  <option value="No Skill">No Skill</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="payment">
                Payment Option
              </label>
               <select
                  name="payment"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="">Select an option</option>
                  <option value="No Skill">Self sponsored</option>
                  <option value="Beginner">Student loan</option>
                  <option value="Intermediate">Scholarship</option>
                </select>
            </div>
            <div class="flex flex-col mb-4 md:w-full">
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

export default Education
