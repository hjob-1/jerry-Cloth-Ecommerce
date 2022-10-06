import { USER_SIGN_IN_FAILURE, USER_SIGN_IN_REQUEST, USER_FETCH_SUCCESS,USER_SIGN_IN_ADMIN_SUCCESS, USER_ADMIN_SIGN_OUT } from "../constants"




export const signInRequest=(userData)=>{
    return{
        type:USER_SIGN_IN_REQUEST,
        payload:userData
    }
}
export const fetchuserSuccess=(userData)=>{
    return{
        type:USER_FETCH_SUCCESS,
        payload:userData
    }
}
export const adminSignInSuccess=(adminData)=>{
    return{
        type:USER_SIGN_IN_ADMIN_SUCCESS,
        payload:adminData
    }
}
export const signInFailure=(userData)=>{
    return{
        type:USER_SIGN_IN_FAILURE,
        payload:userData
    }
}


export const signOut=()=>{
    return{
        type:USER_ADMIN_SIGN_OUT
    }
}