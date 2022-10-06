import mongoose from 'mongoose'


const productSchema= new mongoose.Schema({
    img:{type:String,required:true},
    name:{type:String,required:true},
    disc:{type:String,required:true},
    price:{type:Number,required:true},
    countInStock:{type:Number,required:true},
    qant:{type:Number,required:true},
    idnt:{type:String,required:true}

},
{timestamps:true})
const products=mongoose.model('product',productSchema)
export default products;