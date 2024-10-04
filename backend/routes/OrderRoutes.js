const express=require('express');
const orderModel=require('../models/OrderSchema.js');
const {placeOrder,validateResponse,userOrder,listorders,updateStatus}=require('../controllers/OrderController.js');
const authMiddlewere = require('../middlewere/auth.js');
// const authMiddlewere=require('../middlewere/auth.js')
const OrderRouter=express.Router();

OrderRouter.post("/place",authMiddlewere,placeOrder)
OrderRouter.post("/validate",authMiddlewere,validateResponse);
OrderRouter.post('/userOrders',authMiddlewere,userOrder)
OrderRouter.get('/list',listorders);
OrderRouter.post('/updateStatus',updateStatus)


module.exports=OrderRouter;
