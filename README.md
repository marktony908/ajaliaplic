# Ajali - Emergency Incident Reporting System

## Overview
Ajali is a comprehensive emergency incident reporting system that enables citizens to report accidents and emergencies in real-time. The platform connects users directly with first responders and authorities, potentially saving lives through quick response times.

## Key Features
- Real-time incident reporting
- Location-based reporting with map integration
- Media upload support (images/videos)
- User authentication and management
- Admin dashboard for incident review
- Real-time notifications
- Mobile-responsive design

## Project Structure
```
ajali/
├── client/         # React frontend
├── server/         # Flask backend
└── README.md       # This file
```

## Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn
- pip
- Virtual environment tool

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ajali
```

### 2. Backend Setup
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Run Both Services
From the root directory:
```bash
npm install
npm run dev
```

## Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Support
For support, email support@ajali.com or create an issue in the repository.