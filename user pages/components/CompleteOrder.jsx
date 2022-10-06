import React from 'react'
import { useSelector } from 'react-redux'

export const CompleteOrder = () => {
    const user = useSelector(state => state.user.userData)
    const orderInfo=useSelector(state=>state.orderInfo)
    const cart = useSelector(state => state.cart)
    return (
        
         <div className="order-complete-wrapper">
             
             <div className="order-payment-personal_price">
                 <div className="order-payment-personal">
                     <h2>personal information</h2>
                     <p>
                         <span>Name</span>
                         <span>{user.name}</span>
                     </p>
                     <p> 
                         <span>Phone Number</span>
                         <span>{user.email}</span>
                    </p>
                     <p>
                         <span>Appointment Date:</span>
                         <span>{orderInfo.appointment.date}</span>
                    </p>
                     <p>
                         <span>Appointment Time:</span>
                         <span>{orderInfo.appointment.time}   {orderInfo.appointment.status==="Morning"?"AM":orderInfo.appointment.status==="Afternoon"?"PM":""}</span>
                    </p>
                 </div>
                 <div className="order-payment-price">
                     <h2>payment information</h2>
                     <h4>BANK INFORMATION</h4>
                     <p>
                         <span>Bank Name:</span>
                         <span>{orderInfo.pay.BOAactive?"OROMIA BANK":orderInfo.pay.CBEactive?"CBE":""}
                             </span>
                     </p>
                     <p>
                         <span>Account Name:</span>
                         <span>Eyerusalem Tadele</span>
                     </p>
                     <p>
                         <span>Account Number:</span>
                         <span>{orderInfo.pay.CBEactive?
                                orderInfo.pay.CBEaccountNumber:
                                  orderInfo.pay.BOAactive? orderInfo.pay.BOAaccountNumber:""}</span>
                        
                     </p>
                     <h4>PRICE INFORMATION</h4>

                     <p>
                         <span>Quantity:</span>
                         <span>{cart.cartTotalQantity} Clothes</span>
                        
                     </p>
                     <p>
                         <span>Total Price:</span>
                         <span>${cart.cartTotalPrice}</span>
                        
                     </p>
                    
                 </div>
             </div>
             <div className="order-payment-direction">
                 <p>Thank You For Making a Request.Please Follow steps below to Complete The Proccess </p>
                 <div className="payment-info">
                     <ul>
                         <li>Go to your Prefered bank branch or Use mobile Banking</li>
                         <li>Since It is An Appointment Only pay Half of The Total Price.(<b>{cart.cartTotalPrice/2})</b></li>
                         <li>Pay <b>{cart.cartTotalPrice/2} ETB</b> to This Account Number <b>
                             {
                             orderInfo.pay.CBEactive?
                             orderInfo.pay.CBEaccountNumber:
                             orderInfo.pay.BOAactive? orderInfo.pay.BOAaccountNumber:""}
                         </b> 
                         
                         </li>
                         <li>Make Sure to Send Us a Screenshot of your Transaction to Our Telegram</li>
                     </ul>
                    
                 </div>
                 <div className="payment-info-note">
                     <p>N.B : Please ensure that you make the exact payment with in 2 consective days.When you come on your appointment
                          day dont forget to bring the Transaction Receipt. <b>If you aren't satisfied on your appointment day, appointment fee will be given back right away</b></p>
                 </div>
             </div>
         </div>
        
    )
}
