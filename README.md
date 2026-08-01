# Task Manager

A fullstack web application for task management with user authentication and email notifications.

## Live Demo

- **Frontend:** https://task-manager-sooty-alpha-37.vercel.app
- **Backend:** https://task-manager-backend-mcoz.onrender.com

## Features

- User registration and login
- JWT authentication
- Create, edit, complete and delete tasks
- Filter tasks by status (all, pending, completed)
- Email notifications when a task is about to expire
- Each user only sees their own tasks

## Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript

**Backend**
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcrypt
- Nodemailer
- node-cron

**Database**
- PostgreSQL (Supabase)

## Local Setup

1. Clone the repository:
\```bash
git clone https://github.com/ojersantiago/TaskManager.git
\```

2. Install backend dependencies:
\```bash
cd backend
npm install
\```

3. Create a `.env` file inside the `backend` folder:
\```
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=3000
\```

4. Start the server:
\```bash
npm run dev
\```

5. Open `frontend/login.html` with Live Server in VS Code.

# Task Manager

Aplicación web fullstack de gestión de tareas con autenticación de usuarios y notificaciones por email.

## Demo

- **Frontend:** https://task-manager-sooty-alpha-37.vercel.app
- **Backend:** https://task-manager-backend-mcoz.onrender.com

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación con JWT
- Crear, editar, completar y eliminar tareas
- Filtrar tareas por estado (todas, pendientes, completadas)
- Notificaciones por email cuando una tarea está por vencer
- Cada usuario solo ve sus propias tareas

## Tecnologías

**Frontend**
- HTML5, CSS3, JavaScript

**Backend**
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcrypt
- Nodemailer
- node-cron

**Base de datos**
- PostgreSQL (Supabase)

## Instalación local

1. Cloná el repositorio:
\```bash
git clone https://github.com/ojersantiago/TaskManager.git
\```

2. Instalá las dependencias del backend:
\```bash
cd backend
npm install
\```

3. Creá el archivo `.env` en la carpeta `backend`:
\```
DATABASE_URL=tu_connection_string_de_supabase
JWT_SECRET=tu_clave_secreta
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
PORT=3000
\```

4. Iniciá el servidor:
\```bash
npm run dev
\```

5. Abrí `frontend/login.html` con Live Server en VS Code.