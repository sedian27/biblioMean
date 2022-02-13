import express from "express";
import controller from "../controllers/role.js";

const router = express.Router();

router.post("/addRole", controller.registerRole);

export default router;
