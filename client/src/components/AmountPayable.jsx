import React from 'react';

const AmountPayable = (props) => {
    return (
        <>
            <h6
                aria-hidden='true'
                className='my-1 text-center text-xl font-semibold'
            >
                Amount Payable
            </h6>
            {/* Using ASCII code for Indian Rupee sign */}
            <h3
                aria-hidden='true'
                className='my-3 mb-6 text-center text-xl font-semibold'
            >
                &#8377; {props.amount}
            </h3>
        </>
    );
};

export default AmountPayable;
