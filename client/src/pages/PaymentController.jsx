import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import PaymentMethod from './PaymentMethod';
import Loading from './Loading';
import CardPayment from './CardPayment';
import WalletPaymentPage from './WalletPaymentPage';
import UPIPayment from './UPIPayment';
import WalletPaymentOtpPage from './WalletPaymentOtpPage';
import WalletPaymentConfirmation from './WalletPaymentConfirmation';
import Process from './Process';
import Success from './Success';
import Failed from './Failed';

const PaymentController = () => {
  const { order_url } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(9);
  const [pageProps, setPageProps] = useState({});
  const [hasRedirected, setHasRedirected] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(hasRedirected);
    }, 500);

    const getDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/pay/${order_url}`
        );
        const data = await response.json();

        if (data.validity === -1) {
          setPageProps({
            errorMessage: data.message,
            validity: data.validity,
          });
          setHasRedirected(8);
          // setCurrentPage(8);
        } else if (data.validity === 1) {
          setPageProps({
            amount: data.orderDetails.orderAmount,
            errorMessage: data.message,
            validity: data.validity,
          });
          setHasRedirected(7);
          // setCurrentPage(7);
          console.log("hey");
        } else {
          setOrderDetails({
            amount: data.orderDetails.orderAmount,
            details: data.orderDetails.orderDetails,
          });
          setHasRedirected(0);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setIsLoading(false);
        setHasRedirected(8);
      }
    };

    getDetails();

  }, [order_url,hasRedirected]);

  const handleNavigate = (page, props) => {
    setCurrentPage(page);
    setPageProps(props);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Card>
          <Loader />
        </Card>
      </>
    );
  }

  return (
    <>
      {currentPage === 9 && <Loading />}
      {currentPage === 0 && (
        <PaymentMethod
          amount={orderDetails.amount}
          navigate={handleNavigate}
          client='Tally'
        />
      )}
      {currentPage === 1 && (
        <CardPayment navigate={handleNavigate} pageProps={pageProps} />
      )}
      {currentPage === 2 && (
        <WalletPaymentPage navigate={handleNavigate} pageProps={pageProps} />
      )}
      {currentPage === 3 && (
        <WalletPaymentOtpPage
          navigate={handleNavigate}
          pageProps={pageProps}
        />
      )}
      {currentPage === 4 && (
        <WalletPaymentConfirmation
          navigate={handleNavigate}
          pageProps={pageProps}
        />
      )}
      {currentPage === 5 && (
        <UPIPayment navigate={handleNavigate} pageProps={pageProps} />
      )}
      {currentPage === 6 && (
        <Process navigate={handleNavigate} pageProps={pageProps} />
      )}
      {currentPage === 7 && (
        <Success navigate={handleNavigate} pageProps={pageProps} />
      )}
      {currentPage === 8 && (
        <Failed navigate={handleNavigate} pageProps={pageProps} />
      )}
    </>
  );
};

export default PaymentController;
