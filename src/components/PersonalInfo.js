import React,{useState, useEffect} from 'react';
import {  Redirect} from 'react-router-dom';
import { publicFetch } from './../util/fetch';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import validateApplication from '../util/personal';
import '../css/lds-roller.scss';


const defaultState = {
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phoneNumber: ''
}
function PersonalInfo() {
  const [state, setState] = useState(defaultState)
  const [errors, setErrors] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [redirectOnLogin, setRedirectOnLogin] = useState(
    false
  );

  useEffect(() => {
     const usersdata = JSON.parse(localStorage.getItem('userInfo'));
     setState({
      firstName: usersdata.data.firstName,
      lastName: usersdata.data.lastName,
     })
  }, [])

  const handleSubmit = async (e) => {
    const errorsFields = validateApplication(state);
    console.log(errorsFields);
    if (errorsFields) {
        return setErrors({ ...errors, ...errorsFields });
    }
    e.preventDefault()

    setIsLoading(true)

    const datas = {
      gender: state.gender,
      dob: state.dob,
      phone_number: state.phoneNumber
    }

      await publicFetch
        .post(`/user/personal-info`,
          datas
        )
        .then(({data}) => {
          console.log(data, 'successsfully');
          setLoginSuccessMsg(data.message);
          setLoginSuccess(true)
          setLoginError(false);
          setLoginErrorMsg('');
          setTimeout(() => {
            setRedirectOnLogin(true);
          }, 700);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false)
          setLoginError(true)
          setLoginErrorMsg(error.message)
          setLoginSuccessMsg('');
          setLoginSuccess(false);
        });
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
  <>
    {redirectOnLogin && <Redirect to="/registration/addressInfo" />}
    <div className="border border-gray-400  h-screen rounded-md bg-white">
      <p className="m-12 font-base text-2xl">
        Personal Information
      </p>
        <div className="w-full bg-white m-3 md:max-w-sm md:mx-auto">
        {loginSuccess && <FormSuccess text={loginSuccessMsg} />}
          {loginError && <FormError text={loginErrorMsg} />}
        <form class="mb-4 md:flex md:flex-wrap md:justify-between"
          action="/" method="post" onSubmit={handleSubmit}>
           <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="first_name">
                First Name
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="firstName"
                id="first_name"
                placeholder="First Name"
                value={state.firstName}
                onChange=''
                onBlur=''
                // style={{ border: loginFormFields.errors.email && "1px solid #d07d7d" }}
                />
            </div>
            <div className="flex flex-col mb-4 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="last_name">Last Name</label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm" type="text"
                name="lastName"
                id="last_name"
                placeholder="Last Name"
                value={state.lastName}
                onChange=''
                style={{ border: errors.lastName && '1px solid #d07d7d' }}/>
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="title">
                Gender
              </label>
               <select
                  name="gender"
                  className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-sm text-gray-500"
                  onChange={handleChange}
                  style={{ border: errors.gender && '1px solid #d07d7d' }}
              >
                {errors.gender && <p className="form-error">{errors.gender}</p>}
                  <option value="" >Choose your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            <div className="flex flex-col mb-6 md:w-full">
              <label className="mb-3 text-base font-serif text-gray-700" for="dob">
                Date of Birth
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-300 text-gray-500"
                type="date"
                max="2003-07-01"
                name="dob"
                id="dob"
                placeholder="Pick a date"
                onChange={handleChange}
                value={state.dob}
                style={{ border: errors.dob && '1px solid #d07d7d' }}
              />
              {errors.dob && <p className="form-error">{errors.dob}</p>}
            </div>
            <div class="flex flex-col mb-4 md:w-full">
              <label class="mb-3 text-base font-serif text-gray-700" for="email">
                Phone Number
              </label>
              <input
                className="border rounded py-1 px-3 border-gray-600 placeholder-gray-500 text-sm mb-8"
                type="text"
                name="phoneNumber"
                id="phone_number"
                placeholder="Phone Number"
                onChange={handleChange}
                value={state.phoneNumber}
                style={{ border: errors.phoneNumber && '1px solid #d07d7d' }}
              />
              {errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}
            <div className="flex justify-between mt-3">
              <button className="block bg-green-500 hover:bg-teal-dark text-white w-2/5 h-8 text-sm rounded font-serif "
                  type="submit">
                  {isLoading ? (
                    <div className="lds-roller">
                      {[...Array(6)].map((_, index) => (
                        <div key={index.toString()} className="lds-roller-dot"></div>
                      ))}
                    </div>
                  ) : (
                    <p>Save As Draft</p>
                  )}
              </button>
              <button className="block bg-green-500 hover:bg-teal-dark text-white text-sm w-2/5 h-8 rounded font-serif"
                  type="submit">
                  {isLoading ? (
                    <div className="lds-roller">
                      {[...Array(6)].map((_, index) => (
                        <div key={index.toString()} className="lds-roller-dot"></div>
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
