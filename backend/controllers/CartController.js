const UserModel = require('../models/UserSchema.js');






const addToCart = async (req, res) => {
    try {
        // console.log(req.body.userId);
        let userData = await UserModel.findById({ _id: req.body.userId });
        // console.log(userData);

        if (!userData) {
            console.log("user not found");
            // return res.send(
            //     "user not found"

            // )



        }
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;

        } else {
            cartData[req.body.itemId] += 1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ message: 'Item added to cart' })

    }
    catch (error) {
        console.log(error);
        console.error(error);

        return res.status(500).json({ message: "error occured while adding item to cart" });


    }

}

const removeFromCart = async (req, res) => {
    try {
        let userData = await UserModel.findById({ _id: req.body.userId });
        if (!userData) {
            return res.status(401).json({ message: "User not found" });
        }
        const cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }else{
            cartData={}
        }
   
        await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ message: 'Item removed from cart' })

    }
    catch (error) {
        return res.status(500).json({ message: "error occured while removing item from cart" });
    }

}

const getCart = async (req, res) => {
    try {
        let userData=await UserModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.status(200).json({meassage:"Item's in your cart",cartData})
    }
    catch (error){
        return res.status(500).json({ message: "error occured while removing item from cart" });

    }
}


module.exports = {
    addToCart,
    removeFromCart,
    getCart
}