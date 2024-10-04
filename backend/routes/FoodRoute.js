const express= require('express');
const {addFood,listFood,removeItem} = require ('../controllers/FoodController');
const multer= require('multer');


const FoodRouter=express.Router();
const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}-${Date.now()}.png`)
    }
})
const uploads=multer({storage:Storage})

FoodRouter.post("/add",uploads.single("image"),addFood)

FoodRouter.get("/list",listFood)
FoodRouter.post("/removeFoodItem",removeItem);
module.exports= FoodRouter;