import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import commericial from '../assets/images/bank of ethiopia.jpg'
import abyssinia from '../assets/images/bank of abyssinia.png'
import { dataHolderPay } from '../redux/actions/orderInfo'
export const Pay = ({error}) => {

     const dispatch=useDispatch()
      const BankDetail={
        CBEactive:false,
        CBEaccountNumber:"1000144397537",
        BOAactive:false,
        BOAaccountNumber:"11904213"
              }
                    
    const[bankChoice,setBankChoice]=useState(BankDetail)


     useEffect(()=>{
          dispatch(dataHolderPay(bankChoice))
          console.log("chang variable")  
        },[bankChoice])
       
    
   
   
const cart = useSelector(state => state.cart)

    return (
        <div className="pay-container">
             <h3>PAY</h3>
             <div className="pay-wrapper">
                 <div className="pay--product-wrapper">
                     <h4>YOUR SHOPPING CART</h4>
                     <ul className="product-wrapper-items">
                         {cart.cart.map(cart=>
                            <li className="product-wrapper-item" key={cart._id}>
                             <div className="item-img">
                                 <img src={cart.img} alt="" />
                             </div>
                              <div className="item-detail">
                                  <p>{cart.name}</p>
                                  <p>{cart.qant} items  Each  <b>${cart.price}</b></p>
                                 
                              </div>
                         </li>
                            )}
                     </ul>        
                 </div>
                 <div className="pay-payment-wrapper">
                     <div className="payment-top">
                         <p>Sorry Currently online payment is not available only branch payment so please select one of the two banks listed below. </p>
                    
                     </div>
                     <div className="payment-choice">
                         <div className={`payment-choice-commercial ${bankChoice.CBEactive&& "selected"}`}
                          onClick={()=>setBankChoice(
                              prev=>{
                              return{...prev,CBEactive:true,BOAactive:false}
                              }
                          )}>
                             <img src={commericial} alt="commerical bank of ethiopia" />
                         </div>
                         <div className={`payment-choice-absinia ${bankChoice.BOAactive&& "selected"}`}
                            onClick={()=>setBankChoice(
                              prev=>{
                              return{...prev,BOAactive:true,CBEactive:false}
                              }
                          )}
                         >
                            <img src={abyssinia} alt="abyssinia bank" />
                         </div>
                    

                     </div>
                    {error.bankSelect&& <p style={{color:'red',fontSize:'12px',marginLeft:'10px'}}>Please Select One Of The Two Choices </p> }
                    
                 </div>
                 <div className="pay-total-price-wrapper">
                     <div className="price-detail">
                         <h4>PRICE INFORMATION</h4>
                         <div className="price-detail--info">
                             <div className="info-heading">
                                 <span>Number of Products</span><strong>{cart.cartTotalQantity}</strong>
                             </div>
                              <div className="info-heading">
                                <span>Total Price</span> <strong> ${cart.cartTotalPrice}</strong>
                              </div>
                         </div>
                     </div>
                        
                         <div className="pay-total-account-wrapper">
                             <h4>BANK INFORMATION</h4>
                             <h5 className="bank" style={{fontWeight:"bold"}}>{bankChoice.BOAactive?"OROMIA BANK":bankChoice.CBEactive?"COMMERCIAL BANK OF ETHIOPIA":""}</h5>
                             <p>
                                 <span>Account Name :</span><span style={{fontWeight:"bold"}}> eyerusalem tadele</span>
                             </p>
                             <p>
                                 <span>Account Number :</span><span style={{fontWeight:"bold"}}>{bankChoice.CBEactive?
                                 bankChoice.CBEaccountNumber:
                                 bankChoice.BOAactive?bankChoice.BOAaccountNumber:""}</span>
                             </p>
                         </div>
        
                     </div>
             </div>
        </div>
    )
}
