# Rest API Project

A complete REST API application with backend and frontend components built with Node.js, Express, and React.

## Project Structure

```
Rest API/
├── backend/                 # Node.js Express API
│   ├── constroller/         # Route controllers
│   ├── model/              # Database models
│   ├── routes/             # API routes
│   ├── database.js         # Database connection
│   ├── .env                # Environment variables
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── package-lock.json   # Dependency lock file
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── UserList.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── Modal.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── .gitignore              # Git ignore files
└── README.md              # This file
```

## Features

### Backend API
- **User Management**: Full CRUD operations for users
- **Database Integration**: MySQL database with connection pooling
- **RESTful Endpoints**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Improved API Responses**: Consistent JSON structure with success/error handling
- **Input Validation**: Basic validation for required fields
- **CORS Support**: Cross-origin resource sharing enabled for frontend
- **Error Handling**: Comprehensive error responses with proper HTTP status codes
- **Environment Configuration**: Secure environment variable management

### Frontend Application
- **Modern React**: Built with React and Vite
- **User Interface**: Complete user management interface with forms and lists
- **Responsive Design**: Mobile-friendly interface
- **API Integration**: Seamless connection to backend API
- **Components**: Modular React components (UserList, UserForm, Modal)
- **Development Tools**: Hot reload and fast development

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

### Request/Response Examples

#### Create User
```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "male"
}
```

#### Update User
```bash
PUT /users/1
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "gender": "male"
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/phanphoun/Rest-API.git
cd Rest API
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**
Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

4. **Database Setup**
Create a MySQL database and run:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  gender VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. **Start Backend Server**
```bash
npm start
```

6. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

## Development

### Backend Development
- Server runs on `http://localhost:3000`
- API endpoints available at `/users`
- Uses nodemon for auto-reload during development

### Frontend Development
- Development server runs on `http://localhost:5173` (or similar)
- Hot reload enabled for fast development
- Built with Vite for optimal performance

### Technologies Used

### Backend Dependencies
- **express (v5.2.1)** - Fast, unopinionated, minimalist web framework for Node.js. Used for creating REST API endpoints, middleware, and routing.
- **mysql2 (v3.19.1)** - Improved MySQL client for Node.js with support for Promises and async/await. Used for database connectivity and query execution.
- **cors (v2.8.5)** - Node.js middleware for enabling Cross-Origin Resource Sharing (CORS). Allows frontend applications to access the API from different origins.
- **dotenv (v17.3.1)** - Zero-dependency module that loads environment variables from a .env file into process.env. Used for secure configuration management.
- **nodemon (v3.1.14)** - Development tool that automatically restarts the Node.js application when file changes are detected. Improves development workflow.

### Frontend Dependencies
- **react (v19.2.4)** - JavaScript library for building user interfaces. Used for creating reusable UI components and managing application state.
- **react-dom (v19.2.4)** - Serves as the entry point to the DOM and server renderers for React. Used for rendering React components to the web DOM.

### Frontend Development Dependencies
- **vite (v8.0.0)** - Next generation frontend tooling. Provides fast development server, optimized builds, and hot module replacement (HMR).
- **@vitejs/plugin-react (v6.0.0)** - Official Vite plugin for React support. Enables Fast Refresh and JSX support in Vite.
- **eslint (v9.39.4)** - JavaScript and JSX linting tool for identifying and fixing problematic patterns in code. Ensures code quality and consistency.
- **@eslint/js (v9.39.4)** - ESLint's recommended ruleset for JavaScript. Provides baseline linting rules.
- **eslint-plugin-react-hooks (v7.0.1)** - ESLint plugin for React Hooks rules. Enforces rules of Hooks to prevent common bugs.
- **eslint-plugin-react-refresh (v0.5.2)** - ESLint plugin for supporting React Fast Refresh. Ensures components can be safely hot-reloaded.
- **@types/react (v19.2.14)** - TypeScript type definitions for React. Provides type hints for better development experience.
- **@types/react-dom (v19.2.3)** - TypeScript type definitions for React DOM. Provides type hints for DOM-related React operations.
- **globals (v17.4.0)** - Provides global variables and type definitions for ESLint configuration.

## API Documentation

### Response Format
All API responses follow a consistent format:

#### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "count": 1  // Only for GET all endpoints
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "data": null
}
```

### HTTP Status Codes
- `200` - OK (GET, PUT, DELETE successful)
- `201` - Created (POST successful)
- `400` - Bad Request (Validation errors)
- `404` - Not Found (Resource doesn't exist)
- `500` - Internal Server Error (Database/connection errors)

## Project Status

✅ **Backend API**: Complete with improved responses and error handling
✅ **Frontend UI**: React components for user management
✅ **Database Integration**: MySQL connection and user table
✅ **CORS Configuration**: Frontend-backend communication enabled
✅ **API Documentation**: Comprehensive endpoint documentation

## Quick Start

1. **Backend** (Terminal 1):
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3000
```

2. **Frontend** (Terminal 2):
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

3. **Access the Application**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/users

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Phoun PHAN**
- GitHub: [@phanphoun](https://github.com/phanphoun)

## Acknowledgments

- Express.js documentation
- React documentation
- MySQL documentation
- Vite documentation
