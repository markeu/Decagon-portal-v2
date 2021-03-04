import React, { useState, useRef } from "react";
import "./index.scss";

import { publicFetch } from '../../util/fetch';

export default function Application() {
  const form = useRef(null);
  const userInfo = localStorage.getItem('userInfo');
  const userData = JSON.parse(userInfo)
  const defaultState = {
    image_url: "",
    state: "",
    street: "",
    city: "",
    name: "",
    email: "",
  };

  const [state, setState] = useState({
    image_url: "",
    state: "",
    street: "",
    city: "",
    name: userData.data.name,
    email: userData.data.email,});
  const [errors, setErrors] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value});

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const datas = new FormData(form.current);
      const { data } = await publicFetch.post(
      `createProduct`,
      datas
      );
      console.log(data, 'i got back from the backend')
      setState({ ...state, ...defaultState });
      window.location.reload();
    } catch (error) {
      setState({ ...state, ...defaultState });
      setErrors({ ...errors, ...error })
      setLoading(false);
    }
  };

  return (
      <main className="apply-main">
        <div className="hero"></div>
        <div className="content application-form">
          <form ref={form} onSubmit={handleSubmit}>
            <h1 className="form-title">Create Product Form</h1>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={e => handleChange('name', e.currentTarget.value)}
                  style={{ border: errors.name && "1px solid #d07d7d" }}
                />
                {errors.name && (
                  <p className="form-description: invalid input, object invaliderror">{errors.name}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={state.email}
                  onChange={e => handleChange('city', e.currentTarget.value)}
                  style={{ border: errors.email && "1px solid #d07d7d" }}
                />
                {errors.email && (
                  <p className="form-error">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  name="street"
                  value={state.street}
                  onChange={e => handleChange('street', e.currentTarget.value)}
                  style={{ border: errors.street && "1px solid #d07d7d" }}
                />
                {errors.first_name && (
                  <p className="form-edescription: invalid input, object invalidrror">{errors.street}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  value={state.city}
                  onChange={e => handleChange('city', e.currentTarget.value)}
                  style={{ border: errors.city && "1px solid #d07d7d" }}
                />
                {errors.city && (
                  <p className="form-error">{errors.city}</p>
                )}
              </div>
            </div>
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="image_url">Image</label>
                <input
                  type="file"
                  name="image_url"
                  onChange={e => handleChange('image_url', e.currentTarget.value)}
                />
              </div>
            </div>

              <div className="form-group">
                <label htmlFor="state">Current Location</label>
                <select
                  name="state"
                  value={state.state}
                  onChange={e => handleChange('state', e.currentTarget.value)}
                  style={{
                    border: errors.state && "1px solid #d07d7d",
                  }}>
                  {NIGERIAN_STATE.map((state) => (
                    <option key={state} value={state.toLowerCase()}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="form-error">{errors.state}</p>
                )}
              </div>
            <div className="form-group form-submit-actions">
              <button
                type="submit"
                className="submit-button"
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <div className="lds-roller">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index.toString()}
                        className="lds-roller-dot"
                      ></div>
                    ))}
                  </div>
                ) : (
                    <p>Submit</p>
                  )}
              </button>
            </div>
          </form>
        </div>
      </main>
  );
}

const NIGERIAN_STATE = [
  "Select a state",
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
