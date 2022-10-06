import axios from 'axios'
import React,{useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Navbar from '../components/Navbar'
import { axiosInstance } from '../config'
import { signInSuccess } from '../redux/actions/userAction'

export const ProfilePage = () => {

     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [name,setName]=useState('')
     const dispatch = useDispatch()
 const {_id,token}=useSelector(state=>state.user.userData)
 const userData=useSelector(state=>state.user.userData)

const handleSubmit=async()=>{
    
    try{
    
       const {data}= await axiosInstance.put(`/api/users/${_id}`,{email:email,password:password,name:name},{headers:{"token":`Bearer ${token}`}})
       console.log(userData)
        dispatch(signInSuccess({...userData,...data}))
        
console.log()
        localStorage.setItem("userData",JSON.stringify({...userData,...data}))
    }catch(e){
        console.log(e)
    }
    
}


    return (<>
    <Navbar/>
    
    <div className="pop-container">
        <h2>Update your profile</h2>
                    <div className="pop-detail-wrapper">
         <form className='information-detail'>
            <p className="inputheader">Your name*</p>
            <div className="inputwrapper"> 
               <input type="text"  onChange={(e)=>setName(e.target.value)}/>
           </div>
           <p className="inputheader">Your Email Adress *</p>
            <div className="inputwrapper"> 
               <input type="text" name='email-username' onChange={(e)=>setEmail(e.target.value)}/>
           </div>
               <p className="inputheader">Password *</p>
            <div className="inputwrapper">
               <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} />
           </div>
           <div className="login" onClick={handleSubmit}>
               <span className="loginbtn"> update</span>
           </div>
           
           
        </form>
        </div>
        </div>
        </>
    )
}
