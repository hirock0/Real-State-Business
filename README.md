# Real Estate Business Management System Web Application

## 📌 Introduction

The **Real Estate Business Management System** is a web application designed to streamline property management, client interactions, and business transactions in the real estate sector. This system leverages a modern web stack, including **Node.js, Express, MongoDB, React, and Tailwind CSS**, to deliver a seamless and efficient user experience.

### 📦 Dependencies
## Server-Side Dependencies (Backend)
### The backend is built with Node.js and Express.js, using the following dependencies:

- bcryptjs - Password hashing
- body-parser - Parse incoming request bodies
- cloudinary - Image storage
- cors - Cross-origin resource sharing
- dotenv - Manage environment variables
- express - Web framework
- jsonwebtoken - User authentication
- mongodb - Database connection
- nodemon - Development server auto-restart
- stripe - Payment processing
- Client-Side Dependencies (Frontend)

  
### The frontend is built using React with Vite, and includes:

- @vitejs/plugin-react - React support in Vite
- Tailwind CSS - Styling framework
- DaisyUI - UI component library
- PostCSS & Autoprefixer - CSS processing
- ESLint & Plugins - Code quality and linting tools

## ✨ Features

- Property listing and management
- User authentication and authorization (JWT)
- Secure payment processing (Stripe)
- Image hosting and management (Cloudinary)
- Interactive and responsive UI (Tailwind CSS, DaisyUI)
- RESTful API with **Express.js** and **MongoDB**
- Environment configuration support via **dotenv**
- Real-time updates and efficient state management

## 🔧 Installation

### Prerequisites
- **Node.js** (Recommended: Latest LTS)
- **MongoDB** (Local or Cloud)
- **Vite** (For front-end development)

### Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/hirock0/Real-State-Business.git
   cd real-estate-management

  ## ⚙️ Configuration
### Create a .env file in the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

## 🛠️ Troubleshooting
Ensure MongoDB is running.
Verify .env configurations.
Restart nodemon if it crashes:

- npm run dev
