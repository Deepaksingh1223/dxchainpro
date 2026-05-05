"use client";

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Wallet() {
  const walletChartRef = useRef(null);
  const chartInstances = useRef([]);
  const [activeTab, setActiveTab] = useState('d');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositCurrency, setDepositCurrency] = useState('USDT (TRC20)');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawNetwork, setWithdrawNetwork] = useState('TRC20 (USDT)');
  const [withdraw2FA, setWithdraw2FA] = useState('');
  const [swapFrom, setSwapFrom] = useState('USDT');
  const [swapTo, setSwapTo] = useState('SOL');
  const [swapAmount, setSwapAmount] = useState('');

  useEffect(() => {
    // Cleanup previous charts
    chartInstances.current.forEach(chart => chart.destroy());
    chartInstances.current = [];

    // Wallet Distribution Chart
    if (walletChartRef.current) {
      const chart = new Chart(walletChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Compound Wallet', 'Trading Wallet', 'Commission Wallet'],
          datasets: [{
            data: [57, 39, 4],
            backgroundColor: ['#00d4ff', '#a78bfa', '#10d98a'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: 'var(--t2)', font: { size: 10 } }
            }
          }
        }
      });
      chartInstances.current.push(chart);
    }

    // Initialize transaction history
    const initHistory = () => {
      const whTbl = document.getElementById('whTbl');
      if (whTbl) {
        const history = [
          { date: '2024-01-15 14:32', type: 'Deposit', amount: '+$5,000', network: 'TRC20', txid: '0x7a3f...b291', status: 'Completed' },
          { date: '2024-01-14 09:21', type: 'Withdraw', amount: '-$2,000', network: 'ERC20', txid: '0x2e8c...d174', status: 'Completed' },
          { date: '2024-01-13 22:15', type: 'Deposit', amount: '+$10,000', network: 'SOL', txid: '0x9b4d...f823', status: 'Completed' },
          { date: '2024-01-12 11:08', type: 'Compound', amount: '+$1,240', network: 'Compound', txid: '0xd5e2...a712', status: 'Completed' }
        ];
        
        whTbl.innerHTML = history.map(h => `
          <tr>
            <td>${h.date}</td>
            <td>${h.type}</td>
            <td style="color: ${h.amount.startsWith('+') ? 'var(--g)' : 'var(--r)'}">${h.amount}</td>
            <td>${h.network}</td>
            <td style="font-family:var(--mono);font-size:10px">${h.txid}</td>
            <td><a href="#" style="color:var(--pb);text-decoration:none" onclick="return false;">View →</a></td>
            <td><span class="tag tg">${h.status}</span></td>
          </tr>
        `).join('');
      }
    };
    
    initHistory();
    
    return () => {
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];
    };
  }, []);

  const showToast = (title, message) => {
    console.log(`${title}: ${message}`);
    alert(`${title}\n${message}`);
  };

  const switchTab = (tab, buttonElement) => {
    setActiveTab(tab);
    
    // Update UI
    const tabs = document.querySelectorAll('#wTabs .tab');
    tabs.forEach(btn => btn.classList.remove('on'));
    buttonElement.classList.add('on');
    
    // Show/hide content
    const depositDiv = document.getElementById('wD');
    const withdrawDiv = document.getElementById('wW');
    const historyDiv = document.getElementById('wH');
    
    if (depositDiv) depositDiv.style.display = tab === 'd' ? 'block' : 'none';
    if (withdrawDiv) withdrawDiv.style.display = tab === 'w' ? 'block' : 'none';
    if (historyDiv) historyDiv.style.display = tab === 'h' ? 'block' : 'none';
  };

  const copyAddress = () => {
    const address = 'TXarbion8b5cf6A2D3EE7F4C9B0d1E2';
    navigator.clipboard.writeText(address);
    showToast('Copied!', 'Deposit address copied to clipboard');
  };

  const generateInvoice = () => {
    if (!depositAmount || parseFloat(depositAmount) < 50) {
      showToast('Error', 'Minimum deposit amount is $50');
      return;
    }
    showToast('Invoice Generated', `Deposit ${depositAmount} USDT to the address provided`);
  };

  const handleWithdraw = () => {
    if (!withdrawAddress) {
      showToast('Error', 'Please enter a destination address');
      return;
    }
    if (!withdrawAmount || parseFloat(withdrawAmount) < 20) {
      showToast('Error', 'Minimum withdrawal amount is $20');
      return;
    }
    if (!withdraw2FA || withdraw2FA.length !== 6) {
      showToast('Error', 'Please enter a valid 6-digit 2FA code');
      return;
    }
    showToast('Withdrawal Initiated', `Withdrawing $${withdrawAmount} to ${withdrawNetwork}`);
  };

  const handleSwap = () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      showToast('Error', 'Please enter a valid amount');
      return;
    }
    showToast('Swap Initiated', `Swapping ${swapAmount} ${swapFrom} to ${swapTo}`);
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

      <div id="p-wallet" className="page">
        <div className="g3" style={{ marginBottom: "14px" }}>
          <div className="wc">
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>🔷</div>
            <div className="wc-n">Commission Wallet</div>
            <div className="wc-b">$2,140.00</div>
            <div style={{ fontSize: "10px", color: "var(--t3)", marginTop: "5px", fontFamily: "var(--mono)" }}>
              USDT · TRC20
            </div>
          </div>
          <div className="wc">
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>💵</div>
            <div className="wc-n">Trading Wallet</div>
            <div className="wc-b">$18,500.00</div>
            <div style={{ fontSize: "10px", color: "var(--t3)", marginTop: "5px", fontFamily: "var(--mono)" }}>
              USDT · ERC20
            </div>
          </div>
          <div className="wc">
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>📦</div>
            <div className="wc-n">Compound Wallet</div>
            <div className="wc-b">$27,192.00</div>
            <div style={{ fontSize: "10px", color: "var(--t3)", marginTop: "5px", fontFamily: "var(--mono)" }}>
              SOL · Compound
            </div>
          </div>
        </div>

        <div className="g21">
          <div className="card">
            <div className="tabs" id="wTabs">
              <button className="tab on" onClick={(e) => switchTab('d', e.currentTarget)}>Deposit</button>
              <button className="tab" onClick={(e) => switchTab('w', e.currentTarget)}>Withdraw</button>
              <button className="tab" onClick={(e) => switchTab('h', e.currentTarget)}>History</button>
            </div>
            
            <div id="wD" style={{ display: activeTab === 'd' ? 'block' : 'none' }}>
              <div className="g2" style={{ gap: "10px", marginBottom: "12px" }}>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Currency</label>
                  <select 
                    className="fi" 
                    value={depositCurrency}
                    onChange={(e) => setDepositCurrency(e.target.value)}
                  >
                    <option>USDT (TRC20)</option>
                    <option>USDT (ERC20)</option>
                    <option>SOL</option>
                    <option>ETH</option>
                    <option>BNB</option>
                  </select>
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Amount (USD)</label>
                  <input 
                    className="fi" 
                    type="number" 
                    placeholder="Min $50"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ background: "#020210", border: "1px solid var(--b1)", borderRadius: "var(--r8)", padding: "14px", display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div style={{ width: "80px", height: "80px", minWidth: "80px", background: "#fff", borderRadius: "var(--r8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <rect x="4" y="4" width="24" height="24" rx="2" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="10" y="10" width="12" height="12" fill="#111"/>
                    <rect x="36" y="4" width="24" height="24" rx="2" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="42" y="10" width="12" height="12" fill="#111"/>
                    <rect x="4" y="36" width="24" height="24" rx="2" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="10" y="42" width="12" height="12" fill="#111"/>
                    <rect x="36" y="36" width="4" height="4" fill="#111"/>
                    <rect x="44" y="36" width="4" height="4" fill="#111"/>
                    <rect x="52" y="36" width="4" height="4" fill="#111"/>
                    <rect x="36" y="44" width="4" height="4" fill="#111"/>
                    <rect x="44" y="52" width="4" height="4" fill="#111"/>
                    <rect x="52" y="44" width="4" height="4" fill="#111"/>
                    <rect x="56" y="56" width="8" height="8" fill="#111"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "10px", color: "var(--t3)", marginBottom: "5px", fontWeight: 700 }}>
                    DEPOSIT ADDRESS
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--cb)", wordBreak: "break-all", marginBottom: "7px" }}>
                    TXarbion8b5cf6A2D3EE7F4C9B0d1E2
                  </div>
                  <button className="btn btn-g2" style={{ fontSize: "11px", padding: "4px 12px" }} onClick={copyAddress}>
                    Copy Address
                  </button>
                </div>
              </div>
              <div className="alert al-i">
                Send only supported tokens. Minimum $50. Confirms in 1–3 min.
              </div>
              <button className="btn btn-p" style={{ width: "100%", padding: "10px" }} onClick={generateInvoice}>
                Generate Invoice
              </button>
            </div>

            <div id="wW" style={{ display: activeTab === 'w' ? 'block' : 'none' }}>
              <div className="fg">
                <label className="fl">Destination Address</label>
                <input 
                  className="fi" 
                  type="text" 
                  placeholder="0x… or Solana address"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                />
              </div>
              <div className="fg">
                <label className="fl">Amount (USD)</label>
                <input 
                  className="fi" 
                  type="number" 
                  placeholder="Min $20"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div className="fg">
                <label className="fl">Network</label>
                <select 
                  className="fi"
                  value={withdrawNetwork}
                  onChange={(e) => setWithdrawNetwork(e.target.value)}
                >
                  <option>TRC20 (USDT)</option>
                  <option>ERC20 (ETH/USDT)</option>
                  <option>BEP20 (BNB)</option>
                  <option>Solana (SOL)</option>
                </select>
              </div>
              <div className="fg">
                <label className="fl">2FA Code</label>
                <input 
                  className="fi" 
                  type="text" 
                  placeholder="6-digit code"
                  value={withdraw2FA}
                  onChange={(e) => setWithdraw2FA(e.target.value)}
                />
              </div>
              <div className="alert al-w">
                Withdrawals via smart contract. Gas fees apply. Est. 15–60 min.
              </div>
              <button className="btn btn-p" style={{ width: "100%", padding: "10px" }} onClick={handleWithdraw}>
                Withdraw via Smart Contract →
              </button>
            </div>

            <div id="wH" style={{ display: activeTab === 'h' ? 'block' : 'none' }}>
              <div className="tw">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Network</th>
                      <th>TXID</th>
                      <th>Explorer</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="whTbl"></tbody>
                </table>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="card">
              <div className="st" style={{ marginBottom: "10px" }}>Portfolio Split</div>
              <div className="cw" style={{ height: "140px" }}>
                <canvas ref={walletChartRef} role="img" aria-label="Wallet split">
                  Compound 57%, Trading 39%, Commission 4%.
                </canvas>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px", fontSize: "12.5px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t2)" }}>In Bot</span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--pb)" }}>$31,200</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t2)" }}>Available</span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--g)" }}>$16,632</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t2)" }}>Gas Reserve</span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--a)" }}>$248</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="st" style={{ marginBottom: "10px" }}>Quick Swap</div>
              <div className="fg">
                <label className="fl">From</label>
                <select 
                  className="fi"
                  value={swapFrom}
                  onChange={(e) => setSwapFrom(e.target.value)}
                >
                  <option>USDT</option>
                  <option>SOL</option>
                  <option>ETH</option>
                </select>
              </div>
              <div className="fg">
                <label className="fl">To</label>
                <select 
                  className="fi"
                  value={swapTo}
                  onChange={(e) => setSwapTo(e.target.value)}
                >
                  <option>SOL</option>
                  <option>ETH</option>
                  <option>USDT</option>
                </select>
              </div>
              <div className="fg">
                <label className="fl">Amount</label>
                <input 
                  className="fi" 
                  type="number" 
                  placeholder="0.00"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                />
              </div>
              <button className="btn btn-p" style={{ width: "100%", padding: "8px", fontSize: "12px" }} onClick={handleSwap}>
                Swap →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}