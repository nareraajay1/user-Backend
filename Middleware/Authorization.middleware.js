import jwt from 'jsonwebtoken'

const Authorization = (req ,res, next) => {
    try{
       const token = req.cookies.token;
         console.log(token , "AuthUser")

       if(!token){
        return res.status(401).json({
            message:"unauthorized token"
        })
       }

       const Auth = jwt.verify(token , process.env.JWT_SECRET_KEY)
       console.log(Auth , "AuthUser")
       req.user =Auth;
       next();

}
    catch(err){
         return res.status(500).json({
            message: "unauthorised user"
         })
    }
}    
export default Authorization ;