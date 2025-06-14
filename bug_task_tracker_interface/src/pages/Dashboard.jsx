// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const u = JSON.parse(localStorage.getItem("user"));
//     setUser(u);
//   }, []);

//   return (
//     <div className="container">
//       <h1 style={{ marginBottom: "20px" }}>Welcome {user?.username}!</h1>
//       <div className="card">
//         <p>
//           Role: <strong>{user?.role}</strong>
//         </p>
//         <p>This is your dashboard.</p>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const u = JSON.parse(localStorage.getItem("user"));
//     setUser(u);
//   }, []);

//   const addTask = (task) => setTasks((prev) => [...prev, task]);
//   const updateTask = (id, updatedTask) =>
//     setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
//   const deleteTask = (id) =>
//     setTasks((prev) => prev.filter((t) => t.id !== id));

//   return (
//     <div className="dashboard-container">
//       <h2>
//         Hello, {user?.username} ({user?.role})
//       </h2>
//       <TaskForm addTask={addTask} />
//       <TaskList
//         tasks={tasks}
//         updateTask={updateTask}
//         deleteTask={deleteTask}
//         user={user}
//       />
//     </div>
//   );
// }

// File: src/pages/Dashboard.jsx
// File: src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Fix login bug",
      description: "Resolve issue with login for new users",
      priority: "High",
      status: "Open",
      assignee: "dev",
      createdDate: "2025-06-10",
      dueDate: "2025-06-15",
      timeSpent: 2,
      approvalStatus: "Pending",
    },
    {
      id: 2,
      title: "UI updates",
      description: "Improve dashboard layout and responsiveness",
      priority: "Medium",
      status: "Closed",
      assignee: "dev",
      createdDate: "2025-06-08",
      dueDate: "2025-06-14",
      timeSpent: 3,
      approvalStatus: "Approved",
    },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignee: "",
    createdDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    timeSpent: 0,
    approvalStatus: "Pending",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/");
    else setUser(JSON.parse(userData));
  }, []);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      alert("Please fill in Title, Assignee, and Due Date.");
      return;
    }
    const task = { ...newTask, id: Date.now() };
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "Low",
      status: "Open",
      assignee: "",
      createdDate: new Date().toISOString().slice(0, 10),
      dueDate: "",
      timeSpent: 0,
      approvalStatus: "Pending",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard ({user?.role})</h2>

      {user?.role === "developer" && (
        <div className="task-form">
          <h3>Create Task/Bug</h3>
          <input
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            name="assignee"
            placeholder="Assignee"
            value={newTask.assignee}
            onChange={handleInputChange}
          />
          <input
            name="createdDate"
            type="date"
            value={newTask.createdDate}
            onChange={handleInputChange}
          />
          <input
            name="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}

      <div className="task-list">
        <h3>Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Created</th>
              <th>Due</th>
              <th>Time Spent</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task) =>
                user?.role === "developer"
                  ? task.assignee === user.username
                  : true
              )
              .map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.assignee}</td>
                  <td>{task.createdDate}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.timeSpent} hrs</td>
                  <td>{task.approvalStatus}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
