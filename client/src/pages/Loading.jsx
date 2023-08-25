import Header from '../components/Header';
import Card from '../components/Card';
import Loader from '../components/Loader';
import React, { useEffect, useRef } from 'react';

const Loading = () => {
    const ref = useRef();
    useEffect(()=>{
        ref.current.focus();
    },[])
    return (
        <>
            <Header/>
            <Card>
                <div tabIndex={0} ref={ref} className='outline-0'>
                <Loader/>
                </div>
            </Card>
        </>
    );
};

export default Loading;
