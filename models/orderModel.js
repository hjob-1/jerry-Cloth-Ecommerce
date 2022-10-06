import mongoose  from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
        img:{type:String,required:true},
        name:{type:String,required:true},
        disc:{type:String,required:true},
        price:{type:Number,required:true},
        countInStock:{type:Number,required:true},
        qant:{type:Number,required:true},
        idnt:{type:String,required:true}
  
        }
    ],
    appointment:
        {
        time:{type:String,required:true},
        date:{type:String,required:true},
        status:{type:String}
        },
    paybank:{
        bank:{type:String,required:true},

    },
   totalPrice:{type:Number},
   totalCloth:{type:Number},
   status:
      {
       decline:{type:Boolean,default:false},
       accepted:{type:Boolean,default:false},
       pending:{type:Boolean,default:true}
      }

},{
    timestamps:true
})







const Order=mongoose.model("oder",orderSchema)

export default Order