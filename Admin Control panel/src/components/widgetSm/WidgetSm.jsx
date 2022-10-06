import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../modal/Modal";

export default function WidgetSm({handleModal}) {
const [users,setUsers]=useState([]);
const [modal,setModal]=useState(false)

const{token}=JSON.parse(localStorage.getItem("adminData"));
useEffect(()=>{
  const fetchUsers=async()=>{
    const {data}=await axios.get('/api/users/?new=true',{headers:{'token':`Bearer ${token}`}})
   setUsers(data)
  }

fetchUsers()
},[])

const OpenModal=()=>{
  <Modal/>
  console.log("modal")
}

  
  return(
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
          <li className="widgetHeader">
            <span>User</span>
            <span>action</span>
            </li>
        {users.map((user,index)=>
              
          <li className="widgetSmListItem" key={user._id}>
          
          <div className="widgetSmUser">
             <img
            src={user.img?user.img:"./userpng.png"}  alt="avator"
            className="widgetSmImg"
          />
          <div className="userInfoWrapper">
                  <span className="widgetSmUsername">{user.name}</span>
            <span className="widgetSmUserTitle">{user.email}</span>
          </div>
           
          </div>
          <button className="widgetSmButton" onClick={()=>handleModal({status:true,payload:user,user:true})}>
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>

)}
      </ul>
    </div>
  );
}
