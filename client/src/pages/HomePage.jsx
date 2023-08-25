import { useState } from 'react';
import GenerateOrderForm from '../UI/GenerateOrderForm';
import TrackOrderForm from '../UI/TrackOrderForm';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    console.log(currentPage);

    return (
        <>
            <div className='flex min-h-screen items-center justify-center'>
                <div className='flex h-96 w-80 flex-col rounded-lg bg-white p-2 shadow-2xl sm:h-[30rem] sm:w-[40rem]'>
                    <p className='pt-2 text-center text-2xl font-semibold'>
                        Welcome to VA Pay
                    </p>
                    {currentPage === 0 && (
                        <div className='flex grow flex-col items-center justify-center space-y-2'>
                            <button
                                className='btn glass w-40 bg-success'
                                onClick={() => setCurrentPage(1)}
                            >
                                Generate Order
                            </button>
                            <button
                                className='btn glass w-40 bg-info'
                                onClick={() => setCurrentPage(2)}
                            >
                                Track Order
                            </button>
                        </div>
                    )}

                    {currentPage == 1 && <GenerateOrderForm />}
                    {currentPage == 2 && <TrackOrderForm />}
                </div>
            </div>
        </>
    );
};

export default HomePage;
