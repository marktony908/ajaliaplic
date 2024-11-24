# Ajali Backend

## Overview
The backend API for Ajali - an emergency incident reporting system built with Flask. Handles user authentication, incident management, and real-time notifications.

## Features
- RESTful API endpoints
- User authentication and session management
- File upload handling for images and videos
- Database management with SQLAlchemy
- CORS configuration for frontend integration
- Admin privileges and user management
- Notification system

## Tech Stack
- Python 3.8+
- Flask
- SQLAlchemy
- Flask-RESTful
- Flask-Migrate
- SQLite database

## Prerequisites
- Python 3.8+
- pip
- Virtual environment tool

## Installation
1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Database Setup
```bash
flask db init
flask db migrate
flask db upgrade
```

## Running the Server
```bash
python app.py
```
The API will be available at `http://localhost:5000`

## Project Structure
```
server/
├── app.py           # Main application file
├── config.py        # Configuration settings
├── models/          # Database models
├── migrations/      # Database migrations
└── uploads/         # Media upload directory
```

## Environment Variables
Create a `.env` file in the server directory:
```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///ajali.db
```

## API Endpoints

### Authentication
- POST `/register` - Register new user
- POST `/login` - User login
- POST `/logout` - User logout

### Incidents
- GET `/incidents` - List all incidents
- POST `/incidents` - Create new incident
- GET `/incidents/<id>` - Get incident details
- PUT `/incidents/<id>` - Update incident
- DELETE `/incidents/<id>` - Delete incident

### Media
- POST `/incidents/<id>/images` - Upload incident images
- POST `/incidents/<id>/videos` - Upload incident videos

### Admin
- GET `/users` - List all users
- PUT `/users/<id>/ban` - Ban/unban user
- DELETE `/users/<id>` - Delete user