const intialState={
   viewmore:{intial:0,final:4},
   filtered:[],
   sliced:[]
}
const filterReducer=(state=intialState,action)=>{
    switch (action.type) {
        
          
        case PRODUCT_FETCH_SUCCESS:
            return{viewmore:{intial:state.viewmore.intial,final:state.viewmore.final +4},products:action.payload,error:''}
        default:
            return state
    }

}
export default productReducer;