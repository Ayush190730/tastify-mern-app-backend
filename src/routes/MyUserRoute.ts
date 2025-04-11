import express from "express";
import { createCurrentUser, getCurrentUser, updateCurrentUser } from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

// import { jwtCheck, jwtParse } from "../middleware/auth";
// import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// /api/my/user
router.get("/", jwtCheck, jwtParse, getCurrentUser);
router.post("/", jwtCheck, createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  updateCurrentUser
);

export default router;