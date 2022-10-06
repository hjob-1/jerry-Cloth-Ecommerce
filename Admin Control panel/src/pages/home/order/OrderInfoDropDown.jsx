import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../utility';
export const OrderInfoDropDown = ({order,toggleDropDown}) => {


    const {userId}=order;

    const cartItem={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"10px"
        
       
    }
    const cartItemImg={
        flex:"3",
        height:"150px",
        width:"100px"

    }
    const cartItemInfo={
        flex:2,
        display:"flex",
        paddingLeft:"10px",
        flexDirection:"column",
      
        
    }
     let Ul={
        margin:"0px",
        listStyleType:"none",
     
        padding:"0px",
        transition:"height 1s ease",
    
        

    }
    const price={
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      marginTop:"20px"
    }
    const img={
        width:"100%",
        height:"100%",
        objectFit:"contain"
    }
    const color={
        color:"gray",
       
    }
    const orderBtn={
        display:"flex",
        justifyContent:"space-around",
        padding:"20px"
    }
    const btn={
        padding:"10px 15px",
        color:"white",
        background:"black",
        cursor:"pointer",
        borderRadius:"5px"
    }
    const btnred={
        background:"red"
    }
     const btngreen={
        background:"red"
    }
    const wrapper={
        
          padding:"15px 10px",
          borderRadius:"7px"
    }

  const handleBtnAction=async (identfier,_id)=>{

    if(identfier==="accept"){
          console.log(_id,"am in accepet block")
   
     try{
            const {data}= await axiosInstance.put(`/api/order/${_id}`, {
            status:
              {
              decline:false,
              accepted:true,
              pending:false
             }
        },{headers:{
            "token":`Bearer ${token}`
        }})
        console.log(data)
        toggleDropDown(_id)

     }catch(e){
         console.log(e)
     }
   
    }

    else{


        try{
            const {data}= await axiosInstance.put(`/api/order/${_id}`, {
            status:
              {
              decline:true,
              accepted:false,
              pending:false
             }
        },{headers:{
            "token":`Bearer ${token}`
        }})
        console.log(data)
        toggleDropDown(_id)

     }catch(e){
         console.log(e)
     }



    }


  }






    
const[user,setUser]=useState("")
 const {token}=useSelector(state=>state.userReducer.adminData)
    useEffect(()=>{

        const fetchData=async()=>{

            try{

               const {data}= await axiosInstance.get(`/api/users/find/${userId}`,{headers:{
            "token":`Bearer ${token}`
        }})
        setUser(data)
              }
            catch(e)
            {
                console.log(e)
            }
        }
        fetchData()

    },[])
    return (
        <div style={wrapper} >
                <ul className="cart-contents-detail" style={Ul} >

                    {order.products.map(product=>
                        
                        <li className="cart-item" style={cartItem} key={product._id}>
                        <div className="cart-item-img" style={cartItemImg}>
                            <img  style={img} src={product.img} alt={product.name} />
                        </div>
                        
                        <div className="cart-item-info" style={cartItemInfo}>
                           <p>
                             <span style={color}>Price:</span> <b>{product.price} ETB</b>
                           </p>
                           <p>
                              <span style={color}> qantity:</span> <b>{product.qant}</b>
                           </p>
                          
                        </div>
                    </li>
                        )}
                    
                </ul>
               
                            
                <div className="price-wrapper" style={price}>
                    <h3>PERSONAL INFORMATION</h3>
                           <p style={{padding:"7px"}}>
                               <span>Name:</span> <b>{user.length<1 ?" ":user.name}</b>
                           </p>
                           <p style={{padding:"7px"}}>
                                <span>Phone</span> <b>{user.length<1?" ":user.email}</b>
                           </p>
                    
                    <p style={{padding:"7px"}}>Total Orderd Cloth: <b> {order.totalCloth}</b></p>
                    <p style={{padding:"7px"}}>pay via <b>{order.paybank.bank}</b> </p>
                    <p style={{padding:"7px"}} >Total Price :<b> {order.totalPrice} ETB</b></p>
                </div>
                <div style={orderBtn}>
                    <span style={{...btn,background:"red"}} onClick={()=>handleBtnAction("decline",order._id)} >
                        Decline
                    </span>
                    <span style={{...btn,background:"green"}} onClick={()=>handleBtnAction("accept",order._id)}>
                        Accept
                    </span>
                </div>
        </div>
    )
}
