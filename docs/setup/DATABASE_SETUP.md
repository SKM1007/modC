# Database Setup Guide

## Overview

This document explains how to install, configure, and verify the MongoDB database used by the modC backend.

The backend uses MongoDB to store:

- User Accounts
- Coupons
- Rewards
- Transactions

MongoDB is the only persistent storage used by the backend.

---

# Database Information

| Property | Value |
|----------|-------|
| Database | MongoDB |
| Database Name | modc_core_production |
| Default Port | 27017 |
| Storage Type | NoSQL Document Database |

---

# Prerequisites

Before setting up the database, install:

- MongoDB Community Server
- MongoDB Compass

Official Downloads:

MongoDB Community Server

https://www.mongodb.com/try/download/community

MongoDB Compass

https://www.mongodb.com/products/compass

---

# Verify Installation

Open a terminal.

Check MongoDB version.

```bash
mongod --version
```

Check Mongo Shell.

```bash
mongosh --version
```

If both commands return a version number, MongoDB is installed correctly.

---

# Starting MongoDB

## Ubuntu

Start MongoDB.

```bash
sudo systemctl start mongod
```

Check status.

```bash
sudo systemctl status mongod
```

Enable MongoDB to start automatically after boot.

```bash
sudo systemctl enable mongod
```

---

## Windows

Start MongoDB using Windows Services.

or

```powershell
net start MongoDB
```

---

# Connecting Using MongoDB Compass

Open MongoDB Compass.

Connection String

```
mongodb://127.0.0.1:27017
```

Click

```
Connect
```

---

# Create Database

Click

```
Create Database
```

Database Name

```
modc_core_production
```

Initial Collection

```
users
```

Click

```
Create Database
```

---

# Collections

Current collections

```
users

my_coupons

rewards

transactions
```

Future collections

```
analytics

notifications

affiliate_clicks

user_preferences

device_sessions
```

---

# Collection Structure

## users

Stores user accounts.

Example

```json
{
    "_id": ObjectId(),
    "name": "Manoj",
    "email": "manoj@gmail.com",
    "password": "<bcrypt_hash>",
    "createdAt": ISODate()
}
```

---

## my_coupons

Stores coupons belonging to users.

Example

```json
{
    "_id": ObjectId(),
    "userId": ObjectId(),
    "brand": "AJIO",
    "couponCode": "AJIO500",
    "offerText": "Flat ₹500 OFF",
    "expiry": "31-12-2026",
    "status": "ACTIVE",
    "createdAt": ISODate()
}
```

---

## rewards

Stores future reward information.

Example

```json
{
    "_id": ObjectId(),
    "userId": ObjectId(),
    "rewardPoints": 100
}
```

---

## transactions

Stores reward transactions.

Example

```json
{
    "_id": ObjectId(),
    "userId": ObjectId(),
    "type": "REWARD",
    "amount": 50,
    "createdAt": ISODate()
}
```

---

# Coupon Status

Coupons can exist in three states.

```
ACTIVE

EXPIRED

DELETED
```

ACTIVE

- Displayed in Android Keyboard
- Available for use

EXPIRED

- Automatically updated by Cron Job
- Hidden from Keyboard
- Preserved in Database

DELETED

- User deleted coupon
- Record remains in MongoDB
- Hidden from Application

---

# Index Recommendations

Create indexes for faster queries.

## users

```
email
```

Unique Index

---

## my_coupons

```
userId

status

brand
```

---

# Verify Database Connection

Start backend.

```bash
node server.js
```

Expected output

```
MongoDB Connected

Server running on port 5000
```

---

# Verify Database

Open MongoDB Compass.

Open

```
modc_core_production
```

You should see

```
users

my_coupons

rewards

transactions
```

Insert a test user.

```json
{
    "name":"Test User",
    "email":"test@example.com",
    "password":"hashed_password"
}
```

If the document appears successfully, the database is working correctly.

---

# Backup

Recommended backup strategy.

Daily

- Incremental Backup

Weekly

- Full Database Backup

Monthly

- Archive Backup

Recommended command

```bash
mongodump
```

Restore

```bash
mongorestore
```

---

# Common Issues

## MongoDB Not Running

Ubuntu

```bash
sudo systemctl start mongod
```

Windows

Start MongoDB Service.

---

## Connection Refused

Check

- MongoDB service
- Port 27017
- Connection String

---

## Authentication Failed

Verify

```
MONGO_URI
```

inside

```
backend/.env
```

---

# Best Practices

- Never store passwords in plain text.
- Always hash passwords using bcrypt.
- Never delete coupon history permanently.
- Use ObjectId for document references.
- Keep backups regularly.
- Avoid storing duplicate coupon records.

---

# Summary

MongoDB serves as the central data store for the modC platform.

It stores user accounts, coupons, rewards, and transactions while providing a scalable document-based architecture for future enhancements.

The backend communicates exclusively with MongoDB, ensuring secure and consistent data management throughout the application.