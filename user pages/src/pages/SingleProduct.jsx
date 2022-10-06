import React, { Component, useState,useEffect} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import image from '../assets/images/newsletter/newsletter.jpg'
import '../components/singleproduct.css'
import { FavoriteBorder } from '@material-ui/icons'
import Counter from '../components/Counter'
import { data } from '../data'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Announcement from '../components/Announcement'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../redux/actions/cartAction';



const SingleProduct =()=> {

    const[product,setProduct]=useState({})
  const [edited,setEdited]=useState()
    const {id}=useParams();
    const products = useSelector(state => state.products.products)
     
useEffect(() => {


   const product=products.find(product=>product._id===id)
  setProduct(product)
setEdited(product)
}, [])

 const dispatch = useDispatch()
         const cart=useSelector(state=>state.cart.cart)


       const handleAddCart=(product)=>{
              const productExisted=cart.find(item=>item._id===product._id)
              if(!productExisted)
               dispatch(addToCartAction(edited))
               else
               console.log('already in your cart')
       }

       
        return (
         
            <div>
               <Announcement/>
                <Navbar/>
                  <div className='prodDetail-container'>
                     <div className="prodImgWrapper">
                         <img src={product.img} alt={product.disc} />
                     </div>
                     <div className="prodInfoWrapper">
                           <span><b>Name:</b>  {product.name}
                           </span>
                          <span><b>Detail:</b> {product.disc}
                          </span>
                          <span><b> Price: </b> <b>{product.price} ETB</b>
                             </span> 
                          <div className="prodsize-wrapper">
                              <select >
                                     <option value={1}>1</option>
                                     <option value={2}>2</option>
                                     <option value={3}>3</option>
                                     <option value={4}>4</option>
                                     <option value={5}>5</option>
                                </select>
                          </div>
                         <div className='addtocartandcontrollerwrapper'>
                          
                           <div className="btn-add-toCart">
                        
                              <span onClick={()=>handleAddCart(product)}>ADD TO CART</span>
                           </div>
                         </div>
                
                         
                     </div>
                  </div>
                <Footer/>
                
            </div>
        )
    }


export default SingleProduct
