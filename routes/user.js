import express from 'express'
import {compare, hash} from 'bcrypt'
import User from '../models/User.js'
import { createToken, verifyToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
const router=express.Router();

// create new user 
router.post('/signup',async(req,res)=>{
     
    // get the user from requests
   console.log("signup body :",req.body)
    const {name,email,password}=req.body;
    // first is passowrd and second is encryption round
    const existing=await User.findOne({email:email});
    if(existing)return res.status(401).send("User already registered.")
       
        const hashedPassword=await  hash(password,10);
        // console.log(hashedPassword);
    const user=  new User({name,email,password:hashedPassword});
        await user.save();
        
        // clear old cookie
        res.clearCookie(COOKIE_NAME,
            {
                path:"/",
                httpOnly:true,
                domain:"localhost",
                signed:true

            }
        );
        
        // create token and store cookie 
        const token=createToken(user._id.toString(),user.email,"7d")
        console.log("token ",token)
            const expires=new Date();
            expires.setDate(expires.getDate()+7)
            res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true})

        return res.status(201).json({message:"OK",name:user.name,email:user.email})

})

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
   console.log("Signin body ",req.body)
    // check if email exists
    try{
    const user=await User.findOne({email:email})
    if(!user)
        return res.status(401).send("User does not exist.")
// now compare password
const isPasswordCorrect=await compare(password,user.password);
if(!isPasswordCorrect)return res.status(403).send("Incorrect Password .")

      // clear old cookie
      res.clearCookie(COOKIE_NAME,
        {
            path:"/",
            httpOnly:true,
            domain:"localhost",
            signed:true

        }
    );

    const token=createToken(user._id.toString(),user.email,"7d")
    const expires=new Date();
    expires.setDate(expires.getDate()+7)
    res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true})

    return res.status(200).json({message:"OK",name:user.name,email:user.email})
}catch(err){
    return res.status(500).send("Internal server error.")
}
})

// check if user exists 
router.get('/auth-status',verifyToken,async(req,res)=>{
    try {
        console.log("Auth status ")
        const user = await User.findById( res.locals.jwtData.id );
        if (!user)
            return res.status(401).send("User not registered or token malfunctioned.");
        if (user._id.toString() !== res.locals.jwtData.id)
            return res.status(401).send("Permission did not match.");
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
})

router.get('/signout',async(req,res)=>{
    try{
        console.log("logging out")
       
    

  // clear old cookie
   res.clearCookie(COOKIE_NAME,
    {
        path:"/",
        httpOnly:true,
        domain:"localhost",
        signed:true

    })
     // Log response headers
     console.log(res.getHeaders());
console.log("cookie cleared.")
return res.status(200).json({message:"OK"});
    }catch(error){
        console.log("error")
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
})

export default router;