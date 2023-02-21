import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET='wow'



export const registerUser = async (req, res) => {
    try {
       
        const oldUser = await User.findOne( {email:req.body.email} );
        if(oldUser) return res.status(400).json({  
            message: "user already exists"
        });
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({  
            email:req.body.email,
            name:`${req.body.firstName} ${req.body.lastName}`,
            password:hashedPassword,
            interestProfile:req.body.interestProfile,


        });
        const token = jwt.sign({ email: user.email, id:user._id,isAdmin:user.isAdmin }, JWT_SECRET, { expiresIn: "1d" });
        await user.save();

        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}


export const userSignIn = async (req, res) => {
    
        const { password, email } = req.body;
        try {
            if(!email ) return res.status(400).json({
                message: "Please Enter your E-mail and Password"
            });
    
            const dbUser = await User.findOne({ email })
            if (!dbUser) return res.status(404).json({ message: "User not found " })
    
            const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    
            if (!isPasswordValid) return res.status(400).json({
            message: "Email or Password is incorrect"
        });
    
            const token = jwt.sign({
                id: dbUser._id,
                email: dbUser.email,
                isAdmin:dbUser.isAdmin
    
            }, JWT_SECRET, { expiresIn: '1d' })
    
            res.status(200).json({ dbUser, token })
    
        } catch (error) {
            res.status(500).json({ message: error.message })
    
        }
    }


    export const getAllUsers = async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json({
                users
            });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }