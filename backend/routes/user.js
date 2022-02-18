import express from "express";
import controller from "../controllers/user.js";

import userMdd from "../middleware/validUser.js";
import roleMdd from "../middleware/validRole.js";

const router = express.Router();

router.post(
  "/registerUser",
  userMdd.validations,
  roleMdd.validRole,
  controller.registerUser
);
router.get("/listUser/:name?", controller.listUser);

export default router;
