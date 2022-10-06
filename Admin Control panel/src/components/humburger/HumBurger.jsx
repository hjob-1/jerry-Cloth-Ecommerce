import React, { useState } from 'react'
import './humburger.css'
import  ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
 import  ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import {Link} from 'react-router-dom'
export const HumBurger = ({active,isSideBar}) => {

    const[Class,setClass]=useState(" ")
    const [dropDownActive,setDropDownActive]=useState(false)

    setTimeout(()=>{
     setClass("active")
    },10)
    return (
        <div className={`humburger-container ${Class}`}>
             <div className="humburger-content">
                 <p onClick={()=>isSideBar(false)} style={
                     {
                         textAlign:"right",
                         padding:"10px 20px",
                         color:'red'
                     }
                                                        }>X</p>
                 <ul>
                     <li onClick={()=>setDropDownActive(!dropDownActive)}>
                      <p>product</p> {dropDownActive?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}
                     </li>
                      {dropDownActive&&
                      <div className="dropDown">
                         
                          <Link to="/products" className="hum_LINK"> <p onClick={()=>isSideBar(false)}>Product List</p></Link>
                          
                           <Link to="/newproduct" className="hum_LINK"> <p  onClick={()=>isSideBar(false)}> Add Product</p></Link>
                         
                      </div>}
                     
                     <li>
                        <Link to="/order" ><p  onClick={()=>isSideBar(false)}>orders</p></Link> 
                     </li>
                     <li>
                         <p>users</p>
                     </li>

                 </ul>
             </div>
        </div>
    )
}
