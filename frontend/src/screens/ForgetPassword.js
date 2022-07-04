import React from 'react'
import { Button, Card,Col ,Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const ForgetPassword = () => {

    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  return (
    <Col md={4}  style={{marginTop:50,marginLeft:350}}>
        <h3>Enter Credentials</h3>
    
    <Form.Label>Email Address</Form.Label>
    <Form >
    <Form.Group controlId='email'>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                
              ></Form.Control>
            </Form.Group>
            </Form>

          


  
    
    <Link to ='/newpassword'>
    <Button variant='primary' style={{marginLeft:100}}>Next</Button>
    </Link>
    
    </Col>
  )
}

export default ForgetPassword