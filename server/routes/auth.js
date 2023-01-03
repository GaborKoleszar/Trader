import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

/* LOGGING IN */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.render("auth/login", {message : "User not found!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.render("auth/login", {message : "Invalid credentials!"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.render("dashboard/dashboard", {message : token});;
    } catch (err) {
        console.log(`Error ${err}`);
        res.render("auth/login", {message : err.message});
    }
});

/* REGISTER USER */
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* LOGGING IN PAGE */
router.get("/login", async (req, res) => {
    res.render("auth/login");
});

/* REGISTER USER PAGE */
router.get("/register", (req, res) => {
    res.render("auth/register");
});

export default router;
