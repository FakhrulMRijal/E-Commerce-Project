import React, { Component, useState } from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Connect, connect } from 'react-redux'
import { ClearMail } from "../redux/action";


class Nodemailer extends Component{

    state = {
        data : {},
        email : '',
        message : '',
        redirectHome : false
    }

   onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

   onChangeSuggest = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    onSubmit = () => {

        const submitSuggest = {
            email : this.state.email,
            message : this.state.message
        }

        Axios.post('http://localhost:5000/users/message/', submitSuggest)
        .then(res => console.log('SUGGEST ===',res.data))
            this.setState({
                email: '',
                message: '',
                redirectHome: true
            })    

            if(submitSuggest.email === '' || submitSuggest.message === ''){
                alert('Please suggest my portfolio')
                this.setState({
                    redirectHome : false
                })
            } else {
                alert('Thank you for your suggest')
                this.setState({
                    redirectHome : true
                })
            }
           
    }

    render(){
        const emailUser = localStorage.getItem('@email')
        let { redirectHome } = this.state
        if(redirectHome){
            return(
                <Redirect to='/'/>
            )
        } else {
            return(
                <div>
                    <h1 style={{textAlign : "center"}}>Suggesstions for my portfolio</h1>
                    <Form style={{marginTop : 85}}>
                    <FormGroup row>
                        <Label sm={2}>email</Label>
                        <Col sm={10}>
                        <Input type="text" placeholder='Input your email' onChange={this.onChangeEmail}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Suggesstions</Label>
                        <Col sm={10}>
                        <Input type="textarea" placeholder="Suggest about my portfolio" onChange={this.onChangeSuggest}/>
                        </Col>
                    </FormGroup>
                    <Button style={{marginLeft : 20, marginTop : 50}} onClick={this.onSubmit}>
                        Confirm your suggesstions
                    </Button>
                    </Form>
                </div>
            )
        }
    }
}

export default connect(ClearMail) (Nodemailer)