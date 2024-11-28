import React from "react";

function KanbanCard({ ticket }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 4:
        return "priority-urgent";
      case 3:
        return "priority-high";
      case 2:
        return "priority-medium";
      case 1:
        return "priority-low";
      default:
        return "priority-none";
    }
  };

  return (
    <div className="kanban-card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <span className={`priority ${getPriorityClass(ticket.priority)}`}>{getPriorityLabel(ticket.priority)}</span>
      <div className="assignee">Assigned to: {ticket.assignee}</div>
    </div>
  );
}

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    default:
      return "None";
  }
};

export default KanbanCard;
