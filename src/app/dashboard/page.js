"use client";

import '../../../public/assets/dashboard.css';

export default function DashboardPage() {
  return (
    <>
      {/* Toast */}
      <div className='toast' id='toast'>
        <div className='toast-ic'>
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
            <polyline points='2,7 5.5,10.5 12,3.5' stroke='#10b981' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
        <div>
          <div className='toast-t' id='toastT'>Success</div>
          <div className='toast-m' id='toastM'>Done</div>
        </div>
      </div>

      {/* Bot Overlay */}
      <div className='overlay' id='botOv' onClick={(e) => e.target === e.currentTarget && (closeBot ? closeBot() : (document.getElementById('botOv').style.display = 'none'))}>
        <div className='popup' style={{ maxWidth: '480px' }}>
          <div className='popup-bar'></div>
          <div className='popup-x' onClick={() => document.getElementById('botOv').style.display = 'none'}>✕</div>
          <div className='popup-body'>
            {/* Full bot popup from HTML */}
            <div className='bp-hero'>
              {/* bot hero content */}
            </div>
          </div>
        </div>
      </div>

      {/* Ref Overlay */}
      <div className='overlay' id='refOv' onClick={(e) => e.target === e.currentTarget && (closeRef ? closeRef() : (document.getElementById('refOv').style.display = 'none'))}>
        {/* Full ref popup from HTML */}
      </div>

      {/* Welcome Strip */}
      <div className='ws'>
        <div className='ws-av'>A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '12.5px', fontWeight: 700 }} id='greetEl'>Good morning, arbion123 ☀️</div>
          <div style={{ fontSize: '10px', color: 'var(--t3)' }}>Last login: Today 09:14 AM · 0x8b5…cf6A · IP 192.168.x.x</div>
        </div>
        <div className='ws-pills'>
          {/* ws-pills from HTML */}
        </div>
      </div>

      <div className='scroll' id='mainScroll'>
        <div id='p-dashboard' className='page on'>
          {/* Full content from HTML #p-dashboard */}
          {/* Announcement */}
          <div className='ann' id='annEl'>
            <span className='ann-badge'>📢 LIVE</span>
            <div className='ann-ticker'>
              <div className='ann-track'>
                <span className='ann-item'>Platform v3.4.1 — 40% faster execution engine deployed globally</span>
                <span className='ann-item'>Easter Campaign: 2× referral commission until Apr 30</span>
                {/* more from HTML */}
              </div>
            </div>
            <span style={{ color: 'var(--t3)', cursor: 'pointer', fontSize: '15px', flexShrink: 0, lineHeight: 1 }} onClick={() => document.getElementById('annEl').style.display = 'none'}>✕</span>
          </div>

          {/* Income Tiles */}
          <div className='it-grid'>
            <div className='it bg-p gl gl-p'>
              <div className='it-ic' style={{ background: 'rgba(124,58,237,.18)' }}>
                <svg viewBox='0 0 20 20' fill='none' stroke='#a78bfa' strokeWidth='1.5'>
                  <circle cx='7' cy='5.5' r='3' />
                  <circle cx='14' cy='6.5' r='2.5' />
                  <path d='M1 17c0-2.8 2.7-5 6-5s6 2.2 6 5' strokeLinecap='round' />
                  <path d='M14 10.5c2 .4 3.5 2 3.5 4' strokeLinecap='round' />
                </svg>
              </div>
              <div className='it-lbl' style={{ color: '#a78bfa' }}>Affiliate Income</div>
              <div className='it-val' style={{ color: '#a78bfa' }}>$841.20</div>
              <span className='it-chg' style={{ background: 'rgba(124,58,237,.15)', color: '#a78bfa' }}>▲ +8.4% today</span>
            </div>
            {/* other income tiles from HTML */}
            {/* ... */}
          </div>

          {/* Bot Strip */}
          <div className='bot-strip card-hi' onClick={() => document.getElementById('botOv').style.display = 'flex'}>
            {/* full bot-strip from HTML */}
          </div>

          {/* more sections: notif-bar, earnings tracker, opportunities, exec grid, portfolio, footer-users */}
        </div>
      </div>
    </>
  );
}

