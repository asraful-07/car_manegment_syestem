# 🚗 Car Management System (Vehicle Rental System)

The **Car Management System** is a complete Vehicle Rental Management platform designed to handle car rentals efficiently with proper role-based access control. It supports both **Admin** and **Customer** roles and follows real-world car rental business logic.

---

## 📌 Project Overview

This project is a **backend-focused full-stack system** that simulates a real-life car rental workflow. It demonstrates clean architecture, proper database design, authentication, authorization, and business logic implementation.

**Project Name:** Car Management System
**Project Type:** Vehicle Rental Management System

---

## 🎯 Key Features

### 👤 User Roles

- **Admin** – Manages vehicles and monitors bookings
- **Customer** – Rents vehicles and manages personal bookings

---

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based authorization (Admin / Customer)
- Secure API access using middleware

---

### 🚘 Vehicle Management (Admin)

- Add new vehicles
- Update vehicle details
- Delete vehicles
- Manage vehicle availability status (Available / Rented)

---

### 📅 Booking System (Customer)

- View available vehicles
- Rent a vehicle (create booking)
- Set rent start and end dates
- View personal booking history

---

### 🔄 Auto Return System

- The system automatically checks booking end dates
- If `rent_end_date` has passed:

  - Booking is marked as **Returned**
  - Vehicle availability is set back to **Available**

---

### 📊 Admin Controls

- View all bookings from all users
- View bookings of a specific customer
- Manage vehicles and users

---

## 🧠 Business Logic Highlights

- A vehicle cannot be rented by multiple users at the same time
- Only available vehicles can be booked
- Customers can access only their own bookings
- Admin has full access to all system data

---

## 🛠️ Tech Stack

### Backend

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL / MySQL**
- **JWT (JSON Web Token)**

### Architecture & Tools

- RESTful API design
- MVC / Service-based architecture
- OOP principles

---

## 🗂️ Database Models (Simplified)

### User

- id
- name
- email
- role (ADMIN / CUSTOMER)

### Vehicle

- id
- vehicle_name
- registration_number
- price_per_day
- isAvailable

### Booking

- id
- customer_id
- vehicle_id
- rent_start_date
- rent_end_date
- status (RENTED / RETURNED)

---

## ▶️ How to Run the Project

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`
4. Run Prisma migration

   ```bash
   npx prisma migrate dev
   ```

5. Start the server

   ```bash
   npm run dev
   ```

---

## ✅ Learning Outcomes

- Real-world vehicle rental workflow implementation
- Prisma ORM with relational database handling
- JWT authentication and authorization
- Role-based access control
- Clean code architecture and OOP concepts

---

## 📌 Future Improvements

- Online payment integration
- Vehicle image upload feature
- Advanced search and filtering
- Frontend integration using React or Next.js

---
