"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardPage() {
  const chartEarnRef = useRef(null);
  const chartPieRef = useRef(null);
  const chartPortRef = useRef(null);
  const oppLRef = useRef(null);
  const heatmapRef = useRef(null);
  const execGridRef = useRef(null);
  const fuTrackRef = useRef(null);
  const timerNumRef = useRef(null);
  const slidesWrapRef = useRef(null);
  const dotsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  // Hero slider data
  const slides = [
    {
      id: 0,
      className: "sl0",
      stagClass: "tc",
      stagText: "● LIVE NOW",
      title: "AI Arbitrage Bot LIVE<br />3 Chains Simultaneous",
      description: "MEV + Cross-DEX + Flash Loan arbitrage across SOL, ETH & BSC in real time",
      buttonText: "Activate Bot ▶",
      buttonClass: "cc",
      gradientId: "g0",
      strokeColor: "#00d4ff",
      pathData: "M0,64 L18,57 L36,50 L54,53 L72,38 L90,26 L110,19 L130,11 L148,4",
      fillUrl: "url(#g0)"
    },
    {
      id: 1,
      className: "sl1",
      stagClass: "tp2",
      stagText: "▲ PROFIT REPORT",
      title: "Today +$341.21<br />Win Rate 91.7%",
      description: "142 opportunities/min · Compounding enabled · $8,241 total earned this cycle",
      buttonText: "View Analytics →",
      buttonClass: "cp2",
      gradientId: "g1",
      strokeColor: "#a78bfa",
      pathData: "M0,72 L22,64 L44,55 L66,43 L88,30 L110,18 L130,11 L148,4",
      fillUrl: "url(#g1)"
    },
    {
      id: 2,
      className: "sl2",
      stagClass: "tg",
      stagText: "⚡ FLASH LOAN",
      title: "Flash Loan Arbitrage<br />Limits Increased 3×",
      description: "Higher capital · Higher profit potential · Fully automated execution",
      buttonText: "Learn More →",
      buttonClass: "cg",
      gradientId: "g2",
      strokeColor: "#10d98a",
      pathData: "M0,68 L15,62 L30,66 L50,52 L70,40 L90,28 L115,16 L135,8 L148,3",
      fillUrl: "url(#g2)"
    },
    {
      id: 3,
      className: "sl3",
      stagClass: "to",
      stagText: "🔥 OPPORTUNITY",
      title: "SOL/USDC Record Spread<br />0.84% — Act Now",
      description: "High-value window open · Limited time · Bot scanning continuously",
      buttonText: "Trade Now ⚡",
      buttonClass: "co",
      gradientId: "g3",
      strokeColor: "#f6b93b",
      pathData: "M0,74 L18,70 L36,74 L54,62 L72,46 L90,30 L110,20 L130,10 L148,4",
      fillUrl: "url(#g3)"
    }
  ];

  const changeSlide = useCallback((index) => {
    const slidesWrap = slidesWrapRef.current;
    const dots = dotsRef.current?.querySelectorAll('.sldot');
    
    if (slidesWrap) {
      slidesWrap.style.transform = `translateX(-${index * 100}%)`;
    }
    if (dots) {
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('on');
        } else {
          dot.classList.remove('on');
        }
      });
    }
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    changeSlide(nextIndex);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    changeSlide(prevIndex);
  }, [currentSlide, changeSlide]);

  // Initialize charts
  useEffect(() => {
    // Earnings chart
    if (chartEarnRef.current) {
      const ctx = chartEarnRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Earned',
              data: [1240, 2890, 4520, 8241],
              borderColor: '#a78bfa',
              backgroundColor: 'rgba(167, 139, 250, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Limit',
              data: [3000, 6000, 9000, 12000],
              borderColor: 'rgba(239, 68, 68, 0.5)',
              borderDash: [5, 5],
              backgroundColor: 'transparent',
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // Pie chart
    if (chartPieRef.current) {
      const ctx = chartPieRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Trading', 'Level', 'Affiliate', 'Compound'],
          datasets: [{
            data: [4286, 1841, 841, 1274],
            backgroundColor: ['#22d3ee', '#34d399', '#a78bfa', '#fbbf24'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // Portfolio chart
    if (chartPortRef.current) {
      const ctx = chartPortRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            data: Array.from({ length: 30 }, (_, i) => 38000 + (i * 320)),
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    return () => {
      // Cleanup charts if needed
      const charts = Chart.instances;
      Object.values(charts).forEach(chart => chart.destroy());
    };
  }, []);

  useEffect(() => {
    // Initialize carousel
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('.sldot');
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => changeSlide(i));
      });
    }

    // Auto slide interval
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    // Initialize opportunities list
    if (oppLRef.current) {
      const opportunities = [
        { pair: 'SOL/USDC', profit: '+$124.50', chain: 'SOL', type: 'Flash Loan' },
        { pair: 'ETH/USDT', profit: '+$89.30', chain: 'ETH', type: 'MEV' },
        { pair: 'BNB/BUSD', profit: '+$67.80', chain: 'BSC', type: 'Cross-DEX' },
        { pair: 'MATIC/USDC', profit: '+$45.20', chain: 'ETH', type: 'Arbitrage' },
      ];
      
      oppLRef.current.innerHTML = opportunities.map(opp => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--b1)">
          <div><span class="tag ${opp.chain.toLowerCase()}">${opp.chain}</span> <span style="font-weight:700">${opp.pair}</span><div style="font-size:10px;color:var(--t3)">${opp.type}</div></div>
          <div style="font-family:var(--mono);color:var(--g);font-weight:900">${opp.profit}</div>
        </div>
      `).join('');
    }

    // Initialize execution grid
    if (execGridRef.current) {
      const executions = [
        { hash: '0x7a3f...b291', profit: '+$342.50', time: '12s ago', chain: 'SOL' },
        { hash: '0x2e8c...d174', profit: '+$218.30', time: '34s ago', chain: 'ETH' },
        { hash: '0x9b4d...f823', profit: '+$156.20', time: '1m ago', chain: 'BSC' },
      ];
      
      execGridRef.current.innerHTML = executions.map(exec => `
        <div class="exec-item">
          <div style="display:flex;align-items:center;gap:8px"><span class="tag ${exec.chain.toLowerCase()}">${exec.chain}</span><span style="font-family:var(--mono);font-size:11px;cursor:pointer;color:var(--pb)">${exec.hash}</span></div>
          <div style="font-family:var(--mono);color:var(--g);font-weight:900">+${exec.profit}</div>
          <div style="font-size:10px;color:var(--t3)">${exec.time}</div>
        </div>
      `).join('');
    }

    // Initialize user track
    if (fuTrackRef.current) {
      const users = [
        { name: 'Alex***', country: '🇺🇸', amount: '$1,240' },
        { name: 'Maria***', country: '🇬🇧', amount: '$892' },
        { name: 'Wei***', country: '🇸🇬', amount: '$2,100' },
        { name: 'Carlos***', country: '🇧🇷', amount: '$567' },
      ];
      
      fuTrackRef.current.innerHTML = [...users, ...users].map(user => `
        <div class="fu-item">
          <div style="display:flex;align-items:center;gap:6px"><span style="font-size:16px">${user.country}</span><span style="font-weight:600">${user.name}</span></div>
          <div style="font-family:var(--mono);color:var(--g);font-weight:700">${user.amount}</div>
        </div>
      `).join('');
    }

    // Heatmap
    if (heatmapRef.current) {
      const days = 28;
      let html = '';
      for (let i = 0; i < days; i++) {
        const profit = Math.random() * 100;
        let intensity = '';
        if (profit > 80) intensity = 'h4';
        else if (profit > 60) intensity = 'h3';
        else if (profit > 40) intensity = 'h2';
        else intensity = 'h1';
        html += `<div class="hcell ${intensity}" title="+$${Math.floor(profit * 10)}"></div>`;
        if ((i + 1) % 7 === 0 && i !== days - 1) html += '<div style="grid-column:1/-1;height:2px"></div>';
      }
      heatmapRef.current.innerHTML = html;
    }

    // Timer functionality for opps/min
    let oppCount = 142;
    const opmElement = document.getElementById('opm');
    if (opmElement) {
      const oppInterval = setInterval(() => {
        oppCount = Math.floor(140 + Math.random() * 20);
        opmElement.textContent = `${oppCount}/m`;
      }, 3000);
      return () => clearInterval(oppInterval);
    }
    
    return () => clearInterval(interval);
  }, [changeSlide, nextSlide]);

  const activateBot = () => {
    const botNotif = document.getElementById('botNotif');
    const timerBox = document.getElementById('timerBox');
    const botActArea = document.getElementById('botActArea');
    
    if (botNotif) botNotif.style.display = 'flex';
    if (timerBox) timerBox.style.display = 'flex';
    if (botActArea) botActArea.style.display = 'none';
  };

  const pauseBot = () => {
    console.log('Bot paused');
  };

  return (
    <div className="content">
      {/* Bot Notification (hidden by default) */}
      <div className="notif-bar" id="botNotif" style={{ display: 'none' }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <polyline points="2,8 5.5,11.5 14,3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>
          <strong>Your Bot is now ACTIVATED!</strong> — Scanning 142+ opportunities/min across SOL, ETH & BSC. First profit expected within 60 seconds.
        </span>
      </div>

      {/* Timer Box (hidden by default) */}
      <div className="timer-box" id="timerBox" style={{ display: 'none' }}>
        <div className="timer-num" id="timerNum" ref={timerNumRef}>00:00:00</div>
        <div className="timer-lbl">🟢 Bot Running</div>
      </div>

      {/* HERO SLIDER */}
      <div className="hero">
        <div className="slides-wrap" id="sw" ref={slidesWrapRef}>
          {slides.map((slide) => (
            <div key={slide.id} className={`slide ${slide.className}`}>
              <div className="sgl"></div>
              <div className="sc">
                <div className={`stag ${slide.stagClass}`}>{slide.stagText}</div>
                <div className="sh" dangerouslySetInnerHTML={{ __html: slide.title }}></div>
                <div className="ss">{slide.description}</div>
              </div>
              <svg className="slcht" viewBox="0 0 148 84">
                <defs>
                  <linearGradient id={slide.gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={slide.strokeColor} stopOpacity=".32"/>
                    <stop offset="100%" stopColor={slide.strokeColor} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={slide.pathData} fill="none" stroke={slide.strokeColor} strokeWidth="2" strokeLinecap="round"/>
                <path d={`${slide.pathData} L148,84 L0,84Z`} fill={slide.fillUrl}/>
              </svg>
              <button className={`scta ${slide.buttonClass}`} onClick={activateBot}>
                {slide.buttonText}
              </button>
            </div>
          ))}
        </div>
        <div className="sldots" id="sldots" ref={dotsRef}>
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className={`sldot ${slide.id === currentSlide ? 'on' : ''}`} 
              data-i={slide.id}
            ></div>
          ))}
        </div>
        <button className="slarr slprev" id="slp" onClick={prevSlide}>‹</button>
        <button className="slarr slnext" id="sln" onClick={nextSlide}>›</button>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="scard scc">
          <div className="sglow"></div>
          <div className="stop">
            <div className="sico ic">👥</div>
            <div className="sbdg">▲ 8.4%</div>
          </div>
          <div className="slbl">Affiliate Income</div>
          <div className="sval vc" id="v0">$841.20</div>
          <svg className="spark" viewBox="0 0 120 38">
            <defs><linearGradient id="sp0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00d4ff" stopOpacity=".28"/><stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/></linearGradient></defs>
            <path d="M0,30 L15,24 L30,26 L45,18 L60,21 L75,12 L90,8 L105,5 L120,2" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M0,30 L15,24 L30,26 L45,18 L60,21 L75,12 L90,8 L105,5 L120,2 L120,38 L0,38Z" fill="url(#sp0)"/>
          </svg>
        </div>
        <div className="scard scp">
          <div className="sglow"></div>
          <div className="stop">
            <div className="sico ip">📈</div>
            <div className="sbdg">▲ 12.1%</div>
          </div>
          <div className="slbl">Trading Income</div>
          <div className="sval vp" id="v1">$4,285.60</div>
          <svg className="spark" viewBox="0 0 120 38">
            <defs><linearGradient id="sp1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a78bfa" stopOpacity=".28"/><stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/></linearGradient></defs>
            <path d="M0,34 L15,30 L30,22 L45,25 L60,16 L75,10 L90,6 L105,4 L120,1" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M0,34 L15,30 L30,22 L45,25 L60,16 L75,10 L90,6 L105,4 L120,1 L120,38 L0,38Z" fill="url(#sp1)"/>
          </svg>
        </div>
        <div className="scard scg">
          <div className="sglow"></div>
          <div className="stop">
            <div className="sico ig">🏆</div>
            <div className="sbdg">▲ 5.7%</div>
          </div>
          <div className="slbl">Level Income</div>
          <div className="sval vg" id="v2">$1,840.80</div>
          <svg className="spark" viewBox="0 0 120 38">
            <defs><linearGradient id="sp2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10d98a" stopOpacity=".28"/><stop offset="100%" stopColor="#10d98a" stopOpacity="0"/></linearGradient></defs>
            <path d="M0,32 L20,28 L35,30 L55,20 L70,18 L85,12 L100,7 L120,2" fill="none" stroke="#10d98a" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M0,32 L20,28 L35,30 L55,20 L70,18 L85,12 L100,7 L120,2 L120,38 L0,38Z" fill="url(#sp2)"/>
          </svg>
        </div>
        <div className="scard scgo">
          <div className="sglow"></div>
          <div className="stop">
            <div className="sico igo">♾</div>
            <div className="sbdg">▲ 9.2%</div>
          </div>
          <div className="slbl">Compounding Income</div>
          <div className="sval vgo" id="v3">$1,273.90</div>
          <svg className="spark" viewBox="0 0 120 38">
            <defs><linearGradient id="sp3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f6b93b" stopOpacity=".28"/><stop offset="100%" stopColor="#f6b93b" stopOpacity="0"/></linearGradient></defs>
            <path d="M0,36 L15,32 L30,28 L50,22 L65,18 L80,14 L100,8 L120,3" fill="none" stroke="#f6b93b" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M0,36 L15,32 L30,28 L50,22 L65,18 L80,14 L100,8 L120,3 L120,38 L0,38Z" fill="url(#sp3)"/>
          </svg>
        </div>
      </div>

      {/* MID */}
      <div className="mid">
        <div className="botcard">
          <div className="botbg"></div>
          <div className="bhead">
            <div className="owrap">
              <div className="orb">🤖</div>
              <div className="r1"></div>
              <div className="r2"></div>
            </div>
            <div>
              <div className="bname">NEXARB AI Engine</div>
              <div className="bstatus">
                <div className="alive"><span className="pls"></span>ACTIVE — EXECUTING</div>
                <div className="bupt">· Uptime 14h 32m</div>
              </div>
            </div>
          </div>
          <div className="bdesc">MEV + Cross-DEX + Flash Loan arbitrage running 24/7 across SOL, ETH &amp; BSC. Detects and executes profitable spread opportunities in milliseconds with 91.7% success rate.</div>
          <div className="mgrid">
            <div className="mcell"><div className="mv">91.7%</div><div className="ml">Win Rate</div></div>
            <div className="mcell"><div className="mv">~340%</div><div className="ml">APY</div></div>
            <div className="mcell"><div className="mv" id="opm">142/m</div><div className="ml">Opps/Min</div></div>
            <div className="mcell"><div className="mv">3</div><div className="ml">Chains</div></div>
          </div>
          <div className="bbtns">
            <button className="bacti" onClick={activateBot}>▶ &nbsp;Activate Bot</button>
            <button className="bpau" onClick={pauseBot}>⏸ Pause</button>
          </div>
        </div>
        <div className="oppcard">
          <div className="ch">
            <div>
              <div className="ct">Live Opportunities <span className="lb"><span style={{width:"5px", height:"5px", borderRadius:"50%", background:"var(--brand-green)", display:"inline-block"}}></span>LIVE</span></div>
              <div className="csub">Real-time arbitrage detection</div>
            </div>
            <div className="va">View all →</div>
          </div>
          <div className="olist" id="ol" ref={oppLRef}></div>
        </div>
      </div>

      {/* CHAIN BAR */}
      <div className="chbar">
        <div className="cblbl">Network Status</div>
        <div className="cbdiv"></div>
        <div className="cbitems">
          <div className="cbitem">
            <div className="cblogo" style={{background:"rgba(98,126,234,.12)", color:"#627eea"}}>Ξ</div>
            <div className="cbd">
              <div className="cbn">Ethereum</div>
              <div className="cbm">
                <div className="cbs">GAS <span id="eg">24</span> gwei</div>
                <div className="cbs">TPS <span>15</span></div>
              </div>
            </div>
            <div className="cbli">LIVE</div>
          </div>
          <div className="cbitem">
            <div className="cblogo" style={{background:"rgba(0,255,163,.07)", color:"#00ffa3"}}>◎</div>
            <div className="cbd">
              <div className="cbn">Solana</div>
              <div className="cbm">
                <div className="cbs">FEE <span>0.000025</span></div>
                <div className="cbs">TPS <span>3,200</span></div>
              </div>
            </div>
            <div className="cbli">LIVE</div>
          </div>
          <div className="cbitem">
            <div className="cblogo" style={{background:"rgba(240,185,11,.09)", color:"#f0b90b"}}>⬡</div>
            <div className="cbd">
              <div className="cbn">BNB Chain</div>
              <div className="cbm">
                <div className="cbs">GAS <span>3</span> gwei</div>
                <div className="cbs">TPS <span>60</span></div>
              </div>
            </div>
            <div className="cbli">LIVE</div>
          </div>
        </div>
      </div>
 
      {/* BOTTOM */}
      <div className="bot3">
        {/* EARNINGS */}
        <div className="bc">
          <div className="ch" style={{marginBottom:0}}><div className="ct">Earnings Tracker</div></div>
          <div className="erw">
            <svg width="128" height="128" viewBox="0 0 128 128">
              <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0099cc"/><stop offset="100%" stopColor="#00d4ff"/></linearGradient></defs>
              <circle className="rb" cx="64" cy="64" r="54"/>
              <circle className="rf rcyn" cx="64" cy="64" r="54"/>
            </svg>
            <div className="rc"><div className="rpct">68.7%</div><div className="rlbl">Used</div></div>
          </div>
          <div className="etiles">
            <div className="etile"><div className="etl">Total Earned</div><div className="etv" style={{color:"var(--brand-cyan)"}}>$8,241</div></div>
            <div className="etile"><div className="etl">Remaining</div><div className="etv" style={{color:"var(--brand-green)"}}>$3,759</div></div>
            <div className="etile s2"><div className="etl">Income Limit</div><div className="etv" style={{color:"var(--brand-gold)"}}>$12,000</div></div>
          </div>
        </div>
        
        {/* AI */}
        <div className="bc">
          <div className="ch" style={{marginBottom:0}}><div className="ct">🧠 AI Companion</div><div style={{fontSize:"10px", color:"var(--brand-violet)", background:"rgba(139,92,246,.1)", padding:"3px 9px", borderRadius:"6px", border:"1px solid rgba(139,92,246,.2)", fontWeight:700}}>NEXAI v3</div></div>
          <div className="cmsgs">
            <div className="cmsg"><div className="cav">AI</div><div className="cbub bai">Best chain today: <strong style={{color:"var(--brand-cyan)"}}>SOL</strong> — 0.84% record spread detected now.</div></div>
            <div className="cmsg"><div className="cav">AI</div><div className="cbub bin">⚡ 3 high-profit opps in last 5 min. Potential: <strong style={{color:"var(--brand-green)"}}>+$94.20</strong></div></div>
            <div className="cmsg"><div className="cav">AI</div><div className="cbub bg2">💡 Enable auto-reinvest to boost compound rate by ~18%</div></div>
          </div>
          <div className="cq">
            <button className="qb" data-orig="⚡ Optimize strategy">⚡ Optimize strategy</button>
            <button className="qb" data-orig="♾ Auto-reinvest profits">♾ Auto-reinvest profits</button>
            <button className="qb" data-orig="🛡 Run risk analysis">🛡 Run risk analysis</button>
          </div>
        </div>
        
        {/* NEWS */}
        <div className="bc">
          <div className="ch" style={{marginBottom:0}}><div className="ct">📰 Market Updates</div></div>
          <div className="tkwrap"><div className="tktrack">
            <span className="tki"><span style={{color:"var(--brand-cyan)"}}>●</span> ETH/USDC +0.34% Uniswap</span>
            <span className="tki"><span style={{color:"var(--brand-green)"}}>●</span> Flash loan limits 3×</span>
            <span className="tki"><span style={{color:"var(--brand-gold)"}}>●</span> SOL TPS record 3,200</span>
            <span className="tki"><span style={{color:"var(--brand-violet)"}}>●</span> Curve→Balancer route live</span>
            <span className="tki"><span style={{color:"var(--brand-cyan)"}}>●</span> ETH/USDC +0.34% Uniswap</span>
            <span className="tki"><span style={{color:"var(--brand-green)"}}>●</span> Flash loan limits 3×</span>
            <span className="tki"><span style={{color:"var(--brand-gold)"}}>●</span> SOL TPS record 3,200</span>
            <span className="tki"><span style={{color:"var(--brand-violet)"}}>●</span> Curve→Balancer route live</span>
          </div></div>
          <div className="ncards2">
            <div className="ncard"><div className="ntop"><span className="ntag2 ntu">UPDATE</span><span className="ntm">2m ago</span></div><div className="ntxt">Arbitrum One now live — 3 chains running simultaneously. SOL/USDC spreads widening.</div></div>
            <div className="ncard"><div className="ntop"><span className="ntag2 nta">ALERT</span><span className="ntm">8m ago</span></div><div className="ntxt">High ETH volatility — bot in opportunistic mode. Execution frequency up 34%.</div></div>
            <div className="ncard"><div className="ntop"><span className="ntag2 ntn">NEWS</span><span className="ntm">15m ago</span></div><div className="ntxt">BSC gas at 3 gwei — optimal conditions for cross-chain arb operations today.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
} 