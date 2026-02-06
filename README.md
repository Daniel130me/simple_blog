# BlogCRUD

A simple blog application built with React, Vite, and JSON Server. It supports full CRUD operations for blog posts and includes a production-ready server for deployment.

## Features

- **Frontend**: Built with React and Vite for a fast development experience.
- **Backend**: JSON Server for a simple, file-based REST API.
- **Production Server**: Express-based server to serve both the API and the frontend from a single port.
- **Admin Dashboard**: Manage posts (Add, Edit, Delete).
- **Responsive Design**: Works on mobile and desktop.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server (Vite + JSON Server):
   ```bash
   npm run dev:all
   ```
3. Access the app at `http://localhost:5173`.

## Deployment on Render

This project is configured for easy deployment on [Render](https://render.com/).

### Steps:

1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Render will automatically detect the port and deploy your application.

### API Endpoint

In production, the API is available at `/api`. In development, it points to `http://localhost:5000`. This is managed automatically via `src/apiConfig.js`.
