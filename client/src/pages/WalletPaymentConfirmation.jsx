import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import DisabledButton from '../components/DisabledButton';
import ProgessBar from '../components/ProgressBar';
import GooglePay from '../assets/icon_googlepay24.png';
import PhonePe from '../assets/icon_phonpe24.png';
import PayTm from '../assets/icon_paytm24.png';

import { useNavigate, useLocation } from 'react-router-dom';

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

function WalletPaymentConfirmation({pageProps,navigate}) {
    // const [focusedIndex,setFocusedIndex] = useState(1)
    const navigationRefs = Array.from({ length: 2 }, () => useRef(null));
    const walletImages = [PayTm, GooglePay, PhonePe];
    const payref = useRef(null);
    var isInsufficient = false;
    //var props = location.state.props;
    // var props = {walletIndex:0,phoneno:"+91 9999999999",availableBalance:"500",amount:"200"}
    pageProps.availableBalance = 5002;
    if(parseFloat(pageProps.amount)>pageProps.availableBalance){
        isInsufficient = true;
    }
    var arialabel;
    if(!isInsufficient){
        arialabel = 'Available Balance is ' +
        pageProps.availableBalance +
        ' Rupees, Confirm to pay ' +
        pageProps.amount +
        ' Rupees';
    }else{
        arialabel = 'Available Balance is '+pageProps.availableBalance+ ' Rupees, Insufficient to pay '+pageProps.amount+ ' , Try another method.'
    }
    // useEffect(()=>{
    //     if (focusedIndex!=-1){
    //         console.log("focused index : ",focusedIndex)
    //         if (navigationRefs[focusedIndex].current)
    //         navigationRefs[focusedIndex].current.focus()
    //         // for (let i=0;i<2;i++){
    //         //   if (navigationRefs[i].current && i!=focusedIndex)navigationRefs[i].current.blur();
    //         // }
    //         const handleKeyPress = (e) => {
    //         if (e.keyCode===13){ // enter
    //             e.preventDefault()
    //             console.log("enter clicked : focused index ", focusedIndex)
    //             navigationRefs[focusedIndex].current.click()
    //         }
    //         }
    //         window.addEventListener('keydown', handleKeyPress);
    //         return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //         };
    //     }
    //   },[focusedIndex])

    useEffect(() => {
        // console.log("hello")
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
        payref.current.focus();
    }, []);

    // const navigate = useNavigate();

    const confirmClicked = () => {
        // setFocusedIndex(1);
        // go to next page
        console.log('confirm clicked');

        // navigate('/processing', { state: { props } });
        navigate(6,pageProps);
    };
    const backButtonClicked = () => {
        // go back
        console.log('back button clicked');

        navigate(2,pageProps);
    };

    return (
        <div>
            <Header></Header>
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
                        className='confirmation text-[28px] font-[700]'
                    >
                        Confirmation
                    </div>
                    <div
                        aria-hidden='true'
                        className='walletInfo mt-9 flex items-center justify-center'
                    >
                        <img
                            className="h-5 w-5 m-1"
                            src={walletImages[pageProps.walletIndex]}
                        />
                        <div
                            className='walletNumber font-bold text-[10px]'
                        >
                            ({pageProps.phoneno})
                        </div>
                    </div>
                    <br />
                    <div
                        aria-hidden='true'
                        className='availableBalance font-bold'
                    >
                        Available Balance:
                    </div>
                    {isInsufficient ? (<div aria-hidden='true' className='amount text-red-600'>
                        Rs. {pageProps.availableBalance}
                        <p className='text-sm'>Insufficient balance</p>
                    </div>):(
                        <div aria-hidden='true' className='amount font-bold'>
                        Rs. {pageProps.availableBalance}
                    </div>
                    )}
                    
                    {isInsufficient?(<div
                        ref={payref}
                        tabIndex={0}
                        aria-label={
                            arialabel
                        }
                        onClick={() => {}}
                        onKeyDown={(e) => {
                        }}
                        onFocus={(e) => {}}
                        className='block ms-auto me-auto w-50 mt-[190px] rounded-[20px] border border-white'
                    >
                        <div aria-hidden='true'>
                            <DisabledButton tabindex={-1} text='Pay' />
                        </div>
                        
                    </div>):(<div
                        ref={payref}
                        tabIndex={0}
                        aria-label={
                            arialabel
                        }
                        onClick={() => confirmClicked()}
                        onKeyDown={(e) => {
                            if (e.which === 13) confirmClicked();
                        }}
                        onFocus={(e) => {}}
                        className='block ms-auto me-auto w-50 mt-[190px] rounded-[20px] border border-white'
                    >
                        <div aria-hidden='true'>
                            <Button tabindex={-1} text='Pay' />
                        </div>
                    </div>)}
                    <div
                        aria-hidden='true'
                        className="circlesContainer items-center justify-center flex mt-[20px]"
                    >
                        <ProgessBar progress={1} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default WalletPaymentConfirmation;
