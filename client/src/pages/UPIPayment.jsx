import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import BackIcon from '../components/BackIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import AmountPayable from '../components/AmountPayable';
import ProgessBar from '../components/ProgressBar';

function isValid_UPI_ID(upi_Id) {
    // Regex to check valid
    // upi_Id
    let regex = new RegExp(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/);

    // upi_Id
    // is empty return false
    if (upi_Id == null) {
        console.log(flag);
        return false;
    }

    // Return true if the upi_Id
    // matched the ReGex
    return regex.test(upi_Id);
}

function UPIPayment({pageProps,navigate}) {
    const [UPIId, setUPIId] = useState('');
    const [isUPIIdValid, setIsUPIIdValid] = useState(true);
    const [isVPA, setIsVPA] = useState(false);
    const [errorMsg, setErrorMessage] = useState('');
    const location = useLocation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value, isValid_UPI_ID(value));
        setUPIId(value);
    };
    function validateUPIID() {
        let res = isValid_UPI_ID(UPIId);
        if (!res) {
            setErrorMessage('Please Enter the UPI ID carefully');
        } else {
            setErrorMessage('');
        }
        setIsUPIIdValid(res);
        return res;
    }
    const handleUPIBlur = (e) => {
        e.target.setAttribute('placeholder', 'yourname@bankname');
        if (!validateUPIID()) {
            e.target.removeAttribute('aria-label');
            e.target.setAttribute(
                'aria-description',
                'Error in previous field'
            );
        } else {
            e.target.removeAttribute('aria-description');
            e.target.setAttribute('aria-label', 'Enter UPI ID');
        }
    };
    const handleUPIFocus = (e) => {
        e.target.removeAttribute('placeholder');
        e.target.removeAttribute('aria-description');
        if (errorMsg === '') {
            e.target.setAttribute('aria-label', 'Enter UPI ID');
        } else {
            e.target.setAttribute('aria-label', errorMsg);
        }
    };

    const handleSubmit = (e) => {
        if (!isUPIIdValid) {
            upiIDRef.current.focus();
            return;
        }
        // TODO:- handle submit functionality
        navigate(6,pageProps);
    };
    const upiIDRef = useRef();

    const backbuttonClick = (e) => {
        // TODO
        console.log('back button clicked');
        navigate(0,{amount:pageProps.amount,client:pageProps.client});
    };

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
        upiIDRef.current.focus();
    }, []);

    return (
        <>
            <Header />
            <Card>
                <div className='relative'>
                    <button
                        aria-label='Back'
                        className='absolute start-0 top-0 border border-0 bg-white'
                        onClick={backbuttonClick}
                    >
                        <BackIcon />
                    </button>
                    <div className='py-6'>
                        <AmountPayable amount={pageProps.amount}></AmountPayable>
                    </div>

                    <div
                        aria-hidden='true'
                        className='walletDetails text-2xl font-semibold'
                    >
                        UPI Payment
                    </div>
                    <div className='mx-auto mt-4 w-[300px]'>
                        <div className='flex flex-col'>
                            <label
                                aria-hidden='true'
                                className='my-3 text-start text-lg font-medium'
                            >
                                Enter UPI ID
                            </label>
                            <input
                                aria-label='Enter UPI Id'
                                className={`border-1 px-auto w-[210px] rounded-md border-gray-600 bg-gray-200 p-2 sm:w-[100%]  ${
                                    !isUPIIdValid && 'border-red-600 bg-red-200'
                                }`}
                                id='upiid'
                                name='upiid'
                                type='text'
                                ref={upiIDRef}
                                onFocus={(e) => {
                                    handleUPIFocus(e);
                                }}
                                onBlur={(e) => {
                                    handleUPIBlur(e);
                                }}
                                placeholder='yourname@bankname'
                                value={UPIId}
                                onInput={handleChange}
                            />
                            {!isUPIIdValid && (
                                <label
                                    aria-hidden='true'
                                    className='pb-3 text-start text-sm text-rose-700'
                                >
                                    {'Please Enter the UPI ID carefully'}
                                </label>
                            )}
                        </div>
                        <div className='pt-8'>
                            <div onClick={handleSubmit}>
                                <Button
                                    ariaLabel='Pay'
                                    text='Pay'
                                    onFocus={validateUPIID}
                                ></Button>
                            </div>
                            <div className='pt-4'>
                                <ProgessBar progress={1}></ProgessBar>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default UPIPayment;
