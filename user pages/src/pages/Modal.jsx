import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/Jfashion_free-file.png'
import '../components/modal.css'
export const Modal = () => {


    const Wrapper={
        width:"100%",
        height:'100vh',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:"#f9f9f9 "
    }
    const Modal={
        background:"white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexBasis:"300px",
        flexDirection:"column",
        padding:"30px 20px 40px 20px ",
        borderRadius:"7px",
        webkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
        boxShadow:"0px 0px 15px -10px rgba(0, 0, 0, 0.75)"

    }
    
    return (
       
           <div  style={Wrapper}>
               <div style={Modal} className="modal-content">
                   <div className="modal-img-wrapper">
                       <img src={logo} alt="" />
                   </div>
                   <p>Thank You For Using Our Service.!</p>
                   <span><Link to="/"> Go Back To Home</Link>
                      </span>
               </div>

              
           </div>
       
    )
}
