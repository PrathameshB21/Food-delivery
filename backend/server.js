 const express= require('express')
 const cors= require('cors')
 const db= require('./config/db')
//  const UserRouter=require('./routes/UserRoutes')
require('dotenv').config();


 const app=express();
app.use(express.json())
app.use(cors())

//import Routes
const FoodRouter=require('./routes/FoodRoute');
const userRouter = require('./routes/UserRoutes');
const cartRouter = require('./routes/CartRoutes');
const OrderRouter = require('./routes/OrderRoutes');


//api endpoint
app.use(cors());
app.use("/api/food",FoodRouter);
app.use("/images", express.static('uploads'));;
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",OrderRouter)
 app.listen(4000);
