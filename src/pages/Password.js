import React,{useState} from 'react';
import LandingPageHeader from '../components/Header';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { Redirect } from 'react-router-dom';
import { publicFetch } from './../util/fetch';

const defaultState = {
  confirmPassword: "",
  password: ""
};

const Home = () => {

  const [state, setState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );
  const [loginLoading, setLoginLoading] = useState(false);

   const submitCredentials = async e => {
     e.preventDefault()

    try {
      setLoginLoading(true)
      const { data } = await publicFetch.post(
        `password`,
          state, { params: {
          applicant_id: "n71c600u31"
        }}
      );

      setSignupSuccess(data.message);
      setSignupError('');

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginLoading(false);
      setSignupError(error.message);
      setSignupSuccess('');
    }
   };

   const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/"/>}
      <LandingPageHeader content="Application Portal" />
      <div class="flex items-center mt-12">
        <div div class="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 class="block w-full text-center text-2xl mb-6 font-serif">
            Create Password.
          </h1>
          {signupSuccess && <FormSuccess text="Password created" />}
          {signupError && <FormError text={signupError} />}
          <form class="mb-8 md:flex md:flex-wrap md:justify-between" action="/" method="post" onSubmit={submitCredentials}>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="password">
                Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="password"
                name="password"
                id="password"
                value={state.password}
                onChange={handleChange}
                style={{ border: errors.password && "1px solid #d07d7d" }}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlfor="password">
                Confirm Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={state.confirmPassword}
                onChange={handleChange}
                style={{ border: errors.confirmPassword && "1px solid #d07d7d" }}
                />
            <button class="mt-6 block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif" type="submit">
              {loginLoading ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                    <div key={index.toString()} className="lds-roller-dot"></div>
                    ))}
                  </div>
                    ) : (
                  <p>Create Password</p>
                  )}
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
