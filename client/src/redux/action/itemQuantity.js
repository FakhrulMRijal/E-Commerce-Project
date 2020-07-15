export const itemQuantity = (action, title ) => {
    return(dispatch) => {
        // console.log('Inside product quantity')
        console.log('The product is ', title)

        dispatch({
            type : action === 'increase' ? "INCREASE_QUANTITY" : "DECREASE_QUANTITY",
            payload : {
                title,
            }
        })
    }
}

export const cancelItems = ( name, index ) => {
    return(dispatch) => {
        console.log('Cancel')
        console.log('The cancel is', name)
        console.log('INDEX: ', index)

        dispatch({
            type : "CANCEL_ITEMS",
            payload : { name, index }
        })
    }
}