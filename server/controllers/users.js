import bcrypt from'bcryptjs'
import jwt from 'jsonwebtoken'


import User from '../models/userMessage.js'


export const signin = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const existingser = await User.findOne({email});

        if(!existingser) return res.status(404).json({message:"User doesn't Exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});

        const token = jwt.sign({email:existingser.email, id:existingser._id}, 'test' ,{expiresIn:"1h"});

        res.status(200).json({result:existingser , token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
    }
}

export const signup = async(req,res)=> {

    const {name,email,password,confirmPassword,firstName,lastName} = req.body;

    try{
        const existingser = await User.findOne({email});

        if(existingser) return res.status(400).json({message:"User already Exists"});

        if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match"});

        const hashedPasswd = String(await bcrypt.hash(password,12));

        const result = await User.create({email,password:hashedPasswd,name: `${firstName} ${lastName}`})
        console.log("result ,",result)

        const token = jwt.sign({email: result.email , id:result._id})

        res.status(200).json({result , token});
    }
    catch(error){

    }
}