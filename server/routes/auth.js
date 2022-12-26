import express from "express";
import {
    login,
    register,
    loginPage,
    registerPage,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/login", loginPage);
router.get("/register", registerPage);

export default router;
