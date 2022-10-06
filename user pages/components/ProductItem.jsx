import React from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Link } from 'react-router-dom';
import { addToCartAction } from '../redux/actions/cartAction';

import { useDispatch, useSelector } from 'react-redux';


 const ProductItem=({item})=> {

         const dispatch = useDispatch()
         const cart=useSelector(state=>state.cart.cart)


       const handleAddCart=(product)=>{
              const productExisted=cart.find(item=>item._id===product._id)
              if(!productExisted)
               dispatch(addToCartAction(product))
               else
               console.log('already in your cart')
       }
   
   return <div className='prodItemContainer' > 
               
                      <div className="imgContainer">
                 
                      <img src={item.img} alt="check your internet" />
                
                     </div>
              
               <div className="infoContainer">
                      <p>{item.name}</p>
                      <strong>{item.price} ETB</strong>  
               </div>
              
                 {/* <Link to={`/product/${item._id}`}> */}
                 <div className='slide-container'>
                        
                      <span className='heart'>
                            <Link to={`/product/${item._id}`} style={{color:"white"}}>
                                   <SearchOutlinedIcon className='heartIcon' />
                            </Link> 
                       </span>
                      <div className='slidefrom-bottom' onClick={()=>handleAddCart(item)}>
                          <ShoppingCartOutlinedIcon className='cartIcon'/> 
                          <span>ADD TO CART</span>
                      </div>
                </div> 
                 {/* </Link> */}
                
        </div>
    
}

export default ProductItem;
