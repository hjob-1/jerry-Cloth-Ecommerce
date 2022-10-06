import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

 import  ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
 import  ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { OrderInfoDropDown } from './OrderInfoDropDown'
import './orderinfo.css'
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import { axiosInstance } from '../config'
export const OrderInfo = () => {
    const {_id,token}=useSelector(state=>state.user.userData)
    const[orders,setOrders]=useState([])
    const[dropDown,setDropDown]=useState(null)
    const[animation,setAnimation]=useState(false)

    const Ul={
        margin:"0px",
        listStyleType:"none",
        padding:"0px"

    }
    const Li={
        padding:"0px",
        margin:"0px 0px 25px 0px",
        border:"3px solid  #f9f9f9",
    boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
    background:"#f9f9f9"

    }
    const orderInfo={
     
     alignSelf:"flex-start",
     width:"100%"
    }
    const orderInfoPar={
        borderBottom:"2px solid  #f9f9f9",
        display:"flex",
        justifyContent:"space-between",
        margin:"2px 0px",
        padding:"10px"
    }
    const orderInfoDrop={
         display:"flex",
        justifyContent:"center",
        margin:"10px 0px ",
        background:"rgb(236, 209, 159)",
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

    useEffect(()=>{

      const fetchdata=async()=>{
console.log(token)
        try{
     const {data}= await axiosInstance.get(`/api/order/find/${_id}`,{headers:{
         "token":`Bearer ${token}`
     }})
     console.log(data)
     setOrders(data)
        }
        catch(e){
            console.log(e)
        }
      }
      fetchdata()

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
        <div style={orderInfo}  className="ul-of-order">
           <h4>Orders List</h4>
           <ul style={Ul}>
                
{orders.length==0?<p>No Order Requested Yet.!</p>:<>
              {orders.map(order=>
                
                 <li style={Li} key={order._id} className="li-of-order">
                    
                   <p style={orderInfoPar}>
                     <span>Clothes : </span>  <span> {order.totalCloth}</span>
                  </p> 
                  <p style={orderInfoPar}>
                    <span>Appointment Time : </span>  <span>{order.appointment.time}</span>
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
                    <p style={orderInfoDrop} onClick={()=>
                      toggleDropDown(order._id)}> {dropDown===order._id?<ArrowDropUpIcon/>:<ArrowDropDownIcon />}</p>
                      {dropDown===order._id?
                    
                      
                          <OrderInfoDropDown show={true} order={order}/>
                      
                      :""}
               </li>
                
                )}
               
                </>
           }
           </ul>
         
        </div>
    )
}
