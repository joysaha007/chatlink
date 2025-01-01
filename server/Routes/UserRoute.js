import express from "express";
// import { getUser, updateUser, deleteUser,getAllUsers, followUser, unFollowUser,createUser,blockUser } from "../Controllers/UserController.js";
import { getUser, updateUser, deleteUser, getAllUsers, followUser, unFollowUser, createUser, blockUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get('/',getAllUsers)
router.get('/:id', getUser)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put('/:id/unfollow',authMiddleWare, unFollowUser)
// admin action 
router.put('/:id',updateUser)
router.delete('/:id', deleteUser)
router.post('/',createUser)
router.put('/id/block',blockUser)



export default router;