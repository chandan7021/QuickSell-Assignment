// import React, { useState, useEffect } from "react";
// import KanbanColumn from "./KanbanColumn";
// import DisplayOptions from "./DisplayOptions";
// import "./style.css";

// function KanbanBoard() {
//   const [tickets, setTickets] = useState([]);
//   const [grouping, setGrouping] = useState("status");
//   const [sortBy, setSortBy] = useState(null);

//   useEffect(() => {
//     // Fetch tickets from API
//     fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched data:", data);  // Log the response to check if it's an array
//         setTickets(data);
//       })
//       .catch((error) => console.error("Error fetching tickets:", error));
//   }, []);

//   const handleGroupChange = (newGrouping) => {
//     setGrouping(newGrouping);
//   };

//   const handleSortChange = (newSortBy) => {
//     setSortBy(newSortBy);
//   };

//   const groupedTickets = tickets.reduce((groups, ticket) => {
//     const key = ticket[grouping];
//     if (!groups[key]) groups[key] = [];
//     groups[key].push(ticket);
//     return groups;
//   }, {});

//   if (sortBy) {
//     Object.keys(groupedTickets).forEach((group) => {
//       groupedTickets[group].sort((a, b) => {
//         if (sortBy === "priority") return b.priority - a.priority;
//         if (sortBy === "title") return a.title.localeCompare(b.title);
//         return 0;
//       });
//     });
//   }

//   return (
//     <div className="kanban-board">
//       <DisplayOptions
//         grouping={grouping}
//         sortBy={sortBy}
//         onGroupChange={handleGroupChange}
//         onSortChange={handleSortChange}
//       />
//       <div className="kanban-columns">
//         {Object.keys(groupedTickets).map((groupKey) => (
//           <KanbanColumn key={groupKey} title={groupKey} tickets={groupedTickets[groupKey]} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KanbanBoard;

import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import DisplayOptions from "./DisplayOptions";

function KanbanBoard() {
  const [tickets, setTickets] = useState([]); // Initialize as an empty array
  const [grouping, setGrouping] = useState("status");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    // Fetch tickets from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the response to debug
        if (Array.isArray(data)) {
          setTickets(data); // Set tickets only if the response is an array
        } else {
          console.error("Unexpected data format:", data);
          setTickets([]); // Fallback to an empty array
        }
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const handleGroupChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Safeguard `.reduce()` usage
  const groupedTickets = Array.isArray(tickets)
    ? tickets.reduce((groups, ticket) => {
        const key = ticket[grouping] || "Uncategorized"; // Fallback group
        if (!groups[key]) groups[key] = [];
        groups[key].push(ticket);
        return groups;
      }, {})
    : {}; // Fallback to an empty object if tickets is not an array

  if (sortBy) {
    Object.keys(groupedTickets).forEach((group) => {
      groupedTickets[group].sort((a, b) => {
        if (sortBy === "priority") return b.priority - a.priority;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    });
  }

  return (
    <div className="kanban-board">
      <DisplayOptions
        grouping={grouping}
        sortBy={sortBy}
        onGroupChange={handleGroupChange}
        onSortChange={handleSortChange}
      />
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((groupKey) => (
          <KanbanColumn
            key={groupKey}
            title={groupKey}
            tickets={groupedTickets[groupKey]}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;

