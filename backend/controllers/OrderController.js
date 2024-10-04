const orderModel = require("../models/OrderSchema.js");
const UserModel = require("../models/UserSchema.js");
const RazorPay = require('razorpay');
const crypto = require('crypto');
const { log } = require("console");
require('dotenv').config()
// 
const key_id =process.env.razorPay_key_id;
const key_secret = process.env.razorPay_key_secret;

console.log(key_id);
console.log(key_secret);



const razorpay = new RazorPay({ key_id, key_secret })




const placeOrder = async (req, res) => {
 
  
  try {
    // Create new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      order_id: "",  // Initially empty
      payment_id: ""  // Initially empty
    });

    // Save the order
    await newOrder.save();

    // Clear the user's cart
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Razorpay order options
    const options = {
      amount: newOrder.amount * 100,  // Amount in paise
      currency: "INR",
      receipt: newOrder._id.toString()  // Use the MongoDB _id for the receipt
    };

    // Create the Razorpay order
    const order = await razorpay.orders.create(options);

    // Update the order with the Razorpay order_id
    await orderModel.findByIdAndUpdate(newOrder._id, { order_id: order.id });

    // Return the Razorpay order details
    return res.status(200).json({
      razorpayOrderId: order.id,  // Razorpay Order ID
      amount: order.amount,  // Amount in paise
      currency: order.currency,  // INR
      receipt: order.receipt  // Order ID receipt (MongoDB _id)
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Server error while creating order" });
  }
};



const validateResponse = async (req, res) => {
  const { order_id, payment_id, razorpay_signature } = req.body;
  try {
    const generated_signature = crypto.createHmac('sha256', key_secret)
      .update(order_id + '|' + payment_id)
      .digest('hex');

    // return generated_signature === razorpay_signature;

    if (generated_signature === razorpay_signature) {
      try {
        const updatedorder = await orderModel.findOneAndUpdate({ order_id: order_id }, { payment: true, payment_id: payment_id }, { new: true });
        if (!updatedorder) {
          return res.status(404).json({ message: "order not found" })
        }
        return res.status(200).json({ message: "Transaction is legit", order_Id: order_id, paymnet_Id: payment_id })
      } catch (err) {
        return res.status(500).json({ message: "internal server error in updating ", err })
      }

    } else {
      try {
        await orderModel.findByIdAnddelete(order_id)
        return res.status(400).json({ message: "Bad request " })
      } catch (err) {
        return res.status(500).json({ message: "internal server error in deleting " })
      }



    }

  }
  catch (error) {
    console.log('error while validating payment in backend');

  }
}

const userOrder = async (req, res) => {
  try {
    const order = await orderModel.find({ userId: req.body.userId });
    if (order) {
      res.status(200).json({ message: "Here's your all order's.", order })
    } else {
      res.status(500).json({ message: "You haven't ordered anything yet." })
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

//get all oreders along with user
const listorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ message: "All data", data: orders })
  } catch (error) {
    res.status(500).json({ message: "Internal server error " })
  }
}

const updateStatus=async(req,res)=>{
  try{
    const updatingStatus=await orderModel.findByIdAndUpdate(req.body._id,{status:req.body.status})
    res.status(200).json({message:" status updaed"})
  }catch(err){
    res.status(500).send({message:"Server errror"})
  }
}

module.exports = { placeOrder, validateResponse, userOrder,listorders,updateStatus };
