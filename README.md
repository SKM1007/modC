# modC

> **AI-Powered Coupon Management Platform with Android Keyboard Integration**

modC is an Android-based coupon management platform designed to automatically capture, organize, and reuse digital coupons received through payment and shopping applications. Instead of searching through messages or screenshots, users can securely store coupons in a centralized vault and instantly insert them anywhere using a custom Android keyboard.

The project combines an Android application, a custom Android keyboard (Input Method Editor), and a Node.js backend connected to MongoDB to provide a seamless coupon management experience.

---

# Table of Contents

- Project Overview
- Problem Statement
- Solution
- Key Features
- System Architecture
- Technology Stack
- Repository Structure
- Backend Modules
- Current Project Status
- Future Roadmap
- Installation
- Documentation
- Contributors
- License

---

# Project Overview

Digital coupons are widely distributed through payment applications, SMS messages, emails, and e-commerce platforms. Users often forget where coupons are stored or lose them before they expire.

modC solves this problem by providing:

- Secure coupon storage
- Automatic coupon organization
- Coupon expiry management
- Android keyboard integration
- Fast coupon insertion into any application

The long-term vision of modC is to become a centralized coupon wallet that works across multiple merchants and payment platforms.

---

# Problem Statement

Current coupon systems suffer from several limitations:

- Coupons are scattered across different applications.
- Users forget available coupons.
- Coupons expire without being used.
- Manual searching is time-consuming.
- Entering coupon codes repeatedly is inconvenient.

These issues result in poor coupon utilization and reduced user convenience.

---

# Proposed Solution

modC introduces a centralized coupon management platform consisting of:

- Android Application
- Android Keyboard
- Node.js Backend
- MongoDB Database

Coupons are captured from supported sources, securely stored in MongoDB, and made available directly through the custom Android keyboard whenever the user needs them.

---

# Key Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing

---

## Coupon Management

- Save Coupons
- View Active Coupons
- Delete Coupons (Soft Delete)
- Coupon Categories (Planned)
- Coupon Search (Planned)

---

## Coupon Expiry

- Automatic Expiry Detection
- Background Cleanup Job
- Expired Coupon Management
- Active Coupon Filtering

---

## Android Features

- Native Android Application
- Material Design UI
- Custom Android Keyboard
- Coupon Selection
- Coupon Insertion

---

## Security

- JWT Authentication
- Password Encryption
- Input Sanitization
- Secure API Design

---

# System Architecture

```
Android App
      │
      │ REST API
      ▼
Node.js + Express Backend
      │
      ▼
MongoDB Database
      │
      ▼
Coupon Storage

Android Keyboard
      │
      ▼
Retrieve Active Coupons
      │
      ▼
Insert Coupon Anywhere
```

---

# Technology Stack

## Backend

- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt
- node-cron

---

## Android

- Kotlin
- Android SDK
- Material Components
- Retrofit
- RecyclerView

---

## Database

- MongoDB

Collections

- users
- my_coupons
- rewards
- transactions

---

## Tools

- Git
- GitHub
- Postman
- MongoDB Compass
- Android Studio
- VS Code

---

# Repository Structure

```
modC/

├── android/
├── backend/
├── docs/

├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── PROJECT_STATUS.md
└── .gitignore
```

---

# Backend Modules

```
Authentication

Coupon Management

Coupon Parser

Coupon Cleanup Job

Middleware

Services

Database

Utilities
```

---

# Current Project Status

| Module | Status |
|---------|--------|
| Repository Setup | ✅ Completed |
| Backend Setup | ✅ Completed |
| MongoDB Integration | ✅ Completed |
| Authentication | ✅ Completed |
| Coupon Save API | ✅ Completed |
| Coupon Retrieval API | ✅ Completed |
| Coupon Delete API | ✅ Completed |
| Coupon Cleanup Job | ✅ Completed |
| Android UI | 🚧 In Progress |
| Android Keyboard | 🚧 In Progress |
| Share Receiver | 🚧 Planned |
| Parser Engine | 🚧 Planned |

---

# Future Roadmap

## Phase 1

- Backend Setup
- MongoDB
- Authentication

## Phase 2

- Android Application

## Phase 3

- Coupon APIs

## Phase 4

- Android Dashboard

## Phase 5

- Android Keyboard

## Phase 6

- Share Receiver

## Phase 7

- Coupon Parser

## Phase 8

- Affiliate Rewards

## Phase 9

- Analytics Dashboard

## Phase 10

- Production Deployment

---

# Installation

Detailed installation guides are available in the documentation.

Backend Setup

```
docs/setup/BACKEND_SETUP.md
```

Android Setup

```
docs/setup/ANDROID_SETUP.md
```

Database Setup

```
docs/setup/DATABASE_SETUP.md
```

---

# Documentation

Project documentation is available inside the `docs` directory.

```
docs/

api/

architecture/

setup/

testing/

phases/
```

---

# Contributors

Project developed by:

- Manoj S K
- Project Team Member

---

# License

This project is licensed under the MIT License.

See the LICENSE file for details.