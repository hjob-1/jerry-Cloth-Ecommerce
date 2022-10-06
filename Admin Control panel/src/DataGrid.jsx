import React, { useState,useEffect } from 'react'
import { DeleteOutline, Visibility } from "@material-ui/icons";

import { useDispatch, useSelector } from 'react-redux';
import './datagrid.css'
import { productFailure, productRequest, productSuccess } from './redux/actions/productFetch';
import { Link } from 'react-router-dom';

import { axiosInstance } from './utility';


export const DataGrid = ({data,display,handleModal, handleDispatch}) => {
const dispatch =useDispatch();
const [filtered, setFiltered] = useState("")
const [select, setSelect] = useState("all")

const {token} = useSelector(state => state.userReducer.adminData)

    const handleDelete= async(_id ) =>{
        console.log(token);
        //dispatch(productRequest())
        try {
            console.log(_id)
            const  res = await axiosInstance.delete(`/api/products/delete/${_id}`, {
                headers: {
                    "token": `Bearer ${token}`
                }
            })
            const data =await res.data;
            console.log(res)
            handleDispatch(res.data);
        }
        catch (e) {
             dispatch(productFailure(e))
            console.log(e);
        }
        // console.log(_id)
        //   const filtered=data.filter((item,index)=>item._id!==_id)
        //   console.log(filtered)
        //   console.log(data)
    }

    
    const handleSearch=(e)=>{
               console.log(e.target.value)
    }
    const filter=data.filter(product=>{

        if(select=="all")
        {
            return product.name.toLowerCase().includes(filtered.toLowerCase())
        }

        return product.name.toLowerCase().includes(filtered.toLowerCase())&&product.idnt.toLowerCase()===select.toLowerCase()

    })
   
    useEffect(() => {
        
        return () => {
            console.log("unmounted")
            setFiltered("")
            setSelect("all")
        }
    }, [])
   
    return (<>
          
         <div className="productListAction">
                       
            <input type="search" placeholder='search products' onChange={(e)=>setFiltered(e.target.value)} />
               
            <div className="filterProduct">
                <span>filter By Catagory</span>
                <select value={select} onChange={(e)=>setSelect(e.target.value)}>
                  <option value="all">ALL</option>
                  <option value="men">men</option>
                  <option value="kid">kid</option>
                  <option value="women">women</option>
                  <option value="family">family</option>
                </select>
                  </div> 
                    
                       
        </div> 
        <table>    
        <thead>
            <tr>
                <th>Name</th>
                <th>Instock</th>
                <th>Price</th>
                <th>catagory</th>
                <th>Action</th>
            </tr>
         </thead>   
        <tbody>

           
            {filter.length<1?<h4 style={{padding:"10px",color:"red",textAlign:"center", width:"100%"}}>product not found</h4>:filter.map((product,index)=>(
            <tr key={index}>
                <td className='img__name_wrapper'><img src={product.img} alt={product.name} /><span>{product.name}</span></td>
                <td>{product.countInStock}</td>
                <td>{product.price}</td>
                 <td>{product.idnt}</td>
                {display? <td>
                    <button className="widgetSmButton dataGrid" onClick={()=>handleModal({status:true,payload:product,user:false})}>
                       <Visibility className="widgetSmIcon" />
                      <span>Display</span>
                    </button>  
                    </td>:<td className='btns'>
                    <Link to={`/product/${product._id}`}><span className='btn edit' >edit</span></Link><DeleteOutline className='delete' onClick={()=>handleDelete(product._id)} />
                </td>}
                
            </tr>

            ))}
         </tbody>
            
</table>
</>
    )
}
