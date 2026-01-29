import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Wallet.css";
import { useWallet } from "./WalletContext";
import { TiBackspace } from "react-icons/ti";
import axios from "axios";
const Wallet = () => {
  // add 20Rupees withdrawal fees on every withdrawal
  const { balance, setBalance } = useWallet();
  const [accNumberDigits, setAccNumberDigits] = useState(["", "", "", ""]);
  const accNumberRefs = useRef([]);
  const [wlMode, setWlMode] = useState("deposit");
  const [wlValue, setWlValue] = useState("");
  const [hasEnteredAccDigits, setHasEnteredAccDigits] = useState(true);
  const [wlMessage, setWlMessage] = useState("");
  const [wlMessageType, setWlMessageType] = useState("");
  const [transactions, setTransactions] = useState([])
  // Check localStorage on load
  useEffect(() => {
    const getwalletData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/wallet", {
          withCredentials: true,
        });
        console.log(data);
        setBalance(data.balance);
        if (data.bank_last_4 === null) setHasEnteredAccDigits(false);
      } catch (err) {
        console.log("Error fetching wallet:", err);
      }
    };
    getwalletData();
    const getallTransaction = async()=>{
      try {
        const {data} = await axios.get("http://localhost:5000/wallet/transactions", {
          withCredentials: true,
        })
        console.log(data);
        setTransactions(data)
      } catch (error) {
        console.log(error);
      }
    }
    getallTransaction()
    const handleKey = (e) => {
      if (e.target.tagName === "INPUT") return;

      if (e.key >= "0" && e.key <= "9") {
        setWlValue((p) => p + e.key);
      }
      if (e.key === "Backspace") {
        setWlValue((p) => p.slice(0, -1));
      }
      if (e.key === "Escape") {
        setWlValue("");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const accNumberHandleChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      // allow only 1 digit
      const newDigits = [...accNumberDigits];
      newDigits[index] = val;
      setAccNumberDigits(newDigits);
      if (val && index < 3) {
        accNumberRefs.current[index + 1].focus();
      }
    }
  };

  const accNumberHandleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !accNumberDigits[index] && index > 0) {
      accNumberRefs.current[index - 1].focus();
    }
  };

  const accNumberGetValue = () => accNumberDigits.join("");

  const accNumberHandleSubmit = async () => {
    // alert("Entered last 4 digits: " + Number(accNumberGetValue()));
    try {
      const data = await axios.post(
        "http://localhost:5000/wallet/bank",
        { bank_last_4: Number(accNumberDigits.join("")) },
        { withCredentials: true },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setAccNumberDigits(["", "", "", ""]);
    setHasEnteredAccDigits(true);
  };

  const addDigit = (d) => setWlValue((p) => p + d);
  const removeLast = () => setWlValue((p) => p.slice(0, -1));
  const submit = async () => {
    if (wlMode == "deposit") {
      if (wlValue < 10 || wlValue > 10_00_000) {
        setWlMessage("Deposit amount must be between $10 and $10,00,000.");
        setWlMessageType("error");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/wallet/deposit",
          { wlValue: Number(wlValue) },
          { withCredentials: true },
        );
        setBalance(Number(data.balance));
        // console.log(data, typeof data.balance);
        // deposit(Number(wlValue));
        setWlMessage(
          `$${wlValue} has been successfully deposited to your wallet.`,
        );
        setWlMessageType("success");
        setWlValue("");
      }
    } else if (wlMode == "withdraw") {
      if (wlValue < 100) {
        setWlMessage("Minimum withdraw limit is 100$");
        setWlMessageType("error");
      } else if (Number(wlValue) > Number(balance)) {
        setWlMessage("Insufficient wallet balance for this withdrawal.");
        setWlMessageType("error");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/wallet/withdraw",
          { wlValue: Number(wlValue) },
          { withCredentials: true },
        );
        console.log(data);
        // setBalance(Number(data.balance));
        // withdraw(Number(wlValue));
        setWlMessage(
          `₹${wlValue} withdrawal request submitted. Awaiting admin approval.`,
        );
        setWlMessageType("success");
        setWlValue("");
      }
    } else {
      alert("error");
    }
  };
  return (
    <>
    
    <div className="wl-link">
      <div className="wl-header">
        <h2 className="wl-title">Welcome to Your Wallet</h2>
        <p className="wl-subtitle">Secure Wallet Section</p>
        <p className="wl-info">
          Track balances, manage inputs, and stay in control
        </p>
        <span className="wl-badge">Fast • Secure • Reliable</span>
      </div>
      {wlMessage && (
        <div
          className={`wl-message ${
            wlMessageType === "error" ? "wl-error" : "wl-success"
          }`}
        >
          {wlMessage}
        </div>
      )}
      {!hasEnteredAccDigits && (
        <>
          <div className="wl-id">Enter Last 4 digits of your Bank Account</div>
          <div className="wl-container">
            <div className="wl-input-container">
              {accNumberDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => accNumberHandleChange(e, idx)}
                  onKeyDown={(e) => accNumberHandleKeyDown(e, idx)}
                  ref={(el) => (accNumberRefs.current[idx] = el)}
                  className="wl-digit-input"
                />
              ))}
            </div>
            <button onClick={accNumberHandleSubmit} className="wl-submit-btn">
              Submit
            </button>
          </div>
        </>
      )}
      {hasEnteredAccDigits && (
        <>
          <div className="wl-total">{Number(balance)}</div>
          <div className="wl-toggle">
            <button
              className={`wl-toggle-btn ${
                wlMode === "deposit" ? "wl-active" : ""
              }`}
              onClick={() => {
                setWlMode("deposit");
                setWlMessage("");
              }}
            >
              Deposit
            </button>
            <button
              className={`wl-toggle-btn ${
                wlMode === "withdraw" ? "wl-active" : ""
              }`}
              onClick={() => {
                setWlMode("withdraw");
                setWlMessage("");
              }}
            >
              Withdraw
            </button>
          </div>
          <div className="wl-add-nums">
            <div className="wl-ds-nums">{wlValue}</div>

            <div className="wl-nums">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  className="wl-num-btn"
                  onClick={() => addDigit(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="wl-num-btn wl-clear"
                onClick={() => setWlValue("")}
              >
                AC
              </button>

              <button className="wl-num-btn" onClick={() => addDigit(0)}>
                0
              </button>

              <button className="wl-num-btn wl-back" onClick={removeLast}>
                <TiBackspace />
              </button>
            </div>

            <button className="wl-nums-btn" onClick={submit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
            <div className="wl-trns">
              {transactions.map((item)=>(
                <>
                <div className="show">{item.type}</div>
                <div className="show">{item.amount}</div>
                <div className="show">{item.status}</div>
                </>
              ))}
            </div>
    </>
  );
};

export default Wallet;