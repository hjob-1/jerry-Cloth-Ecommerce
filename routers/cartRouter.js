import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import { verfiyTokenAndAdmin, verfiyTokenAndAuthorization,verifyToken } from '../util.js'

const cartRouter=express.Router()
 //create
cartRouter.post('/',verifyToken, expressAsyncHandler(async(req,res)=>{
  
const newCart=new Cart(req.body)
try{
const createdCart= await newCart.save()
console.log(createdCart)
res.send(createdCart);
}
catch(e){
    console.log('error couldnt succesfully create cart')
}

}))
// update
cartRouter.put('/:id',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    
    try{
       const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
           $set:req.body},{new:true})
           res.send(updatedCart)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))


//delete
cartRouter.delete('/:id',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    
    try{
       const deletedCart=await User.findByIdAndDelete(req.params.id)
       res.send(deletedCart)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))


//find
cartRouter.get('/find/:userId',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    
    try{
       const cart=await Cart.findOne({userId:req.params.userId})
      res.status(500).send(cart)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))
//find all cart of users
cartRouter.get('/',verfiyTokenAndAdmin,expressAsyncHandler(async (req,res)=>{
    
    try{
       const allCart=await Cart.find()
      res.status(500).send(allCart)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))







export default cartRouter