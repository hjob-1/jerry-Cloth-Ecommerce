import React from 'react'
import './catagories.css'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {catagories} from '../data'
import { Link } from 'react-router-dom';
function Catagories({handleFilter,sliceProducts}) {

    const inputhandler=(filter)=>{
       console.log(filter)
     
     
       const filtered= sliceProducts.filter(product=>product.idnt.toUpperCase() ===filter)
       console.log(filtered)
       //dispatch(productActionSuccess(filtered))
       handleFilter(filtered)
    
    }
    return (<>
           <h1 className="cat-header">Shop By Catagory</h1>
        <div className='catContainer'>
           
           {catagories.map((item,index)=>(<div className={`catagoryItem item${index}`}  key={item.id}>
                                      <div className="cat--imgWrapper">
                                          <img src={item.img} alt="" />
                                      </div>
                                      <div className="cat--infoWrapper">
                                          <h1>{item.disc}'S</h1>
                                           <div className='btn-container'>
                                               <a href="#product"><span onClick={()=>inputhandler(item.disc)}>SHOP NOW</span></a> <ArrowRightAltIcon/>
                                               </div>
                                      </div>
                                </div>))}
        </div>
        </>
      )
}

export default Catagories
