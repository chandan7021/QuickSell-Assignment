import React from "react";

function DisplayOptions({ grouping, sortBy, onGroupChange, onSortChange }) {
  return (
    <div className="display-options">
      <select value={grouping} onChange={(e) => onGroupChange(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="assignee">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value={null}>Sort by</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
      <button onClick={() => {}}>Display</button>
    </div>
  );
}

export default DisplayOptions;
