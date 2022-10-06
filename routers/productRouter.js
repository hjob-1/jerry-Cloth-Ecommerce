import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import {orginaldata,finaldata} from '../data.js'
import products from '../models/productModel.js'
import { verfiyTokenAndAdmin, verfiyTokenAndAuthorization } from '../util.js'

const productRouter=express.Router()

//THIS API USED TO INSERT MANY PRODUCTS FROM LOCAL DATA TO DB

productRouter.get('/seed',expressAsyncHandler(async (req,res)=>{
        await products.deleteMany({})
    const createdProducts= await products.insertMany(finaldata)
    const sorted= await products.find().sort({createdAt:-1})
       
    res.send({sorted})

}))

//GET SPECIFIC PRODCUT
productRouter.get('/:id',expressAsyncHandler(async (req,res)=>{
   
    const product= await products.findById(req.params.id)
    if(product)
    res.send(product)
    else
    res.status(404).send({message:'product not found'})

}))


//GET ALL PRODCUTS
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
   const qnew=req.query.new
   const qcat=req.query.catagory
   let Products;
   try{
 
   if(qnew){
       Products=await products.find().sort({createdAt:-1}).limit(10)
   } 
   else if(qcat){
       Products= await products.find({ idnt:qcat})
       console.log("products sorted by identifier")
   }
   else{
    Products= await products.find().sort({createdAt:-1})
       }
     res.send(Products)
     

   }catch(e){
       res.status(408).send(e)
   }

}))


//CREATE PRODUCT

productRouter.post('/create',verfiyTokenAndAdmin,async(req,res)=>{
        try{
             const product= await new products(req.body);
             product.save()
             res.send(product)
           }catch(error)
             {
             res.status(404).send(error)
             }

})


//DELETE PRODCUT

productRouter.delete('/delete/:_id',verfiyTokenAndAdmin,async(req,res)=>{

    try{
          await products.findByIdAndDelete(req.params._id)
        const afterDeleted= await products.find({})
        res.send(afterDeleted)

console.log(afterDeleted)
        
    }catch(e){
        res.status(404).send(e)
    }
})


productRouter.put('/:_id',verfiyTokenAndAuthorization,expressAsyncHandler(async (req,res)=>{
    
    try{
       await products.findByIdAndUpdate(req.params._id,{
           $set:req.body},{new:true})

         console.log("updated succesffuly")
           
    }
    catch(error){
        res.status(405).send("cant updated")
    }

}))


export default productRouter;