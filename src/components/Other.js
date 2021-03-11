import React, { useState } from 'react'

function Other() {

  const [state, setState] = useState({hear_about_us: "", decadev: ""});
  const [isOther, setIsOther] = useState({ other: false, decadev: false});
console.log(state);
  const handleSelect = (event) => {
    const { name, value } = event.target;

    if (value === 'other-us') {
      setState({ ...state, [name]: value});
      setIsOther({decadev: false, other: true})
    }else if (value === 'decadev') {
      setState({ ...state, [name]: value});
      setIsOther({other: false, decadev: true})
    }else {
      setIsOther({other: false, decadev: false})
      setState({ ...state, [name]: value});
    }

  }
  return (
    <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-12 font-base text-2xl">
        Other Information
      </p>
      <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        <form class="md:flex md:flex-wrap md:justify-between"
          action="/" method="post">
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700 mt-6" for="hear_about_us">
                Where did you hear about us?
              </label>
               <select
                  name="hear_about_us"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-sm text-gray-500 mb-4"
                  value={state.hear_about_us}
                  onChange={handleSelect}
                >
                  <option value="">Select one</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">Linkedin</option>
                  <option value="decadev">Decadev</option>
                  <option value="WAAW_Foundation">WAAW Foundation</option>
                  <option value="other-us">Other</option>
                </select>
                {isOther['decadev'] &&(
                  <div className="flex flex-col mb-4 md:w-full">
                    <label className="mb-3 text-base font-serif text-gray-700" for="referrer_decadev">Name of Decadev</label>
                    <input
                      className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                      type="text"
                      name="decadev"
                      value={state.decadev}
                      onChange={handleSelect}
                      placeholder="Name of Decadev"
                    />
                  </div>
                  )}
                  {isOther['other'] &&(
                  <div className="flex flex-col mb-4 md:w-full">
                    <label className="mb-3 text-base font-serif text-gray-700" for="course">Please specify</label>
                    <input
                      className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                      type="text"
                      name="highest_qualification"
                      onChange={handleSelect}
                    />
                  </div>
                )}
            </div>
            <div class="flex flex-col mb-4 md:w-full">
            <div className="flex justify-between mt-3">
              <button className="block bg-green-500 hover:bg-teal-dark text-white w-2/5 h-8 text-sm rounded font-serif "
                type="submit">
                Save As Draft
              </button>
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-sm   w-2/5 h-8 rounded font-serif"
                type="submit">
                Submit
              </button>
            </div>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Other
