import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';

function Card({ children }) {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <div className=' my-auto h-full text-center align-middle'>
                <div className='card mb-52 mt-6 w-[20rem] shadow-2xl sm:w-[30rem] md:w-[35rem]'>
                    <div className='card-body flex '>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;
