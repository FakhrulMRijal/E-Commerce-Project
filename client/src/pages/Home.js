import React, { Component } from 'react';
import Axios from 'axios';
// import ProductsCard from '../components/ProductsCard'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
  } from 'reactstrap';
  import { Link } from 'react-router-dom'

class Home extends Component {

    state = {
        data : [],
        search : '',
        sortType : 'asc',
        dropdownOpen : false,
    }

    componentDidMount(){
        Axios.get(`http://localhost:5000/products/`)
            .then((res) => {
                this.setState({data: res.data})
                console.log('DATA===', res.data)
            })
            .catch((err) => {
                console.log('Error : ' + err)
            })
    }



    productsCard = () => {
        let { data, search } = this.state

        let filterProducts = this.state.data.filter(
            (product) => {
                return (
                    product.title.indexOf(search) !== -1 ||    
                    product.title.toLowerCase().indexOf(search) !== -1 || 
                    product.category.toLowerCase().indexOf(search) !== -1 || 
                    product.category.indexOf(search) !== -1 ||
                    product.price.toLocaleString().indexOf(search) !== -1 ||
                    product.detail.indexOf(search) !== -1
                ) 
            }
        )
        console.log('data,', this.state.data)
        return filterProducts.map((val, index) => {
            // console.log('ID', val._id)
            return(
            <div className='col-4 custom-card' key={index}>
                <div className="mt-5" key={index + 4} style={{marginBottom: 90, marginLeft:300, marginRight: 350}}>
                <Card body outline color="secondary" style={{width: "300px", cursor:"pointer"}}>
                <Link to={`/ProductsDetail/${val._id}`} >
                <CardImg top width="100%" src={val.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{val.title}</CardTitle>
                    <CardSubtitle>Rp. {val.price.toLocaleString()}</CardSubtitle>
                    <Button style={{backgroundColor: 'White', color: 'black', width: 100}}>
                    <Link to={`/ProductsDetail/${val._id}`} style={{color : 'black'}}>
                    Detail
                    </Link>
                    </Button>
                </CardBody>
                </Link>
                </Card>
                </div>
            </div>
            )
        })
    }

    toggle = () => {
        const currentState = this.state.dropdownOpen;
        this.setState({ dropdownOpen: !currentState });
    };

    onSearch = (e) => {
        this.setState({ search: e.target.value });
        console.log('SEARCH==', e.target.value)
      };

    onSort = (sortType) => {
        let filterPrice = this.state.data
        
        filterPrice.sort((a, b)=> {
            let isReversed = (sortType === 'asc') ? 1 : -1;
            a.title.localeCompare(b.title)
            if(isReversed){
                this.setState({sortType})
                return isReversed * a.price.toLocaleString().localeCompare(b.price.toLocaleString())
            } else {
                return isReversed * a.title.localeCompare(b.title)
            }
        })
    }  
    

    render(){
        console.log('USERID====: ', localStorage.getItem('@userId'))
        // const { search, data, sortType } = this.state
        // console.log('DATA====>', data.name)
        return(
            <div>
                <div style={{marginBottom : 50, textAlign : 'center'}}>
                    <input
                    value={this.state.search}
                    placeHolder='Search...'
                    onChange={this.onSearch}
                    />
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Sort price
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={() => this.onSort('asc')}>Lowest Price</DropdownItem>
                            <DropdownItem onClick={() => this.onSort('desc')}>Highest Price</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/* <button value={this.state.sortType} onClick={() => this.onSort('asc')} onChange={this.onSort}>ASC</button>
                    <button onClick={() => this.onSort('desc')}>DSC</button>     */}
                </div>
            <div className='row justify-content-center'>
                {this.productsCard()}
            </div>
            </div>
        )
    }
}

export default Home