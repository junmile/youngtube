import express from "express";
import routes from "../routes";


const userRouter = express.Router();


const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";


userRouter.get(routes.users, (req,res) => res.send("Users"));
userRouter.get(routes.userDetail, (req,res) => res.send("User Detail"));
userRouter.get(routes.editProfile, (req,res) => res.send("Edit Profile"));
userRouter.get(routes.changePassword, (req,res) => res.send("Change Password"));



export default userRouter;