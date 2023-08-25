const Simulate = () => {
    const handleChoice = (choice) => {
        window.opener.postMessage(choice, '*');
        window.close();
      };
    return (
        <>
            <div aria-hidden='true' className='flex min-h-screen items-center justify-center'>
                <div className='flex h-96 w-80 flex-col rounded-lg bg-white p-2 shadow-2xl sm:h-[30rem] sm:w-[40rem]'>
                    <p aria-hidden='true' className='pt-2 text-center text-2xl font-semibold'>
                        Simulate the payment
                    </p>
                    
                        <div className='flex grow flex-col items-center justify-center space-y-2'>
                            <button aria-hidden='true'
                                className='btn glass w-40 bg-success'
                                onClick={() => handleChoice(1)}
                            >
                                Success
                            </button>
                            <button aria-hidden='true'
                                className='btn glass w-40 bg-info'
                                onClick={() => handleChoice(0)}
                            >
                                Failure
                            </button>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Simulate;
