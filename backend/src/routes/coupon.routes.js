const express = require("express");

const router = express.Router();

const {
    saveCoupon,
    getMyCoupons,
    getCouponByBrand,
    deleteCoupon
} = require("../controllers/coupon.controller");


// Save Coupon
router.post(
    "/save",
    saveCoupon
);


// Get All User Coupons
router.get(
    "/myCoupons",
    getMyCoupons
);


// Get Coupon By Brand
router.get(
    "/byBrand",
    getCouponByBrand
);


// Delete Coupon
router.delete(
    "/delete/:id",
    deleteCoupon
);

module.exports = router;