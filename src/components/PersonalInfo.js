import React,{useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { publicFetch } from './../util/fetch';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import '../css/lds-roller.scss';
import { useFormik } from 'formik';

function PersonalInfo() {
  const [state, setState] = useState({firstName: '', lastName: ''})
  const [onSuccess, setOnSuccess] = useState(false);
  const [onSuccessMsg, setOnSuccessMsg] = useState('');
  const [onError, setOnError] = useState(false);
  const [onErrorMsg, setOnErrorMsg] = useState('');
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(
    false
  );

  useEffect(() => {
    const usersdata = JSON.parse(localStorage.getItem('userInfo'));
    setState({
      firstName: usersdata.data.firstName,
      lastName: usersdata.data.lastName,
    })
  }, [])

  const formFields = useFormik({
    initialValues: {
      gender: '',
      phoneNumber: '',
      dob: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.gender) {
        errors.gender = 'Gender is required!';
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required!';
      }
      if (!values.dob) {
        errors.dob = 'Date of birth is required!';
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`/user/personal-info`,
          values
        )
        .then(({ data }) => {
          console.log(data, 'i got back');
          setSubmitting(false);
          setOnSuccessMsg(data.message);
          setOnSuccess(true)
          setOnError(false);
          setOnErrorMsg("");
          formFields.resetForm()
          setTimeout(() => {
            setRedirectOnSuccess(true);
          }, 700);
        })
        .catch((error) => {
          const errMsg = error.response.data.error
          setOnError(true)
          setOnErrorMsg(errMsg);
          setOnSuccessMsg('');
          setOnSuccess(false);
        });
    },
  });

  return (
  <>
    {redirectOnSuccess && <Redirect to="/registration/addressInfo" />}
    <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-12 font-base text-2xl">
        Personal Information
      </p>
        <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        {onSuccess && <FormSuccess text={onSuccessMsg} />}
        {onError && <FormError text={onErrorMsg} />}
        <form className="mb-4 md:flex md:flex-wrap md:justify-between" onSubmit={formFields.handleSubmit}>
           <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="first_name">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="firstName"
                id="first_name"
                placeholder="First Name"
                value={state.firstName}
                disabled={true}
              />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="last_name">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="lastName"
                id="last_name"
                placeholder="Last Name"
                value={state.lastName}
                disabled={true}
              />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="title">
                Gender
              </label>
               <select
                  name="gender"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-sm text-gray-500"
                  value={formFields.values.gender}
                  onChange={formFields.handleChange}
                  onBlur={formFields.handleBlur}
                  style={{ border: formFields.errors.gender && "1px solid #d07d7d" }}
              >
                <option value="" >Choose your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              { formFields.errors.gender &&
                formFields.errors.gender &&
                formFields.errors.gender && (
              <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.gender}
              </span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-gray-500"
                type="date"
                max="2003-07-01"
                name="dob"
                id="dob"
                placeholder="Pick a date"
                value={formFields.values.dob}
                onChange={formFields.handleChange}
                onBlur={formFields.handleBlur}
                style={{ border: formFields.errors.dob && "1px solid #d07d7d" }}
              />
              { formFields.errors.dob &&
                formFields.errors.dob &&
                formFields.errors.dob && (
              <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.dob}
              </span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="phoneNumberr">
                Phone Number
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm"
                type="text"
                name="phoneNumber"
                id="phone_number"
                placeholder="Phone Number"
                value={formFields.values.phoneNumber}
                onChange={formFields.handleChange}
                onBlur={formFields.handleBlur}
                style={{ border: formFields.errors.phoneNumber && "1px solid #d07d7d" }}
              />
              { formFields.errors.phoneNumber &&
                formFields.errors.phoneNumber &&
                formFields.errors.phoneNumber && (
              <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.phoneNumber}
              </span>
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
                  {formFields.isSubmitting ? (
                    <div className="lds-roller">
                      {[...Array(6)].map((_, index) => (
                        <div
                          key={index.toString()}
                          className="lds-roller-dot"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <p>Save And Continue</p>
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

export default PersonalInfo
