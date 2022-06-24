import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState(null)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      
      dispatch(register(name, email, password,address,city,postalCode,phone))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Col md={10}>
      <Card>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'style={{margin:10}}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            maxLength='30'
            onChange={(e) => setName(e.target.value.replace(/[^\w\s]/gi,""))}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'style={{margin:10}}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            maxLength='30'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='address'style={{margin:10}}>
          <Form.Label>Enter Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter address'
            value={address}
            maxLength='50'
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'style={{margin:10}}>
          <Form.Label>Enter City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter city'
            // value={city}
            value='Lahore'
            maxLength='20'
            disabled
            onChange={(e) => setCity(e.target.value.replace(/[^\w\s]/gi,""))}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'style={{margin:10}}>
          <Form.Label>Enter Postal Code</Form.Label>
          <Form.Control
            type='Number'
            placeholder='Enter postalCode'
            value={postalCode}
            max='999999'
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'style={{margin:10}}>
          <Form.Label>Enter Phone Number</Form.Label>
          <Form.Control
            type='tel'
            placeholder='Enter Phone'
            value={phone}
            pattern="[0-9]{4}[0-9]{7}"
            onChange={(e) => setPhone(e.target.value.replace(/[^\w\s]/gi,""))}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'style={{margin:10}}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            maxLength='15'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'style={{margin:10}}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            maxLength='15'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'style={{marginLeft:150,backgroundColor:'#1D4B2C'}}>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col style={{marginLeft:200}}>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
      </Card>
      </Col>
    </FormContainer>
  )
}

export default RegisterScreen
