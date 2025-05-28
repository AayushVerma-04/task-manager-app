# 📝 Task Manager App

A full-stack task management application with user authentication, real-time task tracking, and weekly cleanup automation.

---

## 🔧 Features

- User Signup/Login (JWT based)
- Create, update, delete tasks
- Task completion tracking
- View task history
- Auto-delete tasks older than 7 days (via CRON job)
- Fully deployed with MongoDB Atlas & Render
- User dashboard shows weekly task history and overall activity

---

---

## 🧰 Tech Stack

### 🚀 Frontend
- **Vite** – Fast build tool and dev server
- **React.js** – For building UI components
- **Redux Toolkit** *(in `redux-toolkit` branch)* – For scalable state management
- **Axios** – For API requests
- **Tailwind CSS** *(optional if used)* – For utility-first styling

### 🛠 Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework for building APIs
- **Mongoose** – MongoDB ODM for schema and queries
- **dotenv** – Manage environment variables
- **node-cron** – Schedule CRON jobs (like weekly task cleanup)

### 🗃 Database
- **MongoDB Atlas** – Cloud-hosted NoSQL database

### ⚙ Deployment
- **Render** – Hosting for backend server
- **GitHub** – Version control and deployment trigger
 
---

## 🚀 Live Demo

- **Frontend + Backend**: [https://task-manager-app-cd7s.onrender.com](#)  
- **API base URL**: `https://task-manager-app-cd7s.onrender.com/api`

---

## 🔐 Environment Variables (backend)

```env
PORT=10000
mongodbURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---
---

## 🛠️ Setup Instructions

Follow these steps to get the Task Manager App running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/AayushVerma-04/task-manager-app.git
cd task-manager
```

### 2. Setup Backend

```bash
cd backend
npm install
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev     # For development
npm run build   # To generate production-ready dist
```

> Make sure the `dist/` folder is correctly served from `backend/server.js`.

---

## 🔁 Weekly CRON Cleanup

Old tasks (older than 7 days) are auto-deleted using `node-cron`.

📄 Configured in:

```js
backend/server.js
```

---

## 📦 Deployment

- Backend deployed on **Render**
- Database hosted on **MongoDB Atlas**
- Frontend is statically served via `express.static` from the backend

---

## 🧪 Experimental Branch: Redux Toolkit Integration

A separate branch named [`redux`](https://github.com/AayushVerma-04/task-manager-app/tree/redux) contains an alternative implementation of authentication and global state using **Redux Toolkit** instead of the Context API.

### 🔄 Major Changes

- Replaced `AuthContext` with Redux store
- Added Redux slices for user and task state
- Improved scalability for larger and more complex applications

### 🚀 To try it:

```bash
git checkout redux
```
