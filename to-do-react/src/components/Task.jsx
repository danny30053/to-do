import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`}>
      <div>
        <h3>
          {task.text} {task.completed ? <FaCheck style={{color:'#009a00'}} /> : ""}
        </h3>
        <p style={{ marginBottom: "none", paddingBottom: "none" }}>
          {task.dueDate}
        </p>
      </div>
      <div className="btn-container">
        <button
          className={`btn ${!task.completed ? "btn-edit" : "btn-disabled"}`}
          onClick={() => {
            onEdit(task.id);
          }}
          disabled={task.completed}
        >
          Mark Completed
        </button>
        <div
          className="btn btn-delete "
          onClick={() => {
            onDelete(task.id);
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default Task;
