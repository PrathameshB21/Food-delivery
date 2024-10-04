const express=require('express')
const{userLogin,registerUser}=require('../controllers/UserController.js')

const userRouter=express.Router();
userRouter.post("/register",registerUser)
userRouter.post("/login",userLogin)


module.exports=userRouter;
