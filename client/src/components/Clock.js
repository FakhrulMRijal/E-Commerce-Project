import React, { Component } from 'react'

class Clock extends Component {
    constructor(){
        super()
        this.state = {
            time : new Date()
        }
    }

    currentTime(){
        this.setState({
            time : new Date()
        })
    }

    componentWillMount(){
        setInterval(()=>this.currentTime(), 1000)
    }

    render(){
        return(
            <h4>{this.state.time.toLocaleString()}</h4>
        )
    }
}

export default Clock