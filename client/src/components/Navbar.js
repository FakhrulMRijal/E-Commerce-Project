// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Logout } from '../redux/action/AuthAction'
import { getNumbers } from '../redux//action/getNumbers'
import Clock from './Clock'


const NavBar = (props) => {
  let { token, Logout } = props
  // const [time, setTime ] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onBtnLogout = () => {
    Logout()
    localStorage.removeItem('@token')
    localStorage.removeItem('@userId')
    setIsLoggedIn(false)
  }

  // currentTime()

  useEffect(() => {
    const localToken = localStorage.getItem('@token')
    const localUser = localStorage.getItem('@userId')
    if (localToken && localUser) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // useEffect(() => {
  //   if (time) {
  //     setTime(new Date());
  //   }
  // }, [setInterval(() => currentTime(), 1000)]);

  useEffect(() => {
    getNumbers()
  }, [])
  // useEffect(() => {
  //   ()
  // }, [])


  if (isLoggedIn) {
    const idUser = localStorage.getItem('@userId')
    return (
      <div>
        <Navbar color="light" light expand="md"style={{marginBottom : 100}} >
          <NavbarBrand>
            <Link to="/" >
            <Media src="http://www.logo-designer.co/wp-content/uploads/2013/08/Marketplace-American-Public-Media-APM-Logo-Design-Identity-Little.jpg"
              style={{ width: '200px' }} />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar style={{marginLeft : 55}}>
              <Button style={{backgroundColor : '#d92027'}} href='/login/'onClick={onBtnLogout}>
                Log Out
              </Button>
              <Button style={{backgroundColor : '#0fabbc', width : 55, marginLeft : 25}}>
                <Link to={`/cart/${idUser}`}>
                Cart
                </Link>
              </Button>
              <Button style={{backgroundColor : '#8cba51', width : 75, marginLeft : 25, marginRight : 35 ,color : "white"}}>
                <Link to={`/history/${idUser}`}>
                  History
                </Link>
              </Button>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{marginRight : 150}}>
                Other
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  About
                </DropdownItem>
                <DropdownItem href={`/nodemailer/${idUser}`}>
                  Suggestions
                </DropdownItem>
                <DropdownItem>
                  Wallet
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Clock/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )

  }

  else {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <Media src="http://www.logo-designer.co/wp-content/uploads/2013/08/Marketplace-American-Public-Media-APM-Logo-Design-Identity-Little.jpg"
              style={{ width: '200px' }} />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }, { state } ) => {
if(auth){
  return {
      token: auth.token,
    }
} else if(state){
  return {
    cartProps : state.cartState
  }
}
}

// const ownProps = ({ state }) => {
//   return {
//     cartProps: state.cartState
//   }
// }

export default connect(mapStateToProps, { Logout, getNumbers })(NavBar);




// class Navbar extends Component {
//     render(){
//         return(
//             <nav class="navbar navbar-expand-lg navbar-white bg-light">
//             <div class="collapse navbar-collapse" id="navbarNav">
//                 <img src="https://t4.ftcdn.net/jpg/02/38/04/21/240_F_238042119_GcB0Eh1JHD4wrcZxx3kg2SiArfEtu9l0.jpg" style={{marginLeft: 50, marginRight: 25,width: "125px" }}></img>
//                 <b><Link to ="/">Market</Link></b>
//             </div>
//             <span class="navbar-text">
//                 <ul>
//                 {/* <b style={{marginRight: 20}}><Link to="login">Login</Link></b> */}
//                 <b><Link to="/register">Register</Link></b>
//                 <b style={{marginRight: 20, marginLeft: 20}}>Cart</b>
//                 <b>History</b>
//                 </ul>
//             </span>
//             </nav>

//         )
//     }
// }

// export default Navbar