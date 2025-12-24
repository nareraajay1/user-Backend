
import user from '../Schema/user.schema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



// signup
export const Signup =async (req ,res) => {     
       try{
                const newUser = new user(req.body);
                await newUser.save();
                res.send("signup success").status(200);
       }
       catch(err){
            res.status(500).json({
                // message: "signup failed"
                message: err.message
            })
       }
}



// login controller
export const Login = async (req ,res) => {     
       try{
             const { email , password} = req.body;
             const User = await user.findOne({email:email})
             console.log(email , password ,User)

             if(!User){
                 return res.status(404).json({
                    message:"user not found"
                 })
             }
      
             const isLogin = await bcrypt.compare(password , User.password)         
             console.log(isLogin)

             if(!isLogin){
                return res.status(400).json({
                    message: "Invalid password"
                })
            }
            
            // jwt token code
            const payload = {
                   userId:User._id,
                   email:User.email
            }
            const token =  jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn:'7d'})   
            res.cookie('token' ,token);  
              
            res.status(200).json("login success" , token)

       }
       catch(err){
           res.status(500).json({
                message: err.message
            })
       }
}