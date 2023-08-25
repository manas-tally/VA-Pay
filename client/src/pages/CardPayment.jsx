import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useRef, useState, useEffect } from 'react';
import '../styles/Pages/CardPayment.css';
import visa_img from '../assets/icon_visa24.png';
import mastercard_img from '../assets/icon_mastercard24.png';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const CardPayment = ({ pageProps, navigate }) => {
    // Initial values for the card details
    const initialValues = { name: '', cardno: '', expiry: '', cvv: '' };
    // useState hook to change the values
    const [cardDetails, setCardDetails] = useState(initialValues);

    // useState hooks for all the different errors
    const [cardNoError, setCardNoError] = useState('');
    const [nameError, setNameError] = useState('');
    const [expiryError, setexpiryErr] = useState('');
    const [CVVError, setCVVError] = useState('');
    const location = useLocation();
    // Another useState hook that keeps track of errors in an array
    const [error, setError] = useState({});
    // var props = location.state.props;
    // useState hook for a flag boolean which checks whether the form has been submitted or no
    const [isSubmit, setIsSubmit] = useState(false);

    // use refs
    const backRef = useRef();
    const nameRef = useRef();
    const numRef = useRef();
    const expiryRef = useRef();
    const cvvRef = useRef();
    const buttonRef = useRef();

    // navigation
    const [focusedIndex, setFocusedIndex] = useState(1);
    const navigationRefs = [
        backRef,
        numRef,
        nameRef,
        expiryRef,
        cvvRef,
        buttonRef,
    ];

    // const navigate = useNavigate();

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
        console.log('focused index: ', focusedIndex);
        if (navigationRefs[focusedIndex].current)
            navigationRefs[focusedIndex].current.focus();
        if (focusedIndex >= 1 && focusedIndex <= 4)
            navigationRefs[focusedIndex].current.selectionStart =
                navigationRefs[focusedIndex].current.selectionEnd = 20;
        for (let i = 0; i < 6; i++) {
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

    // A function which sets card details and logs them in the console
    const handleChange = (e) => {
        // console.log(e.target);
        if (e.which === 32) {
            e.preventDefault();
        }
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
        // console.log(cardDetails);
    };

    // Function for validation after submitting the form
    const handleSubmit = (e) => {
        setFocusedIndex(5);
        e.preventDefault();
        console.log('here');
        // all val will be boolean (true/false)
        let val1 = cardnum_validate(cardDetails.cardno);
        let val2 = name_validate(cardDetails.name);
        let val3 = expiry_validate(cardDetails.expiry);
        let val4 = cvv_validate(cardDetails.cvv);
        // cardDetails.cardno = unmask(cardDetails.cardno);
        // Adding all the errors to the error object
        setError(cardnum_validate(cardDetails.cardno));
        setError(name_validate(cardDetails.name));
        setError(expiry_validate(cardDetails.expiry));
        setError(cvv_validate(cardDetails.cvv));
        if (!val1) {
            setFocusedIndex(1);
            return;
            //numRef.current.focus();
        } else if (!val2) {
            //nameRef.current.focus();
            setFocusedIndex(2);
            return;
        } else if (!val3) {
            //expiryRef.current.focus();
            setFocusedIndex(3);
            return;
        } else if (!val4) {
            //cvvRef.current.focus();
            setFocusedIndex(4);
            return;
        }
        // Setting the flag isSubmit to true
        setIsSubmit(true);

        // navigate('/processing', { state: { props } });
        pageProps.cardDetails = cardDetails;
        navigate(6, pageProps);
    };

    // // Passing empty array as dependency so that this useEffect runs only when the component is mounted
    // useEffect(() => {
    //     numRef.current.focus();
    // }, [])
    useEffect(() => {
        // If there are errors, log them in the console first
        // console.log(error);

        // This will be the object of our error object (we want it's length to be 0, i.e., no errors), and isSubmit flag must be true
        // The details must be logged in the console only when there are no errors
        if (Object.keys(error).length === 0 && isSubmit === true) {
            // console.log(cardDetails);
        }
    }, [error]);

    // Back Button
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

    // Initialising an error_list object with all the errors
    const error_list = {
        name: "Please enter Cardholder's name",
        invalid_luhn: 'Enter valid card number',
        notnum: 'Please enter only numbers.',
        cardno_length: 'Card number has to be 16 digits',
        cvv_length: 'CVV must be of 3-digits',
        expiry: 'Please enter valid expiry',
        format: 'Please enter valid expiry in MM/YY format',
        visamaster: 'Please enter valid Visa or MasterCard number',
    };

    // const error_obj = {};
    // function to validate credit card numbers using the Luhn algorithm
    // From the (end - 1) index, double all the alternate digits (do not tamper with the digits in between the alterate digits)
    // Replace the doubled digits in-place
    // If it forms a two digit number after doubling, sum the digits of the number and replace it
    // Now, the sum of all the numbers on the card must be a multiple of 10 for the card number to be valid
    const validateByLuhn = (num) => {
        let arr = (num + '')
            .split('')
            .reverse()
            .map((x) => parseInt(x));
        let lastDigit = arr.splice(0, 1)[0];
        let sum = arr.reduce(
            (acc, val, i) =>
                i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9,
            0
        );
        sum += lastDigit;
        return sum % 10 === 0;
    };

    // Function for card number validation
    const cardnum_validate = (num) => {
        num = unmask(num);
        let first_letter = num.charAt(0);
        let bool = false;

        if (first_letter == '4' || first_letter == '5') {
            bool = true;
        }

        if (bool == false) {
            setCardNoError(error_list.visamaster);
            return false;
        }

        if (num.length < 16) {
            setCardNoError(error_list.cardno_length);
            return false;
        }
        if (!validateByLuhn(num)) {
            setCardNoError(error_list.invalid_luhn);
            return false;
        } else {
            setCardNoError('');
        }
        return true;
    };

    // Function for cardholder's name validation
    const name_validate = (name) => {
        if (name.length == 0) {
            setNameError(error_list.name);
            return false;
        } else {
            setNameError('');
        }
        return true;
    };
    const handleCardBlur = (e) => {
        e.target.setAttribute('placeholder', '1234 5678 4356 7899');
        if (!cardnum_validate(e.target.value)) {
            e.target.removeAttribute('aria-label');
            e.target.setAttribute(
                'aria-description',
                'Error in previous field'
            );
        } else {
            e.target.removeAttribute('aria-description');
            e.target.setAttribute(
                'aria-label',
                'Enter card number, accepted card networks are VISA and Mastercard'
            );
        }
    };
    const handleCardFocus = (e) => {
        setFocusedIndex(1);
        e.target.removeAttribute('placeholder');
        e.target.removeAttribute('aria-description');
        if (cardNoError === '') {
            e.target.setAttribute(
                'aria-label',
                'Enter card number, accepted card networks are VISA and Mastercard'
            );
        } else {
            e.target.setAttribute('aria-label', cardNoError);
        }
    };
    const handleCardNameBlur = (e) => {
        e.target.setAttribute('placeholder', 'Name on card');
        if (!name_validate(e.target.value)) {
            e.target.removeAttribute('aria-label');
            e.target.setAttribute(
                'aria-description',
                'Error in previous field'
            );
        } else {
            e.target.removeAttribute('aria-description');
            e.target.setAttribute('aria-label', 'Enter name on card');
        }
    };
    const handleCardNameFocus = (e) => {
        setFocusedIndex(2);
        e.target.removeAttribute('placeholder');
        e.target.removeAttribute('aria-description');
        if (nameError === '') {
            e.target.setAttribute('aria-label', 'Enter name on card');
        } else {
            e.target.setAttribute('aria-label', nameError);
        }
    };
    const handleExpiryBlur = (e) => {
        e.target.setAttribute('placeholder', 'MM/YY');
        if (!expiry_validate(e.target.value)) {
            e.target.removeAttribute('aria-label');
            e.target.setAttribute(
                'aria-description',
                'Error in previous field'
            );
        } else {
            e.target.removeAttribute('aria-description');
            e.target.setAttribute(
                'aria-label',
                'Enter card expiry in MM/YY format'
            );
        }
    };
    const handleExpiryFocus = (e) => {
        setFocusedIndex(3);
        e.target.removeAttribute('placeholder');
        e.target.removeAttribute('aria-description');
        if (expiryError === '') {
            e.target.setAttribute(
                'aria-label',
                'Enter card expiry in MM/YY format'
            );
        } else {
            e.target.setAttribute('aria-label', expiryError);
        }
    };
    const handleCvvBlur = (e) => {
        e.target.setAttribute('placeholder', '●●●');
        if (!cvv_validate(e.target.value)) {
            e.target.removeAttribute('aria-label');
            e.target.setAttribute(
                'aria-description',
                'Error in previous field'
            );
        } else {
            e.target.removeAttribute('aria-description');
            e.target.setAttribute('aria-label', 'Enter 3-digit cvv code');
        }
    };
    const handleCvvFocus = (e) => {
        setFocusedIndex(4);
        e.target.removeAttribute('placeholder');
        e.target.removeAttribute('aria-description');
        if (CVVError === '') {
            e.target.setAttribute('aria-label', 'Enter 3-digit cvv code');
        } else {
            e.target.setAttribute('aria-label', CVVError);
        }
    };
    // Function for expiry date validation
    const expiry_validate = (date) => {
        // Decrementing 1 in the month value because JS understands dates in index of 0-11
        var exMonth = parseInt(date.slice(0, 2)) - 1;
        // Adding 2000 to the year since our input is only YY
        var exYear = parseInt(date.slice(3, 5)) + 2000;
        var today = new Date();
        var inputday = new Date();
        // Converting our expiry input to full year input for comparison
        inputday.setFullYear(exYear, exMonth, 1);

        // Regex to check date of form MM/YY
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        if (!expiryRegex.test(date)) {
            setexpiryErr(error_list.format);
            return false;
        }

        if (inputday < today) {
            setexpiryErr(error_list.expiry);
            return false;
        } else {
            setexpiryErr('');
        }
        return true;
    };

    // Function for CVV validation
    const cvv_validate = (cvv) => {
        if (cvv.length < 3) {
            setCVVError(error_list.cvv_length);
            return false;
        } else {
            setCVVError('');
        }
        return true;
    };

    const backButtonClicked = () => {
        console.log('back button clicked');
        navigate(0, { amount: pageProps.amount, client: pageProps.client });
        // go back
    };

    // Using input masks
    let ccNumberInput = document.querySelector('.cc-number-input'),
        // Regex for Card number
        ccNumberPattern = /^\d{0,16}$/g,
        // Separate using space
        ccNumberSeparator = ' ',
        ccNumberInputOldValue,
        ccNumberInputOldCursor,
        ccExpiryInput = document.querySelector('.cc-expiry-input'),
        ccExpiryPattern = /^\d{0,4}$/g,
        ccExpirySeparator = '/',
        ccExpiryInputOldValue,
        ccExpiryInputOldCursor,
        // Mask function which adds '/' or ' ' in our input
        mask = (value, limit, separator) => {
            var output = [];
            for (let i = 0; i < value.length; i++) {
                if (i !== 0 && i % limit === 0) {
                    output.push(separator);
                }
                output.push(value[i]);
            }
            return output.join('');
        },
        // unmask function removes any character other than numbers in our input
        unmask = (value) => value.replace(/[^\d]/g, ''),
        checkSeparator = (position, interval) =>
            Math.floor(position / (interval + 1)),
        ccNumberInputKeyDownHandler = (e) => {
            let el = e.target;
            ccNumberInputOldValue = el.value;
            ccNumberInputOldCursor = el.selectionEnd;
        },
        ccNumberInputInputHandler = (e) => {
            let el = e.target,
                newValue = unmask(el.value),
                newCursorPosition;

            // If input matches the regex mentioned above
            if (newValue.match(ccNumberPattern)) {
                // Add space after every 4 characters
                newValue = mask(newValue, 4, ccNumberSeparator);

                // Place the new cursor ahead of the space
                newCursorPosition =
                    ccNumberInputOldCursor -
                    checkSeparator(ccNumberInputOldCursor, 4) +
                    checkSeparator(
                        ccNumberInputOldCursor +
                        (newValue.length - ccNumberInputOldValue.length),
                        4
                    ) +
                    (unmask(newValue).length -
                        unmask(ccNumberInputOldValue).length);

                el.value = newValue !== '' ? newValue : '';
            }
            // No changes made if it does not match regex
            else {
                el.value = ccNumberInputOldValue;
                newCursorPosition = ccNumberInputOldCursor;
            }

            el.setSelectionRange(newCursorPosition, newCursorPosition);
            highlightCC(el.value);
        },
        highlightCC = (ccValue) => {
            let ccCardType = '',
                ccCardTypePatterns = {
                    visa: /^4/,
                    mastercard: /^5/,
                };

            for (const cardType in ccCardTypePatterns) {
                if (ccCardTypePatterns[cardType].test(ccValue)) {
                    ccCardType = cardType;
                    break;
                }
            }

            let activeCC = document.querySelector('.cc-types__img--active'),
                newActiveCC = document.querySelector(
                    `.cc-types__img--${ccCardType}`
                );

            if (activeCC) activeCC.classList.remove('cc-types__img--active');
            if (newActiveCC) newActiveCC.classList.add('cc-types__img--active');
        },
        ccExpiryInputKeyDownHandler = (e) => {
            let el = e.target;
            ccExpiryInputOldValue = el.value;
            ccExpiryInputOldCursor = el.selectionEnd;
        },
        ccExpiryInputInputHandler = (e) => {
            let el = e.target,
                newValue = el.value;

            newValue = unmask(newValue);
            if (newValue.match(ccExpiryPattern)) {
                // Add slash after 2 characters
                newValue = mask(newValue, 2, ccExpirySeparator);
                el.value = newValue;
            } else {
                el.value = ccExpiryInputOldValue;
            }
        };

    if (ccNumberInput) {
        ccNumberInput.addEventListener('input', ccNumberInputInputHandler);
        ccNumberInput.addEventListener('keydown', ccNumberInputKeyDownHandler);
    }

    if (ccExpiryInput) {
        ccExpiryInput.addEventListener('keydown', ccExpiryInputKeyDownHandler);
        ccExpiryInput.addEventListener('input', ccExpiryInputInputHandler);
    }

    var rupee = '\u20B9';
    var amount = pageProps.amount;

    const btntext = 'Pay ' + rupee + amount;

    return (
        <>
            <Header></Header>
            <Card>
                <div className='container mx-auto mx-auto mx-auto max-w-full sm:px-4 sm:px-4 sm:px-4 '>
                    <button
                        aria-label='Back'
                        className='whitespace-no-wrap absolute start-0 top-0 mx-3 my-3 inline-block select-none rounded border px-3 py-1 text-center align-middle font-normal leading-normal no-underline '
                        ref={backRef}
                        onClick={backButtonClicked}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'white';
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'gray';
                            setFocusedIndex(0);
                        }}
                        style={{
                            backgroundColor: 'white',
                            border: 'solid',
                            borderColor: 'white',
                        }}
                    >
                        <BackIcon />
                    </button>
                    <h6 aria-hidden='true' className=' mb-3'>
                        Amount Payable
                    </h6>
                    {/* Using ASCII code for Indian Rupee sign */}
                    <h3 aria-hidden='true' className='mb-3'>
                        &#8377;{amount}
                    </h3>
                    <p aria-hidden='true' className='fs-3 fw-bold'>
                        Card Details
                    </p>
                    <div className='container mx-auto p-0 sm:px-4'>
                        <form action='' onSubmit={handleSubmit}>
                            <div className='gx-3 flex  flex-wrap'>
                                <div
                                    className='mx-auto'
                                    style={{ width: '300px' }}
                                >
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row'>
                                            <div className='mr-2 basis-auto'>
                                                <label
                                                    aria-hidden='true'
                                                    className='mb-1 basis-1/2 text-start'
                                                >
                                                    Card Number
                                                </label>
                                            </div>
                                            <div className='mr-1 basis-1/12'>
                                                <img
                                                    className='cc-types__img cc-types__img--visa mr-2 flex basis-1/4 flex-col'
                                                    width='24'
                                                    src={visa_img}
                                                />
                                            </div>

                                            <div className='basis-1/12'>
                                                <img
                                                    className='cc-types__img cc-types__img--mastercard basis-1/4'
                                                    width='24'
                                                    src={mastercard_img}
                                                />
                                            </div>
                                        </div>
                                        <input
                                            aria-label='Enter card number, accepted card networks are VISA and Mastercard'
                                            aria-required='true'
                                            className='cc-number-input mb-1 mb-3 block w-full appearance-none rounded border border-gray-200 bg-white px-2 py-1 text-base leading-normal text-gray-800'
                                            maxLength='19'
                                            id='cardno'
                                            name='cardno'
                                            type='text'
                                            onFocus={(e) => {
                                                handleCardFocus(e);
                                            }}
                                            onBlur={(e) => {
                                                handleCardBlur(e);
                                            }}
                                            placeholder='1234 5678 4356 7899'
                                            ref={numRef}
                                            value={cardDetails.cardno}
                                            onInput={handleChange}
                                        />
                                        {cardNoError ? (
                                            <label
                                                id='cardErr'
                                                style={{
                                                    fontSize: '0.8rem',
                                                    marginTop: '-10px',
                                                    color: 'red',
                                                }}
                                                className='text-start'
                                            >
                                                {cardNoError}
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div
                                    className='mx-auto w-3/4'
                                    style={{ width: '300px' }}
                                >
                                    <div className='flex flex-col'>
                                        <label
                                            aria-hidden='true'
                                            className='mb-1 mt-2 text-start'
                                        >
                                            {' '}
                                            Cardholder's Name{' '}
                                        </label>
                                        <input
                                            aria-label='Enter Name on Card'
                                            aria-required='true'
                                            ref={nameRef}
                                            className='mb-1 mb-3 block w-full appearance-none rounded border border-gray-200 bg-white px-2 py-1 text-base leading-normal text-gray-800'
                                            type='text'
                                            name='name'
                                            placeholder='Name on card'
                                            value={cardDetails.name}
                                            onChange={handleChange}
                                            onFocus={(e) => {
                                                handleCardNameFocus(e);
                                            }}
                                            onBlur={(e) => {
                                                handleCardNameBlur(e);
                                            }}
                                        />
                                        {nameError ? (
                                            <label
                                                id='cardNameErr'
                                                style={{
                                                    fontSize: '0.8rem',
                                                    marginTop: '-10px',
                                                    color: 'red',
                                                }}
                                                className='text-start'
                                            >
                                                {nameError}
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div
                                    className='me-4 ms-auto w-2/5 text-start'
                                    style={{ width: '140px' }}
                                >
                                    <div className='flex flex-col'>
                                        <label
                                            aria-hidden='true'
                                            htmlFor='expiry'
                                            className='form-label mb-1 mt-2 text-start'
                                        >
                                            {' '}
                                            Expiry{' '}
                                        </label>
                                        <input
                                            aria-label='Enter card expiry in MM/YY format'
                                            className='cc-expiry-input mb-3 block w-full appearance-none rounded border border-gray-200 bg-white px-2 py-1 text-base leading-normal  text-gray-800'
                                            maxLength='5'
                                            type='text'
                                            aria-required='true'
                                            id='expiry'
                                            name='expiry'
                                            placeholder='MM/YY'
                                            value={cardDetails.expiry}
                                            onInput={handleChange}
                                            onFocus={(e) => {
                                                handleExpiryFocus(e);
                                            }}
                                            ref={expiryRef}
                                            onBlur={(e) => {
                                                handleExpiryBlur(e);
                                            }}
                                        />
                                        {expiryError ? (
                                            <label
                                                id='expErr'
                                                style={{
                                                    fontSize: '0.8rem',
                                                    marginTop: '-10px',
                                                    color: 'red',
                                                }}
                                                className='text-start'
                                            >
                                                {expiryError}
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div
                                    className='me-auto w-2/5'
                                    style={{ width: '140px' }}
                                >
                                    <div className='flex flex-col'>
                                        <label
                                            aria-hidden='true'
                                            className='mb-1 mt-2 text-start'
                                        >
                                            {' '}
                                            CVV/CVC{' '}
                                        </label>
                                        <input
                                            aria-label='Enter 3-digit cvv code'
                                            aria-required='true'
                                            className='placeholdercss cc-cvc-input mb-1 mb-3 block w-full appearance-none rounded border border-gray-200 bg-white px-2 py-1 text-base leading-normal text-gray-800'
                                            maxLength='3'
                                            name='cvv'
                                            type='password'
                                            placeholder='●●●'
                                            value={cardDetails.cvv}
                                            onChange={handleChange}
                                            onFocus={(e) => {
                                                handleCvvFocus(e);
                                            }}
                                            ref={cvvRef}
                                            onBlur={(e) => {
                                                handleCvvBlur(e);
                                            }}
                                            onKeyPress={(event) => {
                                                const regexexp = /[\d]/;
                                                if (!regexexp.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        {CVVError ? (
                                            <label
                                                id='cvvErr'
                                                style={{
                                                    fontSize: '0.8rem',
                                                    marginTop: '-10px',
                                                    color: 'red',
                                                }}
                                                className='text-start'
                                            >
                                                {CVVError}
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div
                                    onClick={handleSubmit}
                                    ref={buttonRef}
                                    onFocus={() => setFocusedIndex(5)}
                                    className='m-auto mt-8 block w-3/4'
                                >
                                    <Button text={btntext} />
                                </div>
                                <div className='m-auto mt-8 block w-1/2'>
                                    <ProgressBar progress={1} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default CardPayment;
