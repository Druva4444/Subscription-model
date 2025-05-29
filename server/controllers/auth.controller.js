import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function signup(req,res){
const {name,email,password} = req.body;
try{
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashedPassword});
   
    res.status(201).json(user);
}catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
}
}
export async function login(req,res){
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({email:user.email,id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie("UID",token,{httpOnly:true});
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}
export async function logout(req,res){
    res.clearCookie("UID");
    res.status(200).json({message:"Logout successful"});
}
