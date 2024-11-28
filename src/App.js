import React, { useState, useEffect } from "react";
import "./App.css";

// Import icons
import AddIcon from "./assets/icons/add.svg";
import BacklogIcon from "./assets/icons/Backlog.svg";
import CancelledIcon from "./assets/icons/Cancelled.svg";
import DoneIcon from "./assets/icons/Done.svg";
import InProgressIcon from "./assets/icons/in-progress.svg";
import ToDoIcon from "./assets/icons/To-do.svg";
import LowPriorityIcon from "./assets/icons/Img - Low Priority.svg";
import MediumPriorityIcon from "./assets/icons/Img - Medium Priority.svg";
import HighPriorityIcon from "./assets/icons/Img - High Priority.svg";
import UrgentPriorityIcon from "./assets/icons/SVG - Urgent Priority colour.svg";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const priorityIcons = {
  4: UrgentPriorityIcon,
  3: HighPriorityIcon,
  2: MediumPriorityIcon,
  1: LowPriorityIcon,
  0: null, // No priority icon
};

const statusIcons = {
  backlog: BacklogIcon,
  cancelled: CancelledIcon,
  done: DoneIcon,
  "in-progress": InProgressIcon,
  todo: ToDoIcon,
};

const priorityLevels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const groupedTickets = () => {
    let grouped = {};
    if (grouping === "status") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === "priority") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = acc[ticket.priority] || [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    }
    return grouped;
  };

  const sortTickets = (tickets) => {
    if (ordering === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (ordering === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const renderGroupedTickets = () => {
    const grouped = groupedTickets();
    return Object.entries(grouped).map(([key, group]) => (
      <div className="group" key={key}>
        <h3>
          {grouping === "priority" ? (
            <img src={priorityIcons[key]} alt={priorityLevels[key]} />
          ) : (
            <img src={statusIcons[key]} alt={key} />
          )}{" "}
          {grouping === "priority" ? priorityLevels[key] : key}
        </h3>
        <div className="ticket-container">
          {sortTickets(group).map((ticket) => (
            <div className="ticket" key={ticket.id}>
              <h4>
                <img
                  src={priorityIcons[ticket.priority]}
                  alt={priorityLevels[ticket.priority]}
                />{" "}
                {ticket.title}
              </h4>
              <p>Priority: {priorityLevels[ticket.priority]}</p>
              <p>Status: {ticket.status}</p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Kanban Board</h1>
        <img src={AddIcon} alt="Add Ticket" />
        <div className="controls">
          <label>
            Grouping:
            <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label>
            Ordering:
            <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      </header>
      <main className="kanban">{renderGroupedTickets()}</main>
    </div>
  );
}

export default App;
