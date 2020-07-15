import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { cartReducer } from './cartReducer';

export default combineReducers({
    auth: authReducer,
    cartState: cartReducer
})