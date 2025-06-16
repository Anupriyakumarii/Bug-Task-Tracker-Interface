# Bug-Task-Tracker-Interface

# 🐞 Bug / Task Tracker Interface (React)

A role-based task/bug tracking interface built with **React**, supporting **Developer** and **Manager** roles. Users can create, filter, and view tasks/bugs with detailed information such as priority, status, assignee, dates, time spent, and approval status.

---

## 🚀 Features

- 👤 Role-based Login (`Developer`, `Manager`)
- 📝 Task/Bug Creation with:
  - Title, Description, Priority, Status
  - Assignee, Created Date, Due Date
  - Time Spent, Approval Status
- 🔎 Filtering by Status and Priority
- 🔃 Sorting by Priority
- 🧑‍💼 Developer and Manager workflows

---

## 🛠️ Technologies Used

- React (Functional Components + Hooks)
- React Router DOM
- CSS for UI Styling (custom)

---

## 🧑‍💻 How to Run the Project Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bug-task-tracker.git
   cd bug-task-tracker
   npm install
   npm run dev
   ```

2.**Login credentials (mocked):**

Username Password Role  
dev 123 developer  
manager 456 manager

3.**Assumptions Made**  
Authentication is mocked via a hardcoded user list.

All task data is stored in component state and reset on page refresh.

Approval process is currently visual (no backend logic).

No separate backend/API integration – everything is client-side.
