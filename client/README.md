# Ajali Frontend

## Overview
The frontend for Ajali - an emergency incident reporting system built with React and Vite. This modern web application enables citizens to report accidents and emergencies in real-time.

## Features
- User authentication (login/register)
- Interactive incident reporting with media upload
- Real-time location selection via map interface
- Incident management dashboard
- Admin dashboard for incident review
- Real-time notifications
- Responsive design with Tailwind CSS

## Tech Stack
- React 18
- Vite
- React Router DOM
- React Leaflet for maps
- Tailwind CSS
- Axios for API requests
- React Hot Toast for notifications
- Headless UI for accessible components

## Prerequisites
- Node.js 16+
- npm or yarn
- Modern web browser

## Installation
1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development
Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

## Building for Production
```bash
npm run build
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── pages/         # Page components
├── services/      # API service functions
└── assets/        # Static assets
```

## Environment Variables
Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:5000
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build