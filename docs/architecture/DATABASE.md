# Database Design

## Overview

modC uses **MongoDB** as its primary NoSQL database for storing user accounts, coupons, rewards, and transaction-related data.

The database is designed to be scalable, flexible, and optimized for future feature expansion such as affiliate marketing, analytics, notifications, and user rewards.

---

# Database Information

| Property | Value |
|----------|-------|
| Database Name | modc_core_production |
| Database Type | MongoDB |
| Storage Model | Document-Oriented (NoSQL) |
| Primary Identifier | ObjectId |

---

# Database Collections

Current collections:

```
users

my_coupons

rewards

transactions
```

Future collections:

```
notifications

analytics

affiliate_clicks

device_sessions

user_preferences
```

---

# Database Relationship

```
User

│

├──────────────┐

│              │

▼              ▼

Coupons     Transactions

│

▼

Rewards
```

A single user can own multiple coupons, rewards, and transactions.

---

# Collection: users

Stores registered users.

## Document Structure

```json
{
    "_id": ObjectId,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Encrypted Password",
    "createdAt": ISODate()
}
```

## Fields

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary Key |
| name | String | User Full Name |
| email | String | Unique Email Address |
| password | String | bcrypt Hashed Password |
| createdAt | Date | Registration Date |

---

## Validation Rules

- Email must be unique.
- Password is stored only after hashing.
- Email cannot be empty.
- Name cannot be empty.

---

# Collection: my_coupons

Stores every coupon owned by a user.

## Document Structure

```json
{
    "_id": ObjectId,
    "userId": "USER_OBJECT_ID",
    "brand": "AJIO",
    "couponCode": "AJIO500",
    "offerText": "Flat ₹500 OFF",
    "expiry": "31-12-2026",
    "status": "ACTIVE",
    "createdAt": ISODate()
}
```

---

## Coupon Status

Possible values:

```
ACTIVE

EXPIRED

DELETED
```

### ACTIVE

Coupon is valid.

Displayed inside Android Keyboard.

---

### EXPIRED

Coupon has crossed its expiry date.

Hidden from keyboard.

Maintained for history.

---

### DELETED

User manually deleted the coupon.

Record remains inside MongoDB.

Hidden from the application.

---

## Fields

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Coupon ID |
| userId | ObjectId | Owner |
| brand | String | Merchant Name |
| couponCode | String | Coupon Code |
| offerText | String | Offer Description |
| expiry | String | DD-MM-YYYY |
| status | String | ACTIVE / EXPIRED / DELETED |
| createdAt | Date | Coupon Creation Date |

---

# Collection: rewards

Stores future reward information.

## Planned Structure

```json
{
    "_id": ObjectId,
    "userId": "...",
    "rewardPoints": 0,
    "updatedAt": ISODate()
}
```

---

## Fields

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Reward ID |
| userId | ObjectId | Owner |
| rewardPoints | Number | Total Reward Points |
| updatedAt | Date | Last Updated |

---

# Collection: transactions

Stores reward-related financial events.

## Planned Structure

```json
{
    "_id": ObjectId,
    "userId": "...",
    "type": "REWARD",
    "amount": 100,
    "createdAt": ISODate()
}
```

---

## Fields

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Transaction ID |
| userId | ObjectId | Owner |
| type | String | Reward / Referral |
| amount | Number | Transaction Amount |
| createdAt | Date | Timestamp |

---

# Coupon Lifecycle

```
Coupon Created

↓

ACTIVE

↓

Used

↓

ACTIVE

↓

Expired

↓

EXPIRED

↓

Archived
```

Deleted coupons follow a different flow.

```
ACTIVE

↓

DELETED

↓

Hidden

↓

Retained in Database
```

No coupon is permanently deleted.

---

# Database Indexes

Recommended indexes:

## users

```
email
```

Reason:

- Faster login
- Unique user validation

---

## my_coupons

```
userId

status

brand
```

Reason:

- Faster dashboard loading
- Faster keyboard loading
- Faster brand filtering

---

# Data Integrity Rules

The following rules are enforced by the backend.

## Users

- Email must be unique.
- Password is hashed.
- JWT required for protected APIs.

---

## Coupons

- Coupon belongs to one user.
- Coupon cannot exist without owner.
- Coupon status must be valid.
- Expired coupons are not deleted.
- Deleted coupons are not deleted.

---

# Future Database Enhancements

Planned improvements:

- Coupon Categories
- Merchant Logos
- Coupon Usage History
- Coupon Sharing
- Affiliate Tracking
- Push Notifications
- Analytics
- OCR Metadata
- AI Classification
- Device Synchronization

---

# Backup Strategy

Recommended:

- Daily MongoDB Backup
- Weekly Full Backup
- Monthly Archive
- Cloud Storage Replication

---

# Summary

The modC database is designed around a document-oriented MongoDB architecture.

User information, coupons, rewards, and future transaction records are stored independently while maintaining logical relationships through the `userId` field.

The database is optimized for scalability, maintainability, and future feature expansion without requiring major schema redesign.