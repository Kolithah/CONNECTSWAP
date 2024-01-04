import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();
import { createExchangeScheme, getSchemes, makePost, getUsersRequests, getRequest, proceedRequest} from "../controllers/requests.js";

// router.get('/posts', getPosts);
// router.patch('/posts/:id',auth,  createPost);
router.post('/scheme',auth,  createExchangeScheme);
router.get('/scheme/get', auth, getSchemes);
router.post('/scheme/createPost/:id',auth,makePost);
router.get('/scheme/getRequests', auth, getUsersRequests);
router.get('/scheme/getRequest/:id', auth, getRequest);
router.patch('/scheme/proceedRequest/:id', auth, proceedRequest);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);

export default router;