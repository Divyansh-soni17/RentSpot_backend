import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";
 
// import {deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, logout, registerUser, resetPassword, updatePassword, updateProfile, updateUserRole} from "../controller/userController.js"
// import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);

 



export default router;