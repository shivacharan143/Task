## Features
- User authentication (register/login) with JWT.
- Create, read, update, and delete tasks.
- Mark tasks as completed.
- Responsive design with Tailwind CSS.

## Frontend Routes

| Route       | Description                          |
|-------------|--------------------------------------|
| `/`         | Home page (displays the task list).  |
| `/auth`     | Login/Register page.                 |
| `/add`      | Add a new task.                      |
| `/edit/:id` | Edit an existing task.               |

## Backend API Routes

### Authentication Routes

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/api/auth/register` | Register a new user.               |
| POST   | `/api/auth/login`    | Log in an existing user.           |

### Task Routes

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/api/tasks`      | Fetch all tasks for the logged-in user. |
| POST   | `/api/tasks`      | Create a new task.                   |
| PATCH  | `/api/tasks/:id`  | Update an existing task.             |
| DELETE | `/api/tasks/:id`  | Delete a task.                       |
