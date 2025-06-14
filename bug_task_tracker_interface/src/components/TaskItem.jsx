// export default function TaskItem({ task, updateTask, deleteTask, user }) {
//   const toggleStatus = () => {
//     const nextStatus = task.status === "open" ? "pending approval" : "open";
//     updateTask(task.id, { ...task, status: nextStatus });
//   };

//   return (
//     <div className="task-card">
//       <h4>{task.title}</h4>
//       <p>{task.description}</p>
//       <p>
//         <strong>Priority:</strong> {task.priority}
//       </p>
//       <p>
//         <strong>Status:</strong> {task.status}
//       </p>
//       <div className="task-actions">
//         {user?.role === "developer" && (
//           <button onClick={toggleStatus}>Toggle Status</button>
//         )}
//         <button onClick={() => deleteTask(task.id)}>Delete</button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./TaskItem.css";

export default function TaskItem({ task, updateTask, deleteTask, user }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent || 0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    updateTask(task.id, { ...task, timeSpent });
  }, [timeSpent]);

  const toggleStatus = () => {
    const nextStatus = task.status === "open" ? "pending approval" : "open";
    updateTask(task.id, { ...task, status: nextStatus });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Time Spent:</strong> {formatTime(timeSpent)}
      </p>

      <div className="task-actions">
        {user?.role === "developer" && (
          <>
            <button onClick={toggleStatus}>Toggle Status</button>
            <button onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? "Pause Timer" : "Start Timer"}
            </button>
          </>
        )}
        {user?.role === "manager" && task.status === "pending approval" && (
          <>
            <button
              onClick={() => updateTask(task.id, { ...task, status: "closed" })}
            >
              Approve
            </button>
            <button
              onClick={() => updateTask(task.id, { ...task, status: "open" })}
            >
              Reopen
            </button>
          </>
        )}
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}
