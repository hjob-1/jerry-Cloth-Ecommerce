
import { USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS,USER_SIGN_IN_FAILURE,USER_SIGN_OUT} from "../constants/constants"


const intial={
    isLogedIn:localStorage.getItem("userData")?true:false,
    loading:false,
    userData:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):{},
    error:''

}
const userReducer=(state=intial,action)=>{
    switch (action.type) {
        case USER_SIGN_IN_REQUEST:
            return{...state,isLogedIn:false,loading:true}
        case USER_SIGN_IN_SUCCESS:
            localStorage.setItem("userData",JSON.stringify(action.payload))
            return{isLogedIn:true,loading:false,userData:action.payload,error:''}
        case USER_SIGN_IN_FAILURE:
            return{isLogedIn:false,loading:false,userData:{},error:action.payload}   
        case USER_SIGN_OUT:
            localStorage.removeItem("userData")
            return{isLogedIn:false,loading:false,userData:{},error:" "}   
        default:
            return state
    }
}
export default userReducer