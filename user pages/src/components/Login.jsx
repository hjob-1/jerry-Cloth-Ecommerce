import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { signInRequest,signInSuccess,signInFailure } from '../redux/actions/userAction'
import { useLocation } from 'react-router'
import { axiosInstance } from '../config'
function Login({props}) {
    let history =useHistory()
    const location =useLocation()
    const dispatch = useDispatch()
    const[email,setEmail]=useState('')
    const [password,setPaswword] = useState('')
    const [error,setError]=useState({status:false,errorInfo:""})
   
const handleSubmit=async(e)=>{
    e.preventDefault()
    // const data1={email:email,password:password,name:"eyob",isAdmin:true,isLogedIn:true}
    //  localStorage.setItem("user",JSON.stringify(data1))
    //  const user= JSON.parse(localStorage.getItem("user"));
    //  <Redirect to="/"/>
     
    //  console.log(user)
try{
      if(email.length===0&&password.length===0){
          setError({status:true,errorInfo:"Please Enter Your Phone And Password"})
          return;
      }
    dispatch(signInRequest())
    const {data}=await axiosInstance.post('/api/users/signin',{email:email,password:password})
    dispatch(signInSuccess(data))
    localStorage.setItem("userData",JSON.stringify(data))

         if(location.state){
           return  history.push(location.state.next)
         }
         history.push('/')
}
catch(error){
     setError({status:true,errorInfo:"Incorrect Phone or Password"})
    dispatch(signInFailure(error))
}
}


    return (
        <form className='information-detail' onSubmit={(e)=>handleSubmit(e)}>
               <p className="inputheader">Phone </p>
            <div className="inputwrapper"> 
               <input type="phone" name='email-username' value={email} onChange={(e)=>setEmail(e.target.value)}/>
           </div>
               <p className="inputheader">Password </p>
            <div className="inputwrapper">
               <input type="password" name='password' value={password} onChange={(e)=> setPaswword(e.target.value)}/>
           </div>
           {error.status&&<span style={{color:"red",
                                  fontSize:"10px",
                                   }}>{error.errorInfo}</span>}
           <div className="login">
               <button type='submit' className="loginbtn">Log In </button>
               <span><a href="#">Forgot Your Password?</a></span>
           </div>
          
           
        </form>
    )
}

export default Login
