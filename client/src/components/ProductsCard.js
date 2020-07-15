import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';


const productsCard = (props) => {
  // console.log('props: ', props)
  return (
    <div className="mt-2" key={props.id} style={{marginBottom: 90, marginLeft:400, marginRight: 350}}>
      <Card body outline color="secondary" style={{width: "300px", cursor:"pointer"}}>
        <Link to={`/ProductsDetail/${props.id}`} >
        <CardImg top width="100%" src={props.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>Rp. {props.price.toLocaleString()}</CardSubtitle>
          <Button style={{backgroundColor: 'White', color: 'black', width: 100}}>
            <Link to={`/ProductsDetail/${props.id}`} style={{color : 'black'}}>
            Detail
            </Link>
          </Button>
        </CardBody>
        </Link>
      </Card>
    </div>
  );
};

export default productsCard;
