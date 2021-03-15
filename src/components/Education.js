import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';

import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import '../css/lds-roller.scss';

function Education() {
  const [onSuccess, setOnSuccess] = useState(false);
  const [onSuccessMsg, setOnSuccessMsg] = useState('');
  const [onError, setOnError] = useState(false);
  const [onErrorMsg, setOnErrorMsg] = useState('');
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(
    false
  );

  const formFields = useFormik({
    initialValues: {
      course_of_study: '',
      grade: '',
      highest_qualification: '',
      institution: '',
      nysc_status: '',
      programming_experience: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.course_of_study) {
        errors.course_of_study = 'Course of study is required!';
      }
      if (!values.grade) {
        errors.grade = 'Grade is required!';
      }
      if (!values.highest_qualification) {
        errors.highest_qualification = 'Highest qualification is required!';
      }
      if (!values.institution) {
        errors.institution = 'Institution is required!';
      }
      if (!values.nysc_status) {
        errors.nysc_status = 'NYSC status is required!';
      }
      if (!values.programming_experience) {
        errors.programming_experience = 'Programming experience is required!';
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      await publicFetch
        .post(`user/education-info`,
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
    {redirectOnSuccess && <Redirect to="/registration/other" />}
     <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-10 font-base text-2xl">
        Education/NYSC
      </p>
        <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        {onSuccess && <FormSuccess text={onSuccessMsg} />}
        {onError && <FormError text={onErrorMsg} />}
        <form className="mb-4 md:flex md:flex-wrap md:justify-between" onSubmit={formFields.handleSubmit}>
           <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="qualification">
                Highest Qualification
              </label>
               <select
                  name="highest_qualification"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm text-gray-500"
                  value={formFields.values.highest_qualification}
                  onChange={formFields.handleChange}
                  onBlur={formFields.handleBlur}
                  style={{ border: formFields.errors.highest_qualification && "1px solid #d07d7d" }}
              >
                <option value="">Select an option</option>
                <option value="Phd">Phd</option>
                <option value="Masters">Masters</option>
                <option value="HND/Bachelors">HND/Bachelors</option>
                <option value="other">Other</option>
              </select>
                { formFields.errors.highest_qualification &&
                formFields.errors.highest_qualification &&
                formFields.errors.highest_qualification && (
                <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.highest_qualification}</span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="last_name">Institution</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="institution"
                id="Institution"
                placeholder="Name of Institution"
                value={formFields.values.institution}
                onChange={formFields.handleChange}
                onBlur={formFields.handleBlur}
                style={{ border: formFields.errors.institution && "1px solid #d07d7d" }}
              />
              { formFields.errors.institution &&
                formFields.errors.institution &&
                formFields.errors.institution && (
                <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.institution}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="degree">
                Grade Achieved
              </label>
               <select
                  name="grade"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm text-gray-500"
                  value={formFields.values.grade}
                  onChange={formFields.handleChange}
                  onBlur={formFields.handleBlur}
                  style={{ border: formFields.errors.grade && "1px solid #d07d7d" }}
              >
                <option value="">Select an option</option>
                <option value="first class">First class</option>
                <option value="second class upper">Second class upper</option>
                <option value="second class lower">Second class lower</option>
                <option value="third class">Third class</option>
              </select>
              { formFields.errors.grade &&
                formFields.errors.grade &&
                formFields.errors.grade && (
                <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.grade}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="course">Course of Study</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="course_of_study"
                id="course"
                placeholder="Course of Study"
                value={formFields.values.course_of_study}
                onChange={formFields.handleChange}
                onBlur={formFields.handleBlur}
                style={{ border: formFields.errors.course_of_study && "1px solid #d07d7d" }}
              />
              { formFields.errors.course_of_study &&
                formFields.errors.course_of_study &&
                formFields.errors.course_of_study && (
                <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.course_of_study}
                    </span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="nysc">
                NYSC Status
              </label>
               <select
                  name="nysc"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300   text-sm text-gray-500"
                  value=''
                  onChange=''
                >
                  <option value="">Select an option</option>
                  <option value="completed">I have completed service</option>
                  <option value="exemption">I have got an exemption</option>
                  <option value="awaiting service">I am awaiting service</option>
                  <option value="serving currently">I am currently serving</option>
                </select>
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" htmlFor="experience">
                Programming Experience
              </label>
               <select
                  name="programming_experience"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-sm text-gray-500"
                  value={formFields.values.programming_experience}
                  onChange={formFields.handleChange}
                  onBlur={formFields.handleBlur}
                  style={{ border: formFields.errors.programming_experience && "1px solid #d07d7d" }}
              >
                <option value="">Select an option</option>
                <option value="No Skill">No Skill</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
              </select>
              { formFields.errors.programming_experience &&
                formFields.errors.programming_experience &&
                formFields.errors.programming_experience && (
                <span className="text-base font-serif text-red-700 mt-2">{formFields.errors.programming_experience}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <div className="flex justify-between mt-3">
                <button className="block bg-green-500 hover:bg-teal-dark text-white w-2/5 h-8 text-sm rounded font-serif "
                  type="submit">
                  Save As Draft
                </button>
                <button className="block bg-green-500 hover:bg-teal-dark text-white text-sm w-2/5 h-8 rounded font-serif"
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

export default Education
