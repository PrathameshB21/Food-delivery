const jwt=require('jsonwebtoken');

const authMiddlewere =async(req,res,next)=>{
    const authHeder=req.headers['authorization'];
    const token=authHeder&& authHeder.split(' ')[1];

   // const{token}=req.headers;
    if(!token){
        return res.status(401).json({message:'Unathorized, login again'})
    }
   try{ const token_decoded=jwt.verify(token,process.env.JWT_secreatKey);
    req.body.userId=token_decoded.id;
    next()}
    catch(error){
        res.status(500).json({message:"internal server error in auth"})

    }

};
module.exports=authMiddlewere;
