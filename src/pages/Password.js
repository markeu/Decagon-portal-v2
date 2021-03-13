import React,{useState} from 'react';
import LandingPageHeader from '../components/Header';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { Redirect } from 'react-router-dom';
import { publicFetch } from './../util/fetch';
import { useFormik } from 'formik';

const Home = () => {
  const [passwordSuccess, setPassswordSuccess] = useState(false);
  const [passwordSuccessMsg, setPassswordSuccessMsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [redirectOnPassword, setRedirectOnPassword] = useState(
    false
    );
  
  const url = new URL(window.location.href).search
  const applicant_id = new URLSearchParams(url).get('applicant_id')

  const passwordFormFields = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = 'Password is required!';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required!';
      }
      if (values.password && values.password.length < 8) {
        errors.password = 'Password must be at eight characters long';
      }
      if (values.password && values.confirmPassword) {
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Password does not match';
        }
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`password`,
          values, { params: {
          applicant_id: applicant_id
        }}
        )
        .then(({data}) => {
          setSubmitting(false);
          setPassswordSuccessMsg(data.message);
          setPassswordSuccess(true)
          setPasswordError(false);
          setPasswordErrorMsg('');
          passwordFormFields.resetForm()
          setTimeout(() => {
            setRedirectOnPassword(true);
          }, 700);
        })
        .catch((error) => {
          const errMsg = error.response.data.error
          setPasswordError(true)
          setPasswordErrorMsg(errMsg)
          setPassswordSuccessMsg('');
          setPassswordSuccess(false);
        });
    },
  });

  return (
    <>
      {redirectOnPassword && <Redirect to="/"/>}
      <LandingPageHeader content="Application Portal" />
      <div className="flex items-center mt-12">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Create Password.
          </h1>
          {passwordSuccess && <FormSuccess text={passwordSuccessMsg} />}
          {passwordError && <FormError text={passwordErrorMsg} />}
          <form className="mb-8 md:flex md:flex-wrap md:justify-between" onSubmit={passwordFormFields.handleSubmit}>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="password"
                name="password"
                id="password"
                value={passwordFormFields.values.password}
                onChange={passwordFormFields.handleChange}
                onBlur={passwordFormFields.handleBlur}
                placeholder="Password"
                style={{ border: passwordFormFields.errors.password && "1px solid #d07d7d" }}
              />
              { passwordFormFields.errors.password &&
               passwordFormFields.errors.password &&
               passwordFormFields.errors.password && (
                <span className="text-base font-serif text-red-700 mt-2">{passwordFormFields.errors.password}</span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={passwordFormFields.values.confirmPassword}
                onChange={passwordFormFields.handleChange}
                onBlur={passwordFormFields.handleBlur}
                placeholder="Confirm Password"
                style={{ border: passwordFormFields.errors.confirmPassword && "1px solid #d07d7d" }}
              />
              { passwordFormFields.errors.confirmPassword &&
               passwordFormFields.errors.confirmPassword &&
               passwordFormFields.errors.confirmPassword && (
                <span className="text-base font-serif text-red-700 mt-2">{passwordFormFields.errors.confirmPassword}</span>
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
              {passwordFormFields.isSubmitting ? (
                <div className="lds-roller">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index.toString()}
                      className="lds-roller-dot"
                    ></div>
                  ))}
                </div>
              ) : (
                <p>Create Password</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
