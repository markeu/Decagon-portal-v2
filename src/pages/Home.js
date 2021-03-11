import React,{useContext, useState} from 'react';
import { Link, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import LandingPageHeader from '../components/Header';
import { publicFetch } from './../util/fetch';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';

const defaultState = {
    email: '',
    password: '',
};
const Login = () => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      //const errorsFields = validateApplication(state);
      // if (errorsFields) {
      //   return setErrors({ ...errors, ...errorsFields });
      // }

      setLoading(true)
       const { data } = await publicFetch.post(
        `user/login`,
        state
       );
      console.log(data);
      authContext.setAuthState(data);
      setSuccessText(data.message);
      setLoginError(false);
      setLoginSuccess(true);
      setErrors({
        email: '',
        password: '',
      });

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setLoginSuccess(false);
      setLoginError(true);
      setSuccessText('Invalid email/password supplied...');
      setLoginSuccess(false);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/registration/personalInfo" />}
      <LandingPageHeader content="Application Portal" />
      <div class="flex items-center mt-12">
        <div div class="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 class="block w-full text-center text-2xl mb-6 font-serif">
            Login.
          </h1>
          <h6 className="mb-8 text-base font-serif text-gray-600">
            Log in with your data that you entered during registration.
          </h6>
          {loginSuccess && <FormSuccess text={successText} />}
          {loginError && <FormError text={successText} />}
          <form class="md:flex md:flex-wrap md:justify-between " action="/" method="post" onSubmit={handleSubmit}>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="email">
                Your e-mail
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com"
                value={state.email}
                onChange={handleChange}
                style={{ border: errors.email && '1px solid #d07d7d' }}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
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
                value={state.password}
                onChange={handleChange}
                style={{ border: errors.password && '1px solid #d07d7d' }}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
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
                {loading ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                      <div key={index.toString()} className="lds-roller-dot"></div>
                    ))}
                  </div>
                ) : (
                  <p>Log in</p>
                )}
            </button>
          </div>
          </form>
            <p className="text-sm text-center text-gray-800">
              Don’t have an account? <Link to="/signup">
              <span className="text-sm text-green-500 font-serif" target="_blank"
                rel="noopener noreferrer"
                href="/signup">Create account</span>
            </Link>
            </p>
          <div className="text-center mt-3">
            <Link to="/forgotpassword">
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

export default Login;
