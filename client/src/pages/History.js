import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';

const History = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [orders, setOrders] = useState([])
  const [detailOrder, setDetailOrder] = useState({})

  const toggle = () => setModal(!modal);


  useEffect(() => {
    const userId = localStorage.getItem('@userId')

    Axios.get(`http://localhost:5000/orders?userId=${userId}`)
      .then((items) => {
        setOrders(items.data.data)
        // console.log('ORDER=', items.data.data)
      })
      .catch((err) => {
        console.log('Sorry')
      })
  }, [])

  useEffect(() => {
    if (!modal) {
      setDetailOrder({})
    }
  }, [modal])

  // console.log('HISTORY==', item.items )


  let itemsInHistory = []
  let renderModal = []
  // let detailHistory = []
  Object.keys(orders).forEach(function (item, index) {
    // console.log('ORDERS=====', orders[item].items)
    // localStorage.setItem('@historyId', orders[index]._id)
    // if(orders[item]){
    //   detailHistory.push(orders[item].items)
    // } else {
    //   return orders[item].items
    // }
    itemsInHistory = orders.map((item, index) => {
      console.log('HISTORY INDEX===', item)
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{item.createdAt}</td>
          <td>{item.payment}</td>
          <td>Rp. {item.total.toLocaleString()}</td>
          <td>
            <Button
              onClick={() => {
                setModal(!modal)
                setDetailOrder(item)
              }}
              style={{ backgroundColor: '#5582EB' }}
            >
              Detail
            </Button>
          </td>
        </tr>
      )
    })
    console.log('===setDetailOrder', detailOrder);
    // console.log('ITEMS===', orders[item].items)
    if (detailOrder.items) {
      renderModal = detailOrder.items.map((val, index) => {
        // console.log('DETAIL==', orders[index].items)
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{val.title}</td>
            <td>{val.price}</td>
            <td>{val.quantity}</td>
          </tr>
        )
      })
    }
  });


  return (
    <div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Date Transaction</th>
              <th>Type Payment</th>
              <th>total</th>
              <th>items</th>
            </tr>
          </thead>
          <tbody>
            {itemsInHistory}
            <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader>Transaction History</ModalHeader>
              <ModalBody>
                <Table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderModal}
                  </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </Modal>
          </tbody>
        </Table>
        <Table>
          <tr>
            <th>No</th>
          </tr>
        </Table>
      </div>
    </div>
  );
}

export default History
{/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
<Modal isOpen={modal} toggle={toggle} className={className}>
  <ModalHeader toggle={toggle}>Modal title</ModalHeader>
  <ModalBody>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
    <Button color="secondary" onClick={toggle}>Cancel</Button>
  </ModalFooter>
</Modal> */}