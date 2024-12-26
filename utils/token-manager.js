import jwt from "jsonwebtoken";


import { COOKIE_NAME } from "./constants.js";
export const createToken=(id,email,expiresIn)=>{
    const payload={id,email};
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn,});
    return token;
}


export const verifyToken=async(req,res,next)=>{
    // const token=req.signedCookies[`${COOKIE_NAME}`]
    const token=req.cookies[`${COOKIE_NAME}`]
    console.log("Verifying ")
    if(!token || token.trim()==="")
        return res.status(401).json({message:"Token not recieved."})
    return new Promise ((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{if(err){
            reject(err.message);
            return res.status(401).json({messgae:"Token Expired."})
        }else{
            // console.log("TOken verification successfull.");
            resolve();
            res.locals.jwtData=success;
            return next();
        }
    })
    })

   
    // console.log(token)
}