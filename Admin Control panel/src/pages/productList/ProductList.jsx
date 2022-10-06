import "./productList.css";
//import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "../../DataGrid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productFailure, productRequest, productSuccess } from "../../redux/actions/productFetch";
import { axiosInstance } from "../../utility";

export default function ProductList() {
  const data=useSelector(state=>state.productReducer.products);
  const loading=useSelector(state=>state.productReducer.loading);
  const dispatch=useDispatch()

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
  };

useEffect(() => {
 const fetchdata=async()=>{

   try{
dispatch(productRequest())
   const {data}=await axiosInstance.get('/api/products');
   console.log(data);
   console.log(productRows)
  //  const modified=data.map(item=>{
  //    return{...item,"stock":123,status:"active"}
  //   })
    dispatch(productSuccess(data))


  
  
  }
  catch(e){
    dispatch(productFailure(e))
  }
 }

 
 fetchdata()

 
}, [])

const handleDispatch=(data)=>{
  console.log("um in handle dispatch")
  dispatch(productSuccess(data))
}

  return (
    <div className="productList">
      <div className="productlist-header">
           <img src="https://media.istockphoto.com/photos/fashion-clothes-on-a-rack-in-a-light-background-indoors-place-for-picture-id1257563298?b=1&k=20&m=1257563298&s=170667a&w=0&h=Hhf0-AsQp7Z7k9q8XKHfQUY86uPJvE8vmmGHXihWS_M=" alt="" />
           <div className="product-list-text">
             <h1>product lists</h1>
           </div>
      </div>
      
      { loading?
      <div>Loading...</div>:<DataGrid data={data}  handleDispatch={ handleDispatch}/> }
     
    </div>
  );
}
