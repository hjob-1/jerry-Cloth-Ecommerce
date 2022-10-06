import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { verfiyTokenAndAdmin, verfiyTokenAndAuthorization,verifyToken } from '../util.js'

const orderRouter=express.Router()
 //create
orderRouter.post('/',verfiyTokenAndAuthorization, expressAsyncHandler(async(req,res)=>{
  
const newOrder=new Order(req.body)
try{
const createdOrder= await newOrder.save()
console.log(createdOrder)
res.send(createdOrder);
}
catch(e){
    res.send(e)
}


}))


orderRouter.post('/addorder/:_id',verfiyTokenAndAuthorization, expressAsyncHandler(async(req,res)=>{

  
  
const newOrder= new Order({...req.body,userId:req.params._id})
try{
    
const createdOrder= await newOrder.save()

console.log(createdOrder)
res.send(createdOrder);
}
catch(e){
    res.send(e)
}


}))




// update
orderRouter.put('/:_id',verfiyTokenAndAdmin,expressAsyncHandler(async (req,res)=>{
    
    try{
       const updatedOrder=await Order.findByIdAndUpdate(req.params._id,{
           $set:req.body},{new:true})
           res.send(updatedOrder)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))


//delete
orderRouter.delete('/:id',verfiyTokenAndAdmin,expressAsyncHandler(async (req,res)=>{
    
    try{
       const deletedOrder=await Order.findByIdAndDelete(req.params.id)
       res.send(deletedOrder)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))


//get user order
orderRouter.get('/find/:_id',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    
    try{
       const orders=await Order.find({userId:req.params._id}).sort({createdAt:-1})

      res.send(orders)
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))
//find all order of users
orderRouter.get('/',verfiyTokenAndAdmin,expressAsyncHandler(async (req,res)=>{
    
    try{
       const allOrder=await Order.find().sort({createdAt:-1})
      res.send(allOrder)
      
    }
    catch(e){
        res.status(405).send({message:"errorr"})
    }

}))










export default orderRouter