"use client";

export default function DashboardHeader({ theme, toggleTheme }) {
  return (
    <header className="topbar">
      <div className="tb-l">
        <div className="pgtitle">
          Dashboard <span style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 400 }}>/ Overview</span>
        </div>
        <div className="pgcrumb">Last updated: just now · Uptime 14h 32m 16s</div>
      </div>
      <div className="tb-r">
        <div className="schip">
          <span className="dot dc"></span>
          BOT ACTIVE
        </div>
        <div className="schip">
          <span className="dot dg"></span>
          3 CHAINS
        </div>
        <div className="schip">
          <span className="dot dy"></span>
          34 gwei
        </div>
        <div className="pchip">
          ▲ +$<span id="tp">341.21</span> today
        </div>
        <div className="nbtn">
          🔔
          <span className="nbadge2"></span>
        </div>
        <button 
          onClick={toggleTheme}
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          style={{ fontSize: '18px' }}
        >
          🌙
        </button>
        <button className="bdep">+ Deposit</button>
      </div>
    </header>
  );
}