# PostSpace

PostSpace is a responsive, full-stack web application designed for sharing image-based stories and posts. It features user authentication, image uploads, and full CRUD capability.

---

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer, JSON Web Tokens (JWT)
- **Frontend**: React (Vite), Axios, React Router, Vanilla CSS

---

## Project Structure

```text
post app/
├── backend/            # Express REST API
│   ├── config/         # DB and upload configurations
│   ├── controller/     # Request handlers
│   ├── middleware/     # Auth and validation checks
│   ├── model/          # Mongoose database schemas
│   ├── routes/         # Endpoint mappings
│   └── server.js       # Main backend entry point
├── frontend/
│   └── post-app/       # React client
│       ├── src/
│       │   ├── components/  # Shared components
│       │   ├── context/     # Auth state context
│       │   ├── pages/       # Feed, Login, Details, Edit pages
│       │   └── services/    # Axios API client & utils
│       └── package.json
└── README.md           # Documentation
```

---

## Getting Started

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Run the Backend Server
Navigate to the `backend` directory, install packages, and start the node server:
```bash
cd backend
npm install
npm start
```
*Note: Make sure your `.env` file in the `backend` folder contains the correct `MONGO_URL`, `SECRET_KEY`, and `PORT` values.*

### 3. Run the Frontend App
Navigate to the `frontend/post-app` directory, install packages, and start Vite dev server:
```bash
cd frontend/post-app
npm install
npm run dev
```
*Note: Make sure the `.env` file in the `frontend/post-app` folder has the correct `VITE_API_URL` point to your backend port (default: `http://localhost:5000/api`).*

---

## Key Features

- **JWT Auth**: Secured user signup and signin stored in secure, HttpOnly cookies.
- **File Upload**: Native disk storage configurations using Multer on the backend.
- **Full CRUD**: Read feeds, view detail pages, replace images, and clean up physical files when posts are updated or deleted.
- **Dynamic CORS**: Automatically allows frontend access from local ports (like `5173` or `5174`).
