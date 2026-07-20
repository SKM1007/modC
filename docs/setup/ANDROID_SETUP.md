# Android Setup Guide

## Overview

This document explains how to set up the Android application for the modC project.

The Android application consists of:

- Android Mobile Application
- Custom Android Keyboard (Input Method Service)
- REST API Communication
- Material Design User Interface

The application communicates with the backend using HTTP REST APIs.

---

# Development Environment

The recommended development environment is:

| Software | Recommended Version |
|----------|---------------------|
| Android Studio | Latest Stable |
| Android SDK | API 34 or above |
| Kotlin | Latest Stable |
| Gradle | Managed by Android Studio |
| JDK | Version 17 |

---

# Clone the Repository

Clone the repository.

```bash
git clone https://github.com/<YOUR_USERNAME>/modC.git
```

Move into the Android project.

```bash
cd modC/android
```

---

# Open Android Studio

1. Launch Android Studio.
2. Select **Open**.
3. Choose the `android/` folder.
4. Wait for Gradle Sync to complete.

---

# Required SDKs

Open

```
Tools

↓

SDK Manager
```

Install the following:

- Android SDK Platform 34 (or latest)
- Android SDK Build Tools
- Android Emulator
- Android Platform Tools

---

# Gradle Sync

After opening the project:

```
File

↓

Sync Project with Gradle Files
```

Wait until Gradle finishes downloading all required dependencies.

---

# Project Structure

```
android/

app/

gradle/

build.gradle.kts

settings.gradle.kts

gradle.properties
```

Inside the app module:

```
app/

src/

main/

java/

res/

AndroidManifest.xml
```

---

# Application Modules

The Android project includes the following major components.

## Authentication

- Login Screen
- Registration Screen

---

## Dashboard

Displays:

- User Information
- Saved Coupons
- Navigation

---

## Coupon Module

Allows users to:

- Save Coupons
- View Coupons
- Delete Coupons

---

## Custom Keyboard

The Android keyboard provides:

- Coupon Suggestions
- Quick Coupon Selection
- Coupon Code Insertion

The keyboard is implemented using:

```
InputMethodService
```

---

# Networking

The Android application communicates with the backend using REST APIs.

Recommended library:

```
Retrofit
```

Communication flow:

```
Android

↓

Retrofit

↓

Node.js Backend

↓

MongoDB
```

---

# Environment Configuration

Update the API Base URL according to the environment.

Development

```
http://10.0.2.2:5000
```

Android Emulator uses:

```
10.0.2.2
```

For a physical device:

```
http://<YOUR_LOCAL_IP>:5000
```

Example

```
http://192.168.1.10:5000
```

---

# Build the Project

Build using Android Studio.

```
Build

↓

Make Project
```

or

```
Build

↓

Rebuild Project
```

---

# Run the Application

Run on

- Android Emulator
- Physical Android Device

Minimum Android Version

```
Android 8.0 (API 26)
```

Recommended

```
Android 11+
```

---

# Enable Developer Options

For physical devices:

Enable

- Developer Options
- USB Debugging

Connect the device via USB.

Verify connection.

```bash
adb devices
```

---

# Enable Custom Keyboard

After installing the application:

Open

```
Settings

↓

System

↓

Languages & Input

↓

On-screen Keyboard

↓

Manage Keyboards
```

Enable

```
modC Keyboard
```

Select

```
modC Keyboard
```

as the current keyboard.

---

# Verify Backend Connection

Before running the Android application:

Start MongoDB.

Start Backend.

```bash
node server.js
```

Verify the backend is accessible.

```
http://localhost:5000
```

Update Retrofit Base URL if necessary.

---

# Running the Full System

Complete startup order:

```
Start MongoDB

↓

Start Backend

↓

Open Android Studio

↓

Run Android App

↓

Login

↓

Save Coupon

↓

Verify MongoDB

↓

Enable Keyboard

↓

Test Coupon Insertion
```

---

# Common Issues

## Gradle Sync Failed

Try

```
File

↓

Invalidate Caches / Restart
```

---

## Emulator Cannot Reach Backend

Use

```
10.0.2.2
```

instead of

```
localhost
```

---

## Device Cannot Connect

Verify:

- Backend Running
- Same Wi-Fi Network
- Correct Local IP Address

---

## Keyboard Not Visible

Enable the keyboard from Android Settings.

Restart the application if necessary.

---

# Development Workflow

```
Pull Latest Code

↓

Open Android Studio

↓

Gradle Sync

↓

Run Backend

↓

Run Android App

↓

Implement Feature

↓

Test

↓

Commit

↓

Push
```

---

# Best Practices

- Use ViewBinding.
- Keep Activities lightweight.
- Place business logic in separate classes.
- Store API URLs in configuration files.
- Never hardcode secrets.
- Test on both emulator and physical devices.
- Commit small, focused changes.

---

# Summary

The Android application is the primary client for the modC platform.

It provides authentication, coupon management, and integrates a custom Android keyboard that allows users to quickly insert saved coupons into supported applications.

The application communicates securely with the backend using REST APIs and follows a modular architecture for future scalability.