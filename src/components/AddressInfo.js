import React from 'react'

function AddressInfo() {
  return (
   <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-12 font-base text-2xl">
        Address Information
      </p>
      <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        <form class="mb-4 md:flex md:flex-wrap md:justify-between"
          action="/" method="post">
            <div class="flex flex-col mt-10 mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="title">
                State Of Origin
              </label>
               <select
                  name="state_of_origin"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  {NIGERIAN_STATE.map((state) => (
                    <option key={state} value={state.toLowerCase()}>
                      {state}
                    </option>
                  ))}
                </select>
          </div>
          <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="title">
                Current Location
              </label>
               <select
                  name="current_location"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  {NIGERIAN_STATE.map((state) => (
                    <option key={state} value={state.toLowerCase()}>
                      {state}
                    </option>
                  ))}
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

export default AddressInfo

const NIGERIAN_STATE = [
  "Select a state",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
