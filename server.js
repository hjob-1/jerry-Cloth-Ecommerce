import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js';
import  data  from './data.js';
import productRouter from './routers/productRouter.js';
import cartRouter from './routers/cartRouter.js';
import orderRouter from './routers/orderRouter.js';
import cors from 'cors'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config()
let app=express();
app.use(express.json()) 
app.use(cors())
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URL
).then(()=>console.log('connected')).catch((err)=>console.log(err))


app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
// app.use((err,req,res,next)=>{
//     res.status(401).send({message:err.message})
// })
if(process.env.NODE_INV==="production"){
app.use(express.static(path.join(__dirname, "/client/build/")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"client","build","index.html"));
});
 
}
else{
  app.get("/",(req,res)=>{
  res.send("hello world api running")
})
}

app.listen(process.env.PORT||4000,()=>{
    console.log('Sever  at http:://locolhost:4000')
});

