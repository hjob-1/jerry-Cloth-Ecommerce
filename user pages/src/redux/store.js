import {combineReducers, createStore} from 'redux'
import productReducer from './reducers/productReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';



const rootReducer=combineReducers({cart:cartReducer,products:productReducer,user:userReducer,orderInfo:orderReducer});

const store=createStore(rootReducer,composeWithDevTools())


export default store;