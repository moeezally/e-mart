import React, {useEffect, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Modal, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listOrders, deliverOrder} from '../actions/orderActions'
import {Link} from 'react-router-dom'

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders} = orderList;

    const orderDeliverReducer = useSelector((state) => state.orderDeliver);
    const {loading: deliver_loading, success: deliver_success} = orderDeliverReducer;

    const [deliverOrderObj, setDeliverOrderObj] = useState(undefined);
    const handleDeliverClose = () => setDeliverOrderObj(undefined);
    const handleDeliverShow = (order) => setDeliverOrderObj(order);

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, deliver_success])

    function handleDeliverUpdate(e) {
        dispatch(deliverOrder(deliverOrderObj));
        handleDeliverClose();
        e.preventDefault();
    }

    return (
        <>
            <Modal show={deliverOrderObj !== undefined} onHide={handleDeliverClose} centered>
                <Form onSubmit={handleDeliverUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mark as Deliver</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>If the order is delivered to the user, mark it as delivered otherwise close this dialog</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeliverClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" style={{backgroundColor: '#1D4B2C'}}>
                            Mark Delivered
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            
            <Link to='/' className='btn btn-light my-3' style={{backgroundColor: '#1D4B2C', color: '#FFFFFF'}}>
                Go Back
            </Link>
            <h1 style={{textAlign: 'center'}}>Orders</h1>
            {loading || deliver_loading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table variant='outline-success' className='table-sm table-bordered'>
                    <thead style={{backgroundColor: '#1D4B2C'}}>
                    <tr style={{color: '#FFFFFF'}}>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>Rs.{order.totalPrice}</td>
                            <td>
                                {/* {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (

                                    <i className='fas fa-times' style={{color: 'red'}}/>
                                )} */}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)

                                ) : (
                                    <div style={{cursor: 'pointer'}} onClick={() => handleDeliverShow(order)}>
                                        <i className='fas fa-times' style={{color: 'red'}}/>
                                    </div>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
