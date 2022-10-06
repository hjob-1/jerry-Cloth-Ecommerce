import React, { Component } from 'react'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../components/shopping.css'
import image from '../assets/images/newsletter/newsletter.jpg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import sliderdata from '../sliderdata'
import { addToCartAction, cartTotalPrice,  cartTotalQantity,  removeFromCartAction } from '../redux/actions/cartAction'
import Announcement from '../components/Announcement'
import  DeleteIcon from '@material-ui/icons/Delete'
import { Redirect, useHistory } from 'react-router'


 const ShoppingCart=()=>{
     
        let totalPrice=0;
        let totalQantity=0
         const cartLength=useSelector(state=>state.cart.cart.length)
         const cart=useSelector(state=>state.cart.cart)
         const isLogedIn=useSelector(state=>state.user.isLogedIn)
         const dispatch = useDispatch()
          const history=  useHistory()
  
         const  calculateTotalPrice=()=>{
            const total=cart.reduce((sum,{price,qant}) => 
            sum+price*qant
        ,0);
        // dispatch(cartTotalPrice(total))
        totalPrice=total;
        console.log(totalPrice)
           return total
        }

        const deleteCartItem=item=>{
            const filtered=cart.filter(product=>product._id!==item._id)
            console.log(filtered)
            dispatch( removeFromCartAction(filtered))
        }
        
      const  changeQuantity=(quantity,_id)=>{
          const edited=cart.map(item=>item._id===_id?{...item,qant:quantity}:item)
         dispatch( removeFromCartAction(edited))

      }
      const itemCounter=()=>{
          let sum=0;
        cart.forEach(item=>sum+=item.qant)
        //dispatch(cartTotalQantity(sum))
        totalQantity=sum;
console.log(totalQantity)
        return sum;
      }



const handleCartDetail=()=>{
    
    dispatch(cartTotalPrice(totalPrice))
    dispatch(cartTotalQantity(totalQantity))
  
}




        return (
            <div>
                <Announcement/>
                <Navbar />
                <header>
                    <img src={image} alt="header" />
                    <div className="header-textWrapper">
                         <h1>Shopping Cart</h1>
                    </div> 
                </header>
              {cartLength===0 ?
               <div className='cart-Empty'>
                    <h1>Your Shopping cart is Empty</h1>
                    <span className='shop-now'>
                        <Link to='/'>Shop Now</Link>
                    </span>
                </div> :
              <body className='cart-container'>
                        <section className='cart-left'>
                            <div className='cart-left-heading'>
                                 <span>product</span>
                                 <span>price</span>
                                 <span>Quantity</span>
                                 <span>Total</span>
                              </div>
                           {cart.map(item=><div key={item._id} className="cart-left-detail">
                                <img src={item.img} alt="shoping cloth image" />
                                <h5 className="shopping-product-name">{item.name}</h5>
                                <span>${item.price}</span>
                                <select value={item.qant} onChange={(e)=>changeQuantity(parseInt(e.target.value),item._id)}>
                                     <option value={1}>1</option>
                                     <option value={2}>2</option>
                                     <option value={3}>3</option>
                                     <option value={4}>4</option>
                                     <option value={5}>5</option>
                                </select>
                                <span>${item.qant*item.price}</span>
                                <span onClick={()=>deleteCartItem(item)} className='deleteItem'>< DeleteIcon fontSize="small" /></span>

                            </div> )
                            
                        }
                    </section>
                    <section  className='cart-right'>
                        <h3>Cart Total</h3>
                        <div className="cart-right-subtotal">
                            <span>Total(<b>{itemCounter()}</b> items)</span>
                            <span>$ {calculateTotalPrice()}</span>
                        </div>
                        <div className="cart-left-checkout" onClick={handleCartDetail}>
                           <Link to="/shopping/order"><span>PROCEED TO CHECKOUT</span></Link> 
                        </div>
                    </section>
                </body>}
                
                <Footer/>
            </div>
        )
    }


export default ShoppingCart
