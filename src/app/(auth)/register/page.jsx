'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  // Form state
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '', referral: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const strength = (() => {
    const pw = form.password;
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  })();
  const strengthColor = ['', '#FC3737', '#f6851b', '#f0c040', '#00b894'][strength];
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  const isFormValid = form.fullName && form.email && form.password &&
    form.password === form.confirm && agreed && strength >= 2;

  const handleRegister = () => {
    if (!isFormValid) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rg-scene {
          min-height: 100vh;
        background:linear-gradient(135deg, #f0fdf930 0%, #e8f5f19e 40%, #ffffff6b 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; position: relative;
          font-family: 'Inter', sans-serif;
        }
        .rg-scene::before {
          content: ''; position: absolute; inset: 0;   
            background-image: url("/assets/images/background-auth.jpg");
          pointer-events: none;    
          background-size: cover;
        }

        .rg-modal {
          background: #fff; border-radius: 20px;
          border: 1px solid #e2f5ef;
          box-shadow: 0 8px 40px rgba(0,184,148,0.12), 0 2px 12px rgba(0,0,0,0.06);
          width: 100%; max-width: 460px; overflow: hidden; position: relative;
          animation: rgFadeUp 0.3s ease both;
        }
        @keyframes rgFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rg-glow {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 70%; height: 1px;
          background: linear-gradient(90deg, transparent, #00b894, transparent);
        }

        /* Header */
        .rg-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 0;
        }
        .rg-brand { display: flex; align-items: center; gap: 10px; }
        .rg-brand-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, #00b894, #00796b);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #fff;
          box-shadow: 0 2px 8px rgba(0,184,148,0.35);
        }
        .rg-brand-name { font-size: 15px; font-weight: 700; color: #1a2e2a; letter-spacing: -0.01em; }
        .rg-brand-name span { color: #00b894; }

        /* Body */
        .rg-body { padding: 22px 24px 26px; }
        .rg-title { font-size: 20px; font-weight: 700; color: #1a2e2a; letter-spacing: -0.02em; margin-bottom: 3px; }
        .rg-title span { color: #00b894; }
        .rg-sub { font-size: 13px; color: #7a9e96; margin-bottom: 20px; }

        /* Field */
        .rg-field { margin-bottom: 13px; }
        .rg-field-label {
          display: block; font-size: 11px; font-weight: 600; color: #7a9e96;
          margin-bottom: 6px; letter-spacing: 0.05em; text-transform: uppercase;
        }
        .rg-field-wrap { position: relative; }
        .rg-field-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #b8cec9; display: flex; align-items: center; pointer-events: none;
        }
        .rg-field-input {
          width: 100%; padding: 11px 14px 11px 38px;
          background: #f8fffe; border: 1.5px solid #e0f0eb;
          border-radius: 11px; font-size: 14px;
          font-family: 'Inter', sans-serif; color: #1a2e2a;
          outline: none; transition: all 0.2s;
        }
        .rg-field-input::placeholder { color: #c0d8d2; }
        .rg-field-input:focus { border-color: #00b894; background: #fff; box-shadow: 0 0 0 3px rgba(0,184,148,0.1); }
        .rg-field-input.error { border-color: #FC3737; }
        .rg-eye-btn {
          position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #b8cec9; padding: 4px; display: flex;
          align-items: center; transition: color 0.15s;
        }
        .rg-eye-btn:hover { color: #00b894; }

        /* Referral optional */
        .rg-optional-badge {
          display: inline-block; font-size: 10px; font-weight: 600;
          color: #7a9e96; background: #f0f7f4;
          padding: 1px 7px; border-radius: 5px;
          border: 1px solid #e0f0eb; margin-left: 6px;
          vertical-align: middle; letter-spacing: 0.03em;
        }

        /* Strength */
        .rg-strength-row { display: flex; gap: 4px; margin: 6px 0 4px; }
        .rg-strength-bar { flex: 1; height: 3px; border-radius: 2px; background: #e0f0eb; transition: background 0.3s; }
        .rg-strength-label { font-size: 11px; margin-bottom: 10px; }

        /* Agree */
        .rg-agree {
          display: flex; align-items: flex-start; gap: 9px;
          margin-bottom: 18px; cursor: pointer;
        }
        .rg-agree input { accent-color: #00b894; margin-top: 2px; cursor: pointer; flex-shrink: 0; }
        .rg-agree-text { font-size: 12.5px; color: #7a9e96; line-height: 1.5; }
        .rg-agree-text a { color: #00b894; text-decoration: none; font-weight: 600; }
        .rg-agree-text a:hover { text-decoration: underline; }

        /* Buttons */
        .rg-btn-primary {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #00b894, #00796b);
          color: #fff; border: none; border-radius: 12px;
          font-size: 14px; font-family: 'Inter', sans-serif;
          font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(0,184,148,0.35);
          transition: all 0.15s; letter-spacing: 0.01em;
        }
        .rg-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,184,148,0.45); }
        .rg-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Spinner */
        .rg-spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: rgSpin 0.7s linear infinite; display: inline-block; }
        @keyframes rgSpin { to { transform: rotate(360deg); } }

        /* Signin */
        .rg-signin { text-align: center; margin-top: 16px; font-size: 13px; color: #7a9e96; }
        .rg-signin a { color: #00b894; font-weight: 600; text-decoration: none; margin-left: 4px; }
        .rg-signin a:hover { text-decoration: underline; }

        /* Footer */
        .rg-footer {
          border-top: 1px solid #edf7f3; padding: 11px 24px;
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
        }
        .rg-footer-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #a0bcb6; font-family: monospace; }
        .rg-fdot { width: 3px; height: 3px; border-radius: 50%; background: #d0e8e2; }

        @media (max-width: 500px) {
          .rg-modal { border-radius: 16px; }
          .rg-body { padding: 18px 16px 22px; }
            .rg-header{flex-wrap: wrap;
          }
        }
        
      `}</style>

      <div className="rg-scene">
        <div className="rg-modal">
          <div className="rg-glow" />

          {/* Header */}
          <div className="rg-header">
            <div className="rg-brand"> 
              <span className="rg-brand-name">DexChain<span>Pro</span></span>
            </div>
            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#7a9e96', textDecoration: 'none', fontWeight: 500 }}>
              Already have account?&nbsp;<span style={{ color: '#00b894', fontWeight: 600 }}>Sign In</span>
            </Link>
          </div>

          <div className="rg-body">
            <div>
              <p className="rg-title">Create <span>Account</span></p>
              <p className="rg-sub">Join DexChainPro — the intelligent DeFi arbitrage platform.</p>

              {/* Full Name */}
              <div className="rg-field">
                <label className="rg-field-label">Full Name</label>
                <div className="rg-field-wrap">
                  <span className="rg-field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input type="text" className="rg-field-input" placeholder="John Doe" value={form.fullName} onChange={set('fullName')} />
                </div>
              </div>

              {/* Email */}
              <div className="rg-field">
                <label className="rg-field-label">Email Address</label>
                <div className="rg-field-wrap">
                  <span className="rg-field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input type="email" className="rg-field-input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                </div>
              </div>

              {/* Password */}
              <div className="rg-field">
                <label className="rg-field-label">Password</label>
                <div className="rg-field-wrap">
                  <span className="rg-field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="rg-field-input"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={set('password')}
                  />
                  <button className="rg-eye-btn" onClick={() => setShowPw(!showPw)} type="button">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                </div>
                {form.password && (
                  <>
                    <div className="rg-strength-row">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="rg-strength-bar" style={{ background: n <= strength ? strengthColor : '#e0f0eb' }} />
                      ))}
                    </div>
                    <p className="rg-strength-label" style={{ color: strengthColor }}>
                      Password strength: {strengthLabel}
                    </p>
                  </>
                )}
              </div>

              {/* Confirm Password */}
              <div className="rg-field">
                <label className="rg-field-label">Confirm Password</label>
                <div className="rg-field-wrap">
                  <span className="rg-field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className={`rg-field-input${form.confirm && form.confirm !== form.password ? ' error' : ''}`}
                    placeholder="Re-enter password"
                    value={form.confirm}
                    onChange={set('confirm')}
                  />
                  <button className="rg-eye-btn" onClick={() => setShowConfirm(!showConfirm)} type="button">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p style={{ fontSize: 12, color: '#FC3737', marginTop: 5 }}>Passwords do not match</p>
                )}
              </div>

              {/* Referral (Optional) */}
              <div className="rg-field">
                <label className="rg-field-label">
                  Referral Code
                  <span className="rg-optional-badge">OPTIONAL</span>
                </label>
                <div className="rg-field-wrap">
                  <span className="rg-field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </span>
                  <input type="text" className="rg-field-input" placeholder="Enter referral code" value={form.referral} onChange={set('referral')} />
                </div>
              </div>

              {/* Agree */}
              <label className="rg-agree">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span className="rg-agree-text">
                  I agree to the{' '}
                  <a href="#">Terms of Service</a>,{' '}
                  <a href="#">Privacy Policy</a>, and confirm I am 18+ years old.
                </span>
              </label>

              <button className="rg-btn-primary" onClick={handleRegister} disabled={!isFormValid || loading}>
                {loading
                  ? <><span className="rg-spinner" /> Creating Account...</>
                  : <>Create Account <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                }
              </button>

              <p className="rg-signin">
                Already have an account?<Link href="/login">Sign In</Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="rg-footer">
            <span className="rg-footer-item">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              SSL Encrypted
            </span>
            <span className="rg-fdot" />
            <span className="rg-footer-item">Non-Custodial</span>
            <span className="rg-fdot" />
            <span className="rg-footer-item">FinCEN MSB</span>
          </div>
        </div>
      </div>
    </>
  );
}