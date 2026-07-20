# Testing Guide

## Overview

This document describes the testing strategy for the modC platform.

The goal of testing is to ensure that all components of the system work correctly, both independently and together.

The project consists of:

- Android Application
- Custom Android Keyboard
- Node.js Backend
- MongoDB Database

---

# Testing Objectives

The testing process verifies:

- User authentication
- Coupon management
- Database operations
- REST API functionality
- Android application
- Keyboard functionality
- Backend services
- End-to-end communication

---

# Testing Environment

| Component | Version |
|-----------|----------|
| Node.js | 20+ |
| MongoDB | Latest |
| Android Studio | Latest |
| Android SDK | API 34 |
| Postman | Latest |

---

# Testing Types

## Unit Testing

Tests individual backend functions.

Examples:

- Password hashing
- JWT generation
- Coupon validation
- Input validation

---

## Integration Testing

Tests communication between modules.

Examples:

- Android ↔ Backend
- Backend ↔ MongoDB
- Login ↔ JWT
- Coupon Save ↔ Database

---

## System Testing

Tests the complete system.

Flow

```
Android

↓

Backend

↓

MongoDB

↓

Response

↓

Android
```

---

## End-to-End Testing

Tests the complete user workflow.

Example

```
Register

↓

Login

↓

Save Coupon

↓

View Coupon

↓

Delete Coupon

↓

Logout
```

---

# API Testing

Recommended tool

```
Postman
```

Base URL

```
http://localhost:5000
```

---

## Register API

### Request

```
POST /api/auth/register
```

Expected Result

- User created
- Password hashed
- User stored in MongoDB

---

## Login API

### Request

```
POST /api/auth/login
```

Expected Result

- JWT returned
- Login successful

---

## Save Coupon API

### Request

```
POST /api/coupons/save
```

Expected Result

- Coupon stored
- Duplicate coupons rejected

---

## Get Coupons API

### Request

```
GET /api/coupons/myCoupons
```

Expected Result

- Only ACTIVE coupons returned

---

## Delete Coupon API

### Request

```
DELETE /api/coupons/delete/:id
```

Expected Result

- Coupon status becomes DELETED
- Document remains in MongoDB

---

# Database Testing

Verify:

- User documents
- Coupon documents
- Reward documents
- Transaction documents

Check:

- ObjectId
- createdAt
- status
- userId

---

# Authentication Testing

## Registration

Verify:

- Valid registration
- Duplicate email rejection
- Missing fields
- Invalid email

---

## Login

Verify:

- Correct credentials
- Incorrect password
- Unknown email
- JWT generation

---

# Coupon Testing

Verify

- Save coupon
- Duplicate coupon
- Delete coupon
- Retrieve coupons
- Brand filtering
- Expired coupon handling

---

# Android Testing

Verify

- Login screen
- Registration screen
- Dashboard
- Coupon list
- Delete button
- Logout

---

# Keyboard Testing

Enable

```
modC Keyboard
```

Verify

- Keyboard launches
- Coupon suggestions displayed
- Coupon insertion works
- Empty coupon list handled gracefully

---

# Cron Job Testing

Purpose

Automatically update expired coupons.

Test

1. Insert coupon with expired date.

2. Start backend.

Expected Result

```
ACTIVE

↓

EXPIRED
```

Coupon remains in database.

---

# Security Testing

Verify

- JWT required for protected APIs
- Passwords stored as bcrypt hashes
- Unauthorized requests rejected
- Invalid JWT rejected

---

# Performance Testing

Verify

- Login response time
- Coupon retrieval speed
- Database query performance
- Multiple concurrent API requests

---

# Error Handling Testing

Test invalid scenarios.

Examples

- Invalid email
- Empty password
- Missing JWT
- Invalid coupon ID
- Invalid ObjectId
- Backend unavailable

Expected Result

Appropriate HTTP error code with JSON response.

---

# Test Cases

| Test ID | Description | Expected Result |
|----------|-------------|-----------------|
| TC-001 | Register new user | Success |
| TC-002 | Register duplicate email | Failure |
| TC-003 | Login valid user | Success |
| TC-004 | Login invalid password | Failure |
| TC-005 | Save coupon | Success |
| TC-006 | Save duplicate coupon | Failure |
| TC-007 | Retrieve coupons | Active coupons returned |
| TC-008 | Delete coupon | Status updated to DELETED |
| TC-009 | Expired coupon cleanup | Status updated to EXPIRED |
| TC-010 | Unauthorized API request | HTTP 401 |

---

# Manual Testing Checklist

## Backend

- [ ] Server starts successfully
- [ ] MongoDB connects
- [ ] APIs respond correctly

## Database

- [ ] User saved
- [ ] Coupon saved
- [ ] Status updates correctly

## Android

- [ ] Login works
- [ ] Registration works
- [ ] Dashboard loads
- [ ] Coupon list displays

## Keyboard

- [ ] Keyboard enabled
- [ ] Keyboard opens
- [ ] Coupons displayed
- [ ] Coupon inserted correctly

---

# Acceptance Criteria

The application is considered ready when:

- All APIs return expected responses.
- Authentication works correctly.
- Coupons can be created, viewed, and deleted.
- Expired coupons are updated automatically.
- Android app communicates with backend successfully.
- Custom keyboard functions correctly.
- No critical defects remain.

---

# Future Testing

Planned improvements:

- Automated API testing
- Unit testing with Jest
- Android UI testing
- Load testing
- Performance benchmarking
- CI/CD pipeline integration

---

# Summary

Testing ensures that every component of the modC platform functions correctly and integrates seamlessly with the rest of the system.

A combination of unit, integration, system, and end-to-end testing helps maintain reliability, security, and performance as the project evolves.