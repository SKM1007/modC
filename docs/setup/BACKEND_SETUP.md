# Backend Setup Guide

## Overview

This document explains how to set up the modC backend on a new development machine.

The backend is built using:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt
- node-cron

---

# Prerequisites

Install the following software before starting.

| Software | Version |
|----------|----------|
| Node.js | 20+ Recommended |
| npm | Latest |
| MongoDB Community Server | Latest |
| MongoDB Compass | Latest |
| Git | Latest |
| VS Code | Latest |

---

# Clone Repository

```bash
git clone https://github.com/<YOUR_USERNAME>/modC.git
```

Move into the backend folder.

```bash
cd modC/backend
```

---

# Install Dependencies

Install all required Node packages.

```bash
npm install
```

---

# Required Packages

The backend uses the following packages.

### Production Dependencies

```
express

mongodb

jsonwebtoken

bcryptjs

cors

dotenv

node-cron
```

### Development Dependencies

```
nodemon
```

---

# Environment Variables

Create a file named

```
.env
```

inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017

DB_NAME=modc_core_production

JWT_SECRET=your_secret_key
```

Never commit the `.env` file to GitHub.

---

# Start MongoDB

### Ubuntu

```bash
sudo systemctl start mongod
```

Check status

```bash
sudo systemctl status mongod
```

---

### Windows

Start MongoDB from Windows Services or run:

```powershell
net start MongoDB
```

---

# Start Backend

Normal mode

```bash
node server.js
```

Development mode

```bash
npm run dev
```

or

```bash
npx nodemon server.js
```

---

# Expected Output

```
MongoDB Connected

Server running on port 5000

Running Expired Coupon Cleanup...
```

---

# Backend Folder Structure

```
backend/

package.json

server.js

src/

config/

controllers/

jobs/

middleware/

models/

routes/

services/

utils/
```

---

# Verify Backend

Open a browser.

Visit

```
http://localhost:5000
```

or test APIs using Postman.

---

# Common Problems

## MongoDB Connection Error

Possible reasons:

- MongoDB service not started
- Incorrect MONGO_URI
- Wrong database name

---

## Port Already In Use

Change the port inside

```
.env
```

Example

```env
PORT=5001
```

---

## Missing Packages

Run

```bash
npm install
```

again.

---

## JWT Errors

Verify

```
JWT_SECRET
```

exists inside

```
.env
```

---

# Useful Commands

Check Node version

```bash
node -v
```

Check npm version

```bash
npm -v
```

Install packages

```bash
npm install
```

List installed packages

```bash
npm list
```

---

# Development Workflow

```
Pull Latest Code

↓

Install Dependencies

↓

Start MongoDB

↓

Run Backend

↓

Test APIs

↓

Develop Features

↓

Commit Changes

↓

Push to GitHub
```

---

# Git Workflow

Check status

```bash
git status
```

Stage files

```bash
git add .
```

Commit

```bash
git commit -m "Describe your changes"
```

Push

```bash
git push
```

---

# Summary

The backend provides REST APIs for authentication, coupon management, and background processing.

Always verify MongoDB is running before starting the backend, and never commit sensitive information such as the `.env` file to GitHub.