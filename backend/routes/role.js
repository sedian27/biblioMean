import express from "express";
import controller from "../controllers/role.js";

const router = express.Router();

router.post("/registerRole", controller.validations, controller.registerRole);
router.get("/listRole/:name?", controller.listRole);

export default router;
