import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { UserGrid } from "../../UserGrid";
import { useSelector,useDispatch } from "react-redux";
import {  fetchuserSuccess} from "../../redux/actions/userAction";

export default function UserList() {
     
    const {token}=useSelector(state=>state.userReducer.adminData)
     const dispatch = useDispatch()



useEffect(() => {

 const fetchData=async()=>
                {

            const {data}= await axios.get('/api/users/',{headers:{'token':`Bearer ${token}`}})
            dispatch(fetchuserSuccess(data))
 }
 fetchData()
}, [])


  return (
    <div className="userList">
      <UserGrid 
      />
    </div>
  );
}
