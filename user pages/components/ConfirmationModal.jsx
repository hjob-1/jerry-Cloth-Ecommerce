import React from 'react'
import { Link } from 'react-router-dom'

export const ConfirmationModal = ({handleSignOut,setSignOutActive}) => {
    const wrapper={
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"

    }
    const Modal={
        background:"white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        padding:"30px 20px 40px 20px ",
        borderRadius:"7px",
        webkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
        boxShadow:"0px 0px 15px -10px rgba(0, 0, 0, 0.75)"

    }
    const Bold={
        fontWeight:"bold"
    }
    
    const YesBtn={
        padding:"7px 15px",
        color:"white",
        background:"red",
        marginRight:"20px",
        borderRadius:"3px"
    }
     const NOBtn={
         padding:"7px 15px",
        color:"white",
        background:"green"
    }
    return (
        <div style={wrapper}>
            <div style={Modal}>
                <p style={Bold}>Are you sure you want to sign out ?
            </p>
           
              <p>
                <span onClick={()=>handleSignOut()} style={YesBtn}><Link to="/" style={{color:"white"}}>YES</Link></span>
                <span  style={NOBtn} onClick={()=>setSignOutActive(false)}>NO
               </span>
              </p>  
            
            </div>
            
        </div>
    )
}
