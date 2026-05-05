"use client";

export default function ArbionEngine() {
  const copyRef2 = () => {
    const refLink = "https://arbion.ai/ref/ARB-a9x7k2";
    navigator.clipboard.writeText(refLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <>
      <div className="ws">
        <div className="ws-av">A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700 }} id="greetEl">
            Good morning, arbion123 ☀️
          </div>
          <div style={{ fontSize: "10px", color: "var(--t3)" }}>
            Last login: Today 09:14 AM · 0x8b5…cf6A · IP 192.168.x.x
          </div>
        </div>
        <div className="ws-pills">
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--g)", boxShadow: "0 0 4px var(--g)" }}></div>
            <span style={{ color: "var(--t3)" }}>Bot</span>
            <span style={{ color: "var(--g)" }} id="wsBotPill">ACTIVE</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--pb)" }}></div>
            <span style={{ color: "var(--t3)" }}>Today</span>
            <span style={{ color: "var(--pb)" }} id="wsPnl">+$341.20</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--a)" }}></div>
            <span style={{ color: "var(--t3)" }}>Uptime</span>
            <span style={{ color: "var(--a)" }} id="wsUp">14h 32m</span>
          </div>
        </div>
      </div>

      <div id="p-community" className="page">
        <div className="g4">
          <div className="card">
            <div className="ml">Direct Referrals</div>
            <div className="mv" style={{ color: "var(--c)" }}>12</div>
            <div className="mc nu">L1 team</div>
          </div>
          <div className="card">
            <div className="ml">Commission</div>
            <div className="mv" style={{ color: "var(--g)" }}>$841</div>
            <div className="mc up">▲ +$64 today</div>
          </div>
          <div className="card">
            <div className="ml">Team Volume</div>
            <div className="mv">$92k</div>
            <div className="mc up">▲ +$8.2k</div>
          </div>
          <div className="card">
            <div className="ml">Network Rank</div>
            <div className="mv" style={{ color: "var(--a)" }}>#47</div>
            <div className="mc wa">Gold tier</div>
          </div>
        </div>

        <div className="g21">
          <div className="card">
            <div className="sh">
              <div className="st">Community Tree</div>
            </div>
            <div id="cTree" style={{ display: "flex", flexDirection: "column", gap: "7px" }}></div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="card">
              <div className="st" style={{ marginBottom: "10px" }}>Your Referral Link</div>
              <div className="ref-link">https://arbion.ai/ref/ARB-a9x7k2</div>
              <button className="copy-btn" id="copyRefBtn2" onClick={copyRef2}>
                📋 Copy Link
              </button>
              <div className="alert al-s">
                Earn up to 8% on referred profits · 3-level deep
              </div>
            </div>

            <div className="card">
              <div className="st" style={{ marginBottom: "10px" }}>Commission Tiers</div>
              <table className="tbl" style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Rate</th>
                    <th>Volume</th>
                    <th>Earned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="tag tg">L1</span></td>
                    <td>8%</td>
                    <td style={{ color: "var(--t1)" }}>$62,400</td>
                    <td style={{ color: "var(--g)" }}>$499</td>
                  </tr>
                  <tr>
                    <td><span className="tag tc">L2</span></td>
                    <td>5%</td>
                    <td style={{ color: "var(--t1)" }}>$28,000</td>
                    <td style={{ color: "var(--g)" }}>$140</td>
                  </tr>
                  <tr>
                    <td><span className="tag tp">L3</span></td>
                    <td>3%</td>
                    <td style={{ color: "var(--t1)" }}>$6,600</td>
                    <td style={{ color: "var(--g)" }}>$198</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="st" style={{ marginBottom: "8px" }}>Rank Progress</div>
              <div className="pb-w">
                <div className="pb-h">
                  <span>Gold → Platinum</span>
                  <span style={{ color: "var(--a)", fontFamily: "var(--mono)" }}>67%</span>
                </div>
                <div className="pb-t">
                  <div className="pb-f" style={{ width: "67%", background: "linear-gradient(90deg,var(--a),#fcd34d)" }}></div>
                </div>
              </div>
              <div style={{ fontSize: "11px", color: "var(--t3)" }}>
                Need $8.2k more team volume for Platinum
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}