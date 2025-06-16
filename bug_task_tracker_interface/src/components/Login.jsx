import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const users = [
  { username: "dev", password: "123", role: "developer" },
  { username: "manager", password: "456", role: "manager" },
];

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  //  Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" onKeyDown={handleKeyDown} tabIndex={0}>
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
