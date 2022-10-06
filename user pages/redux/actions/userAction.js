import { USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS,USER_SIGN_IN_FAILURE,USER_SIGN_OUT} from "../constants/constants"


export const signInRequest=(userData)=>{
    return{
        type:USER_SIGN_IN_REQUEST,
        payload:userData
    }
}
export const signInSuccess=(userData)=>{
    return{
        type:USER_SIGN_IN_SUCCESS,
        payload:userData
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
        type:USER_SIGN_OUT
    }
}