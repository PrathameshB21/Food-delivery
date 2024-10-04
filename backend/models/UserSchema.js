const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    },
    cartData:{
        type:Object,
        default:{}

    }
},{minimize:false})

const UserModel=mongoose.models.User||mongoose.model("User",UserSchema);

module.exports=UserModel;