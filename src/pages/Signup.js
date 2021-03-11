import React,{useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import LandingPageHeader from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import '../css/lds-roller.scss';

const defaultState = {
    email: '',
    title: '',
    firstName: '',
    lastName: ''
  };
const Signup = () => {
  const authContext = useContext(AuthContext);
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
        `/user/signup`,
        state
      );
      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError('');

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1500);
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
      {redirectOnLogin && <Redirect to="/success" />}
      <LandingPageHeader content="Application Portal" />
      <div class="flex items-center mt-6">
        <div div class="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 class="block w-full text-center text-2xl mb-6 font-serif">
            Create Account.
          </h1>
          {signupSuccess && <FormSuccess text="An email is sent to you mail, kindly verify" />}
          {signupError && <FormError text={signupError} />}
          <form class="mb-4 md:flex md:flex-wrap md:justify-between" action="/" method="post" onSubmit={submitCredentials}>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="title">
                Title
              </label>
               <select
                  name="title"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                  value={state.title}
                  onChange={handleChange}
                  style={{ border: errors.title && "1px solid #d07d7d" }}
              >
                {errors.title && <p className="form-error">{errors.title}</p>}
                  <option value="" >Choose your title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                </select>
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="first_name">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="firstName"
                id="first_name"
                placeholder="First Name"
                value={state.firstName}
                onChange={handleChange}
                style={{ border: errors.firstName && "1px solid #d07d7d" }}
              />
              {errors.firstName && <p className="form-error">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="last_name">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="lastName"
                id="last_name"
                placeholder="Last Name"
                value={state.lastName}
                onChange={handleChange}
                style={{ border: errors.lastName && "1px solid #d07d7d" }}
              />
               {errors.lastName && <p className="form-error">{errors.lastName}</p>}
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
                placeholder="name@domain.com"
                value={state.email}
                onChange={handleChange}
                style={{ border: errors.email && "1px solid #d07d7d" }}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
              <button class="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif" type="submit">
                 {loginLoading ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                    <div key={index.toString()} className="lds-roller-dot"></div>
                    ))}
                  </div>
                    ) : (
                  <p>Create Account</p>
                  )}
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
