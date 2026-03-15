# Rest API Project

A complete REST API application with backend and frontend components built with Node.js, Express, and React.

## Project Structure

```
Rest API/
├── backend/                 # Node.js Express API
│   ├── constroller/         # Route controllers
│   ├── model/              # Database models
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   ├── config.js           # Database configuration
│   ├── db.js               # Database connection
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   ├── src/                # React components
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── README.md              # This file
```

## Features

### Backend API
- **User Management**: Full CRUD operations for users
- **Database Integration**: MySQL database with connection pooling
- **RESTful Endpoints**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Error Handling**: Proper error responses and logging
- **Environment Configuration**: Secure environment variable management

### Frontend Application
- **Modern React**: Built with React and Vite
- **Responsive Design**: Mobile-friendly interface
- **API Integration**: Seamless connection to backend API
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

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **dotenv** - Environment variable management
- **nodemon** - Development auto-reload

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript** - Programming language
- **CSS** - Styling

## API Documentation

### Response Format
All API responses follow this format:
```json
{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 0,
  "info": "Rows matched: 1 Changed: 1 Warnings: 1",
  "serverStatus": 2,
  "warningStatus": 1,
  "changedRows": 1
}
```

### Error Handling
Errors return appropriate HTTP status codes:
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

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
