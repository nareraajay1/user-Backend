import { Schema ,model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
               email: {
                type:String,
                required:true,
                trim:true,
                lowercase:true
               },
               username: {
                type:String,
                required:true,
                trim:true,
                lowercase:true
               },
               password: {
                type:String,
                required:true,
               },
}, {
    timestamps:true
})

// for unique email
userSchema.pre('save' , async function(next){
          const count = await model('user').countDocuments({email:this.email})
         
          if(count)
                 throw next(new Error("email already present"));
                next;
})

// for password encryption
userSchema.pre("save", async function(next){
           const encryptedPassword = await bcrypt.hash(this.password.toString() , 12);
           this.password = encryptedPassword;
           next;
          
    }
)

const user = model("user" , userSchema);

export default user;