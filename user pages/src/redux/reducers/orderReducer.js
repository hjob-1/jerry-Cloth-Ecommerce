

const intialState={
    appointment:
        {
         data:"",
         time:""
        },
        pay:
        {
        accountNumber:null,
        accountName:"Eyerusalem Tadele",
        branchName:null
        }
}

const orderReducer=(state=intialState,action)=>{


    switch (action.type) {
        case "DATA_HOLD_APPOINTMENT":
            
           return{...state, appointment:action.payload}
        case "DATA_HOLD_PAY":
            return{...state,pay:action.payload}   

    
        default:
           return state
    }
}


export default orderReducer