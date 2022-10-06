import React, { useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

import    MenuIcon from '@material-ui/icons/Menu'
import { HumBurger } from "../humburger/HumBurger";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/userAction";


export default function Topbar() {
  const dispatch=useDispatch()

  const[sideBar,isSideBar]=useState(false)
  const handleSignOut=()=>{
  dispatch(signOut())
  }

  return (
    <div className="topbar">
       {sideBar&&<HumBurger active={true} isSideBar={isSideBar}/>}
      <div className="topbarWrapper">
       
        <div className="topLeft">
          <span className="humburger-menu" onClick={()=>isSideBar(true)} >
            <MenuIcon/>
         </span>
         
        </div>
        <div className="topCenter">
         <Link to="/">
         <img src="./womenproduct.png" alt="" />
        
         </Link> 
        </div>
        <div className="topRight">
          <img src="./userpng.png"alt="" className="topAvatar" />
          <span style={{color:"red",
        marginLeft:"5px"}} onClick={handleSignOut}> Sign Out</span>
        </div>
      </div>
    </div>
  );
}
