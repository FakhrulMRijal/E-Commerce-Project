import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";
import ChangePass from './pages/ChangePass'
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsDetail from './pages/ProductsDetail';
import LoginPage from './pages/LoginPage';
import Cart from './pages/Cart'
import History from './pages/History'
import { connect, Provider } from 'react-redux'
// import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './store'
import Nodemailer from './pages/Nodemailer';




class App extends Component {

  componentDidMount(){
    
    const { token } = this.props
    console.log(this.props.auth)
    if (token && token.length > 0) {
      localStorage.getItem(token)
    }
  }

  render(){
    const idUser = localStorage.getItem('@userId')
    return (
        <div>
          <Provider store={store}>
           <BrowserRouter>
              <Router>
                <Navbar />
                <Switch>
                  <Route path='/' component={Home} exact/>
                  <Route path='/ProductsDetail/:productId' component={ProductsDetail} />
                  <Route path='/login' component={LoginPage}/>
                  <Route path='/ChangePass' component={ChangePass}/>
                  <Route path='/register' component={RegisterPage} />
                  <Route path='/cart/:cartId' component={Cart}/>
                  <Route path='/nodemailer'component={Nodemailer}/>
                  <Route path='/history/:historyId' component={History}/>
                </Switch>
              </Router>
            </BrowserRouter>
          </Provider>
        </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return{
      auth : state.auth
  }
}

export default connect(mapStatetoProps, null)(App);

