import React,{useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import LandingPageHeader from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import '../css/lds-roller.scss';
import { useFormik } from 'formik';

const Signup = () => {
  const authContext = useContext(AuthContext);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');
  const [signupError, setSignupError] = useState(false);
  const [signupErrorMsg, setSignupErrorMsg] = useState('');
  const [redirectOnSignup, setRedirectOnSignup] = useState(
    false
  );
  const signupFormFields = useFormik({
    initialValues: { email: '', title: '', firstName: '', lastName: '' },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Title is required!';
      }
      if (!values.email) {
        errors.email = 'Email address is required!';
      }
      if (!values.lastName) {
        errors.lastName = 'Last name is required!';
      }
      if (!values.firstName) {
        errors.firstName = 'First name is required!';
      }
      
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`/user/signup`,
          values
        )
        .then(({data}) => {
          authContext.setAuthState(data);
          setSubmitting(false);
          authContext.setAuthState(data);
          setSignupSuccessMsg(data.message);
          setSignupSuccess(true)
          setSignupError(false);
          setSignupErrorMsg("");
          signupFormFields.resetForm()
          setTimeout(() => {
            setRedirectOnSignup(true);
          }, 700);
        })
        .catch((error) => {
          const errMsg = error.response.data.error
          setSignupError(true)
          setSignupErrorMsg(errMsg);
          setSignupSuccessMsg('');
          setSignupSuccess(false);
        });
    },
  });

  return (
    <>
      {redirectOnSignup && <Redirect to="/success" />}
      <LandingPageHeader content="Application Portal" />
      <div className="flex items-center mt-6">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Create Account.
          </h1>
          {signupSuccess && <FormSuccess text={signupSuccessMsg} />}
          {signupError && <FormError text={signupErrorMsg} />}
          <form className="mb-4 md:flex md:flex-wrap md:justify-between" onSubmit={signupFormFields.handleSubmit}>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="title">
                Title
              </label>
              <select
                name="title"
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                value={signupFormFields.values.title}
                onChange={signupFormFields.handleChange}
                onBlur={signupFormFields.handleBlur}
                style={{ border: signupFormFields.errors.title && "1px solid #d07d7d" }}
              >
                
                  <option value="" >Choose your title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
              </select>
              { signupFormFields.errors.title &&
                signupFormFields.errors.title &&
                signupFormFields.errors.title && (
                <span className="text-base font-serif text-red-700 mt-2">{signupFormFields.errors.title}</span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="first_name">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="firstName"
                id="first_name"
                placeholder="First Name"
                value={signupFormFields.values.firstName}
                onChange={signupFormFields.handleChange}
                onBlur={signupFormFields.handleBlur}
                style={{ border: signupFormFields.errors.firstName && "1px solid #d07d7d" }}
              />
              { signupFormFields.errors.firstName &&
                  signupFormFields.errors.firstName &&
                  signupFormFields.errors.firstName && (
                  <span className="text-base font-serif text-red-700 mt-2">{signupFormFields.errors.firstName}</span>
                )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="last_name">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="lastName"
                id="last_name"
                placeholder="Last Name"
                value={signupFormFields.values.lastName}
                onChange={signupFormFields.handleChange}
                onBlur={signupFormFields.handleBlur}
                style={{ border: signupFormFields.errors.lastName && "1px solid #d07d7d" }}
              />
              { signupFormFields.errors.lastName &&
                  signupFormFields.errors.lastName &&
                  signupFormFields.errors.lastName && (
                  <span className="text-base font-serif text-red-700 mt-2">{signupFormFields.errors.lastName}</span>
                )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="email">
                E-mail
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com"
                value={signupFormFields.values.email}
                onChange={signupFormFields.handleChange}
                onBlur={signupFormFields.handleBlur}
                style={{ border: signupFormFields.errors.email && "1px solid #d07d7d" }}
              />
              { signupFormFields.errors.email &&
                  signupFormFields.errors.email &&
                  signupFormFields.errors.email && (
                  <span className="text-base font-serif text-red-700 mt-2">{signupFormFields.errors.email}</span>
                )}
            </div>
            <button className="block bg-green-500 hover:bg-teal-dark text-white text-base p-2 rounded font-serif md:w-full mt-4" 
              type="submit"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {signupFormFields.isSubmitting ? (
                <div className="lds-roller">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index.toString()}
                      className="lds-roller-dot"
                    ></div>
                  ))}
                </div>
              ) : (
                <p>Create Account</p>
              )}
            </button>
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
