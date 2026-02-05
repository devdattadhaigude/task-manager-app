# TaskMaster - Full Stack Task Management App

A robust, full-stack task management application built to streamline personal productivity. This project demonstrates a complete implementation of a RESTful API backend connected to a modern, responsive React frontend.

## Features Implemented

### Core Functionality
* **Secure Authentication:** User Registration and Login using JWT (JSON Web Tokens) for stateless security.
* **CRUD Operations:** Full ability to Create, Read, Update, and Delete tasks.
* **Task Status Workflow:** Interactive dropdowns to track progress (Pending -> In Progress -> Completed).
* **Inline Editing:** Edit task titles and descriptions directly from the dashboard without navigating away.

### Product Thinking & UX Enhancements
* **Timestamps:** Automatically tracks "Created At" and "Updated At" times to monitor productivity.
* **Visual Feedback:** Dynamic color coding for statuses (Yellow/Blue/Green) and strikethrough for completed tasks.
* **Responsive Design:** A clean, SaaS-style interface built with Bootstrap 5, fully responsive for mobile and desktop.
* **Optimistic UI:** Instant visual updates on status changes for a snappy user experience.

---

## Tech Stack

### Backend (Java Spring Boot)
* **Framework:** Spring Boot 3.x
* **Security:** Spring Security & JWT Authentication
* **Database:** MySQL with Spring Data JPA (Hibernate)
* **API:** RESTful Controller Architecture

### Frontend (React.js)
* **Library:** React 18 (Hooks: useState, useEffect, useCallback)
* **Routing:** React Router DOM v6
* **Styling:** Bootstrap 5 & Custom CSS
* **HTTP Client:** Axios

---

## Setup & Installation Guide

### Prerequisites
* Java JDK 17+
* Node.js & npm
* MySQL Server

### 1. Database Setup
Create a MySQL database named "taskmanager_db":
```sql
CREATE DATABASE taskmanager_db;
