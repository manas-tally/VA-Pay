import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgessBar from '../components/ProgressBar';
import { useNavigate,useLocation } from 'react-router-dom';

function BackIcon() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-arrow-left'
            viewBox='0 0 16 16'
        >
            <path
                fillRule='evenodd'
                d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
            />
        </svg>
    );
}

function WalletPaymentOtpPage({pageProps,navigate}) {
    const [otp, setOtp] = useState('');
    const [resendOtpTimer, setResendOtpTimer] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(1);
    const navigationRefs = Array.from({ length: 4 }, () => useRef(null));
    const location = useLocation();
    //var props = location.state.props; 
    // var props = {amount:"200",phoneno:"+91 9999999999"}
    // const navigate = useNavigate();
    useEffect(()=>{
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
    },[])
    useEffect(() => {
        console.log('fucused index: ', focusedIndex);
        if (navigationRefs[focusedIndex].current)
            navigationRefs[focusedIndex].current.focus();
        if (focusedIndex === 1)
            navigationRefs[focusedIndex].current.selectionStart =
                navigationRefs[focusedIndex].current.selectionEnd = 6;
        for (let i = 0; i < 4; i++) {
            if (navigationRefs[i].current && i != focusedIndex)
                navigationRefs[i].current.blur();
        }
        const handleKeyPress = (e) => {
            if (e.keyCode === 13) {
                // enter
                e.preventDefault();
                console.log('enter clicked : focused index ', focusedIndex);
                navigationRefs[focusedIndex].current.click();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [focusedIndex]);

    const validate = () => {
        console.log('validate called, otp length: ', otp.length);
        if (otp.length < 6) {
            setErrorMessage('Please enter otp!');
            return false;
        } else {
            setErrorMessage('');
        }
        return true;
    };
    const verifyClickHandler = () => {
        console.log(otp);
        setFocusedIndex(3);
        if (validate()) {
            // move to next page
            console.log('validated');

            // navigate('/wallet-payment-confirmation', {state:{props}});
            navigate(4,pageProps);
        } else {
            console.log('error validating');
            setOtp('');
            setFocusedIndex(1);
        }
    };

    const otpFieldChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        setOtp(inputValue);
    };

    const resendOtpHander = (e) => {
        e.preventDefault();
        console.log('Sending OTP.....');
        setResendOtpTimer(10);
    };

    useEffect(() => {
        let interval;
        if (resendOtpTimer > 0) {
            interval = setInterval(() => {
                setResendOtpTimer(resendOtpTimer - 1);
            }, 1000);
        } else {
        }

        return () => {
            clearInterval(interval);
        };
    }, [resendOtpTimer]);

    const backButtonClicked = () => {
        console.log('back button clicked');

        navigate(2,pageProps);
    };
    const handleOtpBlur = (e) => {
        if (validate()) {
            e.target.removeAttribute('aria-description');
            e.target.setAttribute(
                'aria-label',
                'Enter 6-digit OTP sent to ' + pageProps.phoneno
            );
        } else {
            e.target.removeAttribute('aria-label');
            e.target.setAttribute(
                'aria-description',
                'Error in previous field'
            );
        }
    };
    const handleFocus = (e) => {
        e.target.removeAttribute('aria-description');
        if (errorMessage === '') {
            e.target.setAttribute(
                'aria-label',
                'Enter 6-digit OTP sent to ' + pageProps.phoneno
            );
        } else {
            e.target.setAttribute('aria-label', errorMessage);
        }
    };
    return (
        <div>
            <Header />
            <Card>
                <div className='container relative'>
                    <div className='backIcon absolute top-0 left-0'>
                        <button
                            className="bg-white border border-white p-[3px]"
                            aria-label='Back'
                            ref={navigationRefs[0]}
                            onClick={backButtonClicked}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'white';
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'gray';
                                setFocusedIndex(0);
                            }}
                        >   
                            <BackIcon />
                        </button>
                    </div>
                    <div
                        aria-hidden='true'
                        className='amountPayable mt-2 text-[12px] font-[600]'
                    >
                        Amount Payable
                    </div>
                    <div
                        aria-hidden='true'
                        className='amountInRupees text-[28px] font-inter font-[400]'
                    >
                        &#8377; {pageProps.amount}
                    </div>
                    <br />
                    <div
                        aria-hidden='true'
                        className='walletDetails text-[28px] font-[700]'
                    >
                        Enter OTP
                    </div>
                    <div
                        aria-hidden='true'
                        className='walletDetails mt-[50px] font-[700] text-[10px]'
                    >
                        ({pageProps.phoneno})
                    </div>
                    <div
                        className='tempContainer items-center mt-[20px] mb-[20px]'
                    >
                        <div
                            className='otpContainer inline-block'
                        >
                            <div
                                // aria-label='Enter otp here'
                                className='otpBlocks flex items-center'
                            >
                                <input
                                    aria-label={
                                        'Enter 6-digit OTP sent to ' +
                                        pageProps.phoneno
                                    }
                                    ref={navigationRefs[1]}
                                    className='px-2 py-1.5 border rounded-md mb-3 cc-number-input text-center'
                                    maxLength='6'
                                    type='tel'
                                    placeholder=''
                                    onClick={() => setFocusedIndex(1)}
                                    onBlur={(e) => {
                                        handleOtpBlur(e);
                                    }}
                                    onFocus={(e) => {
                                        setFocusedIndex(1);
                                        handleFocus(e);
                                    }}
                                    onChange={otpFieldChange}
                                    value={otp}
                                />
                                {/* {Array.from({ length: 6 }, (_, index) => (
                                    <input
                                        aria-label={
                                            index == 0
                                                ? 'Enter 6-digit OTP received on +919999999999'
                                                : ''
                                        }
                                        aria-describedby={
                                            index == 0 ? 'otpErr' : ''
                                        }
                                        aria-flowto='verifyButton'
                                        ref={inputRefs[index]}
                                        key={index}
                                        type='text'
                                        maxLength='1'
                                        value={otp[index]}
                                        className='otp-field'
                                        name='otp'
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, index)
                                        }
                                        onFocus={() => handleFocus(index)}
                                        onBlur={() => handleBlur(index)}
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                            textAlign: 'center',
                                            margin: '0 5px',
                                            fontSize: '16px',
                                            borderRadius: '10px',
                                            borderWidth: '1px',
                                        }}
                                    />
                                ))} */}
                            </div>
                            {errorMessage ? (
                                <div
                                    id='otpErr'
                                    className='otpContext text-red-500 mt-[5px] text-left text-[12px] font-[400]'
                                >
                                    {errorMessage}
                                </div>
                            ) : (
                                <div
                                    aria-hidden='true'
                                    className='otpContext m-[5px] text-left text-[12px] font-[400]'
                                >
                                    Enter 6-digit otp number
                                </div>
                            )}

                            {resendOtpTimer === 0 ? (
                                <a
                                    aria-label='Link to resend otp'
                                    ref={navigationRefs[2]}
                                    href=''
                                    className='mt-3 text-blue-600 text-sm'
                                    onFocus={() => setFocusedIndex(2)}
                                    onClick={resendOtpHander}
                                >
                                    Resend OTP
                                </a>
                            ) : (
                                <label
                                    aria-hidden='true'
                                    ref={navigationRefs[2]}
                                    className='mt-3 text-black text-sm'
                                >{`Resend OTP in ${resendOtpTimer} seconds`}</label>
                            )}

                            <div
                                aria-hidden='false'
                                id='verifyButton'
                                onClick={() => {
                                    verifyClickHandler();
                                }}
                                className="linkButtonContainer mt-[120px] rounded-[20px] ${focusedIndex===3 ? 'border-black' : 'border-white'}"
                                ref={navigationRefs[3]}
                                onFocus={() => setFocusedIndex(3)}
                            >
                                <Button ariaLabel='Verify' text='Verify' />
                            </div>
                            <div
                                aria-hidden='true'
                                className="circlesContainer items-center justify-center flex mt-[20px]"
                            >
                                <ProgessBar progress={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default WalletPaymentOtpPage;