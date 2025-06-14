// import TaskItem from "./TaskItem";
// import "../styles/TaskForm.css";

// export default function TaskList({ tasks, updateTask, deleteTask, user }) {
//   return (
//     <div className="task-list">
//       <h3>Your Tasks</h3>
//       {tasks.length === 0 && <p>No tasks yet.</p>}
//       {tasks.map((task) => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           updateTask={updateTask}
//           deleteTask={deleteTask}
//           user={user}
//         />
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, updateTask, deleteTask, user }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter === "all" || task.status === statusFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter)
    );
  });

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="pending approval">Pending Approval</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {filteredTasks.length === 0 && <p>No tasks to show.</p>}
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          user={user}
        />
      ))}
    </div>
  );
}
