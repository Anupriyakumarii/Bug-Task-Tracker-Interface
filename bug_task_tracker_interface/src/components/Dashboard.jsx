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
    {
      id: 3,
      title: "Add dark mode toggle",
      description: "Implement theme switcher for light and dark modes",
      priority: "Low",
      status: "Open",
      assignee: "dev",
      createdDate: "2025-06-10",
      dueDate: "2025-06-18",
      timeSpent: 2,
      approvalStatus: "Pending",
    },
    {
      id: 4,
      title: "Optimize API performance",
      description: "Reduce response time for task retrieval by caching queries",
      priority: "High",
      status: "Open",
      assignee: "dev",
      createdDate: "2025-06-11",
      dueDate: "2025-06-20",
      timeSpent: 4,
      approvalStatus: "Not Required",
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

  const [filterStatus, setFilterStatus] = useState("");
  const [sortByPriority, setSortByPriority] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        🚀 {user?.role?.toUpperCase()} DASHBOARD
      </h2>

      {user?.role === "developer" && (
        <div className="task-form">
          <h3>Create Task</h3>

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
          <div className="date-inputs">
            <div className="date-field">
              <label htmlFor="createdDate">📅 Created Date</label>
              <input
                id="createdDate"
                name="createdDate"
                type="date"
                value={newTask.createdDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="date-field">
              <label htmlFor="dueDate">⏰ Due Date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

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
      <div className="task-controls">
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Closed">Closed</option>
        </select>

        <select onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select onChange={(e) => setSortByPriority(e.target.value)}>
          <option value="">Sort by Priority</option>
          <option value="High">High to Low</option>
          <option value="Low">Low to High</option>
        </select>
      </div>

      <div className="task-list">
        <h3 className="task-heading">📋 Tasks</h3>
        <div className="task-cards">
          {tasks
            .filter((task) => {
              const matchesUser =
                user?.role === "developer"
                  ? task.assignee === user.username
                  : true;
              const matchesStatus = filterStatus
                ? task.status === filterStatus
                : true;
              const matchesPriority = filterPriority
                ? task.priority === filterPriority
                : true;
              return matchesUser && matchesStatus && matchesPriority;
            })
            .sort((a, b) => {
              if (!sortByPriority) return 0;
              const priorityOrder = { High: 3, Medium: 2, Low: 1 };
              return sortByPriority === "High"
                ? priorityOrder[b.priority] - priorityOrder[a.priority]
                : priorityOrder[a.priority] - priorityOrder[b.priority];
            })

            .map((task) => (
              <div className="task-card" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>
                  <span className="field">Priority:</span> {task.priority}{" "}
                  <span className={`tag ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </p>
                <p>
                  <span className="field">Status:</span> {task.status}{" "}
                  <span
                    className={`tag ${task.status
                      .toLowerCase()
                      .replace(" ", "")}`}
                  >
                    {task.status}
                  </span>
                </p>
                <p>
                  <span className="field">Assignee:</span> {task.assignee}
                </p>
                <p>
                  <span className="field">Created:</span> {task.createdDate}
                </p>
                <p>
                  <span className="field">Due:</span> {task.dueDate}
                </p>
                <p>
                  <span className="field">Time Spent:</span> {task.timeSpent}{" "}
                  hrs
                </p>
                <p>
                  <span className="field">Approval:</span> {task.approvalStatus}{" "}
                  <span className="tag pending">{task.approvalStatus}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
