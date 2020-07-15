import React , { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { ChangePassword } from '../redux/action'
import { Button } from 'reactstrap'
// import { Component } from 'react'

class ChangePass extends Component {

    state = {
        data : {},
        email : '',
        password : '',
        redirectLogin : false,
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/users')
        .then((res) => {
            this.setState({
                data : res.data
            })
            console.log('DATA USER ===', this.state.data)
        })
    }
    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    onSubmit = async () => {
        const { email, password } = this.state
        await this.props.ChangePassword(email, password)
        this.setState({ redirectLogin : true })
        // if(email !== getEmail)
    }
    render(){
        let { redirectLogin } = this.state
        if(redirectLogin){
            this.props.history.push('/login')
            return(
                <Redirect to='/login'/>
            )
        } else {
            return(
                <div className='container'>
                    <div className='d-flex justify-content-center'>
                        <form className='box'>
                        <div className='p-5'>
                        <h1 style={{textAlign:"center"}}>Change Password!</h1>
                            <input type='text' 
                            ref='email' 
                            className='form-control mt-3' 
                            placeholder='Email'
                            onChange={this.onChangeEmail}
                            />
                            <input type='password'
                             ref='password' 
                             className='form-control mt-3' 
                             placeholder='Password'
                             onChange={this.onChangePassword}
                             />
                        
                        </div>
                        <div className='d-flex justify-content-center'>
                        <Button
                            size='lg'
                            style={{borderRadius:'24px', backgroundColor:'white', color:'black', marginTop: '20px'}}
                            className='form-control login-btn'
                            onClick={this.onSubmit}
                        >
                            Confirm New Password
                        </Button>
                        </div>
                        </form>
                    </div>
    
                </div>
            )
        }
    }
}

const mapStatetoProps = (state) => {
    return{
        auth : state.auth
    }
}



export default connect(mapStatetoProps, { ChangePassword })(ChangePass)