# 🚀 Job Portal | MERN Application

A full-stack job portal application built with the MERN (MongoDB, Express.js, React, Node.js) stack, designed to connect job seekers with recruiters. The platform allows users to search, filter and apply for job listings, while recruiters can post job openings and manage applications.

## 🔗 Links

- Live Demo: https://job-portal-mern-stack.netlify.app/
- Repository: https://github.com/ReynoldArun09/mern-job-portal-application

## 🛠️ Technologies Used

- **Frontend:**

  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI
  - React Hook Form
  - Zod for validation
  - Zustand
  - Axios
  - React Table

- **Backend:**

  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - TypeScript
  - Winston for logging
  - Jest
  - cloudinary

## 📦 Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

## 🚀 Getting Started

### Prerequisites

- Node.js (v22+)
- Express v4
- MongoDB
- Cloudinary Account

### Installation

1. **Clone Repository**

   ```bash
   git clone https://github.com/ReynoldArun09/MERN-Job-Portal-Application.git
   cd MERN-Job-Portal-Application
   ```

2. **Environment Configuration**
   Create `.env` files:

   **Backend `.env`**

   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_DB_URI=mongodb://localhost:27017/yourdb
   SALT=10
   ACCESS_TOKEN_SECRET=youraccesstokensecret
   CORS_ORIGIN = http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

   **Frontend `.env`**

   ```env
   VITE_BACKEND_ENV=http://localhost:3000/api/v1
   ```

3. **Install Dependencies**

   ```bash
   # Backend
   cd backend-node-express
   npm install

   # Frontend
   cd ../frontend-react-typescript
   npm install
   ```

4. **Run Development Servers**

   ```bash
   # Backend (port 3000)
   cd backend-node-express
   npm run dev

   # Frontend (port 5173)
   cd frontend-react-typescript
   npm run dev
   ```
