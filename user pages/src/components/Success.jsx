import React from 'react'
import { Link } from 'react-router-dom'

export const Success = () => {
    return (
        <div style={{height:"80vh",display:"flex",alignItems:"center",justifyContent:"center",color:"green"}}>
             <h3>Your Personal information Successfully Updated <Link to="/" >OKAY</Link></h3>
        </div>
    )
}