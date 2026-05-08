"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    desc: "Browser extension & mobile",
    popular: true,
    img: "assets/wellet-icon/MetaMask-icon.png",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    desc: "QR code / mobile wallet",
    popular: true,
    img: "assets/wellet-icon/wallet-icon.png",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    desc: "Coinbase app & extension",
    popular: false,
    img: "assets/wellet-icon/coinbase-icon.png",
  },
];

// Country list for dropdown
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "ZA", name: "South Africa" },
];

export default function Register() {
  const [activeTab, setActiveTab] = useState("wallet");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(null);
  const [mmVisible, setMmVisible] = useState(false);
  const [mmState, setMmState] = useState("idle");


  const router = useRouter();

  // NEW: wallet sub-screen state — "main" | "get-wallet" | "qr"
  const [walletScreen, setWalletScreen] = useState("main");
  // NEW: which wallet is showing QR
  const [qrWallet, setQrWallet] = useState(null);
  // NEW: clipboard copy state
  const [copied, setCopied] = useState(false);

  // Form state
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);


  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (value.length < 5) {
      setUsernameError("Username must be at least 5 characters");
      return false;
    } else if (!regex.test(value)) {
      setUsernameError("Letters and numbers only");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const sendVerificationCode = () => {
    if (!email) { alert("Please enter your email first"); return; }
    if (!email.includes("@") || !email.includes(".")) { alert("Please enter a valid email address"); return; }
    setIsCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setIsCodeSent(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    alert(`Verification code sent to ${email}`);
  };

  const handleRegister = () => {
    if (!username || usernameError) { alert("Please enter a valid username (min 5 chars, letters/numbers only)"); return; }
    if (!selectedCountry) { alert("Please select your country"); return; }
    if (!email || !email.includes("@") || !email.includes(".")) { alert("Please enter a valid email address"); return; }
    if (!verificationCode) { alert("Please enter the verification code"); return; }
    if (!password) { alert("Please enter a password"); return; }
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }
    if (password.length < 6) { alert("Password must be at least 6 characters"); return; }
    setIsRegistering(true);
    setTimeout(() => { setIsRegistering(false); alert("Registration successful! Welcome to DexChainPro!"); }, 2000);
  };

  const handleWallet = (id) => {
    if (id === "metamask") {
      setMmVisible(true);
      setMmState("idle");
      return;
    }
    if (id === "walletconnect") {
      // Show QR screen for WalletConnect
      setQrWallet(WALLETS.find((w) => w.id === "walletconnect"));
      setWalletScreen("qr");
      return;
    }
    if (connectingWallet === id) return;
    setConnectingWallet(id);
    setTimeout(() => setConnectingWallet(null), 2500);
  };

  const doConnect = () => {
    setMmState("connecting");
    setTimeout(() => setMmState("connected"), 2200);
  };

  const closeMM = () => {
    setMmVisible(false);
    setMmState("idle");
  };

  const handleCopyClipboard = () => {
    const fakeUri = "wc:a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6@2?relay-protocol=irn&symKey=abc123";
    navigator.clipboard.writeText(fakeUri).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset wallet screen when switching tabs
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setWalletScreen("main");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .dcp-scene {
          min-height: 100vh;
          background:linear-gradient(135deg, #f0fdf930 0%, #e8f5f19e 40%, #ffffff6b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          font-family: 'Inter', sans-serif;
        }
        .dcp-scene::before {
          content: '';
          position: absolute;
          inset: 0; 
          background-image: url("/assets/images/background-auth.jpg");
          pointer-events: none;    
          background-size: cover;
        }
        .dcp-modal {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e2f5ef;
          box-shadow: 0 8px 40px rgba(0,184,148,0.12), 0 2px 12px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 480px;
          overflow-y: auto;
          max-height: 95vh;
          position: relative;
          animation: dcpFadeUp 0.3s ease both;
        }
        .dcp-modal::-webkit-scrollbar { width: 4px; }
        .dcp-modal::-webkit-scrollbar-track { background: #e8f5f0; border-radius: 4px; }
        .dcp-modal::-webkit-scrollbar-thumb { background: #00b894; border-radius: 4px; }
        @keyframes dcpFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dcp-modal-glow {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; height: 1px;
          background: linear-gradient(90deg, transparent, #00b894, transparent);
        }
        .dcp-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 0;
        }
        .dcp-brand { display: flex; align-items: center; gap: 10px; }
        .dcp-brand-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, #00b894, #00796b);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #fff;
          box-shadow: 0 2px 8px rgba(0,184,148,0.35);
        }
        .dcp-brand-name { font-size: 15px; font-weight: 700; color: #1a2e2a; letter-spacing: -0.01em; }
        .dcp-brand-name span { color: #00b894; }
        .dcp-close-btn {
          width: 30px; height: 30px; border-radius: 8px;
          border: 1px solid #e8f0ee; background: #f8fffe;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #90a8a0; transition: all 0.15s;
        }
        .dcp-close-btn:hover { background: #fff; border-color: #00b894; color: #00b894; }
        .dcp-tabs {
          display: flex; gap: 4px; margin: 18px 24px 0;
          background: #f3faf7; border-radius: 12px; padding: 4px;
          border: 1px solid #e0f0eb;
        }
        .dcp-tab {
          flex: 1; padding: 9px 14px; border-radius: 9px; border: none;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;
        }
        .dcp-tab-inactive { background: transparent; color: #8aada5; }
        .dcp-tab-inactive:hover { color: #00b894; background: rgba(0,184,148,0.06); }
        .dcp-tab-active {
          background: #fff; color: #00b894;
          box-shadow: 0 1px 6px rgba(0,184,148,0.18); border: 1px solid #c5e8df;
        }
        .dcp-body { padding: 22px 24px 26px; }
        .dcp-greeting { font-size: 20px; font-weight: 700; color: #1a2e2a; letter-spacing: -0.02em; margin-bottom: 3px; }
        .dcp-greeting span { color: #00b894; }
        .dcp-sub { font-size: 13px; color: #7a9e96; margin-bottom: 20px; }
        .dcp-field { margin-bottom: 13px; }
        .dcp-field-label { display: block; font-size: 11px; font-weight: 600; color: #7a9e96; margin-bottom: 6px; letter-spacing: 0.05em; text-transform: uppercase; }
        .dcp-field-wrap { position: relative; }
        .dcp-field-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #b8cec9; display: flex; align-items: center; pointer-events: none; }
        .dcp-field-input {
          width: 100%; padding: 11px 14px 11px 38px;
          background: #f8fffe; border: 1.5px solid #e0f0eb; border-radius: 11px;
          font-size: 14px; font-family: 'Inter', sans-serif; color: #1a2e2a;
          outline: none; transition: all 0.2s;
        }
        .dcp-field-input::placeholder { color: #c0d8d2; }
        .dcp-field-input:focus { border-color: #00b894; background: #fff; box-shadow: 0 0 0 3px rgba(0,184,148,0.1); }
        .dcp-field-input-error { border-color: #e74c3c !important; }
        .dcp-error-text { font-size: 10px; color: #e74c3c; margin-top: 4px; margin-left: 4px; }
        .dcp-select-input {
          width: 100%; padding: 11px 14px 11px 38px;
          background: #f8fffe; border: 1.5px solid #e0f0eb; border-radius: 11px;
          font-size: 14px; font-family: 'Inter', sans-serif; color: #1a2e2a;
          outline: none; cursor: pointer; appearance: none;
        }
        .dcp-select-input:focus { border-color: #00b894; }
        .dcp-eye-btn {
          position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #b8cec9;
          display: flex; align-items: center; padding: 4px; transition: color 0.15s;
        }
        .dcp-eye-btn:hover { color: #00b894; }
        .dcp-code-row { display: flex; gap: 10px; }
        .dcp-code-row .dcp-field-wrap { flex: 1; }
        .dcp-get-code-btn {
          white-space: nowrap; padding: 0 16px;
          background: linear-gradient(135deg, #00b894, #00796b);
          color: white; border: none; border-radius: 11px;
          font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .dcp-get-code-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,184,148,0.3); }
        .dcp-get-code-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .dcp-row-opt { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .dcp-remember { display: flex; align-items: center; gap: 7px; cursor: pointer; }
        .dcp-remember input { accent-color: #00b894; cursor: pointer; }
        .dcp-remember span { font-size: 12.5px; color: #7a9e96; }
        .dcp-forgot { font-size: 12.5px; color: #00b894; text-decoration: none; font-weight: 500; }
        .dcp-forgot:hover { text-decoration: underline; }
        .dcp-btn-primary {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #00b894, #00796b);
          color: #fff; border: none; border-radius: 12px;
          font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(0,184,148,0.35); transition: all 0.15s; letter-spacing: 0.01em;
        }
        .dcp-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,184,148,0.45); }
        .dcp-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .dcp-divider { display: flex; align-items: center; gap: 10px; margin: 16px 0; color: #aecfc8; font-size: 12px; }
        .dcp-divider::before, .dcp-divider::after { content: ''; flex: 1; height: 1px; background: #e8f5f0; }
        .dcp-btn-wallet-alt {
          width: 100%; padding: 11px; background: #f5fffe;
          border: 1.5px solid #d0ece5; border-radius: 12px;
          font-size: 13.5px; font-family: 'Inter', sans-serif; font-weight: 600; color: #2d5a52;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
          transition: all 0.2s;
        }
        .dcp-btn-wallet-alt:hover { background: #eafaf5; border-color: #00b894; color: #00b894; }
        .dcp-wdot { width: 7px; height: 7px; border-radius: 50%; background: #00b894; box-shadow: 0 0 5px rgba(0,184,148,0.5); }
        .dcp-signup { text-align: center; margin-top: 18px; font-size: 13px; color: #7a9e96; }
        .dcp-signup a { color: #00b894; font-weight: 600; text-decoration: none; margin-left: 4px; }
        .dcp-signup a:hover { text-decoration: underline; }

        /* WALLET PANEL STYLES */
        .dcp-wallet-heading { font-size: 20px; font-weight: 700; color: #1a2e2a; margin-bottom: 3px; }
        .dcp-wallet-sub { font-size: 13px; color: #7a9e96; margin-bottom: 18px; }
        .dcp-wallet-list { display: flex; flex-direction: column; gap: 7px; }
        .dcp-wallet-row {
          overflow: hidden; position: relative;
          display: flex; align-items: center; gap: 13px;
          padding: 12px 14px; background: #f8fffe;
          border: 1.5px solid #e0f0eb; border-radius: 13px;
          cursor: pointer; transition: all 0.2s; width: 100%; text-align: left;
        }
        .dcp-wallet-row:hover { border-color: #00b894; background: #f0fdf9; box-shadow: 0 2px 12px rgba(0,184,148,0.1); }
        .dcp-wallet-row-connecting {
          border-color: #00b894 !important; background: #e8faf4 !important;
          animation: dcpPulse 1.2s ease infinite;
        }
        @keyframes dcpPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,184,148,0); }
          50% { box-shadow: 0 0 0 4px rgba(0,184,148,0.15); }
        }
        .dcp-wallet-img { width: 36px; height: 36px; border-radius: 10px; object-fit: contain; flex-shrink: 0; background: #fff; border: 1px solid #e8f0ee; padding: 3px; }
        .dcp-wallet-info { flex: 1; }
        .dcp-wallet-name { font-size: 14px; font-weight: 600; color: #1a2e2a; display: block; }
        .dcp-wallet-desc { font-size: 12px; color: #7a9e96; display: block; }
        .dcp-badge {
          font-size: 10px; font-weight: 700; padding: 0px 8px; border-radius: 0px;
          background: #e6faf4; color: #00796b; letter-spacing: 0.04em; white-space: nowrap;
          position: absolute; top: 0; right: 0;
        }
        .dcp-w-arrow { color: #c0d8d2; transition: all 0.2s; flex-shrink: 0; }
        .dcp-wallet-row:hover .dcp-w-arrow { color: #00b894; transform: translateX(2px); }
        .dcp-ring { width: 16px; height: 16px; border: 2px solid #c5e8df; border-top-color: #00b894; border-radius: 50%; animation: dcpSpin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes dcpSpin { to { transform: rotate(360deg); } }
        .dcp-tos { text-align: center; margin-top: 16px; font-size: 11.5px; color: #a0bcb6; line-height: 1.5; }
        .dcp-tos a { color: #00b894; text-decoration: none; }
        .dcp-tos a:hover { text-decoration: underline; }

        /* NEW: "I don't have a wallet" row */
        .dcp-no-wallet-row {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 14px; padding: 10px; cursor: pointer;
          font-size: 13px; color: #7a9e96; font-weight: 500;
          border: 1.5px dashed #d8ede7; border-radius: 11px;
          background: #fafffe; transition: all 0.2s;
        }
        .dcp-no-wallet-row:hover { color: #00b894; border-color: #00b894; background: #f0fdf9; }
        .dcp-no-wallet-checkbox {
          width: 16px; height: 16px; border: 1.5px solid #c0d8d2; border-radius: 4px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* NEW: Get a Wallet screen */
        .dcp-get-wallet-screen { animation: dcpFadeUp 0.25s ease both; }
        .dcp-back-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; color: #7a9e96; cursor: pointer;
          background: none; border: none; font-family: 'Inter', sans-serif;
          font-weight: 500; padding: 0; margin-bottom: 16px; transition: color 0.15s;
        }
        .dcp-back-btn:hover { color: #00b894; }
        .dcp-get-wallet-icons {
          position: relative; height: 140px; margin: 10px 0 20px;
          display: flex; align-items: center; justify-content: center;
        }
        .dcp-gw-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(0,184,148,0.08) 0%, transparent 70%);
          border-radius: 16px;
        }
        /* Wavy lines behind icons */
        .dcp-gw-waves {
          position: absolute; inset: 0; overflow: hidden; border-radius: 16px; opacity: 0.3;
        }
        .dcp-gw-icon {
          position: absolute; width: 52px; height: 52px; border-radius: 14px;
          object-fit: contain; background: #fff; padding: 6px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1); border: 1.5px solid #e8f0ee;
        }
        .dcp-gw-icon-main {
          width: 64px; height: 64px; border-radius: 18px;
          position: relative; z-index: 2;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15); border: 2px solid #e8f0ee;
        }
        .dcp-gw-icon-tl { top: 10px; left: 30px; }
        .dcp-gw-icon-tr { top: 10px; right: 30px; }
        .dcp-gw-icon-bl { bottom: 10px; left: 30px; }
        .dcp-gw-icon-br { bottom: 10px; right: 30px; }
        .dcp-get-wallet-title { font-size: 19px; font-weight: 700; color: #1a2e2a; text-align: center; margin-bottom: 8px; }
        .dcp-get-wallet-desc { font-size: 13px; color: #7a9e96; text-align: center; line-height: 1.6; margin-bottom: 20px; }
        .dcp-choose-wallet-btn {
          width: 100%; padding: 13px; background: #fff;
          border: 1.5px solid #e0f0eb; border-radius: 12px;
          font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 600; color: #1a2e2a;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
        }
        .dcp-choose-wallet-btn:hover { border-color: #00b894; background: #f0fdf9; color: #00b894; }

        /* NEW: QR / Scan with Phone screen */
        .dcp-qr-screen { animation: dcpFadeUp 0.25s ease both; }
        .dcp-qr-title { font-size: 18px; font-weight: 700; color: #1a2e2a; text-align: center; margin-bottom: 16px; }
        .dcp-qr-box {
          border: 1.5px solid #e0f0eb; border-radius: 16px; overflow: hidden;
          background: #fff; display: flex; align-items: center; justify-content: center;
          padding: 16px; margin: 0 auto 12px; width: 230px; height: 230px; position: relative;
        }
        .dcp-qr-corner {
          position: absolute; width: 24px; height: 24px;
          border-color: #1a2e2a; border-style: solid; border-radius: 4px;
        }
        .dcp-qr-corner-tl { top: 10px; left: 10px; border-width: 3px 0 0 3px; }
        .dcp-qr-corner-tr { top: 10px; right: 10px; border-width: 3px 3px 0 0; }
        .dcp-qr-corner-bl { bottom: 10px; left: 10px; border-width: 0 0 3px 3px; }
        .dcp-qr-corner-br { bottom: 10px; right: 10px; border-width: 0 3px 3px 0; }
        .dcp-qr-inner {
          width: 100%; height: 100%; border-radius: 8px; overflow: hidden;
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .dcp-qr-svg { width: 170px; height: 170px; }
        .dcp-qr-logo {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 40px; height: 40px; border-radius: 10px;
          object-fit: contain; background: #1b9cf2; padding: 5px;
          border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .dcp-qr-or { text-align: center; font-size: 13px; color: #a0bcb6; margin: 10px 0; }
        .dcp-copy-btn {
          width: 100%; padding: 12px; background: #f8fffe;
          border: 1.5px solid #e0f0eb; border-radius: 12px;
          font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 600; color: #2d5a52;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
        }
        .dcp-copy-btn:hover { border-color: #00b894; background: #f0fdf9; }
        .dcp-copy-btn.copied { background: #e6faf4; border-color: #00b894; color: #00796b; }

        /* Footer */
        .dcp-modal-footer {
          border-top: 1px solid #edf7f3; padding: 11px 24px;
          display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;
        }
        .dcp-footer-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #a0bcb6; font-family: monospace; }
        .dcp-fdot { width: 3px; height: 3px; border-radius: 50%; background: #d0e8e2; }

        /* MetaMask overlay */
        .dcp-mm-overlay {
          position: fixed; inset: 0; background: rgba(0,30,20,0.55);
          backdrop-filter: blur(8px); z-index: 9999;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: dcpOverlayIn 0.2s ease;
        }
        @keyframes dcpOverlayIn { from { opacity: 0; } to { opacity: 1; } }
        .dcp-mm-popup {
          background: #fff; border-radius: 20px; width: 100%; max-width: 360px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,184,148,0.12);
          animation: dcpPopIn 0.28s cubic-bezier(0.22,1,0.36,1) both;
          overflow: hidden; font-family: 'Inter', sans-serif;
        }
        @keyframes dcpPopIn {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .dcp-mm-header {
          background: linear-gradient(135deg, #fff9f0, #fff3e0);
          padding: 24px 20px 20px; text-align: center; border-bottom: 1px solid #ffe8c8;
        }
        .dcp-mm-logo { width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 12px; object-fit: contain; box-shadow: 0 4px 16px rgba(246,133,27,0.25); background: #fff; padding: 6px; border: 1.5px solid #ffe8c8; display: block; }
        .dcp-mm-title { font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
        .dcp-mm-url { font-size: 12px; color: #888; background: #f5f5f5; border-radius: 6px; padding: 4px 10px; display: inline-block; font-family: monospace; }
        .dcp-mm-body { padding: 20px; }
        .dcp-mm-info-row { display: flex; align-items: flex-start; gap: 10px; background: #f8fffe; border: 1px solid #d8f2e9; border-radius: 10px; padding: 12px; margin-bottom: 14px; }
        .dcp-mm-info-icon { width: 22px; height: 22px; border-radius: 6px; background: #00b894; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .dcp-mm-info-text { font-size: 12.5px; color: #2d5a52; line-height: 1.5; }
        .dcp-mm-info-text strong { display: block; font-size: 13px; color: #1a2e2a; margin-bottom: 2px; }
        .dcp-mm-perms { margin-bottom: 18px; }
        .dcp-mm-perms-title { font-size: 11px; font-weight: 600; color: #7a9e96; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; }
        .dcp-mm-perm-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 1px solid #f0f7f4; font-size: 13px; color: #2d5a52; }
        .dcp-mm-perm-row:last-child { border-bottom: none; }
        .dcp-mm-check { width: 16px; height: 16px; border-radius: 50%; background: #e6faf4; border: 1.5px solid #00b894; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dcp-mm-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .dcp-mm-btn-cancel { padding: 11px; border: 1.5px solid #e0f0eb; background: #f8fffe; border-radius: 11px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; color: #7a9e96; cursor: pointer; transition: all 0.15s; }
        .dcp-mm-btn-cancel:hover { border-color: #ccc; color: #555; }
        .dcp-mm-btn-connect { padding: 11px; border: none; background: linear-gradient(135deg, #f6851b, #e2761b); border-radius: 11px; font-size: 14px; font-weight: 700; font-family: 'Inter', sans-serif; color: #fff; cursor: pointer; box-shadow: 0 3px 12px rgba(246,133,27,0.35); transition: all 0.15s; }
        .dcp-mm-btn-connect:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(246,133,27,0.45); }
        .dcp-mm-status { text-align: center; padding: 18px 20px; background: #f5fffe; border-top: 1px solid #e0f5ee; }
        .dcp-mm-status-ring { width: 36px; height: 36px; border: 3px solid #d0ece5; border-top-color: #00b894; border-radius: 50%; animation: dcpSpin 0.8s linear infinite; margin: 0 auto 10px; }
        .dcp-mm-status-text { font-size: 13px; color: #3a8c78; font-weight: 600; }
        .dcp-mm-status-sub { font-size: 12px; color: #7a9e96; margin-top: 3px; }
        .dcp-mm-connected { text-align: center; padding: 24px 20px; }
        .dcp-mm-connected-check { width: 44px; height: 44px; border-radius: 50%; background: #e6faf4; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; border: 2px solid #00b894; }
        .dcp-mm-connected-text { font-size: 15px; font-weight: 700; color: #00796b; }
        .dcp-mm-connected-addr { font-size: 12px; color: #7a9e96; margin: 6px 0 4px; }
        .dcp-mm-connected-net { font-size: 11px; color: #a0bcb6; }
        .dcp-mm-connected-btn { margin-top: 16px; width: 100%; padding: 11px; background: linear-gradient(135deg, #00b894, #00796b); color: #fff; border: none; border-radius: 11px; font-size: 14px; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; box-shadow: 0 3px 12px rgba(0,184,148,0.3); }
      `}</style>

      <div className="dcp-scene">
        <div className="dcp-modal">
          <div className="dcp-modal-glow" />

          {/* Header */}
          <div className="dcp-modal-header">
            <div className="dcp-brand">
              <span className="dcp-brand-name">
                DexChain<span>Pro</span>
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="dcp-tabs">
            <button
              className={`dcp-tab ${activeTab === "wallet" ? "dcp-tab-active" : "dcp-tab-inactive"}`}
              onClick={() => handleTabSwitch("wallet")}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Connect Wallet
            </button>
            <button
              className={`dcp-tab ${activeTab === "register" ? "dcp-tab-active" : "dcp-tab-inactive"}`}
              onClick={() => handleTabSwitch("register")}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </button>
{/* 
                <button
           
              onClick={() =>router.push('/dashboard')}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </button> */}
          </div>

          <div className="dcp-body">
            {/* REGISTER PANEL */}
            {activeTab === "register" && (
              <div>
                <p className="dcp-greeting">
                  Create <span>Account</span>
                </p>
                <p className="dcp-sub">Join DexChainPro to start trading</p>

                {/* Username Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Username</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className={`dcp-field-input ${usernameError ? "dcp-field-input-error" : ""}`}
                      placeholder="Min 5 chars, letters and numbers only"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  {usernameError && <div className="dcp-error-text">{usernameError}</div>}
                </div>

                {/* Country Select */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Country</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <select
                      className="dcp-select-input"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Email</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="dcp-field-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Verification Code */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Verification Code</label>
                  <div className="dcp-code-row">
                    <div className="dcp-field-wrap">
                      <span className="dcp-field-icon">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="dcp-field-input"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                    </div>
                    <button
                      className="dcp-get-code-btn"
                      onClick={sendVerificationCode}
                      disabled={isCodeSent && countdown > 0}
                    >
                      {isCodeSent && countdown > 0 ? `${countdown}s` : "Get Code"}
                    </button>
                  </div>
                </div>

                {/* Password Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Password</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="dcp-field-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button className="dcp-eye-btn" onClick={() => setShowPassword(!showPassword)} type="button">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Confirm Password</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`dcp-field-input ${confirmPasswordError ? "dcp-field-input-error" : ""}`}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <button className="dcp-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  {confirmPasswordError && <div className="dcp-error-text">{confirmPasswordError}</div>}
                </div>

                {/* Referral Code Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Referral Code (Optional)</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="dcp-field-input"
                      placeholder="Enter referral code (optional)"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                  </div>
                </div>

                <button className="dcp-btn-primary" onClick={handleRegister} disabled={isRegistering}>
                  {isRegistering ? (
                    <>
                      <span className="dcp-ring" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Register
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="dcp-divider">or continue with wallet</div>

                <button className="dcp-btn-wallet-alt" onClick={() => handleTabSwitch("wallet")}>
                  <span className="dcp-wdot" />
                  Connect Wallet
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="dcp-signup">
                  Already have an account?
                  <Link href="/forgot">Forgot</Link>
                </p>
              </div>
            )}

            {/* WALLET PANEL */}
            {activeTab === "wallet" && (
              <div>

                {/* ── SCREEN 1: Main wallet list ── */}
                {walletScreen === "main" && (
                  <div>
                    <p className="dcp-wallet-heading">Connect Wallet</p>
                    <p className="dcp-wallet-sub">Choose your preferred Web3 wallet to continue</p>
                    <div className="dcp-wallet-list">
                      {WALLETS.map((w) => (
                        <button
                          key={w.id}
                          className={`dcp-wallet-row ${connectingWallet === w.id ? "dcp-wallet-row-connecting" : ""}`}
                          onClick={() => handleWallet(w.id)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="dcp-wallet-img" src={w.img} alt={w.name} />
                          <span className="dcp-wallet-info">
                            <span className="dcp-wallet-name">{w.name}</span>
                            <span className="dcp-wallet-desc">{w.desc}</span>
                          </span>
                          {w.popular && <span className="dcp-badge">POPULAR</span>}
                          {connectingWallet === w.id ? (
                            <span className="dcp-ring" />
                          ) : (
                            <svg className="dcp-w-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                      ))}

                      {/* Other Wallets row */}
                      <button
                        className="dcp-wallet-row"
                        onClick={() => setWalletScreen("get-wallet")}
                      >
                        {/* <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f3faf7", border: "1px solid #e0f0eb", display: "flex", alignItems: "center", justifyContent: "center", gap: 3, flexShrink: 0, flexWrap: "wrap", padding: 4 }}>
                          {["#1b9cf2","#0052ff","#ff4500","#00b894"].map((c, i) => (
                            <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
                          ))}
                        </div> */}
                        <span className="dcp-wallet-info">
                          <span className="dcp-wallet-name">Other Wallets</span>
                          <span className="dcp-wallet-desc">Browse all supported wallets</span>
                        </span>
                        
                      </button>
                    </div>

                    {/* "I don't have a wallet" */}
                    <button className="dcp-no-wallet-row" onClick={() => setWalletScreen("get-wallet")}>
                      <span className="dcp-no-wallet-checkbox">
                        <svg width="8" height="8" fill="none" viewBox="0 0 10 10">
                          <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="#c0d8d2" strokeWidth="1.5" />
                        </svg>
                      </span>
                      I don't have a wallet
                    </button>

                    <p className="dcp-tos">
                      By connecting, you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>
                    </p>
                  </div>
                )}

                {/* ── SCREEN 2: Get a Wallet ── */}
                {walletScreen === "get-wallet" && (
                  <div className="dcp-get-wallet-screen">
                    <button className="dcp-back-btn" onClick={() => setWalletScreen("main")}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>

                    <div className="dcp-get-wallet-icons">
                      <div className="dcp-gw-bg" />
                      <div className="dcp-gw-waves">
                        <svg width="100%" height="100%" viewBox="0 0 400 140" preserveAspectRatio="none">
                          {[20,40,60,80,100,120].map((y, i) => (
                            <path key={i} d={`M0 ${y} Q100 ${y - 15} 200 ${y} T400 ${y}`} fill="none" stroke="#00b894" strokeWidth="0.8" opacity={0.4 - i * 0.04} />
                          ))}
                        </svg>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="dcp-gw-icon dcp-gw-icon-tl" src="assets/wellet-icon/MetaMask-icon.png" alt="MetaMask" />
                      <div className="dcp-gw-icon dcp-gw-icon-tr" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#e8f0ff", borderColor: "#c8d8ff" }}>
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="dcp-gw-icon dcp-gw-icon-bl" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#fff4f0", borderColor: "#ffd8c8" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C17.5 22.15 21 17.25 21 12V6l-9-4z" fill="#ff6b35" opacity="0.9" />
                          <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="dcp-gw-icon dcp-gw-icon-br" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0ff", borderColor: "#d0d0ff" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#ab9ff2" />
                          <path d="M8 13c.5-2 2-3 4-3s3.5 1 4 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="9.5" cy="11" r="1" fill="#fff" />
                          <circle cx="14.5" cy="11" r="1" fill="#fff" />
                        </svg>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="dcp-gw-icon dcp-gw-icon-main" src="assets/wellet-icon/coinbase-icon.png" alt="Coinbase" style={{ background: "#0052ff", padding: 10 }} />
                    </div>

                    <p className="dcp-get-wallet-title">Start Exploring Web3</p>
                    <p className="dcp-get-wallet-desc">
                      Your wallet is the gateway to all things Ethereum, the magical technology that makes it possible to explore web3.
                    </p>

                    <a href="https://ethereum.org/wallets/find-wallet/" target="_blank" className="dcp-choose-wallet-btn" onClick={() => setWalletScreen("main")}>
                      Choose Your First Wallet
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* ── SCREEN 3: QR / Scan with Phone ── */}
                {walletScreen === "qr" && (
                  <div className="dcp-qr-screen">
                    <button className="dcp-back-btn" onClick={() => setWalletScreen("main")}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>

                    <p className="dcp-qr-title">Scan with Phone</p>

                    <div className="dcp-qr-box">
                      <div className="dcp-qr-corner dcp-qr-corner-tl" />
                      <div className="dcp-qr-corner dcp-qr-corner-tr" />
                      <div className="dcp-qr-corner dcp-qr-corner-bl" />
                      <div className="dcp-qr-corner dcp-qr-corner-br" />
                      <div className="dcp-qr-inner">
                        <svg className="dcp-qr-svg" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="10" width="50" height="50" rx="6" fill="#1a2e2a" />
                          <rect x="18" y="18" width="34" height="34" rx="3" fill="#fff" />
                          <rect x="24" y="24" width="22" height="22" rx="2" fill="#1a2e2a" />
                          <rect x="110" y="10" width="50" height="50" rx="6" fill="#1a2e2a" />
                          <rect x="118" y="18" width="34" height="34" rx="3" fill="#fff" />
                          <rect x="124" y="24" width="22" height="22" rx="2" fill="#1a2e2a" />
                          <rect x="10" y="110" width="50" height="50" rx="6" fill="#1a2e2a" />
                          <rect x="18" y="118" width="34" height="34" rx="3" fill="#fff" />
                          <rect x="24" y="124" width="22" height="22" rx="2" fill="#1a2e2a" />
                          {[
                            [70,10],[80,10],[90,10],[70,20],[90,20],[80,30],[70,40],[90,40],[80,50],[70,60],[80,60],[90,60],
                            [10,70],[20,70],[30,70],[50,70],[60,70],[70,70],[90,70],[100,70],[110,70],[130,70],[140,70],[150,70],[160,70],
                            [10,80],[30,80],[50,80],[70,80],[90,80],[110,80],[130,80],[150,80],
                            [10,90],[20,90],[40,90],[60,90],[80,90],[100,90],[120,90],[140,90],[160,90],
                            [70,100],[80,100],[100,100],[110,100],[120,100],[140,100],[160,100],
                            [70,110],[90,110],[110,110],[130,110],[150,110],
                            [70,120],[80,120],[100,120],[120,120],[140,120],[160,120],
                            [70,130],[90,130],[110,130],[130,130],[150,130],
                            [70,140],[80,140],[100,140],[120,140],[140,140],[160,140],
                            [70,150],[90,150],[110,150],[130,150],[150,150],[160,150],
                          ].map(([x, y], i) => (
                            <rect key={i} x={x} y={y} width="8" height="8" rx="1.5" fill="#1a2e2a" />
                          ))}
                        </svg>
                        <div className="dcp-qr-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M6.1 9.4c3.3-3.2 8.5-3.2 11.8 0l.4.4c.2.2.2.4 0 .6l-1.3 1.3c-.1.1-.3.1-.4 0l-.5-.5c-2.3-2.2-6-2.2-8.3 0l-.6.5c-.1.1-.3.1-.4 0L5.5 10.4c-.2-.2-.2-.4 0-.6l.6-.4zm14.6 2.7l1.2 1.1c.2.2.2.4 0 .6l-5.3 5.1c-.2.2-.5.2-.7 0l-3.7-3.6c-.1-.1-.2-.1-.3 0l-3.7 3.6c-.2.2-.5.2-.7 0L2.2 13.8c-.2-.2-.2-.4 0-.6l1.2-1.1c.2-.2.5-.2.7 0l3.7 3.6c.1.1.2.1.3 0l3.7-3.6c.2-.2.5-.2.7 0l3.7 3.6c.1.1.2.1.3 0l3.7-3.6c.2-.2.5-.2.7 0z" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <p className="dcp-qr-or">or</p>

                    <button
                      className={`dcp-copy-btn ${copied ? "copied" : ""}`}
                      onClick={handleCopyClipboard}
                    >
                      {copied ? (
                        <>
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy to Clipboard
                        </>
                      )}
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Footer */}
          <div className="dcp-modal-footer">
            <span className="dcp-footer-item">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encrypted
            </span>
            <span className="dcp-fdot" />
            <span className="dcp-footer-item">Non-Custodial</span>
            <span className="dcp-fdot" />
            <span className="dcp-footer-item">FinCEN MSB</span>
          </div>
        </div>
      </div>

      {/* MetaMask Popup */}
      {mmVisible && (
        <div
          className="dcp-mm-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeMM(); }}
        >
          <div className="dcp-mm-popup">
            <div className="dcp-mm-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="dcp-mm-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="MetaMask"
              />
              <div className="dcp-mm-title">MetaMask wants to connect</div>
              <span className="dcp-mm-url">dex-chain-pro.vercel.app</span>
            </div>

            {mmState === "idle" && (
              <div className="dcp-mm-body">
                <div className="dcp-mm-info-row">
                  <div className="dcp-mm-info-icon">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="dcp-mm-info-text">
                    <strong>DexChainPro is requesting access</strong>
                    This site wants to connect to your MetaMask wallet and view your account address.
                  </div>
                </div>
                <div className="dcp-mm-perms">
                  <div className="dcp-mm-perms-title">Permissions requested</div>
                  {["View your wallet address", "View account balance & activity", "Request transaction approval"].map((perm) => (
                    <div className="dcp-mm-perm-row" key={perm}>
                      <span className="dcp-mm-check">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 5-5" stroke="#00b894" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {perm}
                    </div>
                  ))}
                </div>
                <div className="dcp-mm-btns">
                  <button className="dcp-mm-btn-cancel" onClick={closeMM}>Cancel</button>
                  <button className="dcp-mm-btn-connect" onClick={doConnect}>Connect</button>
                </div>
              </div>
            )}

            {mmState === "connecting" && (
              <div className="dcp-mm-status">
                <div className="dcp-mm-status-ring" />
                <div className="dcp-mm-status-text">Connecting to MetaMask...</div>
                <div className="dcp-mm-status-sub">Please approve in your MetaMask extension</div>
              </div>
            )}

            {mmState === "connected" && (
              <div className="dcp-mm-connected">
                <div className="dcp-mm-connected-check">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00b894" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="dcp-mm-connected-text">Wallet Connected!</div>
                <div className="dcp-mm-connected-addr">0x742d...4a2F</div>
                <div className="dcp-mm-connected-net">MetaMask · Ethereum Mainnet</div>
                <button className="dcp-mm-connected-btn" onClick={closeMM}>
                  Continue to Dashboard →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}