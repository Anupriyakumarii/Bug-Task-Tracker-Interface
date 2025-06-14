import { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "open",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...task, id: Date.now(), createdAt: new Date().toISOString() });
    setTask({ title: "", description: "", priority: "low", status: "open" });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Create New Task</h3>
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
