const mongoose= require('mongoose')


const FoodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

})

const foodModel=mongoose.models.Food||mongoose.model("Food",FoodSchema);

module.exports=foodModel;