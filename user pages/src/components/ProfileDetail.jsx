import React from 'react'
import { useSelector } from 'react-redux'

import img from '../assets/images/userpng.png'

export const ProfileDetail = () => {
    const user=useSelector(state=>state.user.userData);
    return (
       <>
           <h3>PROFILE</h3>
            <div className="content-wraaper">
                <div className="content-img">
                    <img src={user.img||img} alt="" />
                </div>
                <div className="content-detail">
                       <p><b>Name:</b><span>{user.name}</span></p>
                       <p><b>Email:</b><span>{user.email}</span></p>
                       <p><b>Gender:</b><span>{user.gender===undefined?"not yet specified":user.gender}</span></p>
                       <p><b>Address:</b><span>{user.address ===undefined?"not yet specified":user.address}</span></p>
                </div>
            </div>
        </>
    )
}
