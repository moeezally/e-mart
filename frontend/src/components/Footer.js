import React from 'react'
import { Container, Row, Col,Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
       <Navbar  variant='dark' expand='lg' collapseOnSelect style={{backgroundColor:'#1D4B2C'}}>
      <Container>
        
        {/* <Row style={{height:100,backgroundColor:'red'}}> */}
          <Col className='text-center py-3' style={{color:'#FFFFFF'}}>Contact no:0333-1234567</Col>
          <Col className='text-center py-3' style={{color:'#FFFFFF'}}>Copyright &copy; Garden Mart</Col>
          <Col className='text-center py-3' style={{color:'#FFFFFF',textAlign:'right' }} >Address:Office no. ABC,Lahore</Col>
        <Link to='/aboutus' style={{color:'#FFFFFF',textAlign:'right' }}>
           <Col >About Us</Col>
           </Link>
        {/* </Row> */}
      </Container>
      </Navbar>
    </footer>
  )
}

export default Footer
