import React from 'react'
import { Link } from 'react-router-dom'

export const Success = () => {
    return (
        <div style={{height:"80vh",display:"flex",alignItems:"center",justifyContent:"center",color:"green"}}>
             <h3>Your Product Successfully Created <Link to="/products" style={{color:"blue"}}>go back to products</Link></h3>
        </div>
    )
}
