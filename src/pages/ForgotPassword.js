import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import LandingPageHeader from '../components/Header';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { Redirect } from 'react-router-dom';
import { publicFetch } from './../util/fetch';

const ForgotPassword = () => {
  const defaultState = {
    email: ''
  };
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
        `/forgot-password`, state
      );
      console.log(data);
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
      <div className="flex items-center mt-12">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Forgot Password.
          </h1>
           {signupSuccess && <FormSuccess text="Kindly check your mail" />}
           {signupError && <FormError text={signupError} />}
          <form class="md:flex md:flex-wrap md:justify-between" onSubmit={submitCredentials}>
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
                value={state.email}
                onChange={handleChange}
                style={{ border: errors.email && "1px solid #d07d7d" }}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif" type="submit">
                {loginLoading ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                    <div key={index.toString()} className="lds-roller-dot"></div>
                    ))}
                  </div>
                    ) : (
                  <p>Send reset password email</p>
                  )}
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
