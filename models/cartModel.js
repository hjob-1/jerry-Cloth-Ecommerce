import mongoose  from "mongoose";

const cartSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
          productId:{type:String,required:true},
          qant:{type:Number,default:1}
            
        }
    ]

},{timestamps:true})







const Cart=mongoose.model("cart",cartSchema)

export default Cart