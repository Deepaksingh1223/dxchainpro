"use client";

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function ArbionEngine() {
  const scanChartRef = useRef(null);
  const chartInstances = useRef([]);
  const [botChecked, setBotChecked] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState('MEV Sandwich');
  const [slippage, setSlippage] = useState(0.5);
  const [minProfit, setMinProfit] = useState(5);
  const [maxGas, setMaxGas] = useState(50);

  useEffect(() => {
    // Cleanup previous charts
    chartInstances.current.forEach(chart => chart.destroy());
    chartInstances.current = [];

    // Scanner Chart
    if (scanChartRef.current) {
      const chart = new Chart(scanChartRef.current, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => `${i}s`),
          datasets: [{
            data: Array.from({ length: 30 }, () => Math.floor(40 + Math.random() * 60)),
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      });
      chartInstances.current.push(chart);
    }

    return () => {
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];
    };
  }, []);

  const toggleBot = (event) => {
    const isChecked = event.target.checked;
    setBotChecked(isChecked);
    // Update UI elements
    const wsBotPill = document.getElementById('wsBotPill');
    if (wsBotPill) {
      wsBotPill.textContent = isChecked ? 'ACTIVE' : 'PAUSED';
      wsBotPill.style.color = isChecked ? 'var(--g)' : 'var(--r)';
    }
  };

  const pickStrategy = (strategyName) => {
    setSelectedStrategy(strategyName);
    // Update UI to show selected
    const allStrategies = document.querySelectorAll('.sc');
    allStrategies.forEach((strategy, index) => {
      if (strategy.querySelector('.sc-n')?.textContent === strategyName) {
        strategy.classList.add('sel');
      } else {
        strategy.classList.remove('sel');
      }
    });
  };

  const handleSlippageChange = (e) => {
    const value = parseFloat(e.target.value);
    setSlippage(value);
  };

  const applySettings = () => {
    alert(`Settings applied:\nMax slippage: ${slippage}%\nMin profit: $${minProfit}\nMax gas: ${maxGas} gwei\nStrategy: ${selectedStrategy}`);
  };

  // Initialize live TX stream
  useEffect(() => {
    const txEl = document.getElementById('txEl');
    if (txEl) {
      const transactions = [
        { hash: '0x7a3f...b291', profit: '+$342.50', chain: 'SOL', age: '2s ago' },
        { hash: '0x2e8c...d174', profit: '+$218.30', chain: 'ETH', age: '12s ago' },
        { hash: '0x9b4d...f823', profit: '+$156.20', chain: 'BSC', age: '23s ago' },
        { hash: '0xd5e2...a712', profit: '+$89.40', chain: 'SOL', age: '31s ago' },
        { hash: '0x1c8f...e945', profit: '+$67.80', chain: 'ETH', age: '44s ago' }
      ];
      
      txEl.innerHTML = transactions.map(tx => `
        <div class="tx-item">
          <div><span class="tag ${tx.chain.toLowerCase()}">${tx.chain}</span><span style="font-family:var(--mono);margin-left:8px;cursor:pointer;color:var(--pb)">${tx.hash}</span></div>
          <div style="font-family:var(--mono);color:var(--g);font-weight:700">${tx.profit}</div>
          <div style="font-size:10px;color:var(--t3)">${tx.age}</div>
        </div>
      `).join('');
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      const opmElement = document.getElementById('opm');
      const excElement = document.getElementById('exc');
      if (opmElement) {
        const newOpm = Math.floor(140 + Math.random() * 20);
        opmElement.textContent = newOpm;
      }
      if (excElement) {
        const currentExc = parseInt(excElement.textContent) || 1847;
        excElement.textContent = currentExc + Math.floor(Math.random() * 5);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

      <div id="p-engine" className="page">
        <div className="g21" style={{ alignItems: "start" }}>
          <div>
            <div className="card card-hi" style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "-.3px", marginBottom: "3px" }}>
                    Arbion Engine
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--t3)" }}>
                    AI MEV + cross-chain arb · 24/7 autonomous — click TX to view on explorer
                  </div>
                </div>
                <label className="tog">
                  <input 
                    type="checkbox" 
                    id="botChk" 
                    checked={botChecked} 
                    onChange={toggleBot}
                  />
                  <div className="tog-tr"></div>
                  <div className="tog-th"></div>
                </label>
              </div>
              <div className="g3" style={{ marginBottom: "14px" }}>
                <div className="sg">
                  <div className="sg-l">Opps/min</div>
                  <div className="sg-v" style={{ color: "var(--c)" }} id="opm">142</div>
                </div>
                <div className="sg">
                  <div className="sg-l">Avg Spread</div>
                  <div className="sg-v" style={{ color: "var(--g)" }}>0.38%</div>
                </div>
                <div className="sg">
                  <div className="sg-l">Execs today</div>
                  <div className="sg-v" style={{ color: "var(--pb)" }} id="exc">1,847</div>
                </div>
              </div>
              <div className="sh">
                <div className="st" style={{ fontSize: "12.5px" }}>Live TX Stream</div>
                <span className="tag tg">● LIVE</span>
              </div>
              <div className="txl" id="txEl"></div>
            </div>
            <div className="card">
              <div className="sh">
                <div className="st" style={{ fontSize: "12.5px" }}>Scanner Activity</div>
                <span className="tag tc">Real-time</span>
              </div>
              <div className="scan-w">
                <div className="scan-line"></div>
                <div className="cw" style={{ height: "86px" }}>
                  <canvas ref={scanChartRef} role="img" aria-label="Scanner">
                    Scanner detecting opportunities.
                  </canvas>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{ marginBottom: "12px" }}>
              <div className="st" style={{ marginBottom: "12px" }}>Strategy Mode</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                <div 
                  className={`sc ${selectedStrategy === 'MEV Sandwich' ? 'sel' : ''}`} 
                  onClick={() => pickStrategy('MEV Sandwich')}
                >
                  <div className="sc-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="sc-n">MEV Sandwich</div>
                  <div className="sc-d">Front-run pending large txs</div>
                  <div className="sc-a">~340% APY</div>
                </div>
                <div 
                  className={`sc ${selectedStrategy === 'Cross-DEX Arb' ? 'sel' : ''}`} 
                  onClick={() => pickStrategy('Cross-DEX Arb')}
                >
                  <div className="sc-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="sc-n">Cross-DEX Arb</div>
                  <div className="sc-d">Jupiter, Orca, Uniswap, Curve</div>
                  <div className="sc-a">~180% APY</div>
                </div>
                <div 
                  className={`sc ${selectedStrategy === 'Flash Loan Arb' ? 'sel' : ''}`} 
                  onClick={() => pickStrategy('Flash Loan Arb')}
                >
                  <div className="sc-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="sc-n">Flash Loan Arb</div>
                  <div className="sc-d">Aave/dYdX zero-capital flash</div>
                  <div className="sc-a">~260% APY</div>
                </div>
                <div 
                  className={`sc ${selectedStrategy === 'Triangular Arb' ? 'sel' : ''}`} 
                  onClick={() => pickStrategy('Triangular Arb')}
                >
                  <div className="sc-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="sc-n">Triangular Arb</div>
                  <div className="sc-d">A → B → C → A profit loops</div>
                  <div className="sc-a">~120% APY</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="st" style={{ marginBottom: "12px" }}>Parameters</div>
              <div className="fg">
                <label className="fl">Max slippage</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="3" 
                  step="0.1" 
                  value={slippage} 
                  onChange={handleSlippageChange}
                  style={{ width: "100%", accentColor: "var(--p)" }}
                />
                <div style={{ textAlign: "right", fontSize: "11px", color: "var(--pb)", fontFamily: "var(--mono)", marginTop: "2px" }} id="slO">
                  {slippage}%
                </div>
              </div>
              <div className="fg">
                <label className="fl">Min profit (USD)</label>
                <input 
                  className="fi" 
                  type="number" 
                  value={minProfit} 
                  onChange={(e) => setMinProfit(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="fg">
                <label className="fl">Max gas (gwei)</label>
                <input 
                  className="fi" 
                  type="number" 
                  value={maxGas} 
                  onChange={(e) => setMaxGas(parseInt(e.target.value) || 0)}
                />
              </div>
              <button className="btn btn-p" style={{ width: "100%", padding: "9px" }} onClick={applySettings}>
                Apply &amp; Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}