import express from "express";
import auth from "../middleware/auth.js";
import { getPosts,setRequest } from "../controllers/requests.js";

const router = express.Router();
router.get('/', getPosts);
router.post('/request/:id', auth, setRequest);


export default router;