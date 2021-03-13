import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LandingPageHeader from '../components/Header';
import FormError from '../components/FormError';
import FormSuccess from '../components/FormSuccess';
import { publicFetch } from '../util/fetch';

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(
    false
    );
  
  const forgotPasswordFormFields = useFormik({
    initialValues: { email: '' },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email address is required!';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`/forgot-password`, values)
        .then(({data}) => {
          setSubmitting(false);
          forgotPasswordFormFields.resetForm()
          setSuccess(true)
          setSuccessMessage(data.message)
          setError(false)
          setTimeout(() => {
            setRedirect(true);
          }, 700);
        })
        .catch((error) => {
          const errMsg = error.response.data.error
          setError(true)
          setErrorMessage(errMsg)
          setSuccess(false)
        });
    },
  });
  return (
    <>
      {redirect && <Redirect to="/"/>}
      <LandingPageHeader content="Application Portal" />
      <div className="flex items-center mt-12">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Reset Password
          </h1>
          {success && <FormSuccess text={successMessage} />}
          {error && <FormError text={errorMessage} />}
          <form className="md:flex md:flex-wrap md:justify-between" onSubmit={forgotPasswordFormFields.handleSubmit}>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                value={forgotPasswordFormFields.values.email}
                onChange={forgotPasswordFormFields.handleChange}
                onBlur={forgotPasswordFormFields.handleBlur}
                placeholder="name@domain.com"
                style={{ border: forgotPasswordFormFields.errors.email && "1px solid #d07d7d" }}
              />
              { forgotPasswordFormFields.errors.email &&
               forgotPasswordFormFields.errors.email &&
               forgotPasswordFormFields.errors.email && (
                <span className="text-base font-serif text-red-700 mt-2">{forgotPasswordFormFields.errors.email}</span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-base p-2 rounded font-serif md:w-full" 
                type="submit"
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {forgotPasswordFormFields.isSubmitting ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index.toString()}
                        className="lds-roller-dot"
                      ></div>
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
