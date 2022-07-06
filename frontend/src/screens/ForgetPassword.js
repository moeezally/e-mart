import React,{useEffect, useState} from 'react'
import { Button, Card,Col ,Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { forgetPassword } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'


const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [question,setQuestion]=useState('')
  const [answer,setAnswer]=useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  
  const dispatch=useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      console.log('====================================');
      console.log(email,password,answer);
      console.log('====================================');
      dispatch(forgetPassword(email,answer,password))
    }
  }
  useEffect(()=>{
forgetPassword()
  },[])

  return (
    <FormContainer>

    {/* <Col md={4}  style={{marginTop:50,marginLeft:350}}> */}

        <h3>Enter Credentials</h3>
    <Form  onSubmit={submitHandler}>
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
        <Form.Group controlId='question'style={{margin:10}}>
          <Form.Label>Security Question</Form.Label>
          <Form.Control
            type='question'
            placeholder='Security Question'
            // value={question}
            value="What is your childhood nickname?"
            // maxLength='15'
            disabled
            onChange={(e) => setQuestion(e.target.value.replace(/[^\w\s]/gi,""))}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='answer'style={{margin:10}}>
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type='answer'
            placeholder='Answer'
            value={answer}
            // value="What is your childhood nickname?"
            // maxLength='15'
            // disabled
            onChange={(e) => setAnswer(e.target.value.replace(/[^\w\s]/gi,""))}
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
        

          


  
    
    <Button type='submit' variant='primary' style={{marginLeft:100}}>Submit</Button>
    </Form>
    {/* </Col> */}
    </FormContainer>
  )
}

export default ForgetPassword