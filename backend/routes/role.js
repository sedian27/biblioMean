import express from "express";
import controller from "../controllers/role.js";

const router = express.Router();

router.post("/role/addRole", controller.addRole);

export default router;
