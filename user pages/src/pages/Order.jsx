import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Announcement from '../components/Announcement'
import { ApointmentDate } from '../components/ApointmentDate'
import { CompleteOrder } from '../components/CompleteOrder'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Pay } from '../components/Pay'
import { signOutCart } from '../redux/actions/cartAction'
import { Redirect, useLocation } from 'react-router'

import './order.css'
import { axiosInstance } from '../config'



export const Order = ({props}) => {
   const [pages,setPages]=useState({appointment:true,order:false,complete:false,counter:1})
   const [error,setErros]=useState({time:false,date:false,bankSelect:false})
   const {appointment,pay}=useSelector(state=>state.orderInfo)
   const user = useSelector(state => state.user.userData)
   const orderInfo=useSelector(state=>state.orderInfo)
   const cart = useSelector(state => state.cart)
   const isLogedIn=useSelector(state=>state.user.isLogedIn)
   const dispatch = useDispatch()
   const location=useLocation()
   

if(!isLogedIn){
    return  <Redirect to={{pathname:"/loginpage",state:{next:location.pathname}}}/>
}
   const setNextPage=(prev,action)=>{

    switch (action) {
        case "NEXT":
            switch(prev.counter)
            {
              case 1:
                  if(appointment.date.length<1 && appointment.time.length<1){
                         setErros({time:true,date:true})
                       return{appointment:true,order:false,complete:false,counter:1}
                       }
              else if(appointment.date.length<1 || appointment.time.length<1)
                   {
                      if(appointment.time.length<1)
                         setErros({time:true,date:false,bankSelect:false})
                      if(appointment.date.length<1)
                          setErros({time:false,date:true,bankSelect:false})
                     return{appointment:true,order:false,complete:false,counter:1}   

                    } 
                
                 else
                      return{appointment:false,order:true,complete:false,counter:2}
              case 2:
                      if((!pay.CBEactive && !pay.BOAactive) ){
                           setErros({time:false,date:false,bankSelect:true})
                           return{appointment:false,order:true,complete:false,counter:2}
                      }
                    
                    return{appointment:false,order:false,complete:true,counter:3}
              default:
                  break;

            }
           
              break;
        case "PREV":
               switch(prev.counter)
            {
              case 2:
                 return{appointment:true,order:false,complete:false,counter:1}
              case 3:
                return{appointment:false,order:true,complete:false,counter:2}
              default:
                  break;

            }

            break;
        default:
            break;
    }
       
}
  const createButtons=()=>{
      let prevButton=null;
  if(pages.counter<3)
         {
         if(!pages.appointment){
              prevButton= <button className="next--btn" onClick={()=>setPages(prev=>setNextPage(prev,"PREV"))}>PREV</button>
                         }
           return <>
                 {prevButton}
                 <button className="next--btn" onClick={()=>setPages(prev=>setNextPage(prev,"NEXT"))}>NEXT</button>
                  </>
        }
   else
   return <button className="btn-finsh" onClick={()=>setOrders()}><Link style={{color:"black"}} to="/shopping/order/finshed">FINSH</Link></button>

  }
  const getOrderData=()=>{
    const userId=user._id
const products=cart.cart;
const totalPrice=cart.cartTotalPrice
const totalCloth=cart.cartTotalQantity

const {appointment}=orderInfo

let {pay}=orderInfo
pay.CBEactive?pay="CBE":pay="BOA"
const paybank={
  bank:pay
}


return {
    userId,
    totalPrice,
    totalCloth,
    paybank,
    appointment,
    products,
    status:{
       decline:false,
       accepted:false,
       pending:true
    }
    }

  }

  const setOrders=()=>{

    const orderInformation=getOrderData();

         postOrder(orderInformation)
       console.log(orderInformation)

  }
  const  postOrder= async (orderInformation)=>{
  
  const{_id}=user
  const{token}=user
  
   try{
      const {data}=await axiosInstance.post(`/api/order/addorder/${_id}`,orderInformation,{headers:{
        "token":`Bearer ${token}`
      }})
      console.log(data)
      dispatch(signOutCart())
   }
   catch(e){
     console.log(e)
   }

  }
  

 
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <div className="appointment">
                  <div className="headers">
                     <span className={pages.appointment?"focused":""}>Apointment &rarr; </span>
                  <span className={pages.order?"focused":""}>Pay &rarr;</span>
                  <span className= {pages.complete?"focused":""}>Order Complete </span>
                
                  </div>
                  {pages.appointment?<ApointmentDate error={error} />:pages.order?<Pay  error={error} />:<CompleteOrder/>}
                  
                 <div className="order-btn_container">
                  {createButtons()}
                 </div>
               
                    
            </div>
            <Footer/>
        </div>
    )
}
