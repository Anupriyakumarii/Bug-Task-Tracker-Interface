// import React, { useState, useEffect } from 'react';
// import {
//   User,
//   Plus,
//   Edit3,
//   Trash2,
//   Filter,
//   Clock,
//   Play,
//   Pause,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   TrendingUp,
//   Users,
//   Bug,
//   Search,
//   Calendar,
//   BarChart3
// } from 'lucide-react';

// const BugTracker = () => {
//   // Authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loginData, setLoginData] = useState({ username: '', password: '' });

//   // Tasks state
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: 'Login page CSS issues',
//       description: 'Fix responsive design issues on mobile devices',
//       priority: 'High',
//       status: 'In Progress',
//       assignee: 'john_dev',
//       reporter: 'jane_manager',
//       createdDate: '2025-06-10',
//       dueDate: '2025-06-15',
//       timeSpent: 120,
//       isTimerRunning: false,
//       timerStart: null,
//       category: 'Bug',
//       tags: ['CSS', 'Mobile', 'UI']
//     },
//     {
//       id: 2,
//       title: 'Database optimization',
//       description: 'Optimize query performance for user dashboard',
//       priority: 'Medium',
//       status: 'Pending Approval',
//       assignee: 'mike_dev',
//       reporter: 'jane_manager',
//       createdDate: '2025-06-08',
//       dueDate: '2025-06-20',
//       timeSpent: 240,
//       isTimerRunning: false,
//       timerStart: null,
//       category: 'Task',
//       tags: ['Database', 'Performance']
//     },
//     {
//       id: 3,
//       title: 'API endpoint security',
//       description: 'Implement authentication middleware for protected routes',
//       priority: 'High',
//       status: 'Closed',
//       assignee: 'sarah_dev',
//       reporter: 'jane_manager',
//       createdDate: '2025-06-05',
//       dueDate: '2025-06-12',
//       timeSpent: 180,
//       isTimerRunning: false,
//       timerStart: null,
//       category: 'Task',
//       tags: ['Security', 'API']
//     }
//   ]);

//   // UI state
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [filterPriority, setFilterPriority] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('createdDate');
//   const [activeTab, setActiveTab] = useState('dashboard');

//   // Mock users
//   const users = {
//     'john_dev': { username: 'john_dev', password: 'dev123', role: 'Developer', name: 'John Smith' },
//     'mike_dev': { username: 'mike_dev', password: 'dev123', role: 'Developer', name: 'Mike Johnson' },
//     'sarah_dev': { username: 'sarah_dev', password: 'dev123', role: 'Developer', name: 'Sarah Wilson' },
//     'jane_manager': { username: 'jane_manager', password: 'mgr123', role: 'Manager', name: 'Jane Doe' }
//   };

//   // New task form state
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     priority: 'Medium',
//     status: 'Open',
//     assignee: '',
//     dueDate: '',
//     category: 'Bug',
//     tags: ''
//   });

//   // Authentication functions
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const user = users[loginData.username];
//     if (user && user.password === loginData.password) {
//       setCurrentUser(user);
//       setIsAuthenticated(true);
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setCurrentUser(null);
//     setLoginData({ username: '', password: '' });
//   };

//   // Task management functions
//   const createTask = (e) => {
//     e.preventDefault();
//     const task = {
//       ...newTask,
//       id: Date.now(),
//       reporter: currentUser.username,
//       createdDate: new Date().toISOString().split('T')[0],
//       timeSpent: 0,
//       isTimerRunning: false,
//       timerStart: null,
//       tags: newTask.tags ? newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
//     };
//     setTasks([...tasks, task]);
//     setNewTask({
//       title: '',
//       description: '',
//       priority: 'Medium',
//       status: 'Open',
//       assignee: '',
//       dueDate: '',
//       category: 'Bug',
//       tags: ''
//     });
//     setShowCreateModal(false);
//   };

//   const updateTask = (taskId, updates) => {
//     setTasks(tasks.map(task =>
//       task.id === taskId ? { ...task, ...updates } : task
//     ));
//   };

//   const deleteTask = (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       setTasks(tasks.filter(task => task.id !== taskId));
//     }
//   };

//   const toggleTimer = (taskId) => {
//     const task = tasks.find(t => t.id === taskId);
//     if (task.isTimerRunning) {
//       // Stop timer
//       const timeToAdd = Math.floor((Date.now() - task.timerStart) / 1000 / 60);
//       updateTask(taskId, {
//         isTimerRunning: false,
//         timerStart: null,
//         timeSpent: task.timeSpent + timeToAdd
//       });
//     } else {
//       // Start timer
//       updateTask(taskId, {
//         isTimerRunning: true,
//         timerStart: Date.now()
//       });
//     }
//   };

//   const closeTask = (taskId) => {
//     updateTask(taskId, { status: 'Pending Approval' });
//   };

//   const approveTask = (taskId) => {
//     updateTask(taskId, { status: 'Closed' });
//   };

//   const reopenTask = (taskId) => {
//     updateTask(taskId, { status: 'In Progress' });
//   };

//   // Filter and sort functions
//   const filteredTasks = tasks.filter(task => {
//     const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
//     const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
//     const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesUser = currentUser.role === 'Manager' || task.assignee === currentUser.username;

//     return matchesStatus && matchesPriority && matchesSearch && matchesUser;
//   }).sort((a, b) => {
//     if (sortBy === 'priority') {
//       const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
//       return priorityOrder[b.priority] - priorityOrder[a.priority];
//     }
//     return new Date(b[sortBy]) - new Date(a[sortBy]);
//   });

//   // Dashboard stats
//   const getStats = () => {
//     const userTasks = currentUser.role === 'Manager' ? tasks :
//                      tasks.filter(task => task.assignee === currentUser.username);

//     return {
//       total: userTasks.length,
//       open: userTasks.filter(task => task.status === 'Open').length,
//       inProgress: userTasks.filter(task => task.status === 'In Progress').length,
//       closed: userTasks.filter(task => task.status === 'Closed').length,
//       pending: userTasks.filter(task => task.status === 'Pending Approval').length,
//       totalTime: userTasks.reduce((sum, task) => sum + task.timeSpent, 0)
//     };
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High': return 'text-red-600 bg-red-100';
//       case 'Medium': return 'text-yellow-600 bg-yellow-100';
//       case 'Low': return 'text-green-600 bg-green-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Open': return 'text-blue-600 bg-blue-100';
//       case 'In Progress': return 'text-purple-600 bg-purple-100';
//       case 'Closed': return 'text-green-600 bg-green-100';
//       case 'Pending Approval': return 'text-orange-600 bg-orange-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const updateEditingTask = (e) => {
//     e.preventDefault();
//     updateTask(editingTask.id, editingTask);
//     setEditingTask(null);
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
//           <div className="text-center mb-8">
//             <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Bug className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">TaskFlow</h1>
//             <p className="text-white/70">Bug & Task Tracker</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={loginData.username}
//                 onChange={(e) => setLoginData({...loginData, username: e.target.value})}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
//             <p className="text-white/70 text-xs mb-2">Demo Credentials:</p>
//             <p className="text-white/60 text-xs">Developer: john_dev / dev123</p>
//             <p className="text-white/60 text-xs">Manager: jane_manager / mgr123</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const stats = getStats();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-4">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
//                 <Bug className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
//                 <p className="text-sm text-gray-500">Bug & Task Management</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
//                 <p className="text-xs text-gray-500">{currentUser.role}</p>
//               </div>
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab('dashboard')}
//               className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === 'dashboard'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <BarChart3 className="w-4 h-4 inline mr-2" />
//               Dashboard
//             </button>
//             <button
//               onClick={() => setActiveTab('tasks')}
//               className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === 'tasks'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Bug className="w-4 h-4 inline mr-2" />
//               Tasks & Bugs
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {activeTab === 'dashboard' && (
//           <div className="space-y-8">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-blue-100 text-sm">Total Tasks</p>
//                     <p className="text-3xl font-bold">{stats.total}</p>
//                   </div>
//                   <Bug className="w-8 h-8 text-blue-200" />
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-green-100 text-sm">Open</p>
//                     <p className="text-3xl font-bold">{stats.open}</p>
//                   </div>
//                   <AlertCircle className="w-8 h-8 text-green-200" />
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-purple-100 text-sm">In Progress</p>
//                     <p className="text-3xl font-bold">{stats.inProgress}</p>
//                   </div>
//                   <Play className="w-8 h-8 text-purple-200" />
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-orange-100 text-sm">Pending</p>
//                     <p className="text-3xl font-bold">{stats.pending}</p>
//                   </div>
//                   <Clock className="w-8 h-8 text-orange-200" />
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-teal-100 text-sm">Total Hours</p>
//                     <p className="text-3xl font-bold">{Math.floor(stats.totalTime / 60)}</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-teal-200" />
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
//               <div className="space-y-4">
//                 {filteredTasks.slice(0, 5).map(task => (
//                   <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
//                     <div className={`w-3 h-3 rounded-full ${
//                       task.status === 'Closed' ? 'bg-green-500' :
//                       task.status === 'In Progress' ? 'bg-purple-500' :
//                       task.status === 'Pending Approval' ? 'bg-orange-500' : 'bg-blue-500'
//                     }`} />
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900">{task.title}</p>
//                       <p className="text-sm text-gray-500">
//                         {task.assignee} • {task.createdDate}
//                       </p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
//                       {task.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'tasks' && (
//           <div className="space-y-6">
//             {/* Controls */}
//             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//               <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search tasks..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="All">All Status</option>
//                   <option value="Open">Open</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Pending Approval">Pending Approval</option>
//                   <option value="Closed">Closed</option>
//                 </select>

//                 <select
//                   value={filterPriority}
//                   onChange={(e) => setFilterPriority(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="All">All Priority</option>
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>

//               {currentUser.role === 'Developer' && (
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span>New Task</span>
//                 </button>
//               )}
//             </div>

//             {/* Tasks Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredTasks.map(task => (
//                 <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
//                       <p className="text-sm text-gray-600 mb-3">{task.description}</p>
//                     </div>
//                     {currentUser.role === 'Developer' && task.assignee === currentUser.username && (
//                       <div className="flex space-x-1 ml-2">
//                         <button
//                           onClick={() => setEditingTask(task)}
//                           className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
//                         >
//                           <Edit3 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => deleteTask(task.id)}
//                           className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
//                       {task.priority}
//                     </span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
//                       {task.status}
//                     </span>
//                     <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
//                       {task.category}
//                     </span>
//                   </div>

//                   <div className="space-y-2 text-sm text-gray-600 mb-4">
//                     <div className="flex justify-between">
//                       <span>Assignee:</span>
//                       <span className="font-medium">{task.assignee}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Due Date:</span>
//                       <span>{task.dueDate}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Time Spent:</span>
//                       <span>{Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     {currentUser.role === 'Developer' && task.assignee === currentUser.username && (
//                       <>
//                         <button
//                           onClick={() => toggleTimer(task.id)}
//                           className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
//                             task.isTimerRunning
//                               ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                               : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
//                           }`}
//                         >
//                           {task.isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
//                           <span>{task.isTimerRunning ? 'Stop' : 'Start'}</span>
//                         </button>

//                         {task.status !== 'Closed' && task.status !== 'Pending Approval' && (
//                           <button
//                             onClick={() => closeTask(task.id)}
//                             className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
//                           >
//                             <CheckCircle className="w-3 h-3" />
//                             <span>Close</span>
//                           </button>
//                         )}
//                       </>
//                     )}

//                     {currentUser.role === 'Manager' && task.status === 'Pending Approval' && (
//                       <>
//                         <button
//                           onClick={() => approveTask(task.id)}
//                           className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
//                         >
//                           <CheckCircle className="w-3 h-3" />
//                           <span>Approve</span>
//                         </button>
//                         <button
//                           onClick={() => reopenTask(task.id)}
//                           className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
//                         >
//                           <XCircle className="w-3 h-3" />
//                           <span>Reopen</span>
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Create Task Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
//             </div>

//             <form onSubmit={createTask} className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) => setNewTask({...newTask, title: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={newTask.description}
//                   onChange={(e) => setNewTask({...newTask, description: e.target.value})}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                   <select
//                     value={newTask.priority}
//                     onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High"></option>
