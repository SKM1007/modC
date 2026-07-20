# modC Backend API Documentation

## Overview

The modC Backend provides RESTful APIs that enable the Android application to communicate with the server.

The backend is responsible for:

- User Authentication
- Coupon Management
- Coupon Retrieval
- Coupon Status Management
- JWT Verification

All responses are returned in JSON format.

---

# Base URL

Development

```
http://localhost:5000
```

Production

```
Coming Soon
```

---

# Authentication

Protected endpoints require a JWT token.

Example

```
Authorization: Bearer <JWT_TOKEN>
```

---

# API List

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | /api/auth/register | Register User | ❌ |
| POST | /api/auth/login | Login User | ❌ |
| POST | /api/coupons/save | Save Coupon | ✅ |
| GET | /api/coupons/myCoupons | Get Active Coupons | ✅ |
| GET | /api/coupons/brand/:brand | Get Coupons By Brand | ✅ |
| DELETE | /api/coupons/delete/:id | Soft Delete Coupon | ✅ |

---

# Authentication APIs

---

## Register User

### Endpoint

```
POST /api/auth/register
```

### Description

Creates a new user account.

---

### Request Body

```json
{
    "name":"Manoj",
    "email":"manoj@gmail.com",
    "password":"password123"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "User Registered Successfully"
}
```

---

### Possible Errors

```json
{
    "success": false,
    "message": "Email already exists"
}
```

```json
{
    "success": false,
    "message": "Invalid input"
}
```

---

## Login User

### Endpoint

```
POST /api/auth/login
```

---

### Request Body

```json
{
    "email":"manoj@gmail.com",
    "password":"password123"
}
```

---

### Success Response

```json
{
    "success": true,
    "token":"JWT_TOKEN"
}
```

---

### Possible Errors

```json
{
    "success": false,
    "message":"Invalid Credentials"
}
```

---

# Coupon APIs

---

## Save Coupon

### Endpoint

```
POST /api/coupons/save
```

Authentication Required

✅ Yes

---

### Request

```json
{
    "userId":"USER_ID",
    "brand":"AJIO",
    "couponCode":"AJIO500",
    "offerText":"Flat ₹500 OFF",
    "expiry":"31-12-2026"
}
```

---

### Success Response

```json
{
    "success": true,
    "message":"Coupon Saved Successfully"
}
```

---

### Duplicate Coupon

```json
{
    "success": false,
    "message":"Coupon Already Exists"
}
```

---

## Get My Coupons

### Endpoint

```
GET /api/coupons/myCoupons
```

---

### Query Parameters

```
userId=<USER_ID>
```

---

### Success Response

```json
{
    "success": true,
    "coupons":[
        {
            "brand":"AJIO",
            "couponCode":"AJIO500",
            "offerText":"Flat ₹500 OFF",
            "expiry":"31-12-2026",
            "status":"ACTIVE"
        }
    ]
}
```

Only ACTIVE coupons are returned.

---

## Get Coupons by Brand

### Endpoint

```
GET /api/coupons/brand/:brand
```

Example

```
GET /api/coupons/brand/AJIO
```

---

### Success Response

```json
{
    "success": true,
    "coupons":[
        {
            "brand":"AJIO",
            "couponCode":"AJIO500"
        }
    ]
}
```

---

## Delete Coupon

### Endpoint

```
DELETE /api/coupons/delete/:id
```

---

### Description

This API performs a **Soft Delete**.

The coupon is **NOT removed** from MongoDB.

Instead,

```
status

↓

ACTIVE

↓

DELETED
```

---

### Success Response

```json
{
    "success": true,
    "message":"Coupon Deleted Successfully"
}
```

---

# Background Cleanup

The backend contains a scheduled Cron Job.

Purpose

- Detect expired coupons
- Update coupon status
- Preserve coupon history

Flow

```
ACTIVE

↓

Expiry Date Passed

↓

Cron Job

↓

EXPIRED
```

Expired coupons remain in MongoDB.

---

# Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Authentication Flow

```
Register

↓

Login

↓

JWT Generated

↓

Android Stores JWT

↓

JWT Sent With Every Request

↓

Backend Validates JWT

↓

Controller Executes

↓

MongoDB
```

---

# Coupon Status

| Status | Description |
|---------|-------------|
| ACTIVE | Valid coupon |
| EXPIRED | Automatically expired |
| DELETED | Soft deleted by user |

---

# Request Validation

The backend validates:

## Registration

- Name Required
- Email Required
- Password Required

---

## Login

- Email Required
- Password Required

---

## Save Coupon

- Brand Required
- Coupon Code Required
- Expiry Required

---

# Future APIs

Planned APIs include:

```
GET /api/coupons/expired

PUT /api/profile

POST /api/forgot-password

POST /api/verify-email

GET /api/rewards

POST /api/shareCoupon

GET /api/categories

GET /api/analytics
```

---

# API Testing

Recommended tools

- Postman
- Thunder Client
- Android Retrofit

---

# Summary

The modC Backend exposes secure REST APIs for authentication and coupon management.

JWT authentication protects sensitive endpoints while MongoDB stores all persistent data.

The backend is designed to support future features without breaking existing APIs.