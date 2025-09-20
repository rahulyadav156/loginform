# Login Form Backend

This project provides a backend implementation for a user login form using Node.js and Express. It includes features such as user registration, authentication, and session management.

## Features
- User registration with validation
- Secure login with JWT authentication
- Rate limiting for login attempts
- Protected dashboard view
- Token generation utility

## Folder Structure
- `controllers/` - Handles authentication logic
- `middlewares/` - Includes authentication and rate limiting middleware
- `models/` - User model definition
- `routes/` - Authentication routes
- `utils/` - Utility functions (e.g., token generation)
- `views/` - EJS templates for login, register, and dashboard
- `config/` - Database configuration

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Configure your database in `config/db.js`.
3. Start the server:
	```bash
	npm start
	```
4. Access the login form at `http://localhost:5000/login`.

## Usage
- Register a new user via the registration form.
- Log in with your credentials to access the protected dashboard.
- JWT tokens are used for session management and API authentication.


