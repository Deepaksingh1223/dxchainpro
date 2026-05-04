// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import Topbar from '@/components/Topbar'
// import WelcomeStrip from '@/components/WelcomeStrip'
// import AnnouncementBanner from '@/components/AnnouncementBanner'
// import IncomeCards from '@/components/IncomeCards'
// import BotStrip from '@/components/BotStrip'
// import ExecutionGrid from '@/components/ExecutionGrid'
// import LiveOpportunities from '@/components/LiveOpportunities'
// import RecentUsers from '@/components/RecentUsers'
// import BotModal from '@/components/BotModal'
// import ReferralModal from '@/components/ReferralModal'
// import PageLayout from '@/components/PageLayout'
// import { EarningsTracker, Heatmap } from '@/components/EarningsSection'
// import { useAuth } from '@/contexts/AuthContext'
// import Sidebar from '@/components/Sidebar'

// const topPairs = [
//   { chain: 'SOL', pair: 'SOL/USDC', profit: '+$1,240', cls: 'tag-sol' },
//   { chain: 'ETH', pair: 'ETH/USDT', profit: '+$847', cls: 'tag-eth' },
//   { chain: 'SOL', pair: 'BTC/USDT', profit: '+$612', cls: 'tag-sol' },
//   { chain: 'BSC', pair: 'BNB/BUSD', profit: '+$391', cls: 'tag-bsc' },
//   { chain: 'ETH', pair: 'MATIC/USDC', profit: '+$208', cls: 'tag-eth' },
// ]

// export default function Dashboard() {
//   const { isLoggedIn, loading } = useAuth()
//   const router = useRouter()
//   const [botModalOpen, setBotModalOpen] = useState(false)
//   const [refModalOpen, setRefModalOpen] = useState(false)
//   const [botActivated, setBotActivated] = useState(false)

  

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-purple-900/20">Loading@.</div>
//   }

 
//   return (
//     <PageLayout topbarProps={{ onOpenRef: () => setRefModalOpen(true) }}>
//       <WelcomeStrip />
//       <AnnouncementBanner />
//       <IncomeCards />
//       <BotStrip onOpen={() => setBotModalOpen(true)} />
//       <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3 mb-4">
//         <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
//           <div className="flex items-center justify-between mb-3">
//             <div className="text-sm font-bold">Total Earnings Tracker</div>
//             <div className="flex gap-2 text-[10.5px] text-[var(--t2)]">
//               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-[#a78bfa]" />Earned</div>
//               <div className="flex items-center gap-1"><div className="w-4 h-0.5 rounded bg-[rgba(239,68,68,0.5)]" />Limit</div>
//             </div>
//           </div>
//           <EarningsTracker />
//           <Heatmap />
//         </div>
//         <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4 flex flex-col">
//           <div className="flex items-center justify-between mb-3">
//             <div className="text-sm font-bold">Live Opportunities</div>
//             <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] pulse-dot shadow-[0_0_5px_#10b981]" />
//           </div>
//           <LiveOpportunities />
//         </div>
//       </div>
//       <ExecutionGrid />
//       <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3 mb-4">
//         <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
//           <div className="flex items-center justify-between mb-3">
//             <div className="text-sm font-bold">Portfolio Value · 30d</div>
//             <span className="text-[10px] font-bold px-2 py-0.5 rounded tag-blue">+24.8%</span>
//           </div>
//           <PortfolioChart />
//         </div>
//         <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
//           <div className="mb-3 text-sm font-bold">Top Pairs Today</div>
//           <div className="space-y-2.5">
//             {topPairs.map(p => (
//               <div key={p.pair} className="flex items-center gap-2 text-[12.5px]">
//                 <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${p.cls}`}>{p.chain}</span>
//                 <span className="flex-1 font-bold">{p.pair}</span>
//                 <span className="font-mono font-bold text-[#10b981]">{p.profit}</span>
//               </div>
//             ))}
//             <hr className="border-[rgba(255,255,255,0.06)]" />
//             <div className="flex justify-between text-[12px]">
//               <span className="text-[var(--t2)]">Total today</span>
//               <span className="font-mono font-black text-[#10b981]">+$3,298</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RecentUsers />
//       <div className="h-4" />
//       <BotModal
//         open={botModalOpen}
//         onClose={() => setBotModalOpen(false)}
//         onActivate={() => { setBotActivated(true); setBotModalOpen(false) }}
//       />
//       <ReferralModal open={refModalOpen} onClose={() => setRefModalOpen(false)} />
//     </PageLayout>
//   )
// }

// // Inline SVG portfolio chart
// function PortfolioChart() {
//   const points = [38, 39.2, 38.6, 40.1, 39.8, 41.5, 40.9, 42.3, 41.8, 43.2, 42.9, 44.1, 43.6, 45.2, 44.8, 46.1, 45.5, 46.9, 46.3, 47.1, 46.8, 47.5, 47.1, 47.8]
//   const w = 600, h = 160
//   const minV = 36, maxV = 50
//   const xs = points.map((_, i) => (i / (points.length - 1)) * w)
//   const ys = points.map(v => h - ((v - minV) / (maxV - minV)) * h)
//   const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ')
//   const area = path + ` L${w},${h} L0,${h} Z`

//   return (
//     <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 190 }}>
//       <defs>
//         <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
//           <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       <path d={area} fill="url(#pg)" />
//       <path d={path} fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       {/* Labels */}
//       {['$38k', '$42k', '$47.8k'].map((l, i) => (
//         <text key={l} x={8} y={[h - 4, h / 2, 14][i]} fontSize="10" fill="#475569">{l}</text>
//       ))}
//     </svg>
//   )
// }


'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '@/components/Topbar'
import WelcomeStrip from '@/components/WelcomeStrip'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import IncomeCards from '@/components/IncomeCards'
import BotStrip from '@/components/BotStrip'
import ExecutionGrid from '@/components/ExecutionGrid'
import LiveOpportunities from '@/components/LiveOpportunities'
import RecentUsers from '@/components/RecentUsers'
import BotModal from '@/components/BotModal'
import ReferralModal from '@/components/ReferralModal'
import PageLayout from '@/components/PageLayout'
import { EarningsTracker, Heatmap } from '@/components/EarningsSection'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/Sidebar'

export default function Dashboard() {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const [botModalOpen, setBotModalOpen] = useState(false)
  const [refModalOpen, setRefModalOpen] = useState(false)
  const [botActivated, setBotActivated] = useState(false)
  const [topPairs, setTopPairs] = useState([])
  const [totalToday, setTotalToday] = useState(0)
  const [portfolioValue, setPortfolioValue] = useState(0)
  const [portfolioPercentage, setPortfolioPercentage] = useState(0)
  const [loadingData, setLoadingData] = useState(true)
  const [showPopup, setShowPopup] = useState(false)

  // Fetch transaction data for top pairs calculation
  const fetchTransactionData = async () => {
    let userDataString = localStorage.getItem('userData')
    if (!userDataString) {
      userDataString = localStorage.getItem('UserData')
    }
    
    if (!userDataString) {
      setLoadingData(false)
      return
    }

    try {
      const parsedUserData = JSON.parse(userDataString)
      const userId = parsedUserData.UserId || parsedUserData.userId || parsedUserData.URID
      
      if (!userId) {
        setLoadingData(false)
        return
      }

      const url = `https://apis.arbionai.com/api/Authentication/getTransactionLog?URID=${userId}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()

      
      if (result.statusCode === 200 && result.data && result.data.length > 0) {
        // Calculate pair profits
        const pairProfitMap = new Map()
        let todayTotal = 0
        
        result.data.forEach(tx => {
          const amount = tx.Amount || 0
          const chain = tx.NetworkChain?.toLowerCase().includes('sol') ? 'SOL' :
                        tx.NetworkChain?.toLowerCase().includes('bsc') ? 'BSC' :
                        tx.NetworkChain?.toLowerCase().includes('eth') ? 'ETH' : 'ETH'
          
          // Create pair name based on token symbol
          const pair = `${tx.TokenSymbol || 'USDT'}/USDT`
          const key = `${chain}_${pair}`
          
          if (pairProfitMap.has(key)) {
            pairProfitMap.set(key, {
              chain,
              pair,
              profit: pairProfitMap.get(key).profit + amount,
              count: pairProfitMap.get(key).count + 1
            })
          } else {
            pairProfitMap.set(key, {
              chain,
              pair,
              profit: amount,
              count: 1
            })
          }
          
          todayTotal += amount
        })
        
        // Convert to array and sort by profit
        const sortedPairs = Array.from(pairProfitMap.values())
          .sort((a, b) => b.profit - a.profit)
          .slice(0, 5)
          .map(p => ({
            chain: p.chain,
            pair: p.pair,
            profit: `+$${p.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            cls: p.chain === 'SOL' ? 'tag-sol' : p.chain === 'ETH' ? 'tag-eth' : 'tag-bsc'
          }))
        
        setTopPairs(sortedPairs)
        setTotalToday(todayTotal)
        
        // Calculate portfolio value (cumulative sum of all transactions)
        const cumulativeSum = result.data.reduce((sum, tx) => sum + (tx.Amount || 0), 0)
        setPortfolioValue(cumulativeSum)
        
        // Calculate percentage change (mock for now, can be enhanced)
        setPortfolioPercentage(24.8)
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (!loading && isLoggedIn) {
      fetchTransactionData()
    } else {
      setLoadingData(false)
    }
  }, [loading, isLoggedIn])

  // Show popup once per session after login
  useEffect(() => {
    if (!loading && isLoggedIn) {
      const hasSeenPopup = sessionStorage.getItem('arbionPopupSeen')
      if (!hasSeenPopup) {
        setShowPopup(true)
      }
    }
  }, [loading, isLoggedIn])

  const handleClosePopup = () => {
    setShowPopup(false)
    sessionStorage.setItem('arbionPopupSeen', 'true')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-purple-900/20">Loading...</div>
  }

  // Default top pairs while loading
  const defaultTopPairs = [
    { chain: 'SOL', pair: 'SOL/USDC', profit: '+$1,240', cls: 'tag-sol' },
    { chain: 'ETH', pair: 'ETH/USDT', profit: '+$847', cls: 'tag-eth' },
    { chain: 'SOL', pair: 'BTC/USDT', profit: '+$612', cls: 'tag-sol' },
    { chain: 'BSC', pair: 'BNB/BUSD', profit: '+$391', cls: 'tag-bsc' },
    { chain: 'ETH', pair: 'MATIC/USDC', profit: '+$208', cls: 'tag-eth' },
  ]

  const displayTopPairs = loadingData ? defaultTopPairs : (topPairs.length > 0 ? topPairs : defaultTopPairs)
  const displayTotalToday = loadingData ? 3298 : totalToday

  return (
    <PageLayout topbarProps={{ onOpenRef: () => setRefModalOpen(true) }}>
      <WelcomeStrip />
      <AnnouncementBanner />
      <IncomeCards />
      <BotStrip onOpen={() => setBotModalOpen(true)} />
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3 mb-4">
        <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold">Trackers Chain</div>
           
          </div>
          <EarningsTracker />
          <Heatmap />
        </div>
        <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold">Live Opportunities</div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] pulse-dot shadow-[0_0_5px_#10b981]" />
          </div>
          <LiveOpportunities />
        </div>
      </div>
      <ExecutionGrid />
      <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3 mb-4">
        <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold">Portfolio Value · 30d</div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded tag-blue">+{portfolioPercentage}%</span>
          </div>
          <PortfolioChart portfolioValue={portfolioValue} />
        </div>
        <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
          <div className="mb-3 text-sm font-bold">Top Pairs Today</div>
          <div className="space-y-2.5">
            {displayTopPairs.map(p => (
              <div key={p.pair} className="flex items-center gap-2 text-[12.5px]">
                <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${p.cls}`}>{p.chain}</span>
                <span className="flex-1 font-bold">{p.pair}</span>
                <span className="font-mono font-bold text-[#10b981]">{p.profit}</span>
              </div>
            ))}
            <hr className="border-[rgba(255,255,255,0.06)]" />
            <div className="flex justify-between text-[12px]">
              <span className="text-[var(--t2)]">Total today</span>
              <span className="font-mono font-black text-[#10b981]">+${displayTotalToday.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
      <RecentUsers />
      <div className="h-4" />
      <BotModal
        open={botModalOpen}
        onClose={() => setBotModalOpen(false)}
        onActivate={() => { setBotActivated(true); setBotModalOpen(false) }}
      />
      <ReferralModal open={refModalOpen} onClose={() => setRefModalOpen(false)} />

      {/* Arbion Popup Image Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) handleClosePopup() }}
        >
          <div className="relative bg-[#060f20] border border-[rgba(124,58,237,0.2)] rounded-2xl p-4 w-full max-w-lg mx-4 shadow-[0_0_60px_rgba(124,58,237,0.15)]">
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-[var(--t3)] hover:text-[var(--t1)] hover:bg-black/60 transition-all text-lg leading-none"
            >
              ✕
            </button>
            <img
              src="/Arbion-Popup.png"
              alt="Arbion Popup"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </PageLayout>
  )
}

// Inline SVG portfolio chart with dynamic data
function PortfolioChart({ portfolioValue = 47800 }) {
  // Generate realistic points based on portfolio value
  const baseValue = portfolioValue || 47800
  const points = []
  let current = baseValue * 0.6 // Start at 60% of current value
  
  for (let i = 0; i <= 30; i++) {
    // Add some realistic growth pattern
    const growth = (Math.random() * 0.03 + 0.01) * current
    current += growth
    points.push(current)
  }
  
  // Normalize to target portfolio value
  const lastValue = points[points.length - 1]
  const scale = baseValue / lastValue
  const scaledPoints = points.map(p => p * scale)
  
  const w = 600, h = 160
  const minV = Math.min(...scaledPoints) * 0.95
  const maxV = Math.max(...scaledPoints) * 1.05
  const xs = scaledPoints.map((_, i) => (i / (scaledPoints.length - 1)) * w)
  const ys = scaledPoints.map(v => h - ((v - minV) / (maxV - minV)) * h)
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ')
  const area = path + ` L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 190 }}>
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#pg)" />
      <path d={path} fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dynamic Labels */}
      <text x={8} y={h - 4} fontSize="10" fill="#475569">${Math.floor(minV / 1000)}k</text>
      <text x={8} y={h / 2} fontSize="10" fill="#475569">${Math.floor((minV + maxV) / 2 / 1000)}k</text>
      <text x={8} y={14} fontSize="10" fill="#475569">${Math.floor(maxV / 1000)}k</text>
    </svg>
  )
}