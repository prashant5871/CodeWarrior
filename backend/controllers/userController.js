import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req,res) => {
    const {name,email,username,password,confirmPassword} = req.body;

    // console.log(name,email,username,password,confirmPassword);

    if(!name || !email || !username || !password || !confirmPassword)
    {
        return res.status(400).json({messege : "Please provide full information"});
    }

    if(password != confirmPassword)
    {
        return res.status(400).json({messege : "Password and confirm password must be same"});
    }

    let user;
    const hashPassword = await bcrypt.hash(password, 10);

    try{
        user = await User.create({
            name,
            email,
            username,
            password:hashPassword
        });
    }catch(error){
        return res.status(500).json({messege : "can not register you , try again later"});
    }

    res.json(user);
}