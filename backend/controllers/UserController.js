const UserModel = require('../models/UserSchema.js');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const creatToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_secreatKey)
}

//User Login
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(401).json({message:"User with this email not found"});
        }
        const isPass = await bcrypt.compare(password, user.password);
        if(!isPass) {
           return res.status(401).json({message:"Invalide credential"});
        }
        const token = creatToken(user._id)
       return res.status(200).json({message:"user loged in sucessfully",token} )
    }
    catch (error) {
        return  res.status(500).json({message:"Internal server errorr"});
        // console.log(error);
        
        
    }


}


//Registor Login
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name||!email||!password){
        return res.status(400).json({message:"All fields are reuired"})
    }
    try {
        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({message:"User already exist"})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({message:"Invalid email id "})
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({message:"Enter a strong password"})
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        // console.log(hashedPass);
         const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPass
            // password:password
        })
        const userData = await newUser.save();
        // res.status(200).send("user registered successfully")
        const token = await creatToken(userData._id);
        return res.status(200).send({message:"User registered successfully",token:token});
    }
    catch (error) {
        // console.log(error);

        return res.status(500).json({message:"Internal server error"})

    }

}

module.exports = {
    userLogin: userLogin,
    registerUser: registerUser
}