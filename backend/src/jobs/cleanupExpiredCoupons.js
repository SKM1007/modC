const cron = require("node-cron");

const { getDB } =
require("../config/database");

const startCouponCleanupJob = () => {

    cron.schedule(
    "* * * * *",
        async () => {

            try {

                console.log(
                    "Running Expired Coupon Cleanup..."
                );

                const db = getDB();

                const coupons =
                    await db
                    .collection("my_coupons")
                    .find({

                        status: "ACTIVE"

                    })
                    .toArray();

                const today =
                    new Date();

                let expiredCount = 0;

                for (const coupon of coupons) {

                    try {

                        const parts =
                            coupon.expiry.split("-");

                        const expiryDate =
                            new Date(

                                parseInt(parts[2]),

                                parseInt(parts[1]) - 1,

                                parseInt(parts[0])

                            );

                        if (
                            expiryDate < today
                        ) {

                            await db
                                .collection("my_coupons")
                                .updateOne(

                                    {
                                        _id:
                                            coupon._id
                                    },

                                    {
                                        $set: {

                                            status:
                                                "EXPIRED"

                                        }
                                    }

                                );

                            expiredCount++;

                        }

                    } catch (err) {

                        console.error(
                            "Invalid expiry format:",
                            coupon.expiry
                        );

                    }

                }

                console.log(

                    `${expiredCount} coupons marked EXPIRED`

                );

            } catch (error) {

                console.error(

                    "Cleanup Error:",

                    error

                );

            }

        }

    );

};

module.exports = {

    startCouponCleanupJob

};