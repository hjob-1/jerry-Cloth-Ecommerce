import Chart from "../../components/chart/Chart";
import FeaturedInfo, { FeaturedInfo2 } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { Link, Redirect } from "react-router-dom";
import ProductList from "../productList/ProductList"
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataGrid } from "../../DataGrid";
import { Modal } from "../../components/modal/Modal";
import { HumBurger } from "../../components/humburger/HumBurger";
import { axiosInstance } from "../../utility";
export default function Home() {

 
  const [modal,isModalOpen]=useState({status:false,
                                      product:{},user:false})

  const {token} = useSelector(state =>state.userReducer.adminData)
  const [length,setLengths]=useState({productLength:"",
userLength:"",
product:[]})

useEffect(() =>
 {
   const fetchData=async()=>{
      const user= await axiosInstance.get("/api/users",{headers:{'token':`Bearer ${token}`}})
      const product=await axiosInstance.get("/api/products/?new=true")
     
      const allproduct=await axiosInstance.get('/api/products')
      setLengths({productLength:allproduct.data.length,
                  userLength:user.data.length,
                   product:product.data})
     
 }
 fetchData()
}, [])
const handleModal=(action)=>{
  isModalOpen({status:action.status,
                item:action.payload,
              user:action.user})
                console.log(modal)
}



  return (
    <div className="homeContainer">
     {modal.status && <Modal handleModal={handleModal} modal={modal}/>}
     <div className="usersContainer">
        <FeaturedInfo length={length.userLength} /> 
       
       </div>
       <div className="productContainer">
       <FeaturedInfo2  length={length.productLength}/> 
      
       </div> 
      <div className="productWidget">
        
       {/* <WidgetLg/> */}
       <h3>New designed clothes</h3>
       <DataGrid data={length.product} display={true} handleModal={handleModal} product={modal.item}/>
      </div>
      <div className="userWidget"> 
      <WidgetSm handleModal={handleModal}/>
      </div>
    </div>
  );
}
