const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { getDB } =
require("../config/database");


// REGISTER

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const db = getDB();

        const users =
            db.collection("users");

        const existingUser =
            await users.findOne({
                email
            });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await users.insertOne({

            name,

            email,

            passwordHash:
                hashedPassword,

            createdAt:
                new Date()

        });

        res.status(201).json({

            success: true,

            message:
                "User registered"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message:
                "Server Error"

        });

    }

};


// LOGIN

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const db = getDB();

        const users =
            db.collection("users");

        const user =
            await users.findOne({
                email
            });

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            success: true,

            token,

            userId:
                user._id.toString(),

            email:
                user.email,

            name:
                user.name

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message:
                "Server Error"

        });

    }

};


module.exports = {

    registerUser,

    loginUser

};