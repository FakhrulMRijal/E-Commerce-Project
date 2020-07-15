export const addCart = (productId, title, price ) => {
    return (dispatch) => {
        console.log('Add to cart')
        console.log('The product is', productId, title, price)
        dispatch({
            type : 'ADD_TO_CART',
            payload : {productId, title, price}
        })
    }
}

// export const cancelCart = (title) => {
//     return(dispatch) => {
//         console.log('Cancel')

//         dispatch({
//             type : 'CANCEL_CART',
//             payload : title
//         })
//     }
// }
