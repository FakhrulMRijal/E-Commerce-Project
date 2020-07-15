import Axios from 'axios'


// export const Register = newUser => {
//     return Axios.post('http://localhost:5000/users/register', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//     })
//     .then(res => {
//         console.log('Has registered')
//     })
// }
export const Login = (email, password) => {
    return(dispatch) => {
        Axios.post(`http://localhost:5000/users/login`, {
            email: email,
            password: password
        })
        .then((res) => {
            // console.log('DATA===', res.data.data)
            if (res.data.data.token) {
                dispatch({
                    type: 'LOGIN',
                    payload: res.data.data
                })
                
            } 
            localStorage.setItem('@token', res.data.data.token )
            localStorage.setItem('@userId', res.data.data.id )
            localStorage.setItem('@email', res.data.data.email )
        })
        .catch((err) => {
            let message = ''
            dispatch(({
                type: 'LOGOUT',
                message : alert('Error')
            }))
        })
    }
}

export const ChangePassword = (email, password) => {
    return(dispatch) => {
        Axios.post('http://localhost:5000/users/changepass', {
            email : email,
            password : password
        })
        .then((res) => {
            console.log('ChangePassword')
            dispatch({
                type : 'CHANGE_PASSWORD',
                payload : { email, password }
            })
        })
        .catch(err => {
            let message = ''
            console.log('Error')
            dispatch({
                type : 'FAILED',
                message : alert('Not found')
            })
        })
    }
}

export const Logout = () => {
    return{
        type: 'LOGOUT'
    }
}

export const ClearMail = () => {
    return{
        type: 'CLEAR_MAIL',
    }
}

    
// const token = localStorage.getItem('token');
// if (token) {
//     store.dispatch({ type: AUTHENTICATE_THE_USER });
// }

// export const keepLogin = (token) => {
//     return(dispatch) => {
//         let token = localStorage.getItem('token')
//         .then((res) => {
//             dispatch({
//                 type : 'TOKEN'
//             })
//             dispatch({
//                 type: 'LOGIN',
//                 payload: res.data[0]
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }
// }


// export const addToCart = (productId, title, price, quantity, total) => {
//     return(dispatch) => {

//         let cart = localStorage.getItem('@cart')
//         .then((res) => {
//             dispatch({
//                 type: 'ADD_TO_CART',
//                 payload: res.data[0]
//             })
//         })
//         .catch((err) => {
//             console.log(err)       
//         })
//     }
//  }

// export const addToCart = (productId, title, price, quantity, total) => 
//     (dispatch) => {
//         if(res.data.cart)
//     }

// export const cancelBooking = (cart) => {
//     return(dispatch) => {
//         let cart = localStorage.setItem('@cart')
//         .then(res => {
//             dispatch({
//                 type : 'CANCEL_CART',
//                 payload : res.data[0]
//             })
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
// }

// export const keepLogin = () => {
//     return(dispatch) => {

//         let username = localStorage.getItem('username')
//         Axios.get(API_URL + `/users?username=${username}`)
//         .then((res) => {
//             dispatch({
//                 type:'CONTOH'
//             })
//             dispatch({
//                 type: 'LOGIN',
//                 payload: res.data[0]
//             })
//         })
//         .catch((err) => {
//             console.log(err)       
//         })
//     }

// }
