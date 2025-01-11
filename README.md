# Task Management Application

A full-stack task management application built with Node.js, Angular 17, and MySQL.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Sort tasks by priority or due date
- Responsive design for mobile and desktop
- User-friendly interface with Material Design
- Real-time feedback with snackbar notifications

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL
- Cors
- Dotenv

### Frontend
- Angular 17
- Angular Material
- TypeScript
- SCSS
- RxJS

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MySQL Server
- Angular CLI

## Setup Instructions

### Database Setup
1. Create a MySQL database:
```sql
CREATE DATABASE task_management;
```

2. Import the database schema:
```bash
mysql -u your_username -p task_management < backend/database.sql
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the database credentials in `.env`

4. Start the server:
```bash
npm start
```

The backend server will run on http://localhost:3000

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend/task-management-client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The application will be available at http://localhost:4200

## Project Structure

```
task-management-app/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── database.sql    # Database schema
│   └── server.js       # Entry point
├── frontend/
│   └── task-management-client/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/    # Angular components
│       │   │   ├── models/        # TypeScript interfaces
│       │   │   └── services/      # Angular services
│       │   ├── assets/            # Static files
│       │   └── styles/            # Global styles
│       ├── angular.json           # Angular configuration
│       └── package.json           # Frontend dependencies
└── README.md                      # Project documentation
```

## API Endpoints

- GET `/api/tasks` - Get all tasks
- GET `/api/tasks/:id` - Get a specific task
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task
- PATCH `/api/tasks/:id/toggle` - Toggle task completion

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
