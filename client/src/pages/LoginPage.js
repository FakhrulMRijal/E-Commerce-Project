import React, { Component } from 'react'
import { Login } from '../redux/action'
import { Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import Axios from 'axios';



class LoginPage extends Component {
    state = {
        data : {},
        error : false,
        email : '',
        password: '',
        redirectHome: false,
        isLoading : false 
    }

    componentDidMount(){
        const idUser = localStorage.getItem('@userId')
        console.log('USER', idUser)
    }

    onBtnLogin = async () => {
        const { email, password } = this.state
        await this.props.Login(email, password)
        this.setState({ isLoading : true })
        setTimeout = (() => {
            this.setState({ isLoading : false })
        }, 5)
    }

    render(){
        console.log('State ====', this.state)
        const { email, password, isLoading } = this.state

        const localToken = localStorage.getItem('@token')
        if ((this.props.auth && this.props.auth.token) || localToken) {
            // console.log('Auth==', this.props.auth)
            // console.log('this.props.auth: ', this.props.auth.email)
            this.props.history.push('/')
            return (
                <Redirect to='/' />
            )
        }    
       return(
            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <form className='box'>
                    <div className='p-5'>
                        <h1>Login</h1>
                        <input
                            ref='email'
                            type='text'
                            className='form-control mt-3'
                            placeholder='Input your email'
                            onChange={(e) => this.setState({email: e.target.value})}
                            value={email}
                        />
                        <input
                            ref='password'
                            type='password'
                            className='form-control mt-3'
                            placeholder='Input your password'
                            onChange={(e) => this.setState({password: e.target.value})}
                            value={password}
                        />
                        <Button
                            size='lg'
                            style={{borderRadius:'24px', backgroundColor:'white', color:'black', marginTop: '20px'}}
                            className='form-control login-btn'
                            onClick={this.onBtnLogin}
                            disabled={isLoading}>
                                {isLoading && (
                                    <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                    />
                                )}
                                {isLoading && <span>Please Wait...</span>}
                                {!isLoading && <span>Sign In</span>}
                        </Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3'>
                            Don't have an account? 
                        <Link to='/register'>
                            <span style={{textDecoration : "underline"}}> Create your Acoount </span>
                        </Link>
                        </p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3'>
                        <Link to='/ChangePass'>
                            Forget Password?
                        </Link>
                        </p>
                    </div>
                    </form>

                </div>

            </div>
        )    
      
    }
}

const mapStatetoProps = (state) => {
    console.log('USER', state)
    return{
        auth : state.auth
    }
}
 
export default connect(mapStatetoProps, { Login })(LoginPage);
