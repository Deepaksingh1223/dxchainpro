"use client";

export default function DashboardSidebar() {
  return (
    <div className="topbar">
      <div className="tb-title" id="tbTitle">Dashboard <span>/ Overview</span></div>
      <div className="chain-row">
        <div className="chip on"><div className="chip-dot" style={{ background: "#9945ff" }}></div>SOL</div>
        <div className="chip"><div className="chip-dot" style={{ background: "#627eea" }}></div>ETH</div>
        <div className="chip"><div className="chip-dot" style={{ background: "#f3ba2f" }}></div>BSC</div>
      </div>
      <div className="gas-p" id="gasP">⛽ 28 gwei</div>
      <button className="inv-btn" onClick={() => { const el = document.getElementById("refOv"); if (el) el.style.display = "flex"; }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="5" r="2.5" />
          <circle cx="5" cy="7" r="2" />
          <path d="M1 14c0-2.2 1.8-4 4-4s4 1.8 4 4" strokeLinecap="round" />
          <path d="M10 9c1.7.3 3 1.8 3 3.5" strokeLinecap="round" />
        </svg>
        Invite &amp; Earn
      </button>
      <button className="btn btn-g2" style={{ fontSize: "11.5px", padding: "5px 13px" }} onClick={() => console.log("wallet")}>+ Deposit</button>
      <div className="av" onClick={() => console.log("profile")}>A</div>
    </div>
  );
}