require("dotenv").config();

const express = require("express");

const { connectDB } = require(
    "./src/config/database"
);

const {
    startCouponCleanupJob
} = require(
    "./src/jobs/cleanupExpiredCoupons"
);

const authRoutes = require(
    "./src/routes/auth.routes"
);

const couponRoutes = require(
    "./src/routes/coupon.routes"
);

const app = express();

app.use(express.json());

// Connect MongoDB
connectDB();

startCouponCleanupJob();

// Auth Routes
app.use(
    "/api/auth",
    authRoutes
);

// Coupon Routes
app.use(
    "/api/coupons",
    couponRoutes
);

app.listen(
    process.env.PORT,
    () => {
        console.log(
            `Server running on port ${process.env.PORT}`
        );
    }
);