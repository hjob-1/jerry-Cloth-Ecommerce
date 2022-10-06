import axios from 'axios'
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import { axiosInstance } from '../config'
import { ConfirmationModal } from './ConfirmationModal'





function Register(props) {
     const History =useHistory()
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [name,setName]=useState('')
     const [passwordError,setPasswordError]=useState({status:false,errorInfo:""})
     const [created,setCreatedOn]=useState(false)




     const goBackToLogin=()=>{
         
            setCreatedOn(true)
        setTimeout(()=>
        props.handleClick("login")
        ,2000)
         
             console.log("account created")

     }
     const handleSubmit=async()=>{
         try{
             if(password.length<6){
                 setPasswordError({status:true,errorInfo:"Password is Not > 6 characters"})
                 return;
             }
            
          const {data} = await axiosInstance.post('/api/users/register',{email:email,password:password,name:name}) 
          
          goBackToLogin()

         }
         catch(e){
             setPasswordError({status:true,errorInfo:"Sorry Cant register you at the Moment,try again!"})
         } 
     }
     
    return (<>
          {created ? <p style={{color:"white",background:"green",padding:"10px",fontSize:"15px",borderRadius:"5px"}}>Your Account is Created</p>: 
         <form className='information-detail '>

            <p className="inputheader">Name</p>
            <div className="inputwrapper"> 
               <input type="text"  onChange={(e)=>setName(e.target.value)}/>
           </div>
           <p className="inputheader">Phone </p>
            <div className="inputwrapper"> 
               <input type="phone" name='email-username' onChange={(e)=>setEmail(e.target.value)}/>
           </div>
               <p className="inputheader">Password </p>
            <div className="inputwrapper">
               <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} />
              
           </div>
            {passwordError.status&&<span style={{color:"red",
                                  fontSize:"8px",
                                   }}>{passwordError.errorInfo}</span>}
           <div className="login" onClick={handleSubmit}>
               <span className="loginbtn">Sign Up </span>
           </div>
           
           
        </form>
        }
    </>)
}

export default Register
