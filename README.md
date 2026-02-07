# Nobzo Blog API

A backend REST API for a blog platform built with Node.js, Express, and MongoDB.

## Features

-   **Authentication**: User registration and login with JWT and password hashing.
-   **Blog Posts**: Create, read (with pagination & filtering), update, and soft-delete posts.
-   **Access Control**: 
    -   Public users can view published posts.
    -   Authenticated users can create posts and manage their own posts.
    -   Validation and error handling middleware.

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB & Mongoose
-   JWT & bcryptjs for Auth
-   Joi for Validation

## Getting Started

### Prerequisites

-   Node.js
-   MongoDB

### Installation

1.  Clone the repository (if applicable) or navigate to the project folder.
2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:
    
    Create a `.env` file in the root directory (copy from `.env.example`).
    ```env
    MONGODB_URI=mongodb://localhost:27017/nobzo-blog
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

4.  Run the server:

    ```bash
    # Development mode
    npm run dev

    # Production mode
    npm start
    ```

## API Documentation

### Auth

-   **POST /api/auth/register**
    -   Body: `{ "name": "User", "email": "user@test.com", "password": "password123" }`
-   **POST /api/auth/login**
    -   Body: `{ "email": "user@test.com", "password": "password123" }`

### Posts

-   **POST /api/posts** (Auth Required)
    -   Body: `{ "title": "My Post", "content": "Content here", "tags": ["tech"] }`
-   **GET /api/posts** (Public/Auth)
    -   Params: `page`, `limit`, `search`, `tag`, `status` (Auth only)
-   **GET /api/posts/:slug** (Public)
-   **PUT /api/posts/:id** (Author only)
    -   Body: `{ "title": "Updated Title", "status": "published" }`
-   **DELETE /api/posts/:id** (Author only - Soft Delete)

## Validation

Input data is validated using Joi schemas. Invalid requests return 400 Bad Request with details.
