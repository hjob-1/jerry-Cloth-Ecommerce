import jwt from "jsonwebtoken"


const generateToken=(user)=>{
 return jwt.sign({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin
},process.env.JWT_SECRETE,{
    expiresIn:'30d'
})

}


const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token
   if(authHeader){
       let token=authHeader.split(" ")
       token=token[1]
           jwt.verify(token,process.env.JWT_SECRETE,(err,user)=>{
                 if(err){
                 res.status(404).json(" token is not valid")
                }
                else{
           req.user=user
           next()
        }
             });
              
   }
   else{
       res.status(401).json(" you are not authenticated")
   }
}


const verfiyTokenAndAuthorization=(req,res,next)=>
{
    verifyToken(req,res,()=>{
         if(req.user._id===req.params._id||req.user.isAdmin)
         next()
         else
         res.status(400).json('you are not allowed to do that')
        })
    }


    const verfiyTokenAndAdmin=(req,res,next)=>
     {
    verifyToken(req,res,()=>{
         if(req.user.isAdmin)
         next()
         else
         res.status(400).json('YOU MUST BE AN ADMIN TO DO THAT ')
        })
     }

export {verifyToken,verfiyTokenAndAuthorization,verfiyTokenAndAdmin}
export default generateToken