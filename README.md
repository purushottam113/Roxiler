# Roxiler Store Rating App

This is my full stack project. In this project users can rate stores and store owners can see the ratings.

## What I Have Done

###  Backend
- Created APIs using Express
- Used Prisma with PostgreSQL
- Login and Signup for users and store owners
- JWT for authentication
- User can give rating to stores
- Store owner can see ratings of their store

###  Database
- Prisma schema with User, Store, and Rating models
- Used PostgreSQL

###  Frontend
- Login and Signup pages
- User Dashboard to see and rate stores
- Store Owner Dashboard to see ratings by users

## How to Run

### Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run server

### Frontend
cd frontend
npm install
npm run dev
