import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';

import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import '../css/lds-roller.scss';

function AddressInfo() {
  const [onSuccess, setOnSuccess] = useState(false);
  const [onSuccessMsg, setOnSuccessMsg] = useState('');
  const [onError, setOnError] = useState(false);
  const [onErrorMsg, setOnErrorMsg] = useState('');
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(
    false
  );

  const formFields = useFormik({
    initialValues: {
      current_location: '',
      state_of_origin: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.current_location) {
        errors.current_location = 'Current location is required!';
      }
      if (!values.state_of_origin) {
        errors.state_of_origin = 'State of origin is required!';
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`user/address-info`,
          values
        )
        .then(({ data }) => {
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
    {redirectOnSuccess && <Redirect to="/registration/education" />}
      <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-12 font-base text-2xl">
        Address Information
      </p>
      <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        {onSuccess && <FormSuccess text={onSuccessMsg} />}
        {onError && <FormError text={onErrorMsg} />}
        <form className="mb-4 md:flex md:flex-wrap md:justify-between" onSubmit={formFields.handleSubmit}>
          <div className="flex flex-col mt-10 mb-4 md:w-full">
            <label className="mb-3 text-base font-serif text-gray-700" htmlFor="state_of_origin">
              State Of Origin
            </label>
            <select
              className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
              name="state_of_origin"
              value={formFields.values.state_of_origin}
              onChange={formFields.handleChange}
              onBlur={formFields.handleBlur}
              style={{ border: formFields.errors.state_of_origin && "1px solid #d07d7d" }}
            >
              <option value="">Select a state</option>
              {NIGERIAN_STATE.map((state) => (
                <option key={state} value={state.toLowerCase()}>
                  {state}
                </option>
              ))}
            </select>
            { formFields.errors.state_of_origin &&
              formFields.errors.state_of_origin &&
              formFields.errors.state_of_origin && (
              <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.state_of_origin}</span>
            )}
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="mb-3 text-base font-serif text-gray-700" htmlFor="current_location">
              Current Location
            </label>
            <select
              className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-sm text-gray-500"
              name="current_location"
              value={formFields.values.current_location}
              onChange={formFields.handleChange}
              onBlur={formFields.handleBlur}
              style={{ border: formFields.errors.current_location && "1px solid #d07d7d" }}
            >
              <option value="">Select a state</option>
              {NIGERIAN_STATE.map((state) => (
                <option key={state} value={state.toLowerCase()}>
                  {state}
                </option>
              ))}
            </select>
            { formFields.errors.current_location &&
              formFields.errors.current_location &&
              formFields.errors.current_location && (
            <span className="text-base font-serif text-red-700 mt-2">   {formFields.errors.current_location}
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

export default AddressInfo

const NIGERIAN_STATE = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
