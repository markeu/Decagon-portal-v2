import React,{useContext, useState} from 'react';
import { Link, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import LandingPageHeader from '../components/Header';
import { publicFetch } from './../util/fetch';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { useFormik } from 'formik';

const Login = () => {
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
    );

  const loginFormFields = useFormik({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required!';
      }
      if (!values.password) {
        errors.password = 'Password is required!';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`/user/login`,
          values
        )
        .then(({data}) => {
          setSubmitting(false);
          authContext.setAuthState(data);
          setLoginSuccessMsg(data.message);
          setLoginSuccess(true)
          setLoginError(false);
          setLoginErrorMsg('');
          loginFormFields.resetForm()
          setTimeout(() => {
            setRedirectOnLogin(true);
          }, 700);
        })
        .catch((error) => {
          const errMsg = error.response.data.error
          setLoginError(true)
          setLoginErrorMsg(errMsg)
          setLoginSuccessMsg('');
          setLoginSuccess(false);
        });
    },
  });

  return (
    <>
      {redirectOnLogin && <Redirect to="/registration/personalInfo" />}
      <LandingPageHeader content="Application Portal" />
      <div className="flex items-center mt-12">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Login.
          </h1>
          <h6 className="mb-8 text-base font-serif text-gray-600">
            Log in with your data that you entered during registration.
          </h6>
          {loginSuccess && <FormSuccess text={loginSuccessMsg} />}
          {loginError && <FormError text={loginErrorMsg} />}
          <form className="md:flex md:flex-wrap md:justify-between" onSubmit={loginFormFields.handleSubmit}>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="email">
                Your e-mail
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com"
                value={loginFormFields.values.email}
                onChange={loginFormFields.handleChange}
                onBlur={loginFormFields.handleBlur}
                style={{ border: loginFormFields.errors.email && "1px solid #d07d7d" }}
              />
              { loginFormFields.errors.email &&
               loginFormFields.errors.email &&
               loginFormFields.errors.email && (
                <span className="text-base font-serif text-red-700 mt-2">{loginFormFields.errors.email}</span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="password"
                name="password"
                id="password"
                placeholder="at least 8 characters"
                value={loginFormFields.values.password}
                onChange={loginFormFields.handleChange}
                onBlur={loginFormFields.handleBlur}
                style={{ border: loginFormFields.errors.password && "1px solid #d07d7d" }}
              />
              { loginFormFields.errors.password &&
               loginFormFields.errors.password &&
               loginFormFields.errors.password && (
                <span className="text-base font-serif text-red-700 mt-2">{loginFormFields.errors.password}</span>
              )}
              <div>
                <input
                  className="text-sm text-gray-700 mt-6 font-serif mb-6"
                  type="checkbox"
                  name="save_login_state"
                  label="Keep me signed in"
                  checked=''
                  onChange='' />
                <label className="mb-2 text-sm text-gray-800 p-3 font-serif" htmlFor="password">
                    Keep me logged in
                </label>
              </div>
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-base p-2 rounded font-serif md:w-full" 
                type="submit"
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loginFormFields.isSubmitting ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index.toString()}
                        className="lds-roller-dot"
                      ></div>
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
