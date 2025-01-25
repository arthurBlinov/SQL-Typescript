# Chat Application with Typescript

## Project Overview
- This project is a chat application built using Node.js, Express for the backend, and MySQL for database management. It supports features such as user authentication, chat management, real-time messaging, and images uploads. JWT-based authentication ensures secure communication, while the system uses a MySQL connection pool for efficient database interactions. Socket.io for real interactive communication is not presented in this project, but there is always an option to do it.

## Features

## User Authentication:

## Registration and login with JWT-based authentication.
- Secure password storage with bcrypt.

### Chat Management:
- Create, update, delete, and retrieve chats.
- Fetch chat data and messages.
- Supports images uploads using multer with in-memory storage.

## Technologies Used
### Backend
**Node.js:** Server-side runtime.
**Express:** Web framework for building REST APIs.
**MySQL:** Relational database.
**JWT:** Secure authentication.
**bcrypt:** Password hashing.
**multer:** File upload handling.


## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js
- MYSQL

### Installation
Clone the repository:
   ```bash
   git clone https://github.com/arthurBlinov/SQL-Typescript.git 
   ```
Install dependencies:
   ```bash
   npm install
   ```
### Configuration
1. Create a `.env` file in the root directory.
2. Add the following environment variables:
- HOST=localhost
- USER=root
- PASSWORD=your_password_for_mysql
- DATABASE=your_database

- JWT_KEY=your_jwt_secret_key

- PORT=8080

### Running the Server
Start the server in development mode:
  ```bash
   npm run dev
   ```
- The server will run at `http://localhost:5000`.

---

## Deployment

### Steps
1. Ensure the `.env` file is configured for the production environment.
2. Deploy to your chosen hosting service (e.g., AWS, Heroku, or Vercel).

---