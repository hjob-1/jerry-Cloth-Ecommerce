import { PRODUCT_FETCH_FAILURE, PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS } from "../constants/constants";



const intialState={
    loading:false,
    error:'',
    products:[]
}
const productReducer=(state=intialState,action)=>{
    switch (action.type) {
        case PRODUCT_FETCH_REQUEST:
            return{...state,loading:true}
          
        case PRODUCT_FETCH_SUCCESS:
            return{loading:false,products:action.payload,error:''}

        case PRODUCT_FETCH_FAILURE:
            return{loading:false,products:[],error:action.payload}

        default:
            return state
    }

}
export default productReducer;