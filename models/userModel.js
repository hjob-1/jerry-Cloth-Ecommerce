import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin: {type:Boolean,default:false},
    gender:{type:String,default:null},
    address:{type:String,default:null},
    img:{type:String, default:null},
},
{
timestamps:true,
    
})
const User=mongoose.model('user',userSchema)
export default User; 