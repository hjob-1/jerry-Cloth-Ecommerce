import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { productActionSuccess } from '../redux/actions/productAction'
import './filterBtns.css'

function FilterBtns({handleFilter,sliceProducts}) {

const dispatch=useDispatch()
const products=useSelector(state=>state.products.products)

const[active,setActive]=useState("")
   const inputhandler=(filter)=>{
       setActive(filter)
       console.log(filter)
      if(filter==="all"){
          handleFilter(sliceProducts) 
          console.log("clicked all")
      }
      else{
       const filtered= products.filter(product=>product.idnt ===filter)
       console.log(filtered)
       //dispatch(productActionSuccess(filtered))
       handleFilter(filtered)
      }
      
   }
    return (
        <div className='btns-container'>
            <h2 className='btnsheading'>POPULAR TRADITIONAL CLOTHES</h2>
            <ul>
                <li  className={`${active==="all"&&"active"}`}>
                    <button onClick={()=>inputhandler('all')}>ALL</button>
                </li>
                 <li  className={`${active==="women"&&"active"}`}>
                    <button onClick={()=>inputhandler('women')}>WOMEN</button>
                </li>
                 <li  className={`${active==="men"&&"active"}`}>
                    <button onClick={()=>inputhandler('men')}>MEN</button>
                </li>
                 <li  className={`${active==="kid"&&"active"}`}>
                    <button onClick={()=>inputhandler('kid')}>KIDS</button>
                </li>
                 <li  className={`${active==="family"&&"active"}`}>
                    <button onClick={()=>inputhandler('family')}>FAMILY</button>
                </li>
            
            </ul>
        </div>
    )
}

export default FilterBtns
