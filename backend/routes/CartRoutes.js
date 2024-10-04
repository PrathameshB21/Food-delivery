const express=require('express');
const{addToCart,removeFromCart,getCart}=require('../controllers/CartController.js')
const authMiddlewere=require('../middlewere/auth.js');
const cartRouter=express.Router();

cartRouter.post("/add",authMiddlewere,addToCart);

cartRouter.post('/remove',authMiddlewere,removeFromCart);

cartRouter.post('/get',authMiddlewere,getCart);

module.exports=cartRouter
;
