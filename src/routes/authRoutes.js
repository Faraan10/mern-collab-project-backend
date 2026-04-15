import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.post("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
