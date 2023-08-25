import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { useEffect, useRef } from 'react';

function FailureIcon() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='150'
            length='auto'
            fill='red'
            className='bi bi-x-circle-fill'
            viewBox='0 0 16 16'
        >
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
        </svg>
    );
}

function Failure({ pageProps, navigate }) {
    const divRef = useRef();
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
            divRef.current.focus();
        
    }, []);

    const confirmClicked = () => {
        console.log('confirm clicked');
        navigate(0, { amount: pageProps.amount, client: pageProps.client });
    };
    return (
        <div>
            <Header></Header>
            <Card>
                <div className='container flex flex-col justify-around '>
                    <h1
                        className='text-lg font-semibold'
                        aria-hidden='true'
                        // aria-label='Payment Failed'
                    >
                        {(pageProps.validity) ? <>Invalid Payment Request</>: <>Payment Failed</>}
                    </h1>
                    <div aria-hidden='true' className='mx-auto pt-6'>
                        <FailureIcon />
                    </div>
                    
                    <div>
                        {pageProps.validity ? (<div ref={divRef}
                                tabIndex={0} className='mt-4 outline-0'>
                            <p>Payment Link Expired or Invalid</p>
                        </div>) : (
                            <div
                                className='mt-4'
                                ref={divRef}
                                tabIndex={0}
                                aria-label={
                                    'Failed to process payment of ₹' +
                                    pageProps.amount +
                                    ', Press enter to Redirect Back To ' +
                                    pageProps.client +
                                    ' and try again'
                                }
                                onClick={() => confirmClicked()}
                                onKeyDown={(e) => {
                                    if (e.which === 13) confirmClicked();
                                }}
                                onFocus={(e) => { }}
                            >
                                <div aria-hidden='true'>
                                    <Button
                                        tabindex={-1}
                                        text={'Redirect Back To ' + pageProps.client}
                                    ></Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Failure;
