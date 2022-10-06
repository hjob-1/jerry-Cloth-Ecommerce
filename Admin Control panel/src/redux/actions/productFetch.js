import { FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "../constants"



export const productFailure=(error)=>{
    return{
        type:FETCH_PRODUCT_FAILURE,
        payload:error
    }

}
export const productSuccess=(product)=>{
    return{
        type:FETCH_PRODUCT_SUCCESS,
        payload:product
    }

}
export const productRequest=()=>{
    return{
        type:FETCH_PRODUCT_REQUEST
    }

}