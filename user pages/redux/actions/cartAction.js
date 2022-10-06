import { ADD_TO_CART, REMOVE_FROM_CART, SIGN_OUT_CART } from "../constants/constants"


export const addToCartAction=(product)=>{
   
    return{type:ADD_TO_CART,payload:product}
}
export const removeFromCartAction=(products)=>{
    return{type:REMOVE_FROM_CART,
           payload:products}
        
}

export const cartTotalPrice=(totalPrice)=>{
   
    return{type:"TOTAL_PRICE",payload:totalPrice}
}

export const cartTotalQantity=(totalPrice)=>{
   
    return{type:"TOTAL_QANTITY",payload:totalPrice}
}

export const signOutCart=()=>{
    return{type:SIGN_OUT_CART}
}
