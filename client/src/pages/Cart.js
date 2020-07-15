import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { itemQuantity, cancelItems } from '../redux/action/itemQuantity';
import { deleteItems } from '../redux/action/deleteItems';
import StripeCheckout from 'react-stripe-checkout'
import  Axios  from 'axios';


const Cart = ({cartProps, itemQuantity, cancelItems, deleteItems}) => {
  let itemsInCart = []  
  // const [redirectTo, setRedirectTo] = useState(false); // your state value to manipulate 
    let data = {}
    // console.log('CARTPROPS ==== ', cartProps)
    // console.log('ITEMS IN CART === ', cartProps.items)
    

    Object.keys(cartProps.items).forEach(function(item) {
      // console.log('ITEMS ALREADY IN CART ====', cartProps.items[item].productId)
      console.log('IN CART === ', cartProps.items[item])
      if(cartProps.items[item]){
        itemsInCart.push(cartProps.items[item])
      } else if(cartProps.total === 0){
        alert('Totul')
      }
      // console.log('PRODUCTSINCART ==== ', itemsInCart)
      // console.log("ALLITEM === ", cartProps.items)
    });
        
      itemsInCart = itemsInCart.map((item, index) => {
        // console.log('Products In Cart ==== ', itemsInCart)
        return(
          <tbody>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>
          <button type= "number" onClick={() => itemQuantity('decrease', item.title)} disabled={item.quantity > 0 ? '' : 'disabled'}>-</button>
            <span>{item.quantity}</span>
            <button type="number" onClick={() => itemQuantity('increase', item.title)}>+</button>
        </td>
        <td>Rp.{item.quantity * item.price}</td>
        <button onClick={() => cancelItems(item.title, index)}>Cancel</button>
      </tbody>
    )
  })
    
    const Delete = ({}) => {
      deleteItems(cartProps.items)
    }

    const CashConfirm = async ({}) => {
      let idUser = localStorage.getItem('@userId')
      await Axios.post('http://localhost:5000/orders/create', {
            items : cartProps.items,
            total : cartProps.total,
            payment : 'Cash',
            userId : idUser,
            createdAt : new Date(),
            updateAt : new Date()
          })
          .then(res => {
            console.log('DATA ===', res.data)
            if(cartProps.total === 0){
              return(
                alert('Please order')
              )
            } else {
              deleteItems(cartProps.items)
              alert('Your order already save in history please check your order')
            }
          })
          .catch(err => {
            console.log('Error ===', err)
          })
    }

    const makePayment = async token => {
      let idUser = localStorage.getItem('@userId')

      const headers = {
        "Content-Type" : "application/json"
      }
      console.log('TOKEN: ', token)

         data = {
        token,
        items : cartProps.items,
        total : cartProps.total,
        payment : 'Paypal',
        userId : idUser,
        createdAt : new Date(),
        updateAt : new Date()
      }
  
      await Axios.post('http://localhost:5000/orders/stripe', {
        headers,
        data
      }).then(res => {
        console.log("RESPONSE", res.data)
        if(cartProps.items.length === 0) {
          alert('Please Order')
        } else {
          alert('Your purchase with paypal')
          deleteItems(cartProps.items)
        }
      }).catch(error => {
        console.log('ERRROR CATCH: ', error)
        console.log('ERRROR CATCH: ', error.message)
      })
    }
    
    // const paypalPayment = ({token}) => {
    //   let idUser = localStorage.getItem('@userId')

    //   const headers = {
    //     "Content-Type" : "application/json"
    //   }
    //   console.log('TOKEN: ', token)

    //      data = {
    //     token,
    //     items : cartProps.items,
    //     total : cartProps.total,
    //     payment : 'Paypal',
    //     userId : idUser,
    //     createdAt : new Date(),
    //     updateAt : new Date()
    //   }
  
    //   // return Axios.post('http://localhost:5000/orders/stripe', {
    //   //   headers,
    //   //   data
    //   // }).then(res => {
    //   //   console.log("RESPONSE", res.data)
    //   //   if(cartProps.items.length === 0) {
    //   //     alert('Please Order')
    //   //   } else {
    //   //     alert('Your purchase with paypal')
    //   //     deleteItems(cartProps.items)
    //   //   }
    //   // }).catch(error => {
    //   //   console.log('ERRROR CATCH: ', error)
    //   //   console.log('ERRROR CATCH: ', error.message)
    //   // })

    // }
    return(
          <div>
          <div>
            <Table>
              <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              </thead>
                { itemsInCart }
          </Table>
          <div>
              {/* <p>Checkout === <h4>Rp.{cartProps.totalCart.toLocaleString()}</h4></p> */}
              <p>Total : <span style={{textAlign : 'right'}}>Rp.{cartProps.total.toLocaleString()}</span></p>
          </div>
          <div>
            <button onClick={ CashConfirm } style={{marginRight : 4.5}}>Cash</button>
            <StripeCheckout 
            stripeKey="pk_test_51Gvn1gGYUF75srSDLRErNVVCqGz0FWRpXHuxzhABYKz0mEnNGkqtrEMFR4He6PiRDMg3Nm2sxW7FJn0Z5GwdOq3Q00B8zeawCg"
            token={makePayment} 
            total={cartProps.total.toLocaleString()}>
            <button>Paypal</button>
            </StripeCheckout>
            <button onClick={ Delete }>Delete</button>
          </div>
        </div>
        </div>      
    )
  
  }
  
  
  const mapStateToProps = state => ({
    cartProps : state.cartState
  })
  
  
  export default connect(mapStateToProps, { cancelItems, itemQuantity, deleteItems } )(Cart)
  
  
  
  // return (
    
  //    <div>
  //     <div>
  //       <Table>
  //   <thead>
  //     <tr>
  //       <th>No</th>
  //       <th>Name</th>
  //       <th>Price</th>
  //       <th>Quantity</th>
  //       <th>Total</th>
  //       <th>Action</th>
  //     </tr>
  //   </thead>
  //     { itemsInCart }
  //     </Table>
  //     <div>
  //         {/* <p>Checkout === <h4>Rp.{cartProps.totalCart.toLocaleString()}</h4></p> */}
  //         <p>Total : <span style={{textAlign : 'right'}}>Rp.{cartProps.total}</span></p>
  //     </div>
  //     <div>
  //       <button onClick={ Confirm }>confirm</button>
  //       <button onClick={ Delete }>delete</button>
  //     </div>
  //       </div>
  //   </div>
  // );