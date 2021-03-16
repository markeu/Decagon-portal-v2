import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../css/lds-roller.scss';
import { publicFetch } from '../util/fetch';
const defaultState = {
  firstName: '',
  lastName: '',
  dob: '',
  phoneNumber: '',
  stateOfOrigin: '',
  currentLocation: '',
  highestQualification: '',
  institution: '',
  grade: '',
  courseOfStudy: '',
  nyscStatus: '',
  programmingExperience: ''
}

function Details() {
  const [state, setState] = useState(defaultState)

  const history = useHistory()
  useEffect(() => {
    publicFetch.get(`/user/retrieve`)
    .then(({ data: {data} }) => {
      setState(data)
    })
  }, [])

  return (
    <>
     <div className=" border border-gray-400 h-screen rounded-md bg-white px-16">
        <p className="m-10 font-base text-2xl">
            Your Application Details
        </p>
        <div className="absolute top-3 right-0 h-6 mr-12">
          <p className="font-semibold mb-2">Application Status :</p>
          <p className="text-green-400 font-medium">{state.status}</p>
        </div>
        <div className="w-full bg-white mt-32 ml-8">
          <TabDetails name='First Name' title={state.firstName} />
          <TabDetails name='Last Name' title={state.lastName} />
          <TabDetails name='Date of Birth' title={state.dob} />
          <TabDetailsButton name='Phone Number' title={state.phoneNumber} />
          <TabDetails name='State of Origin' title={state.stateOfOrigin} />
          <TabDetails name='Current Location' title={state.currentLocation} />
          <TabDetails name='Highest Qualification' title={state.highestQualification} />
          <TabDetails name='Institution' title={state.institution} />
          <TabDetails name='Grade Achieved' title={state.grade} />
          <TabDetails name='Course of Study' title={state.courseOfStudy} />
          <TabDetailsButton name='NYSC Status' title={state.nyscStatus} />
          <TabDetails name='Progamming Experience' title={state.programmingExperience} />
        </div>
      </div>
    </>
  )
}

export default Details


function TabDetails(props) {
  return (
    <>
      <div className="flex">
        <p className="font-medium w-2/5 mb-4 text-base">{props.name}</p>
        <p className="font-thin ml-6">{props.title}</p>
      </div>
    </>
  )
}

function TabDetailsButton(props) {
  return (
    <>
      <div className="flex">
        <p className="font-medium w-2/5 mb-4 text-base">{props.name}</p>
        <p className="font-thin ml-6">{props.title}</p>
        <button className="-mt-1 px-2 py-2 border border-green-500 hover:bg-teal-dark text-gray-800 ml-10 h-8 text-sm rounded-b-lg font-serif ">
          Update
        </button>
      </div>
    </>
  )
}
