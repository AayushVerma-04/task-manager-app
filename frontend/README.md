# 📝 Task Manager App

A full-stack task management application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This app helps users manage and track their tasks efficiently, with a clean UI and responsive design.

---

## 🚀 Features

- 🔐 User Authentication (Signup & Login using JWT)
- 📅 Create, Edit, Delete tasks
- ✅ Mark tasks as complete/incomplete
- ⏰ Highlight urgent or overdue tasks
- 🗂 Sort tasks by deadline and completion
- 📱 Responsive, modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend        | Backend             | Database     | Tools                |
|-----------------|----------------------|--------------|----------------------|
| React + Vite + Tailwind | Express.js, Node.js  | MongoDB      | JWT, Axios, Bcrypt |

---

## ⚙️ Project Setup Instructions

### ✅ Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2. Setup backend

```bash
cd backend
npm install
```
-Create a .env file inside backend
```bash
PORT=5555
MONGODB_URL=your_mongo_db_url
SECRET=your_jwt_secret
```
-Start backend server
```bash
npm start
```

### 3. Setup frontend

```bash
cd ../frontend
npm install
```
-Fun frontend server
```bash
npm run dev
```
