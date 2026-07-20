const { getDB } = require("../config/database");
const { ObjectId } = require("mongodb");

// ======================
// SAVE COUPON
// ======================

const saveCoupon = async (req, res) => {

```
try {

    const {
        userId,
        brand,
        couponCode,
        offerText,
        expiry
    } = req.body;

    if (
        !userId ||
        !brand ||
        !couponCode ||
        !expiry
    ) {

        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });

    }

    const db = getDB();

    // =====================
    // DUPLICATE CHECK
    // =====================

    const existingCoupon = await db
        .collection("my_coupons")
        .findOne({

            userId,
            brand,
            couponCode

        });

    if (existingCoupon) {

        return res.status(409).json({

            success: false,
            message: "Coupon already exists"

        });

    }

    // =====================
    // EXPIRY VALIDATION
    // =====================

    const parts = expiry.split("-");

    if (parts.length !== 3) {

        return res.status(400).json({

            success: false,
            message: "Invalid expiry format"

        });

    }

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    const expiryDate =
        new Date(
            year,
            month - 1,
            day
        );

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    if (expiryDate < today) {

        return res.status(400).json({

            success: false,
            message: "Coupon already expired"

        });

    }

    const couponData = {

        userId,

        brand,

        couponCode,

        offerText: offerText || "",

        expiry,

        status: "ACTIVE",

        createdAt: new Date()

    };

    const result = await db
        .collection("my_coupons")
        .insertOne(couponData);

    res.status(201).json({

        success: true,

        message: "Coupon saved successfully",

        insertedId: result.insertedId

    });

} catch (error) {

    console.error(error);

    res.status(500).json({

        success: false,

        message: "Server Error"

    });

}
```

};

// ======================
// GET ALL COUPONS
// ======================

const getMyCoupons = async (req, res) => {

```
try {

    const { userId } = req.query;

    if (!userId) {

        return res.status(400).json({

            success: false,
            message: "UserId is required"

        });

    }

    const db = getDB();

    const coupons = await db
        .collection("my_coupons")
        .find({

            userId,
            status: "ACTIVE"

        })
        .sort({
            createdAt: -1
        })
        .toArray();

    res.status(200).json({

        success: true,
        coupons

    });

} catch (error) {

    console.error(error);

    res.status(500).json({

        success: false,
        message: "Server Error"

    });

}
```

};

// ======================
// GET COUPON BY BRAND
// ======================

const getCouponByBrand = async (req, res) => {

```
try {

    const {
        userId,
        brand
    } = req.query;

    if (
        !userId ||
        !brand
    ) {

        return res.status(400).json({

            success: false,
            message: "userId and brand are required"

        });

    }

    const db = getDB();

    const coupon = await db
        .collection("my_coupons")
        .findOne({

            userId,
            brand,
            status: "ACTIVE"

        });

    if (!coupon) {

        return res.status(404).json({

            success: false,
            message: "Coupon not found"

        });

    }

    res.status(200).json({

        success: true,
        coupon

    });

} catch (error) {

    console.error(error);

    res.status(500).json({

        success: false,
        message: "Server Error"

    });

}
```

};

// ======================
// DELETE COUPON
// ======================

const deleteCoupon = async (req, res) => {

```
try {

    const { id } = req.params;

    const db = getDB();

    const result = await db
        .collection("my_coupons")
        .updateOne(

            {
                _id: new ObjectId(id)
            },

            {
                $set: {
                    status: "DELETED"
                }
            }

        );

    if (result.matchedCount === 0) {

        return res.status(404).json({

            success: false,
            message: "Coupon not found"

        });

    }

    res.status(200).json({

        success: true,
        message: "Coupon deleted successfully"

    });

} catch (error) {

    console.error(error);

    res.status(500).json({

        success: false,
        message: "Server Error"

    });

}
```

};

module.exports = {

saveCoupon,

getMyCoupons,

getCouponByBrand,

deleteCoupon


};