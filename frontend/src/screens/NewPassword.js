import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col,Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const NewPassword = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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



  useEffect(() => {
    if (!user.email) {
      history.push('/login')
    } else {
      if (user.email ) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
       
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      
    } else {
      history.push('/profile')
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    
    <Row>
      <h2 style={{marginLeft:450}}>New Password</h2>
       <Col md={8}>
        
       
      <Card  style={{marginTop:50,marginLeft:350}} variant="outline-success">
      
      <br/>
    <Col md={12}>
    <Form.Label>Password</Form.Label>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='password'>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                maxLength='15'
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label><strong> Confirm Password</strong></Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                maxLength='15'
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
              </Form.Group>
              <Button  type='submit' variant='primary' style={{backgroundColor:'#1D4B2C',marginLeft:120}}>
              Update
            </Button>
            <br/><br/><br/>
          

            </Form>
    </Col></Card>
    </Col>
      </Row>


  )}

  export default NewPassword
