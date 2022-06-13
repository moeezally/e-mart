import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingEdit = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState(null)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        setAddress(user.address)
        setPhone(user.phone)
        setCity(user.city)
        setPostalCode(user.postalCode)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   if (password !== confirmPassword) {
  //     setMessage('Passwords do not match')
  //   } else {
  //     dispatch(updateUserProfile({ id: user._id, name, email, password,city,address,postalCode,phone }))
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(saveShippingAddress({ address, city,address,city, postalCode,phone }));
    history.push("/payment");
  };

  return (
    <Row>
      <Col md={6} style={{marginLeft:'300px'}}>
        <h2>Edit Shipping Details</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                maxLength='30'
                required
                onChange={(e) => setName(e.target.value.replace(/[^\w\s]/gi,""))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                maxLength='30'
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='address'
                placeholder='Enter address'
                value={address}
                maxLength='50'
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='city'
                placeholder='City'
                maxLength='20'
                // value={city}
                value='Lahore'
                disabled
                required
                onChange={(e) => setCity(e.target.value.replace(/[^\w\s]/gi,""))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='Number'
                placeholder='PostalCode'
                required
                value={postalCode}
                max='999999'
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='tel'
                placeholder='Phone'
                pattern="[0-9]{4}[0-9]{7}"
                // min='11'
                // max='13'
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

           
           {/* <div>  <LinkContainer to='/editpassword'> 
                <Nav.Link > 
                  <i className='fas fa-edit '> Edit Password </i>
                </Nav.Link>
              </LinkContainer></div> */}
              <br/>
              <br/>
            {/* <Form.Group controlId='password'>
            
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Button  variant='primary'type='submit'style={{backgroundColor:'#1D4B2C'}}>
              Continue
            </Button>

{/* <LinkContainer to='/payment'>
                <Nav.Link>
                  <i className='fas fa-shopping-edit'></i> Continue
                </Nav.Link>
              </LinkContainer> */}
          </Form>
        )}
      </Col>
      </Row>
)}
      export default ShippingEdit
