import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, username, password, confirmPassword } = req.body;

    // console.log(name,email,username,password,confirmPassword);

    if (!name || !email || !username || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please provide full information", success: false });
    }

    if (password != confirmPassword) {
        return res.status(400).json({ message: "Password and confirm password must be same", success: false });
    }

    let existedUser;
    try {
        existedUser = await User.findOne({ email });
    } catch (error) {
        res.status(500).json({ message: "Internal server error, please try again later", success: false });
    }

    if (existedUser) {
        return res.status(400).json({ message: "User with email id already exists , please use another email id", success: false });
    }
    let user;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        user = await User.create({
            name,
            email,
            username,
            password: hashPassword
        });
    } catch (error) {
        return res.status(500).json({ message: "can not register you , try again later", success: false });
    }

    //JWT Implementation
    const tokenData = {
        userId: user._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    // console.log(token);

    res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        .json({
            message: "Sign Up succesfully",
            user,
            token,
            success: true
        });
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide valid credentials", success: false });
    }

    let user;

    try {
        user = await User.findOne({ email });
        console.log("existing user : ", user);
        if (!user) {
            throw new Error("invalid credentials...");
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Invalid Credentials , please provide valid credentials", success: false });
    }
    //Below line won't work , why ? because password is in hashed form , so we can not directlly compare , we can use some inbuilt function provided by bcrypt
    // if(user.password != password)
    // {
    //     return res.status(400).json({message : "Invalid credentials"});
    // }

    //Let's compare using compare method
    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid password",
            success: false
        })
    }

    //JWT Implementation
    const tokenData = {
        userId: user._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    console.log(token);

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
        httpOnly: true,               // Prevent access via JavaScript (good security practice)
        sameSite: 'lax',              // Allow cross-origin cookies (change to 'none' if stricter settings are needed)
        secure: false                 // 'false' in local development, 'true' when using HTTPS
    })
        .status(200)
        .json(
            {
                message: "Login succesfully",
                success: true,
                user,
                token
            }
        );
}


export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }

    res.status(400).json({message : "something went wrong"});
}