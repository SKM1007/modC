# System Architecture

## Overview

modC is a coupon management platform designed to simplify the way users collect, organize, and reuse promotional coupons across different applications.

The system consists of three major components:

- Android Application
- Node.js Backend
- MongoDB Database

An Android custom keyboard acts as an extension of the application, allowing users to access and insert saved coupons into any supported application.

---

# High Level Architecture

```
                        +----------------------+
                        |      Android App     |
                        +----------------------+
                                   |
                                   | REST API
                                   |
                                   ▼
                     +---------------------------+
                     |   Node.js + Express API   |
                     +---------------------------+
                                   |
                    JWT Authentication
                                   |
                                   ▼
                     +---------------------------+
                     |         MongoDB           |
                     +---------------------------+
                                   |
                                   ▼
                     Coupon & User Collections
                                   |
                                   ▲
                     +---------------------------+
                     |   Android Keyboard (IME)  |
                     +---------------------------+
```

---

# System Components

## 1. Android Application

The Android application provides the primary user interface.

Responsibilities:

- User Registration
- User Login
- Dashboard
- Coupon Management
- Coupon Creation
- Coupon Viewing
- Coupon Deletion
- Profile Management (Future)

The Android application communicates only with the backend through REST APIs.

---

## 2. Android Keyboard

The Android keyboard is implemented using Android's InputMethodService.

Responsibilities:

- Retrieve Active Coupons
- Display Coupons
- Insert Coupon Codes
- Quick Coupon Selection

The keyboard only displays coupons whose status is:

```
ACTIVE
```

Expired and deleted coupons are hidden automatically.

---

## 3. Backend Server

The backend is built using Node.js and Express.

Responsibilities:

- User Authentication
- JWT Verification
- Coupon CRUD Operations
- Coupon Expiry Management
- Data Validation
- Business Logic
- API Responses

The backend is the only component allowed to communicate with MongoDB.

---

## 4. MongoDB Database

MongoDB stores all persistent application data.

Collections:

- users
- my_coupons
- rewards
- transactions

Future collections:

- notifications
- analytics
- affiliate_clicks

---

# Request Flow

```
Android App

      │

      ▼

REST API Request

      │

      ▼

Authentication Middleware

      │

      ▼

Controller

      │

      ▼

Service Layer

      │

      ▼

MongoDB

      │

      ▼

Response

      │

      ▼

Android App
```

---

# Authentication Flow

```
User

│

▼

Register

│

▼

Password Hashing

│

▼

MongoDB

```

Login

```
User

│

▼

Login

│

▼

Password Verification

│

▼

JWT Generation

│

▼

JWT Token

│

▼

Android Stores Token

│

▼

Future Requests
```

Every protected API request includes:

```
Authorization

Bearer <JWT_TOKEN>
```

---

# Coupon Lifecycle

```
Coupon Created

        │

        ▼

Status = ACTIVE

        │

        ▼

Displayed in Android Keyboard

        │

        ▼

Coupon Expired

        │

        ▼

Background Cleanup Job

        │

        ▼

Status = EXPIRED

        │

        ▼

Hidden from Keyboard
```

Deleted coupons follow a different lifecycle.

```
ACTIVE

↓

DELETED

↓

Hidden

↓

Still Stored in Database
```

No coupon is permanently removed from MongoDB.

---

# Background Cleanup Job

A scheduled Cron Job periodically checks all coupons.

Responsibilities:

- Read ACTIVE Coupons
- Compare Expiry Date
- Update Status to EXPIRED
- Preserve Coupon History

The cleanup job does not delete records.

---

# Backend Layers

```
Routes

↓

Controllers

↓

Services

↓

Database Models

↓

MongoDB
```

Layer Responsibilities

### Routes

- Define API Endpoints

### Controllers

- Handle HTTP Requests
- Validate Requests
- Return Responses

### Services

- Business Logic

### Models

- Database Access

### Database

- Persistent Storage

---

# Security Architecture

Security measures include:

- JWT Authentication
- Password Hashing using bcrypt
- Input Sanitization
- Protected Routes
- Environment Variables
- Database Validation

Future improvements:

- Email Verification
- Password Reset
- Refresh Tokens
- Rate Limiting
- API Logging

---

# Folder Architecture

```
backend/

src/

config/

controllers/

middleware/

models/

routes/

services/

jobs/

utils/
```

Each directory has a single responsibility.

---

# Future Architecture

Planned improvements include:

- Android Share Receiver
- Coupon OCR
- AI-Based Coupon Extraction
- Affiliate Tracking
- Push Notifications
- Reward Engine
- Analytics Dashboard
- Offline Support using Room Database

---

# Design Principles

The architecture follows the following principles:

- Separation of Concerns
- Modular Development
- Reusable Components
- Secure API Design
- Maintainable Codebase
- Scalable Folder Structure
- Clear Responsibility Assignment

---

# Summary

modC follows a client-server architecture.

The Android application and Android keyboard communicate with a centralized backend using secure REST APIs.

The backend manages authentication, coupon operations, and business logic while MongoDB provides reliable persistent storage.

This architecture allows future expansion without major structural changes.