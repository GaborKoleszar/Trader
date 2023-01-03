import express from "express";

const router = express.Router();

/* DASHBOARD AFTER LOGIN */
router.get("/dashboard", async (req, res) => {
    res.render("dashboard/dashboard", { token: req.body.token });
});

/* INITIAL ROOT REDIRECT */
router.get("/", (req, res) => {
    res.redirect("auth/login");
});

export default router;