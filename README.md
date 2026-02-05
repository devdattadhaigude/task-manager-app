# TaskMaster - Full Stack Task Management App

A robust, full-stack task management application built to streamline personal productivity. This project demonstrates a complete implementation of a RESTful API backend connected to a modern, responsive React frontend.

# Login Page
<img width="1918" height="860" alt="image" src="https://github.com/user-attachments/assets/7b0dec62-2baa-4764-9970-d3c39ec88f5d" />

# Register Page
<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/fa45577d-9940-4f3d-a9cf-896b089c5514" />

# Dashboard  
<img width="1897" height="880" alt="image" src="https://github.com/user-attachments/assets/529412b8-73cc-4d00-a512-8f5ad797c457" />


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

## Dependencies

### Backend (Maven - pom.xml)
* **spring-boot-starter-web:** Builds the RESTful web services.
* **spring-boot-starter-data-jpa:** Handles database interactions using Hibernate and JPA.
* **spring-boot-starter-security:** Manages authentication and access control.
* **mysql-connector-j:** The JDBC driver for connecting to the MySQL database.
* **jjwt-api / jjwt-impl / jjwt-jackson:** Libraries for creating and validating JSON Web Tokens (JWT).
* **lombok:** (Optional) Reduces boilerplate code for getters, setters, and constructors.

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
