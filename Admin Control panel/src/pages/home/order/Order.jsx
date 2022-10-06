import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

 import  ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
 import  ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { OrderInfoDropDown } from './OrderInfoDropDown'
import './order.css';
import { axiosInstance } from '../../../utility'



export const Order = () => {
    
    const[orders,setOrders]=useState([])
    const[dropDown,setDropDown]=useState(null)
    const[animation,setAnimation]=useState(false)

    const Ul={
        margin:"0px auto",
        listStyleType:"none",
        width:"70%",
        padding:"0px"

    }
    const Li={
        padding:"0px",
        margin:"0px 0px 25px 0px",
        border:"3px solid  #f9f9f9",
        boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
        background:"white",
        
    }
    const orderInfo={
     
     alignSelf:"flex-start",
    width:"100%",
    margin:"0 auto",
    padding:"20px 0",
    background: "#f6f7fb",


    }
    const orderInfoPar={
       
        display:"flex",
        justifyContent:"space-between",
        margin:"2px 0px",
        padding:"10px"
    }
    const orderInfoDrop={
         display:"flex",
        justifyContent:"center",
        margin:"10px 0px ",
        color:"black",
        padding:"5px",
        borderRadius:"7px"
    }

    const pendingClass={
      color:"rgb(226, 149, 149)"
    }
 const acceptedClass={
   color:"green"
 }
 const declineClass={
     color:"red"
 }

 const {token}=useSelector(state=>state.userReducer.adminData)
console.log(token)


    useEffect(()=>{

   const fetchData=async()=>{

    try{
        const {data}= await axiosInstance.get("/api/order",{headers:{
            "token":`Bearer ${token}`
        }})
            setOrders(data)
       
       }
    catch(e){
        console.log(e)
    }
   }
   fetchData()

    },[])



    const toggleDropDown=(id)=>{
if(dropDown==id){
  setAnimation(false)
  return setDropDown(null)
}
setDropDown(id)
setAnimation(true)
console.log(animation)
    }


    return (
        <div style={orderInfo} >
      <div className="productlist-header order-margin">
           <img src="/order.jpg" alt="" />
           <div className="product-list-text">
             <h1>order lists</h1>
           </div>
       </div>
           <ul style={Ul}>
                
            {orders.length===0 &&<p>No Order Requested Yet.!</p>}
              
            {
                orders.map((order,index)=>
                    <li style={Li} key={order._id}>
                   <p style={orderInfoPar}>
                     <span>Clothes : </span>  <span>{order.totalCloth}</span>
                  </p> 
                  <p style={orderInfoPar}>
                    <span>Appointment Time : </span>  <span>{order.appointment.time} {order.appointment.status}</span>
                  </p>
                  <p style={orderInfoPar}>
                     <span>Appointment date : </span> <span>{order.appointment.date}</span>
                  </p>
                  <p style={orderInfoPar}>
                     <span>Status : </span> <span style=
                     {order.status.accepted ? acceptedClass : order.status.decline ? declineClass : pendingClass}>
                     {order.status.accepted ? "Accepted" : order.status.decline ? "Declined":"Pending"}
                     
                     </span>
                  </p>
                    <p  className={index%2===0?"even":"odd"} style={orderInfoDrop} onClick={()=>
                      toggleDropDown(order._id)}> {dropDown===order._id?<ArrowDropUpIcon/>:<ArrowDropDownIcon />}</p>
                      {dropDown===order._id?
                    
                      
                          <OrderInfoDropDown show={true} order={order} toggleDropDown={toggleDropDown} />
                      
                      :""}
               </li>
                    
                    
                    
                    
                    )
            }    
                 
                
               
               
                 
           </ul>
         
        </div>
    )
}
