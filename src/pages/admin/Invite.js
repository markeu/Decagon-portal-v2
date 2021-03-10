import { useFormik } from 'formik';
import React, { useState } from 'react';
import LandingPageHeader from '../../components/Header';
import FormError from '../../components/FormError';
import FormSuccess from '../../components/FormSuccess';
import { publicFetch } from '../../util/fetch';

const Invite = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const inviteFormFields = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', role: '' },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'First name is required!';
      }
      if (!values.lastName) {
        errors.lastName = 'Last name is required!';
      }
      if (!values.email) {
        errors.email = 'Email address is required!';
      }
      if (!values.role) {
        errors.role = 'Role is required!';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      await publicFetch
        .post(`/admin/invite`, values)
        .then(({data}) => {
          setSubmitting(false);
          inviteFormFields.resetForm()
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
       <div className="flex items-center mt-6">
        <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-2xl mb-6 font-serif">
            Invite User
          </h1>
          {success && <FormSuccess text={successMessage} />}
          {error && <FormError text={errorMessage} />}
          <form className="mb-4 md:flex md:flex-wrap md:justify-between" onSubmit={inviteFormFields.handleSubmit}>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="firstName">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={inviteFormFields.values.firstName}
                onChange={inviteFormFields.handleChange}
                onBlur={inviteFormFields.handleBlur}
                style={{ border: inviteFormFields.errors.firstName && "1px solid #d07d7d" }}
              />
              { inviteFormFields.errors.firstName &&
               inviteFormFields.errors.firstName &&
               inviteFormFields.errors.firstName && (
                <span className="text-base font-serif text-red-700 mt-2">{inviteFormFields.errors.firstName}</span>
              )}
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="lastName">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300" type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={inviteFormFields.values.lastName}
                onChange={inviteFormFields.handleChange}
                onBlur={inviteFormFields.handleBlur}
                style={{ border: inviteFormFields.errors.lastName && "1px solid #d07d7d" }}
              />
              { inviteFormFields.errors.lastName &&
               inviteFormFields.errors.lastName &&
               inviteFormFields.errors.lastName && (
                <span className="text-base font-serif text-red-700 mt-2">{inviteFormFields.errors.lastName}</span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                type="email"
                name="email"
                id="email"
                placeholder="name@domain.com" 
                value={inviteFormFields.values.email}
                onChange={inviteFormFields.handleChange}
                onBlur={inviteFormFields.handleBlur}
                style={{ border: inviteFormFields.errors.email && "1px solid #d07d7d" }}
              />
              { inviteFormFields.errors.email &&
               inviteFormFields.errors.email &&
               inviteFormFields.errors.email && (
                <span className="text-base font-serif text-red-700 mt-2">{inviteFormFields.errors.email}</span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="role">
                Role
              </label>
               <select
                  name="role"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300"
                  value={inviteFormFields.values.role}
                  onChange={inviteFormFields.handleChange}
                  onBlur={inviteFormFields.handleBlur}
                  style={{ border: inviteFormFields.errors.role && "1px solid #d07d7d" }}
                >
                  <option value="">Select role</option>
                  <option value="PROGRAM_ASSOCIATE">PROGRAM ASSOCIATE</option>
                  <option value="MARKETING_MANAGER">MARKETING MANAGER</option>
                </select>
                { inviteFormFields.errors.role &&
                inviteFormFields.errors.role &&
                inviteFormFields.errors.role && (
                  <span className="text-base font-serif text-red-700 mt-2">{inviteFormFields.errors.role}</span>
                )}
            </div>
            <button className="block bg-green-500 hover:bg-teal-dark text-white text-base py-2 px-3 rounded font-serif my-4 md:w-full"
              type="submit"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {inviteFormFields.isSubmitting ? (
                <div className="lds-roller">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index.toString()}
                      className="lds-roller-dot"
                    ></div>
                  ))}
                </div>
              ) : (
                <p>Invite User</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Invite;
