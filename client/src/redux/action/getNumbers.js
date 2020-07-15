export const getNumbers = () => {
    return(dispatch) => {
        console.log('get cart numbers')
        dispatch({
            type : 'GET_NUMBERS'
        })
    }
}