const INITIAL_STATE = {
    username: '',
    email: '',
    phone: '',
    message: '',
    role : '',
    cart: [],
    id: 0,
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return state 
        case 'CHANGE_PASSWORD' :
            return action.payload
        case 'FAILED' : 
            return state    
        default:
            return state
    }
}

// export const addToCartReducer = (state = INITIAL_STATE, action) => {
//     switch(action.type) {
//         case 'ADD_TO_CART':
//             let addQuantity = {
//                 ...state.products[action.payload]
//             }
//             addQuantity.quantity += 1
//             addQuantity.inCart = true
//             console.log(addQuantity)
//             return{
//                 ...state,
//                 cartNumber : this.cartNumber + 1
//             }
//         case 'GET_CART':
//             return{
//                 ...state
//             }    
//     }
// }

