import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { adminSignInSuccess, signInFailure, signInRequest, signInSuccess } from '../../redux/actions/userAction'
import { axiosInstance } from '../../utility'

import './login.css'

export const Login = () => {
    const [password,setPassword]=useState("")
     const [email,setEmail]=useState("")
     const dispatch = useDispatch()
     const history =useHistory()
      const [error,setError]=useState({status:false,errorInfo:""})

     const user=JSON.parse(localStorage.getItem("userData"));

     const handleSubmit=async(e)=>{
    //      try{
    //         dispatch(signInRequest())
    //      const {data}=await axios.post('/api/users/signin',{password,email})
    //       dispatch(adminSignInSuccess(data));
    //     //localStorage.setItem("userData",JSON.stringify([data]));

    //          <Redirect to="/"/>
         
    //  }catch(e){
    //      console.log(e)
    //      dispatch(signInFailure(e))
    //  }

 e.preventDefault()
try{
      if(email.length===0&&password.length===0)
      {
          setError({status:true,errorInfo:"Please Enter Your Phone And Password"})
          return;
      }
    dispatch(signInRequest())
    const {data}=await axiosInstance.post('/api/users/signin',{email:email,password:password})

    if(data.isAdmin){
     dispatch(adminSignInSuccess(data));
       history.push('/')
    localStorage.setItem("adminData",JSON.stringify(data))
        
    }
    else
      setError({status:true,errorInfo:"ONLY ADMIN CAN LOG IN"})
}
catch(error){
     setError({status:true,errorInfo:"Incorrect Phone or Password"})
    dispatch(signInFailure(error))
}

}




    
    return (
       
         <div className='loginregister-container'>
                    <img src='/addproduct.jpg' alt=""/>
                    <div className="pop-container">
                    <div className="pop-detail-wrapper">
                        <div className="Rbtns-wrapper">
                            <button className="login active" >Login</button>
                         </div>
            <form className='information-detail' onSubmit={(e)=>handleSubmit(e)}>
               <p className="inputheader">Phone </p>
            <div className="inputwrapper"> 
               <input type="phone" name='email-username' value={email} onChange={(e)=>setEmail(e.target.value)}/>
           </div>
               <p className="inputheader">Password </p>
            <div className="inputwrapper">
               <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
           </div>
           {error.status&&<span style={{color:"red",
                                  fontSize:"10px",
                                   }}>{error.errorInfo}</span>}
           <div className="login">
               <button type='submit' className="loginbtn">Log In </button>
               <span><a href="#">Forgot Your Password?</a></span>
           </div>
        </form>
         </div>
                    
                </div>
               
            </div>
    )
}
