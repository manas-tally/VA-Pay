import { useState } from 'react';
import Loader from '../components/Loader';
import copyIcon from '../assets/copy_icon.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenerateOrderForm = () => {
    const [orderDetailsTouched, setOrderDetailsTouched] = useState(false);
    const [amountTouched, setAmountTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [orderDetails, setOrderDetails] = useState({});

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

    const errorToast = (message) => {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    const generateOrderHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = {
            OrderDetails: event.target.OrderDetails.value,
            Amount: event.target.Amount.value,
        };

        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/generate-order`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            }
        );

        const data = await res.json();

        console.log(data);

        setIsLoading(false);

        setOrderDetailsTouched(false);
        setAmountTouched(false);

        if (data.status === 'OK') {
            setShowData(true);
            setOrderDetails({
                orderID: data.orderDetails.orderID,
                paymentURL: data.orderDetails.orderPaymentURL,
            });
        } else {
            errorToast(data.message);
        }
    };

    return (
        <>
            <ToastContainer />

            <div className='flex grow flex-col items-center justify-center p-2'>
                {isLoading ? (
                    <Loader />
                ) : showData ? (
                    <>
                        <h1 className='my-6 text-2xl'>Order Generated ✅</h1>
                        <ul className='flex w-full flex-col space-y-4'>
                            <li className='flex w-full items-center'>
                                <label className='w-40'>Order ID</label>
                                <div className='flex w-full grow items-center'>
                                    <input
                                        className='w-full cursor-default select-none bg-gray-200 p-2 outline-none'
                                        type='text'
                                        readOnly
                                        placeholder={orderDetails.orderID}
                                    ></input>

                                    <img
                                        className='btn max-h-10 min-h-[2.5rem] cursor-pointer rounded-none border-0 bg-gray-200 p-2 hover:bg-gray-400 focus:bg-gray-800'
                                        src={copyIcon}
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                orderDetails.orderID
                                            );
                                            clipboardToast();
                                        }}
                                    />
                                </div>
                            </li>

                            <li className='flex w-full items-center'>
                                <label className='w-40'>
                                    Order Payment URL
                                </label>
                                <div className='flex w-full grow items-center'>
                                    <input
                                        className='w-full cursor-default select-none bg-gray-200 p-2 outline-none'
                                        type='text'
                                        readOnly
                                        placeholder={orderDetails.paymentURL}
                                    ></input>
                                    <img
                                        className='btn max-h-10 min-h-[2.5rem] cursor-pointer rounded-none border-0 bg-gray-200 p-2 hover:bg-gray-400'
                                        src={copyIcon}
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `${
                                                    import.meta.env
                                                        .VITE_FRONTEND_URL
                                                }/pay/${
                                                    orderDetails.paymentURL
                                                }`
                                            );
                                            clipboardToast();
                                        }}
                                    />
                                </div>
                            </li>
                        </ul>
                    </>
                ) : (
                    <form
                        className='flex flex-col space-y-4'
                        onSubmit={generateOrderHandler}
                    >
                        <input
                            type='text'
                            name='OrderDetails'
                            className={`border-1 w-64 rounded-md border-gray-600 bg-gray-200 p-2 sm:w-96 ${
                                orderDetailsTouched &&
                                'invalid:border-red-600 invalid:bg-red-200'
                            }`}
                            placeholder='Order Details'
                            onBlur={() => setOrderDetailsTouched(true)}
                            required
                        ></input>
                        <input
                            type='number'
                            step='0.01'
                            name='Amount'
                            className={`border-1 w-64 rounded-md border-gray-600 bg-gray-200 p-2 sm:w-96 ${
                                amountTouched &&
                                'invalid:border-red-600 invalid:bg-red-200'
                            }`}
                            placeholder='Amount'
                            onBlur={() => setAmountTouched(true)}
                            required
                            min='1'
                            max='1000000'
                        ></input>
                        <button className='btn glass bg-success'>
                            Create Order
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default GenerateOrderForm;
