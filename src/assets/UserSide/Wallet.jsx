import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Wallet.css";
import LoaderToast from "./LoaderToast";
import { useWallet } from "./WalletContext";
import { TiBackspace } from "react-icons/ti";
import { GiWallet } from "react-icons/gi";
import axios from "axios";
import api from "../ApiServices/Api";
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
  const [showAlert, setshowAlert] = useState(false);
  const [showAmount, setshowAmount] = useState(false);
  const [wltDetail, setwltDetail] = useState({});
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
  const getwalletData = async () => {
    try {
      const { data } =await api.get("/wallet");
      setwltDetail(data);
      setBalance(data.balance[0].balance);
      if (data.balance[0].bank_last_4 === null) setHasEnteredAccDigits(false);
    } catch (err) {
      console.log("Error fetching wallet:", err);
    }
  };
  useEffect(() => {
    getwalletData();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const accNumberHandleChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
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
  const accNumberHandleSubmit = async () => {
    try {
            await api.get("/wallet/bank",{bank_last_4:Number(accNumberDigits.join(""))})
    } catch (error) {
      console.log(error);
    }
    setWlMessage(`Your Bank Account No.${Number(accNumberDigits.join(""))} is Connected to TradeNexus `)
    setWlMessageType("success")
    setshowAlert(true)
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
              const {data} = await api.post("/wallet/deposit",{wlValue:Number(wlValue)})

        setBalance(Number(data.balance));
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
               const {data} = await api.post("/wallet/withdraw",{wlValue:Number(wlValue)})
        setWlMessage(
          `₹${wlValue} withdrawal request submitted. Awaiting admin approval.`,
        );
        setWlMessageType("success");
        setWlValue("");
      }
    } else {
      alert("error");
    }
    getwalletData();
    setshowAlert(true);
    setshowAmount(false);
  };
  const typeColors = {
    deposit: "green",
    withdraw: "red",
    adjustment: "purple",
    commission_withdraw: "yellow",
  };
  return (
    <div className="wl-page">
      {!hasEnteredAccDigits ? (
        <div className="wl-center">
          <div className="wl-card wl-main-card">
              <div className="wl-icon">💼</div>
            <h2>Add Bank Details</h2>
            <p className="wl-sub">Enter last 4 digits</p>
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
        </div>
      ) : (
        <>
          <div className="wl-center">
            <div className="wl-card">
              <div className="wl-icon-main"><GiWallet className="wl-icons"/></div>
              <h2>Wallet</h2>
              <p className="wl-sub">Secure Wallet Section</p>
              <div className="wl-balance">
                <h1>${Number(balance).toLocaleString()}</h1>
              </div>
              <div className="wl-toggle">
                <button
                  className={wlMode === "deposit" ? "active deposit-btn" : "deposit-btn"}
                  onClick={() => {
                    setshowAmount(true);
                    setWlMode("deposit");
                    setWlMessage("");
                  }}
                >
                  Deposit
                </button>

                <button
                  className={wlMode === "withdraw" ? "active withdraw-btn" : "withdraw-btn"}
                  onClick={() => {
                    setshowAmount(true);
                    setWlMode("withdraw");
                    setWlMessage("");
                  }}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          <div className="wl-stats-wrapper">
          <div className="wl-stats-row">
            <div className="wl-stat-card wl-deposit">
              <p>Total Deposited</p>
              <h3>{wltDetail?.totalDeposited?.[0]?.totalDeposited || 0}</h3>
            </div>

            <div className="wl-stat-card wl-withdraw">
              <p>Total Withdrawn</p>
              <h3>{wltDetail?.totalWithdrawn?.[0]?.totalWithdrawn || 0}</h3>
            </div>

            <div className="wl-stat-card wl-pending">
              <p>Pending Withdraw</p>
              <h3>
                {wltDetail?.totalWithdrawnPending?.[0]?.totalWithdrawnPending ||
                  0}
              </h3>
            </div>

            <div className="wl-stat-card wl-commission">
              <p>Commission</p>
              <h3>
                {wltDetail?.totalCommissionGiven?.[0]?.totalCommissionGiven ||
                  0}
              </h3>
            </div>
          </div>
          </div>
          {showAmount && (
            <div className="wl-overlay">
              <div className="wl-modal">
                <button
                  className="wl-close"
                  onClick={() => {setshowAmount(false);setWlValue("")}}
                >
                  ✕
                </button>
                <div className="wl-ds-nums">{wlValue || "0"}</div>
                <div className="wl-nums">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <button key={n} onClick={() => addDigit(n)}>
                      {n}
                    </button>
                  ))}
                  <button className="clear" onClick={() => setWlValue("")}>
                    AC
                  </button>
                  <button onClick={() => addDigit(0)}>0</button>
                  <button onClick={removeLast}>
                    <TiBackspace />
                  </button>
                </div>
                <button className="submit" onClick={submit}>
                  Submit
                </button>
              </div>
            </div>
          )}

          <div className="wl-transactions">
            <div className="wl-trans-title">Recent Transactions</div>
            <div className="wl-transaction header">
              <p>#</p>
              <p>Type</p>
              <p>Amount</p>
              <p>Status</p>
              <p>Date</p>
            </div>
            {wltDetail?.lastTransactions?.map((item, index) => (
              <div key={index} className="wl-transaction">
                <p>{item.id}</p>
                <strong className={typeColors[item.type] || "default"}>
                  {item.type}
                </strong>
                <p>${item.amount}</p>
                <span className={`status ${item.status}`}>{item.status}</span>
                <small>
                  {new Date(item.created_at).toLocaleString("en-IN")}
                </small>
              </div>
            ))}
          </div>
        </>
      )}

      {showAlert && (
        <LoaderToast
          message={wlMessage}
          type={wlMessageType}
          shape={"circle"}
          onClose={() => setshowAlert(false)}
        />
      )}
    </div>
  );
};

export default Wallet;
