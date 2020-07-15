import React, { Component, useState } from 'react';
import Axios from 'axios';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { addCart } from '../redux/action/addAction'





class ProductsDetail extends Component {
    state = {
        data : {},
        redirectLogin : false,
        redirectPurchase: false,
        // productId : '',
        // title : '',
        // price : 0,
        // quantity : 0,
        // total : 0
    }

    componentDidMount(){
        
        this.renderDetail()
    }

    renderDetail = () => {
        Axios.get(`http://localhost:5000/products/detail/${this.props.match.params.productId}`)
        .then((res) => {
            this.setState({data : res.data})
            console.log(this.state.data)
            console.log(this.state.data.category)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    putProductsDetail = (props) => {
        const { title, image, price, detail, category } = this.state.data
        // console.log(props.match.params.category)
        console.log('PRODUCTDETAIL===', this.state.data.price)
        console.log('PROPS', props)
        return (
            <div className='container full-height' style={{marginTop:25}}>
                <div className='row'>
                    <div className='col-4'>
                        <img
                            width="350"
                            height="400"
                            src={image}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        />    
                    </div>
                    
                    <div className='col-8'>
                        <div className='vertical-spacing'>
                            <h1>
                                 {title}
                            </h1>
                        </div>
                        <div className='vertical-spacing'>
                           <b> Description : </b>{detail}
                        </div>
                        <div className='vertical-spacing'>
                            <b>Category : </b> {category}
                        </div>
                            <b>Price : </b> Rp. {parseInt(price).toLocaleString()}
                        <div className='vertical-spacing'>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
h
    onBtnCart = () => {
        let { token } = this.props
        let idUser = localStorage.getItem('@userId')
        let { _id, title, price, quantity } = this.state.data;
        console.log('this.state.data ==>>> ', this.state.data)
        console.log('TOKEN===', token)
        if( idUser ){
            this.setState({redirectPurchase : true})
            this.props.history.push(`/cart/${idUser}`)
            this.props.addCart(_id, title, price, quantity)
            // this.props.history.push('/cart');
        } else {
            this.setState({redirectLogin : true})
        }  
        // const setCart = this.props.addCart(_id, title, price, quantity)
        // const tempCart = setCart && setCart.length > 0 ? setCart : []

        // tempCart.push({
        //     productId: _id,
        //     title,
        //     price,
        //     quantity : 1
        //     // quantity : quantity + 1,
        //     // total : quantity * price
        // })

        // console.log('====>', tempCart)
        // localStorage.setItem('@cart', setCart)
        // localStorage.setItem('@cart', JSON.stringify(tempCart))
    }

    
    render(){
      const { data, redirectLogin, redirectPurchase } = this.state
      const { token } = this.props
        if(redirectPurchase) {
            return(
                <Redirect to='/cart'/>
            )
        } else if(redirectLogin){
            return(
                <Redirect to='/login'/>
            )
        }
         else {
            return(
                <div className="container full-height" style={{marginTop:50}}>
                    <div className="row">
                        {this.putProductsDetail()}
                    </div>
                    <div className='vertical' style={{float: 'center'}}>
                        <Button style={{backgroundColor: 'White', color: 'black', width: 320}} onClick={this.onBtnCart}><b>Add to Cart</b></Button>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCart: (productId, title, price, quantity, total) => dispatch(addCart(productId, title, price, quantity, total))
    }
}



// export default connect(mapStateToProps, { addCart }) (ProductsDetail)
export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail)
