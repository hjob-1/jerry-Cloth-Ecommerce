import React from 'react'
import ProductItem from './ProductItem'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './products.css'
import { useSelector } from 'react-redux';
import { orginaldata } from '../data';
import { useState } from 'react';



const  Products=({filtered,handleMore,searchbegin})=> {


//  let sliced=slice.map(item=><ProductItem item={item } key={item.id} handleCart={handleCart}/>)
    

// const viewMore=()=>{
//       handleViewMore()
// }
//const products=orginaldata
//const products=useSelector(state=>state.products.products);
//console.log(products)

    return (<>
        
        <div className={`prodContainer ${searchbegin&& "prod-search"}`} id="product" >
          {filtered.map(item=><ProductItem key={item._id} item={item}/>)}

        </div>
           <div className="btn-wrapper">
               <div className="showmore-container" >
                   <span className='load-more' onClick={()=>handleMore()}>VIEW MORE</span>
                    <ArrowRightAltIcon className="arrow"/>
               </div>
           </div>
        </>
    )
}

export default Products
