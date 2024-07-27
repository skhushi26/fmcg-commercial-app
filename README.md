# fmcg-commercial-app

Github Link: https://github.com/skhushi26/fmcg-commercial-app

## Features

- User Registeration & Login with JWT
- Get list of all users for Admin only
- CRUD Operations for all products with pagination & filter

## Technologies

- Express.js with Typescript
- MongoDB
- Swagger API Documentation (Link: http://localhost:5000/api-docs/)

## Steps

- npm install
- Create .env file
  MONGODB_URI=mongodb://localhost:27017/fmcgDb
  PORT=5000
  FMCG_JWT_SECRET=FmCGC0mMe@C!@lA&&Pp
- npm run dev

## API Endpoints

- POST: User Registeration - /api/auth/register
- POST: User Login - /api/auth/login
- GET: Get list of users - /api/users (Admin only)
- POST: Create product - /api/products (Admin only)
- GET: Get list of products - /api/products?category="Electronics"&price=500&name=Phone&page=1&limit=2
- PUT: Update product - /api/products/:id (Admin only)
- DELETE: Delete product - /api/products/:id (Admin only)
