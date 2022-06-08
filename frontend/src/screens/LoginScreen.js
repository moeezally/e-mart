import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col,Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  

  return (
    <FormContainer>
      <h1 style={{marginLeft:20}}>Sign In</h1>
      <Col md={10} >
      <Card  >
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <br/>
        <Form.Group controlId='email'style={{margin:10}}>
          <Form.Label >Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            maxLength='30'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        

        <Form.Group controlId='password'style={{margin:10}}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            maxLength='15'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'style={{backgroundColor:'#1D4B2C',marginLeft:150}}>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col style={{marginLeft:200}}>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >
            Register
          </Link>
        </Col>
      </Row></Card>
      </Col>
    </FormContainer>
  )
}

export default LoginScreen
