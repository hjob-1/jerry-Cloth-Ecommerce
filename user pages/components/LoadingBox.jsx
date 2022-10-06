import React from 'react'
import './loading.css'
import logo from '../assets/images/Jfashion_free-file.png'

function LoadingBox() {
    return (
        <div className="loading-wrapper" >
           <div className="spinner" 
           >
               <img src={logo} alt="" />
           </div>
        </div>
    )
}

export default LoadingBox
