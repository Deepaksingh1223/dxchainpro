// "use client";
// import { CiMenuFries } from "react-icons/ci";
// export default function DashboardHeader({ theme, toggleTheme }) {
//   return (
//     <header className="topbar">
//       <div className="tb-l">

//         <div className="pgtitle"> 
//           <div className="nbtn">
//             <CiMenuFries />
//           </div>
//           Dashboard <span style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 400 }}>/ Overview</span>
//         </div>

//       </div>
//       <div className="tb-r">
//         <div className="schip">
//           <span className="dot dc"></span>
//           BOT ACTIVE
//         </div>
//         <div className="schip">
//           <span className="dot dg"></span>
//           3 CHAINS
//         </div>
//         <div className="schip">
//           <span className="dot dy"></span>
//           34 gwei
//         </div>
//         <div className="pchip">
//           ▲ +$<span id="tp">341.21</span> today
//         </div>

//         <button
//           onClick={toggleTheme}
//           className={`theme-btn nbtn ${theme === 'dark' ? 'active' : ''}`}
//           style={{ fontSize: '18px' }}
//         >
//           🌙
//         </button>
//         <button className="bdep">+ Deposit</button>
//       </div>
//     </header>
//   );
// }


"use client";

import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

export default function DashboardHeader({ theme, toggleTheme }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) return;

    if (sidebarOpen) {
      sidebar.style.width = "300px";
      sidebar.style.overflow = "hidden";
    } else {
      sidebar.style.width = "0px"; // apni original width do
      sidebar.style.overflow = "hidden";
    }

    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="topbar">
      <div className="tb-l">

        <div className="pgtitle">


          Dashboard
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              fontWeight: 400
            }}
          >
            / Overview
          </span>
        </div>
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

        <button
          onClick={toggleTheme}
          className={`theme-btn nbtn ${theme === "dark" ? "active" : ""}`}
          style={{ fontSize: "18px" }}
        >
          🌙
        </button>

        <button className="bdep">+ Deposit</button>
        <div className="btn-mb-show">
          <div className="nbtn " onClick={toggleSidebar}>
            <CiMenuFries />
          </div>
        </div>
      </div>
    </header>
  );
}