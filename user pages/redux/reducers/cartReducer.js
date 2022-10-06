import { ADD_TO_CART, REMOVE_FROM_CART,SIGN_OUT_CART } from "../constants/constants";


const intial={
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    cartTotalPrice:0,
    cartTotalQantity:0,
}
const cartReducer=(state=intial,action)=>{
    switch (action.type) {
        case ADD_TO_CART:
             localStorage.setItem("cart",JSON.stringify([...state.cart,action.payload]))
            return{cart:[...state.cart,action.payload]}

        case REMOVE_FROM_CART:
            localStorage.setItem("cart",JSON.stringify([...action.payload]))
            return{cart:action.payload}

        case "TOTAL_PRICE":
            return{...state,cart:[...state.cart],cartTotalPrice:action.payload}
        case "TOTAL_QANTITY":
            return{...state,cartTotalQantity:action.payload}

        case SIGN_OUT_CART:
            localStorage.removeItem("cart")
            return{
                cart:[],
                 cartTotalPrice:0,
                 cartTotalQantity:0,
            }
        default:

            return state
    }
}
export default cartReducer