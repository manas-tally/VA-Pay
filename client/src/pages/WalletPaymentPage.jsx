import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import GooglePay from "../assets/icon_googlepay24.png";
import PayTM from "../assets/icon_paytm24.png";
import PhonePe from "../assets/icon_phonpe24.png";
import Button from "../components/Button";
import ProgessBar from "../components/ProgressBar";
import { useNavigate, useLocation } from "react-router-dom";

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
      />
    </svg>
  );
}

function WalletPaymentPage({ pageProps, navigate }) {
  const location = useLocation();
  //var props = location.state.props;
  // var props = {amount:"200"}
  const walletOptionNames = ["PayTm", "Google Wallet", "PhonePe"];
  const walletOptionId = ["wallet_1", "wallet_2", "wallet_3"];
  const walletOptionAudioSelected = [
    "Paytm Wallet, press enter to select",
    "Google Wallet, press enter to select",
    "PhonePay Wallet, press enter to select",
  ];
  const countryOptions = [
    "IN(+91)",
    "US(+1)",
    "GB(+44)",
    "AU(+61)",
    "CA(+1)",
    "DE(+49)",
    "FR(+33)",
    "IT(+39)",
    "JP(+81)",
    "BR(+55)",
  ];
  const phoneInputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const walletOptionImages = [PayTM, GooglePay, PhonePe];

  // navigation
  const [focusedIndex, setFocusedIndex] = useState(1);
  const navigationRefs = Array.from({ length: 6 }, () => useRef(null));

  // const navigate = useNavigate();
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  }, [])
  useEffect(() => {
    console.log("fucused index: ", focusedIndex);
    if (navigationRefs[focusedIndex].current)
      navigationRefs[focusedIndex].current.focus();
    for (let i = 0; i < 6; i++) {
      if (navigationRefs[i].current && i != focusedIndex)
        navigationRefs[i].current.blur();
    }
    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        // enter
        e.preventDefault();
        console.log("enter clicked : focused index ", focusedIndex);
        navigationRefs[focusedIndex].current.click();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [focusedIndex]);
  // useEffect(()=>{
  //   console.log("useEffect")
  //   const handleKeyPress = (e) => {
  //     if (e.keyCode===38){//up
  //       e.preventDefault();
  //       console.log("up")
  //       if (focusedIndex>0){
  //         setFocusedIndex(prevIndex => Math.max(0,prevIndex-1));
  //       }
  //     }
  //     if (e.keyCode===40){//down
  //       e.preventDefault();
  //       console.log("down")
  //       if (focusedIndex<5){
  //         setFocusedIndex(prevIndex => Math.min(prevIndex+1,5));
  //       }
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // },[])
  // console.log("props",props);
  function validate() {
    if (phoneNumber.length < 10) {
      setErrorMessage("Please enter valid phone number!");
      return false;
    } else {
      setErrorMessage("");
    }
    return true;
  }
  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
        console.log("enter key pressed")
        setFocusedIndex(5);
    }
}
  function submitHandler() {
    setFocusedIndex(5);
    if (validate()) {
      console.log(walletOptionNames[selectedOption]);
      console.log(phoneNumber);
      // navigate to next page
      pageProps.walletIndex = selectedOption;
      pageProps.phoneno = "+91" + phoneNumber;
      // navigate("/otp-verification", { state: { props } });
      navigate(3, pageProps);
    } else {
      setFocusedIndex(4);
      //navigationRefs[4].current.focus();
    }
  }
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setPhoneNumber(inputValue);
  };
  const handleBlur = (e) => {
    if (!validate()) {
      e.target.removeAttribute("aria-labelledby");
      e.target.setAttribute("aria-description", "Error in previous field");
    } else {
      e.target.removeAttribute("aria-description");
      e.target.setAttribute("aria-labelledby", "phoneMsg");
    }
  };

  const backButtonClicked = (e) => {
    setFocusedIndex(0);
    console.log("back button clicked");
    // go back

    navigate(0, { amount: pageProps.amount, client: pageProps.client });
  };
  return (
    <div>
      <Header />
      <Card>
        <div className="container relative">
          <div className="backIcon absolute top-0 left-0">
            <button
              className="bg-white border border-white p-[3px]"
              aria-label="Back"
              onClick={backButtonClicked}
              ref={navigationRefs[0]}
              onBlur={(e) => {
                e.target.style.borderColor = "white";
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "gray";
                setFocusedIndex(0);
              }}
            >
              <BackIcon />
            </button>
          </div>

          <div
            aria-hidden="true"
            className="amountPayable mt-2 text-[12px] font-[600]"
          >
            Amount Payable
          </div>
          <div
            aria-hidden="true"
            className="amountInRupees text-[28px] font-inter font-[600]"
          >
            &#8377;{pageProps.amount}
          </div>
          <br />
          <div
            aria-hidden="true"
            className="walletDetails text-[28px] font-[600]"
          >
            Wallet Details
          </div>
          <div className="walletOptionsContainer p-3 text-start">
            <div
              className="chooseWallet text-[12px] font-[700]"
            >
              Choose Wallet
            </div>
            <div className="walletOptions mt-[5px]">
              {walletOptionNames.map((name, idx) => {
                return (
                  <div
                    tabIndex={0}
                    ref={navigationRefs[idx + 1]}
                    id={walletOptionId[idx]}
                    aria-description={walletOptionAudioSelected[idx]}
                    key={idx}
                    onClick={(e) => {
                      setSelectedOption(idx);
                      setFocusedIndex(idx + 1);
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "grey";
                      setFocusedIndex(idx + 1);
                    }}
                    onBlur={(e) => (e.target.style.backgroundColor = "white")}
                    className="walletOption flex justify-between p-[10px] mt-[5px] mb-[5px] text-[10px] font-[600] rounded-[10px] shadow-[3px_3px_3px_rgba(0,0,0,0.1)]"
                  >
                    <div aria-hidden="true">
                      <label className="walletLabel flex justify-center items-center">
                        <img
                          className="walletImage h-[20px] w-[20px] ml-[3px] mr-[3px]"
                          src={walletOptionImages[idx]}
                        />
                        <div>{name}</div>
                      </label>
                    </div>
                    <div
                      aria-hidden="true"
                      className="radioInput flex justify-center items-center"
                    >
                      <input
                        tabIndex={-1}
                        aria-hidden="true"
                        checked={selectedOption == idx}
                        onChange={() => { }}
                        type="radio"
                        name="options"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="tempContainer items-center mt-[30px] mb-[20px]"
          >
            <div className="phoneContainer inline-block" >
              <div aria-hidden="true" className="phoneNumber">
                Phone number
              </div>
              <div
                className="phoneInputContainer inline-flex items-center text-[12px] mt-[2px] mb-[5px]"
              >
                <div
                  aria-hidden="true"
                  className="phoneDropdown p-[4px_6px] font-[500] border border-[#ccc] border-r-0 rounded-tl-[4px] rounded-bl-[4px]"
                >
                  IN(+91)
                </div>
                {/* <select className="phoneDropdown" style={{padding:"4px",border:"1px solid #ccc",borderRight:"none",borderTopLeftRadius:"4px",borderBottomLeftRadius:"4px",fontWeight:"500"}}>
                  {
                    countryOptions.map((code,idx)=>{
                      if (code === "IN(+91)") {
                        return <option value={code} key={idx}>{code}</option>;
                      } else {
                        return <option value={code} key={idx} disabled>{code}</option>;
                      }
                    })
                  }
                </select> */}
                <input
                  onClick={() => setFocusedIndex(4)}
                  onKeyDown={handleKeyDown}
                  ref={navigationRefs[4]}
                  aria-labelledby="phoneMsg"
                  aria-required="true"
                  onBlur={(e) => {
                    handleBlur(e);
                    e.target.setAttribute("placeholder", "Phone Number");
                  }}
                  required
                  maxLength="10"
                  className="phoneInput p-[4px] border border-[#ccc] rounded-tr-[4px] rounded-br-[4px]"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  onFocus={(e) => {
                    e.target.removeAttribute("placeholder");
                    e.target.removeAttribute("aria-description");
                    e.target.setAttribute("aria-labelledby", "phoneMsg");
                    setFocusedIndex(4);
                  }}
                  placeholder="Phone Number"
                />
              </div>

              {errorMessage ? (
                <div
                  id="phoneMsg"
                  aria-hidden="true"
                  className="phoneContext text-danger text-[10px] text-left font-[400]"
                >
                  {errorMessage}
                </div>
              ) : (
                <div
                  id="phoneMsg"
                  aria-hidden="true"
                  className="phoneContext text-left text-[10px] font-[400]"
                >
                  Enter your wallet linked phone number
                </div>
              )}
              <br />
              <br />

              <div
                ref={navigationRefs[5]}
                onClick={submitHandler}
                onFocus={(e) => setFocusedIndex(5)}
                className="linkButtonContainer border-[2px] rounded-[20px] ${focusedIndex === 5 ? 'border-black' : 'border-white'}"
              >
                <Button
                  text="Link Wallet"
                  ariaLabel={`Press enter to link your ${walletOptionNames[selectedOption]} wallet`}
                />
              </div>

              <div
                aria-hidden="true"
                className="circlesContainer items-center justify-center flex mt-[20px]"
              >
                <ProgessBar progress={1} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default WalletPaymentPage;