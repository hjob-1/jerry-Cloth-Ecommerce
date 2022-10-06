import { USER_SIGN_IN_FAILURE, USER_SIGN_IN_REQUEST, USER_FETCH_SUCCESS, USER_SIGN_IN_ADMIN_SUCCESS, USER_ADMIN_SIGN_OUT } from "../constants"




const intial={
    isLogedIn:localStorage.getItem("userData")?true:false,
    loading:false,
    userData:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):[],
    adminData:localStorage.getItem("adminData")?JSON.parse(localStorage.getItem("adminData")):{},
    error:''

}
const userReducer=(state=intial,action)=>{
    switch (action.type) {
        case USER_SIGN_IN_REQUEST:
            return{...state,isLogedIn:false,loading:true}
        case USER_FETCH_SUCCESS:
            localStorage.setItem("userData",JSON.stringify(action.payload))
            return{...state,loading:false,userData:action.payload,error:''}

        case USER_SIGN_IN_ADMIN_SUCCESS:
            localStorage.setItem("adminData",JSON.stringify(action.payload))
            return{...state,isLogedIn:true,loading:false,error:'',adminData:action.payload}

        case USER_SIGN_IN_FAILURE:
            return{isLogedIn:false,loading:false,userData:[],adminData:{},error:action.payload} 

        case USER_ADMIN_SIGN_OUT:
            localStorage.removeItem("adminData")
            return{isLogedIn:false,loading:false,userData:[],error:" ",adminData:{}}   

        default:
            return state
    }
}
export default userReducer