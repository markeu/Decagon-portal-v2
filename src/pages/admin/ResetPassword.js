import { useFormik } from 'formik';
import React, { useState } from 'react';
import FormError from '../../components/FormError';
import FormSuccess from '../../components/FormSuccess';
import LandingPageHeader from '../../components/Header';
import { publicFetch } from '../../util/fetch';

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const url = new URL(window.location.href).search
  const email = new URLSearchParams(url).get('email')
  const token = new URLSearchParams(url).get('token')

  const resetPasswordFormFields = useFormik({
    initialValues: { newPassword: '',  confirmNewPassword: '' },
    validate: (values) => {
      const errors = {};
      if (!values.newPassword) {
        errors.newPassword = 'New password is required!';
      }
      if (!values.confirmNewPassword) {
        errors.confirmNewPassword = 'Confirm password is required!';
      }
      if (values.newPassword && values.newPassword.length < 8) {
        errors.newPassword = 'Password must be at eight characters long';
      }
      if (values.newPassword && values.confirmNewPassword) {
        if (values.newPassword !== values.confirmNewPassword) {
          errors.confirmNewPassword = 'Password does not match';
        }
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`/reset-password?email=${email}&token=${token}`, values)
        .then(({data}) => {
          setSubmitting(false);
          resetPasswordFormFields.resetForm()
          setSuccess(true)
          setSuccessMessage(data.message)
          setError(false)
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
      <LandingPageHeader content="Admin Portal" />
      <div className="flex items-center mt-12">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Reset Password
          </h1>
          {success && <FormSuccess text={successMessage} />}
          {error && <FormError text={errorMessage} />}
          <form className="mb-8 md:flex md:flex-wrap md:justify-between" onSubmit={resetPasswordFormFields.handleSubmit}>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="at least 8 characters"
                value={resetPasswordFormFields.values.newPassword}
                onChange={resetPasswordFormFields.handleChange}
                onBlur={resetPasswordFormFields.handleBlur}
                style={{ border: resetPasswordFormFields.errors.newPassword && "1px solid #d07d7d" }}
              />
              { resetPasswordFormFields.errors.newPassword &&
               resetPasswordFormFields.errors.newPassword &&
               resetPasswordFormFields.errors.newPassword && (
                <span className="text-base font-serif text-red-700 mt-2">{resetPasswordFormFields.errors.newPassword}</span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="confirmNewPassword">
                Confirm New Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" 
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="passwords must match"
                value={resetPasswordFormFields.values.confirmNewPassword}
                onChange={resetPasswordFormFields.handleChange}
                onBlur={resetPasswordFormFields.handleBlur}
                style={{ border: resetPasswordFormFields.errors.confirmNewPassword && "1px solid #d07d7d" }}
              />
              { resetPasswordFormFields.errors.confirmNewPassword &&
               resetPasswordFormFields.errors.confirmNewPassword &&
               resetPasswordFormFields.errors.confirmNewPassword && (
                <span className="text-base font-serif text-red-700 mt-2">{resetPasswordFormFields.errors.confirmNewPassword}</span>
              )}
            </div>
            <button className="block bg-green-500 hover:bg-teal-dark text-white text-base p-2 rounded font-serif md:w-full" 
              type="submit"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {resetPasswordFormFields.isSubmitting ? (
                <div className="lds-roller">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index.toString()}
                      className="lds-roller-dot"
                    ></div>
                  ))}
                </div>
              ) : (
                <p>Reset Password</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
