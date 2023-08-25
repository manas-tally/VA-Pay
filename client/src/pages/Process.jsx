import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../components/Header';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import AmountPayable from '../components/AmountPayable';

function Process({ pageProps, navigate }) {
    const divRef = useRef();
    const {order_url} = useParams();
    useEffect(()=>{
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
    },[])
    useEffect(() => {
        divRef.current.focus();
        // pageProps.transactionID = 'trans1';
        // pageProps.timestamp = '12:00:00';
        const pay = async (state) => {
            const formData = {
                transactionStatus: state,
                transactionMethod: pageProps.method,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/make-payment/${order_url}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );
    
            const data = await res.json();
            pageProps.transaction = data.orderDetails;
            if(state=='success'){
                setTimeout(()=>{
                    navigate(7, pageProps);
                },500)
            }else if(state=='failed'){
                setTimeout(()=>{
                    navigate(8, pageProps);
                },500)
            }
        }
        const timer = setTimeout(() => {
            const popupUrl = `${import.meta.env.VITE_FRONTEND_URL}/Simulate`;
            const windowFeatures = 'width=400,height=300,resizable=yes,scrollbars=yes';
            const popupWindow = window.open(popupUrl, 'RestrictedPopup', windowFeatures);

            if (popupWindow) {
                window.addEventListener('message', event => {
                    if (event.data === 1) {
                        pay('success');
                        // navigate(7, pageProps);
                    } else if (event.data === 0) {
                        pay('failed');
                        // navigate(8, pageProps);
                    }
                });
            } else {
                // setIsLoading(false);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate, order_url,pageProps]);

    return (
        <>
            <Header></Header>
            <Card>
                <div
                    tabIndex={-1}
                    className='container flex flex-col justify-around py-1'
                >
                    <div aria-hidden='true' className='pb-12'>
                        <AmountPayable amount={pageProps.amount} />
                    </div>

                    <div
                        tabIndex={-1}
                        aria-hidden='true'
                        className='pb-12 text-start'
                    >
                        <Loader />
                    </div>
                    <div className='outline-0' tabIndex={0} ref={divRef}>
                        <b aria-label='Please wait, while we are processing your payment, please do not reload or leave this page'>
                            Processing Payment...
                        </b><br />
                        <span
                            // aria-hidden='true'
                            className='text-sm text-gray-400'
                        >
                            Please do not reload or leave this page
                        </span>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default Process;
