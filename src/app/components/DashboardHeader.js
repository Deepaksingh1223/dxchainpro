"use client";

export default function DashboardHeader() {
  return (
    <aside className="sb">
      <div className="sb-glow"></div>
      <div className="sb-logo">
        <div className="gem">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#fff" />
          </svg>
        </div>
        <span className="wm">Arb<em>ion</em>.ai</span>
        <span className="pro-badge">PRO</span>
      </div>
      <nav className="sb-nav">
        <div className="ng">Platform</div>
        <a href="/index.html" className="ni on">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
          <span>Dashboard</span>
        </a>
        <a href="/engine.html" className="ni">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="8" cy="8" r="2.5" />
            <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.5 3.5l1 1M11.5 11.5l1 1M11.5 3.5l-1 1M4.5 11.5l-1 1" strokeLinecap="round" />
          </svg>
          <span>Arb Engine</span>
          <div className="ni-live"></div>
        </a>
        <a href="/analytics.html" className="ni">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="1,13 5,8 8,10.5 11,6 15,9" />
          </svg>
          <span>Analytics</span>
        </a>
        <a href="/simulate.html" className="ni">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="2" y="3" width="5" height="5" rx="1" />
            <rect x="9" y="8" width="5" height="5" rx="1" />
            <path d="M7 5.5h2M5 11h4" strokeLinecap="round" />
          </svg>
          <span>Simulate</span>
          <span className="ni-badge">Beta</span>
        </a>
        <div className="ng">Finance</div>
        <a href="/wallet.html" className="ni">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="1" y="4" width="14" height="9" rx="1.5" />
            <path d="M10 8.5h2.5M1 7h14" strokeLinecap="round" />
          </svg>
          <span>Wallet</span>
        </a>
        <a href="/community.html" className="ni">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5.5" cy="5" r="2.5" />
            <circle cx="11" cy="5.5" r="2" />
            <path d="M1 14c0-2.5 2-4.5 4.5-4.5S10 11.5 10 14" />
            <path d="M12.5 9.5c1.4.4 2.5 1.7 2.5 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </svg>
          <span>Community</span>
        </a>
        <div className="ng">Account</div>
        <a href="/profile.html" className="ni">
          <svg className="ni-ic" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="5.5" r="3" />
            <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" opacity=".8" />
          </svg>
          <span>Profile</span>
        </a>
      </nav>
      <div className="sb-bot">
        <div className="sb-bot-row">
          <div className="pulse"></div>
          <span className="sb-bot-lbl" id="sbBotLbl">ENGINE LIVE</span>
        </div>
        <div className="sb-bot-up" id="upEl">↑ 14h 32m 07s</div>
      </div>
    </aside>
  );
}