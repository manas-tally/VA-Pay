import React from 'react';
import './styles/App.css';
import PaymentMethod from './pages/PaymentMethod';
import PaymentController from './pages/PaymentController';
import CardPayment from './pages/CardPayment';
import WalletPaymentPage from './pages/WalletPaymentPage';
import UPIPayment from './pages/UPIPayment';
import WalletPaymentOtpPage from './pages/WalletPaymentOtpPage';
import WalletPaymentConfirmation from './pages/WalletPaymentConfirmation';
import Process from './pages/Process';
import Success from './pages/Success';
import Failed from './pages/Failed';
import Simulate from './pages/Simulate';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Loader from './components/Loader';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage></HomePage>} />
                <Route
                    path='/pay/:order_url'
                    element={<PaymentController />}
                />
                <Route
                    path='/Simulate'
                    element={<Simulate />}
                />
                {/* <Route path='/pay/card-payment' element={<CardPayment />} />
                <Route
                    path='/pay/wallet-payment'
                    element={<WalletPaymentPage />}
                />
                <Route
                    path='/pay/upi-payment'
                    element={<UPIPayment amount='XXXX.XX' />}
                />
                <Route
                    path='/pay/otp-verification'
                    element={<WalletPaymentOtpPage />}
                />
                <Route
                    path='/pay/wallet-payment-confirmation'
                    element={<WalletPaymentConfirmation />}
                />
                <Route
                    path='/pay/processing'
                    element={<Process amount='XXXX.XX' />}
                />
                <Route
                    path='/pay/success'
                    element={
                        <Success
                            amount='XXXX.XX'
                            transactionID='abcd1234'
                            timestamp='2023-10-1 XX PM'
                        />
                    }
                />
                <Route
                    path='/pay/failed'
                    element={
                        <Failed
                            errorMessage='Error XXX: this happened'
                            client='XXX'
                        />
                    }
                /> */}
                <Route path='*' element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    );
}

export default App;
