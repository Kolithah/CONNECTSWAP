import express from "express";
const router = express.Router();

import { signin, signup,getNameById } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getNameById/:id", getNameById);

export default router;