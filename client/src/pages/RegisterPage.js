import React, { Component } from 'react'
// import { Register } from '../redux/action'
import zxcvbn  from 'zxcvbn';
import { Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { Loader } from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Login } from '../redux/action'
import PhoneInput from 'react-phone-number-input'
import Axios from 'axios';



class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {},
            username : '',
            email: '',
            password: '',
            phone: 0,
            type: 'password',
            score: 'null',
            redirectLogin : false,
            showPassword : true
        }
        this.showHide = this.showHide.bind(this);
        this.passwordStrength = this.passwordStrength.bind(this);
      }
    
    onChangeUsername = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          type: this.state.type === 'password' ? 'input' : 'password'
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

    passwordStrength = (e) => {
        if(e.target.value === ''){
          this.setState({
            score: 'null'
          })
        }
        else{
          var pw = zxcvbn(e.target.value);
          this.setState({
            score: pw.score
          });      
        }
    
      }

    onChangePhone = (e) => {
        this.setState({
            phone : parseInt(e.target.value)
        })
    }

    onSubmit = () => {

        const newUser = {
            username : this.state.username,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        }

        Axios.post('http://localhost:5000/users/register', newUser)
            .then(res => console.log('DATA REGISTER ===',res.data))
            this.setState({
                username : '',
                email: '',
                password: '',
                phone: 0 + 0
            }) 

        if(newUser.username === '' || newUser.email === ''|| newUser.password === '' || newUser.phone === ''){
            this.setState({redirectLogin : false})
            alert('Please fill all fields :)')
        } else if(newUser) {
            this.setState({redirectLogin : true})
            // localStorage.setItem('@registerId',)
        } 
    }

    render(){
        let {redirectLogin} = this.state
        if(redirectLogin){
            return(
                <Redirect to='/login'></Redirect>
            )
        }
        return(
            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <form className='box'>
                     <div className='p-5'>
                    <h1 style={{textAlign:"center"}}>Register!</h1>
                        <input type='text'
                         ref='username'
                          className='form-control mt-3'
                          placeholder='Create your username'
                          onChange={this.onChangeUsername}
                          />
                        <input type='text' 
                        ref='email' 
                        className='form-control mt-3' 
                        placeholder='Email'
                        onChange={this.onChangeEmail}
                        />
                        <label className="form-control mt-3">
                        <input type={this.state.type} className="password__input" placeholder="password" onChange={this.onChangePassword}/>
                        <span className="password__show" onClick={this.showHide} style={{marginLeft : 3}}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                        <span className="password__strength" data-score={this.state.score} />
                        </label>
                        <input type="tel" 
                        ref='phone' 
                        className='form-control mt-3' 
                        placeholder='Confirm phone number'
                        pattern="[0-9]{3} [0-9]{3} [0-9]{4}" 
                        maxlength="11"
                        minLength="5"
                        onChange={this.onChangePhone}
                        />
                        <Button size='lg' style={{borderRadius:'24px', backgroundColor:'white', color:'black'}} 
                        onClick={this.onSubmit} 
                        className='form-control mt-3 login-btn pb-1' >Sign Up</Button>
                    
                     
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3 desc'>
                            Already have an Account? 
                            <Link to='/login'>
                                <span style={{textDecoration : "underline"}}> Login! </span>
                            </Link>
                        </p>
                    </div>
                    </form>
                </div>

            </div>
        )
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        username : auth.username
    }
}

export default connect(mapStatetoProps, { Login })(RegisterPage)

