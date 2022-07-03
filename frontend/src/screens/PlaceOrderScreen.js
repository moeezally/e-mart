import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card ,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import StripeCheckout from "react-stripe-checkout";
import { format } from 'morgan'

const PlaceOrderScreen = ({ history }) => {
  const sgMail=require('@sendgrid/mail')
  // const sgMail=require('@pepipost/mail')
  sgMail.setApiKey('SG6e232c0ee1310eea2d7423ece17e91e2')
  // sgMail.setApiKey('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')

  const onComplete=(fields)=>{
    const message={
      to:'sawana6405@lockaya.com',
      from:fields.email,
      subject:fields.subject,
      html: `
      <p><strong>Name:
      </strong>
      ${fields.name}</p>
      <p>${fields.subject} </p>
      `
    }
    sgMail.send(message).then(()=>{
      format.resetfields()
      console.log('Email Sent')
    })
    .catch((error)=>{
      console.log('Error',error)
    })
  }





  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 100 : 100)
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.taxPrice = 0
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        
      })
    )
  }
  function onToken(token){
    dispatch(
          createOrder({
            token,
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.productprice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            isPaid:cart.paymentMethod=="CreditCard" ? true:false
            
          })
        
        );
        console.log(token)



  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {/* {cart.shippingAddress.country} */}
              </p>
              <p>
                <strong>Contact:</strong>
                {cart.shippingAddress.phone}


              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = Rs.{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>

              </ListGroup.Item>
              <Form onClick={onComplete}>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs.{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item> */}
                {/* <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{cart.taxPrice}</Col>
                </Row> */}
              {/* </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>


              {/* <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item> */}

              {cart.paymentMethod=='CreditCard' ?(
              <StripeCheckout
        token={onToken}
        // shippingAddress={cart.shippingAddress.address,
        // cart.shippingAddress.city,
        // cart.shippingAddress.postalcode,
        // cart.shippingAddress.country}
        // shippingAddress
        amount={cart.totalPrice*100}
        currency='PKR'
        stripeKey="pk_test_51L1FqRSEhdTePo5yWy3pZMXcn9AgQ6RQoUFsfi8Q1rH6Kln2e0iPtsWZ6DG7sIcmW5Fy5JUDjTr3m7mbgPoxeBwg00iOSeA4Gx"
      > 
      <Button style={{textAlign:'center',backgroundColor:'#1D4B2C'}}
      
                type="button"
                className="btn"
                disabled={cart.cartItems === 0}
                // onClick={placeOrderHandler}
              >
                Place Order
              </Button>
      </StripeCheckout>):(
        <Button style={{textAlign:'center',backgroundColor:'#1D4B2C'}}
                type="button"
                className="btn"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
                htmltype='submit'
                // onClick={onToken}
              >
                Place Order
              </Button>
      )
      
      }
      <br/>
      <br/>

      <div><strong style={{color:'red'}}>Note:</strong>All prices are inclusive of taxes.*</div>
              
              {/* <ListGroup.Item> */}
                {/* <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button> */}
              {/* </ListGroup.Item> */}
              </Form>
            </ListGroup>
            
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
