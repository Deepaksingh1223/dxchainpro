'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        .fp-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf9 0%, #e8f5f1 40%, #f0f7ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }

        .fp-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300b894' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .fp-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid #e2f5ef;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 184, 148, 0.1);
          width: 100%;
          max-width: 440px;
          padding: 40px 32px;
          position: relative;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fp-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00b894, transparent);
          border-radius: 3px;
        }

        .fp-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .fp-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg, #e6faf4, #d0f0e8);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border: 1.5px solid #b8e8d8;
        }

        .fp-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a2e2a;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .fp-title span {
          color: #00b894;
        }

        .fp-sub {
          font-size: 14px;
          color: #7a9e96;
          line-height: 1.5;
        }

        .fp-field {
          margin-bottom: 24px;
        }

        .fp-field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #7a9e96;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .fp-field-wrap {
          position: relative;
        }

        .fp-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #b8cec9;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .fp-input {
          width: 100%;
          padding: 13px 16px 13px 44px;
          background: #f8fffe;
          border: 1.5px solid #e0f0eb;
          border-radius: 14px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          color: #1a2e2a;
          outline: none;
          transition: all 0.2s;
        }

        .fp-input::placeholder {
          color: #c0d8d2;
        }

        .fp-input:focus {
          border-color: #00b894;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(0, 184, 148, 0.08);
        }

        .fp-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #00b894, #00796b);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(0, 184, 148, 0.3);
          transition: all 0.2s;
        }

        .fp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 184, 148, 0.4);
        }

        .fp-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .fp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .fp-back-link {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: #7a9e96;
        }

        .fp-back-link a {
          color: #00b894;
          font-weight: 600;
          text-decoration: none;
        }

        .fp-back-link a:hover {
          text-decoration: underline;
        }

        .fp-success {
          text-align: center;
        }

        .fp-success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e6faf4, #c8f0e2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          border: 2px solid #00b894;
          box-shadow: 0 0 0 10px rgba(0, 184, 148, 0.08);
        }

        .fp-success-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a2e2a;
          margin-bottom: 8px;
        }

        .fp-success-sub {
          font-size: 14px;
          color: #7a9e96;
          line-height: 1.5;
          margin-bottom: 32px;
        }
      `}</style>

      <div className="fp-container">
        <div className="fp-card">
          <div className="fp-glow" />

          {!submitted ? (
            <>
              <div className="fp-header">
                <div className="fp-icon">
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#00b894" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="fp-title">Forgot <span>Password?</span></p>
                <p className="fp-sub">Enter your registered email address and we'll send you a link to reset your password.</p>
              </div>

              <div className="fp-field">
                <label className="fp-field-label">Email Address</label>
                <div className="fp-field-wrap">
                  <span className="fp-field-icon">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="fp-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button className="fp-btn" onClick={handleSubmit} disabled={!email || loading}>
                {loading ? (
                  <>
                    <span className="fp-spinner" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <p className="fp-back-link">
                Remember your password? <Link href="/login">Back to Login</Link>
              </p>
            </>
          ) : (
            <div className="fp-success">
              <div className="fp-success-icon">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#00b894" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="fp-success-title">Check Your Email</p>
              <p className="fp-success-sub">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <button className="fp-btn" onClick={() => setSubmitted(false)} style={{ background: '#fff', color: '#00b894', border: '1.5px solid #00b894', boxShadow: 'none' }}>
                Send to another email
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}