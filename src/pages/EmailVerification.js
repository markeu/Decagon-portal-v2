import React,{useEffect, useState} from 'react';
import LandingPageHeader from '../components/Header';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { Link, Redirect } from 'react-router-dom';
import { publicFetch } from './../util/fetch';

const EmailVerifcation = () => {
    const url = new URL(window.location.href).search
    const applicant_id = new URLSearchParams(url).get('applicant_id')

    const [emailVerifyMessage, setEmailVerifyMessage] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [redirectOnEmailVerification, setRedirectOnEmailVerification] = useState(false);

    useEffect(() => {
        (async () => {
            try{
                const { data } = await publicFetch.post(
                    `/user/verify-email?applicant_id=${applicant_id}`
                );
                setEmailVerify(true)
                setEmailVerifyMessage(data.message)
                setError(false)
                setTimeout(() => {
                    setRedirectOnEmailVerification(true)
                }, 700);
        
            }catch(error){
            const err = error.response.data.error
            console.log(err);
            setRedirectOnEmailVerification(false)
            setError(true)
            setErrorMessage(err)
            setEmailVerify(false)
            }
        })()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {redirectOnEmailVerification && <Redirect to={`/password?applicant_id=${applicant_id}`} />}
            <LandingPageHeader content="Application Portal" />
            <div className="w-full bg-white p-8 m-4 md:max-w-sm md:mx-auto">
                {emailVerify && <FormSuccess text={emailVerifyMessage} />}
                {error && <FormError text={errorMessage} />}
                {error && 
                    <Link to="/">
                        <span className="text-md text-green-500 font-serif"
                            target="_blank"
                            rel="noopener noreferrer">Back to login</span>
                    </Link>
                }
            </div>
        </>
    );    
};

export default EmailVerifcation;
