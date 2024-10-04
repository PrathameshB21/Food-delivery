const foodModel=require('../models/FoodSchema')
const fs=require('fs')
//adding food item

const addFood=async(req,res)=>{
     let image_name=`${req.file.filename}`
    const newFoodItem= new foodModel({
           
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image: image_name

    })  
    try{
        await newFoodItem.save()
        res.status(200).send(`Food Data Added`)
    }
    catch(error){
        res.status(501).send(error,`Server error`)
    }
    }

    //all list food

    const listFood=async(req,res)=>{
         try{
            const foodList=await foodModel.find({});
            res.send(foodList)
         }
         catch(error){
            res.send(error)
         }
    }

    //remove food item from list
    const removeItem=async(req,res)=>{
        try{
            const foodItem=await foodModel.findById(req.body._id);
            fs.unlink(`uploads/${foodItem.image}`,(err)=>{
                
                
            })


            await foodModel.findByIdAndDelete(req.body._id);
            res.status(200).send("Food Item removed")
        }
        catch(err){
            res.status(500).send(err)
        }
    }
module.exports={addFood:addFood,
    listFood:listFood,
    removeItem:removeItem
};