import { PRODUCT_FETCH_FAILURE, PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS, } from "../constants/constants"

export const productActionSuccess=(product)=>{
    return {type:PRODUCT_FETCH_SUCCESS,
            payload:product}

};
export const productActionRequest=()=>{
    return {type:PRODUCT_FETCH_REQUEST}

};
export const productActionFailure=(error)=>{
    return {type:PRODUCT_FETCH_FAILURE,
            payload:error }

};