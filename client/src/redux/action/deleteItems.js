export const deleteItems = ( name) => {
    return(dispatch) => {
        console.log('Delet')
        console.log('The Delete is', name )

        dispatch({
            type : "DELETE_ITEMS",
            payload : name
        })
    }
}