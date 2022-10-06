import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateToken, { verifyToken,verfiyTokenAndAuthorization, verfiyTokenAndAdmin } from '../util.js'



const userRouter=express.Router()




//REGISTER USER
userRouter.post('/register', expressAsyncHandler(async(req,res)=>{
   //await User.remove({})
//const createdUser=await User.insertMany(data.users) 
const newuser=new User({
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password),
    name:req.body.name,
   
    
})
try{
const store= await newuser.save()
res.send(store)
}
catch(e){
    res.status(404).send(e)
}
res.status(400).send(newuser);
}))


//SIGNIN  VERIFIED USER SEND DATA AND A TOKEN 
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                gender:user.gender,
                address:user.address,
                img:user.img,
                token:generateToken(user)
            })
            return;
        }
    }
    res.status(404).send({message:'invalid email or password'})
}))


//GET ALL USER
userRouter.get('/',verfiyTokenAndAdmin, expressAsyncHandler(async(req,res)=>{
  const qnew=req.query.new
  
   let users;
  
   try{
 
   if(qnew){
       users=await User.find().sort({createdAt:-1}).limit(3)
   } 
   
   else{
    users= await User.find({})
   
       }
     res.send(users)
     

   }catch(e){
       res.status(408).send(e)
   }
}))

//demo




//THE VERIFIED USER CAN UPDATE ITS ACCOUNT
userRouter.put('/:_id',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    if(req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password,8)
    }
    try{
        
       const updatedUser=await User.findByIdAndUpdate(req.params._id,{
           $set:req.body},{new:true})
const{password,...rest}=updatedUser;
           console.log(rest)
           res.send(rest._doc)
    }
    catch(error){
        res.status(405).send("cant updated")
    }

}))


//DELETE method ,user can  delete its account and the admin can do too

userRouter.delete('/delete/:_id',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    
    try{
        await User.findByIdAndDelete(req.params._id)
       const userlist= await User.find({})
       res.send(userlist);
       }
    catch(error){
        res.status(405).send({message:error})
         }

}))









//ADMIN CAN FIND A SPECIFIC USER

userRouter.get('/find/:id',verfiyTokenAndAdmin,expressAsyncHandler(async (req,res)=>{
    
    try{
        const user=await User.findById(req.params.id)
        res.send(user)
       }
    catch(error){
        res.status(405).send({message:error})
            }

}))









export default userRouter;