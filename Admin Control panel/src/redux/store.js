import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,combineReducers} from 'redux'
import productReducer from './reducers/productReducer'

import userReducer from './reducers/userReducer'
const reducers=combineReducers({productReducer,userReducer})

export const store=createStore(reducers,composeWithDevTools())