import React from 'react';
import { useEffect, useRef,useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

function SuccessIcon() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='150'
            length='auto'
            fill='green'
            className='bi bi-patch-check-fill'
            viewBox='0 0 16 16'
        >
            <path d='M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z' />
        </svg>
    );
}

function Success({pageProps,navigate}) {
    // const location = useLocation();
    // var props = location.state.props;
    const [transaction,setTransaction] = useState({});
    let transactionID = '';
    let timestamp = '';
    function getCurrentTimestamp(datetime) {
        const date = new Date(datetime);
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    const divRef = useRef();
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, null, window.location.href);
        };
        divRef.current.focus();
    }, []);
    return (
        <div>
            <Header></Header>
            <Card>
                {pageProps.validity ==1?(<span className='sr-only'>Payment Already Done</span>):(<span className='sr-only'>{`Payment Successfull, paid ${pageProps.amount} Rupees`}</span>)}

                <div
                    aria-hidden='true'
                    tabIndex={0}
                    ref={divRef}
                    className='container flex flex-col justify-around outline-0'
                >
                    {pageProps.validity==1 ? (<>
                        <p
                        className='text-lg font-semibold '
                        // aria-label='Payment Already Done'
                    >
                        Payment Already Done
                    </p>
                    </>) : (<>
                        <p
                        className='text-lg font-semibold '
                        // aria-label='Payment Processed Successfully'
                    >
                        Payment Successful
                    </p>
                        </>) }
                    
                    <div aria-hidden='true' className='mx-auto pt-6'>
                        <SuccessIcon />
                    </div>
                    <div aria-hidden='false'>
                        <p className='my-5 text-xl font-extrabold'>
                            Paid ₹{pageProps.amount}
                        </p>
                        {pageProps.validity==1 ? (<></>) : (<>
                            <p aria-hidden='true' className='text-sm text-gray-400'>
                            Transaction ID: {pageProps.transaction.transactionID}
                        </p>
                        <h6 aria-hidden='true'>{getCurrentTimestamp(pageProps.transaction.transactionTimestamp)}</h6>
                        </>) }
                        
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Success;
