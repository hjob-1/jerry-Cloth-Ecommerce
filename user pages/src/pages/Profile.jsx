import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './profile.css'
import img from '../assets/images/newsletter/newsletter.jpg'
import { ProfileDetail } from '../components/ProfileDetail'
import EditProfile from '../components/EditProfile'
import Announcement from '../components/Announcement'
import { ConfirmationModal } from '../components/ConfirmationModal'
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/actions/userAction'
import { signOutCart } from '../redux/actions/cartAction'
import { Redirect } from 'react-router'
import { OrderInfo } from '../components/OrderInfo'



export const Profile = () => {

    const[profile,isProfileActive]=useState({
        profile:true,
        editProfile:false,
        order:false
    })
    
   const[signOutActive,setSignOutActive]=useState(false)

   const dispatch = useDispatch()

    const handleSignOut=()=>{
          dispatch(signOut()) 
          dispatch(signOutCart())
         
    }
    return (<>
    <Announcement/>
     <Navbar/>
     {signOutActive?<ConfirmationModal handleSignOut={handleSignOut} setSignOutActive={setSignOutActive}/>:
        <div className="profile-container">
           
                <div className="profile-side--bar">
                   <h2>PERSONAL INFORMATION</h2>
                   <h3>MY ACCOUNT</h3>
                     <div className="side--bar-actions">


                         <ul className="side--bar-actions" >
                             <li onClick={()=>isProfileActive({ profile:true,
                                                                editProfile:false,
                                                                order:false})}
                                                               className={profile.profile&&"active"}>
                                 <span >PROFILE</span>
                             </li>
                              <li onClick={()=>isProfileActive({ profile:false,
                                                                editProfile:true,
                                                                order:false})} className={profile.editProfile&&"active"}>
                                 <span >EDIT PROFILE</span>
                             </li>
                             <li onClick={()=>isProfileActive({ profile:false,
                                                                editProfile:false,
                                                                order:true})} className={profile.order&&"active"}>
                                 <span >ORDERS</span>
                             </li>
                              <li>
                                 <span onClick={()=>setSignOutActive(prev=>!prev)} >SIGN OUT</span>
                             </li>
                         </ul>
                        
                     </div>
                </div>
                <div className="profile-content">
                    {profile.profile&& <ProfileDetail/>}
                   {profile.editProfile&&<EditProfile/>} 
                   {profile.order&&<OrderInfo/>}
                   
                </div>
        </div>
        }
        </>
    )
}
