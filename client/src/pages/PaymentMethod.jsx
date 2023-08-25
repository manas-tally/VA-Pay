import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import img_wallet from '../assets/icon_wallet24.png';
import img_upi from '../assets/icon_upi24.png';
import img_card from '../assets/icon_card24.png';
import ProgessBar from '../components/ProgressBar';
import Button from '../components/Button';
import AmountPayable from '../components/AmountPayable';

function PaymentMethod({ amount, navigate, client }) {
    const [selectedOption, setSelectedOption] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const navigationRefs = Array.from({ length: 3 }, () => useRef(null));

    useEffect(() => {
        navigationRefs[focusedIndex].current.focus();
    }, [focusedIndex]);

    const handleInputChange = (index) => {
        setSelectedOption(index);
        setFocusedIndex(index);
    };
    
    const paymentMethods = ['wallet', 'card', 'upi'];
    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedMethod = paymentMethods[selectedOption];
        
        if (selectedOption === 0) {
            navigate(2, { method: selectedMethod, amount, client });
        } else if (selectedOption === 1) {
            navigate(1, { method: selectedMethod, amount, client });
        } else if (selectedOption === 2) {
            navigate(5, { method: selectedMethod, amount, client });
        }
    };

    return (
        <div>
            <Header />
            <Card>
                <div className='container mx-auto mb-3 max-w-full sm:px-4'>
                    <AmountPayable amount={amount} />
                    <form onSubmit={handleSubmit}>
                        <p aria-hidden='true'>Please select the payment option</p>
                        {['Wallet Payment', 'Card Payment', 'UPI Payment'].map((option, index) => (
                            <div
                                key={index}
                                className='container mx-auto my-5 max-w-full sm:px-4'
                                aria-label={`${option}, press enter to select and continue`}
                            >
                                <label                                    
                                    className={`btn w-64 text-start font-semibold ${
                                        selectedOption === index ? 'bg-slate-400' : 'bg-slate-200'
                                    }`}
                                    tabIndex='0'
                                    ref={navigationRefs[index]}
                                    onFocus={() => setFocusedIndex(index)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            handleInputChange(index);
                                        }
                                    }}
                                >
                                    <input
                                        type='radio'
                                        className='hidden'
                                        value={index}
                                        name='paymentOption'
                                        autoComplete='off'
                                        checked={selectedOption === index}
                                        onChange={() => handleInputChange(index)}
                                    />
                                    <span className='sr-only'>
                                        {selectedOption=== index ? (`${option} selected, option ${index+1} of 3`):(`${option}, press enter to select,option ${index+1} of 3`)}
                                    </span>
                                    <img aria-hidden='true' className='mx-4' src={index === 0 ? img_wallet : index === 1 ? img_card : img_upi} width='24' alt={option} />
                                    <p aria-hidden='true'>{option}</p>
                                </label>
                            </div>
                        ))}
                        <div className='linkButtonContainer m-auto mb-8 mt-12 block w-64'>
                            <Button type='submit' ariaLabel={`Proceed to pay ${amount} Rupees, using ${paymentMethods[selectedOption]} method`} text='Proceed to payment' />
                        </div>
                        <div className='circlesContainer d-flex align-items-center justify-content-center mt-3'>
                            <ProgessBar progress={0} />
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default PaymentMethod;