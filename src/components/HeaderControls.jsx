import React, { useState } from "react";
import { format } from "date-fns";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/FilterSidebar";

export default function HeaderControls({
  today,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  searchValue,
  setSearchValue,
}) {
  // Sidebar open/close state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      {/* Top Bar Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Left: Current Date */}
        <div>
          <h2 style={{ margin: 0 }}>{format(today, "EEEE, dd MMMM yyyy")}</h2>
        </div>

        {/* Right: Search, Filter, Month & Year Selectors */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid #555",
              backgroundColor: "#111",
              color: "#fff",
            }}
          />

          {/* Filter Icon */}
          <FaFilter
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setIsFilterOpen(true)}
          />

          {/* Month Selector */}
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#111",
              color: "#fff",
            }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <option value={index} key={index}>
                {format(new Date(currentYear, index), "MMMM")}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#111",
              color: "#fff",
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const year = today.getFullYear() - 2 + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}

// import React from "react";
// import { format } from "date-fns";
// import { FaFilter } from "react-icons/fa";
// import FilterSidebar from "../components/FilterSidebar";

// export default function HeaderControls({
//   today,
//   currentMonth,
//   setCurrentMonth,
//   currentYear,
//   setCurrentYear,
//   searchValue,
//   setSearchValue,
//   onFilterClick,
// }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "20px",
//       }}
//     >
//       {/* Left: Current Date */}
//       <div>
//         <h2 style={{ margin: 0 }}>{format(today, "EEEE, dd MMMM yyyy")}</h2>
//       </div>

//       {/* Right: Search, Filter, Month & Year Selectors */}
//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         {/* Search Box */}
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           style={{
//             padding: "5px 10px",
//             borderRadius: "5px",
//             border: "1px solid #555",
//             backgroundColor: "#111",
//             color: "#fff",
//           }}
//         />

//         {/* Filter Icon */}
//         <FaFilter
//           size={20}
//           style={{ cursor: "pointer" }}
//           onClick={onFilterClick}
//         />

//         {/* Month Selector */}
//         <select
//           value={currentMonth}
//           onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
//           style={{
//             padding: "5px",
//             borderRadius: "5px",
//             backgroundColor: "#111",
//             color: "#fff",
//           }}
//         >
//           {Array.from({ length: 12 }).map((_, index) => (
//             <option value={index} key={index}>
//               {format(new Date(currentYear, index), "MMMM")}
//             </option>
//           ))}
//         </select>

//         {/* Year Selector */}
//         <select
//           value={currentYear}
//           onChange={(e) => setCurrentYear(parseInt(e.target.value))}
//           style={{
//             padding: "5px",
//             borderRadius: "5px",
//             backgroundColor: "#111",
//             color: "#fff",
//           }}
//         >
//           {Array.from({ length: 5 }).map((_, index) => {
//             const year = today.getFullYear() - 2 + index;
//             return (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//     </div>
//   );
// }
