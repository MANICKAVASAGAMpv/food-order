import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const loginUser = async (req, res) => {
     const{name,email,password} = req.body
     try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
        
     }catch(err){
            console.log(err)
            res.json({success:false,message:"error"})
     }
}

const createToken = (id) =>{
    return jwt.sign({id},"random#secret")
}

const registerUser = async (req, res) => {
    const { name, password, email } = req.body
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length <8){
            return res.json({success:false,message:"Password must contains more than 8 letters"})
        }

         const salt = await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            password:hashPassword,
            email:email
        })

        const user =  await newUser.save()
        const Token = createToken(user._id)
        res.json({success:true,Token})

    } catch (err) {
          res.json(err)
    }

}

export { loginUser, registerUser }
