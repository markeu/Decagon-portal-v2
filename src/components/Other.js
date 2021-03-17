import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';

import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import '../css/lds-roller.scss';
import validateApplication from '../util/validateApplication';

function Other() {

  const [state, setState] = useState({hear_about_us: ""});
  const [isOther, setIsOther] = useState(false);
  const [isDecadev, setIsDecadev] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );
  const [errors, setErrors] = useState({hear_about_us: ""});

  const handleSelect = (event) => {
    const { name, value } = event.target;

    if (value === 'other') {
      setState({ ...state, [name]: ''});
      setIsOther(true)
      setIsDecadev(false)
    }else if (value === 'decadev') {
      setState({ ...state, [name]: ''});
      setIsDecadev(true)
      setIsOther(false)
    }else if (name === 'hear_about_us') {
      setIsDecadev(false)
      setIsOther(false)
      setState({ ...state, [name]: value});
      setErrors("")
    }
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value});

    //@ts-ignore
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errorsFields = validateApplication(state);

    if (errorsFields) {
      return setErrors({ ...errors, ...errorsFields });
    }

    setIsLoading(true)
    await publicFetch
      .post(`/user/other-info`,
        state
      )
      .then(async() => {
        await publicFetch.post(`/user/submit`)
        .then(({ data }) => {
        setLoginSuccessMsg(data.message);
        setLoginSuccess(true)
        setLoginError(false);
        setLoginErrorMsg('');
        setTimeout(() => {
          setRedirectOnLogin(true);
        }, 700);
        })

      })
      .catch((error) => {
        setIsLoading(false)
        setLoginError(true)
        setLoginErrorMsg(error.message)
        setLoginSuccessMsg('');
        setLoginSuccess(false);
      });
  }

  return (
    <>
      {redirectOnLogin && <Redirect to="/details/Info" />}
      <div className="border border-gray-400  h-screen rounded-md bg-white">
        <p className="m-12 font-base text-2xl">
          Other Information
        </p>
        <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        {loginSuccess && <FormSuccess text={loginSuccessMsg} />}
        {loginError && <FormError text={loginErrorMsg} />}
          <form className="md:flex md:flex-wrap md:justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700 mt-6" htmlFor="hear_about_us">
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
                <option value="other">Other</option>
              </select>
              {isDecadev &&(
                <div className="flex flex-col mb-4 md:w-full">
                  <label className="mb-3 text-base font-serif text-gray-700" htmlFor="referrer_decadev">Name of Decadev</label>
                  <input
                    className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                    type="text"
                    name="hear_about_us"
                    onChange={handleChange}
                    placeholder="Name of Decadev"
                  />
                </div>
              )}
              {isOther &&(
                <div className="flex flex-col mb-4 md:w-full">
                  <label className="mb-3 text-base font-serif text-gray-700" htmlFor="course">Please specify</label>
                  <input
                    className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                    type="text"
                    name="hear_about_us"
                    placeholder="Specify other"
                    onChange={handleChange}
                  />
                </div>
              )}
              {errors.hear_about_us && (
                <span className="text-base font-serif text-red-700">{errors.hear_about_us}</span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <div className="flex justify-between mt-3">
                <button className="block bg-green-500 hover:bg-teal-dark text-white w-2/5 h-8 text-sm rounded font-serif "
                  type="submit">
                  Save As Draft
                </button>
                <button className="block bg-green-500 hover:bg-teal-dark text-white text-sm   w-2/5 h-8 rounded font-serif"
                    type="submit">
                    {isLoading ? (
                      <div className="lds-roller">
                        {[...Array(6)].map((_, index) => (
                          <div key={index.toString()} className="lds-roller-dot"></div>
                        ))}
                      </div>
                    ) : (
                      <p> Submit</p>
                    )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Other
