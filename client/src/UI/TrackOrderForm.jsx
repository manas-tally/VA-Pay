import Loader from '../components/Loader';
import { useState } from 'react';
import copyIcon from '../assets/copy_icon.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackOrderForm = () => {
    const [orderIDTouched, setOrderIDTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [orderDetails, setOrderDetails] = useState({});

    const OrderInfo = [
        { name: 'Order ID', value: orderDetails.orderID },
        { name: 'Order Details', value: orderDetails.orderDetails },
        { name: 'Order Amount', value: orderDetails.orderAmount },
        { name: 'Order Status', value: orderDetails.orderStatus },
        { name: 'Order Payment URL', value: orderDetails.orderPaymentURL },
    ];

    const clipboardToast = () => {
        toast.success('Copied to clipboard! 📋', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });
    };

    const findOrderHandler = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        const formData = {
            orderID: event.target.OrderID.value,
        };

        let res, data;

        try {
            res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            data = await res.json();
        } catch (err) {
            console.log('Something went wrong!');
        }

        setOrderIDTouched(false);
        setIsLoading(false);

        if (data.status === 'OK') {
            setShowData(true);

            data.orderDetails.transactionHistory.reverse();

            data.orderDetails.transactionHistory.forEach((transaction) => {
                const date = new Date(transaction.transactionTimestamp);
                transaction.transactionTimestamp = date.toLocaleString();
            });

            setOrderDetails({
                orderID: data.orderDetails.orderID,
                orderDetails: data.orderDetails.orderDetails,
                orderAmount: data.orderDetails.orderAmount,
                orderStatus: data.orderDetails.orderStatus,
                orderPaymentURL: data.orderDetails.orderPaymentURL,
                transactionHistory: data.orderDetails.transactionHistory,
            });
        } else {
        }
    };

    return (
        <>
            <ToastContainer />
            
            <div className='flex grow flex-col items-center justify-center space-y-4 overflow-y-scroll p-2'>
                {isLoading ? (
                    <Loader />
                ) : showData ? (
                    <>
                        {orderDetails.orderStatus === 'pending' && (
                            <h1 className='my-6 text-xl'>Payment Pending 🕒</h1>
                        )}
                        {orderDetails.orderStatus === 'success' && (
                            <h1 className='my-6 text-xl'>Payment Success ✅</h1>
                        )}
                        {orderDetails.orderStatus === 'failed' && (
                            <h1 className='my-6 text-xl'>
                                Last Payment Failed ❌
                            </h1>
                        )}

                        <ul className='flex w-full flex-col space-y-4'>
                            {OrderInfo.map((info) => (
                                <li
                                    key={info.name}
                                    className='flex w-full items-center'
                                >
                                    <label className='w-40'>{info.name}</label>
                                    <div className='flex w-full grow items-center'>
                                        <input
                                            className='w-full cursor-default select-none bg-gray-200 p-2 outline-none'
                                            type='text'
                                            readOnly
                                            placeholder={info.value}
                                        ></input>

                                        {info.name === 'Order ID' && (
                                            <img
                                                className='btn max-h-10 min-h-[2.5rem] cursor-pointer rounded-none border-0 bg-gray-200 p-2 hover:bg-gray-400 focus:bg-gray-800'
                                                src={copyIcon}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        info.value
                                                    );
                                                    clipboardToast();
                                                }}
                                            />
                                        )}
                                        {info.name === 'Order Payment URL' && (
                                            <img
                                                className='btn max-h-10 min-h-[2.5rem] cursor-pointer rounded-none border-0 bg-gray-200 p-2 hover:bg-gray-400'
                                                src={copyIcon}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        `${
                                                            import.meta.env
                                                                .VITE_FRONTEND_URL
                                                        }/pay/${info.value}`
                                                    );
                                                    clipboardToast();
                                                }}
                                            />
                                        )}
                                    </div>
                                </li>
                            ))}

                            <li>
                                <div className='collapse bg-base-200'>
                                    <input
                                        type='checkbox'
                                        name='my-accordion-1'
                                    />
                                    <div className='collapse-title text-xl font-medium'>
                                        Transaction History 📜
                                    </div>

                                    <div className='collapse-content'>
                                        <table className='w-full'>
                                            <tr>
                                                <th>ID</th>
                                                <th>Status</th>
                                                <th>Timestamp</th>
                                                <th>Method</th>
                                            </tr>
                                            {orderDetails.transactionHistory.map(
                                                (info) => (
                                                    <tr>
                                                        <td>
                                                            {info.transactionID}
                                                        </td>
                                                        <td>
                                                            {
                                                                info.transactionStatus
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                info.transactionTimestamp
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                info.transactionMethod
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </>
                ) : (
                    <form
                        className='flex flex-col space-y-4'
                        onSubmit={findOrderHandler}
                    >
                        <input
                            type='text'
                            name='OrderID'
                            className={`border-1 w-64 rounded-md border-gray-600 bg-gray-200 p-2 sm:w-96 ${
                                orderIDTouched &&
                                'invalid:border-red-600 invalid:bg-red-200'
                            }`}
                            placeholder='Order ID'
                            onBlur={() => setOrderIDTouched(true)}
                            required
                        ></input>
                        <button className='btn glass bg-success'>
                            Get Order Details
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default TrackOrderForm;
