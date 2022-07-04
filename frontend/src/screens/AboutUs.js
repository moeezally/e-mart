import React from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,Card } from 'react-bootstrap'


const AboutUs = () => {
  return (
    <>
    <h1 style={{textAlign:"center"}}>About Us</h1>
    <div>
    <Link to="/">
        <p style={{textAlign:"center"}}>Home</p>
    </Link>
    <Link to="/aboutus">
        <p style={{textAlign:"center"}}>About Us</p>
    </Link>
    </div>

    <Row>
        <Col md={6}>
            <div>
            Welcome to Garden Mart, your number one source for all things [product, ie: plants,tools,fertilizers and seeds]. We're dedicated to giving you the very best of product, with a focus on three characteristics, ie: dependability, customer service and uniqueness.
            Founded in 2022 by Team Garden Mart, the store has come a long way . When we first started out, our passion for gardening products drove us to [action, ie: do intense research, quit our day job], and gave us the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over , and are thrilled to be a part of the adjective, ie: quirky, eco-friendly, fair trade wing of the industry.
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            <br/>
            Sincerely,
            <br/>
            <br/>
            <h6>Team Garden Mart</h6>
            </div>

        </Col>
        <Col md={6}>
            <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" width="500" height="300"/>
        </Col>

    </Row>
    <hr/>
    <h1 style={{textAlign:"center"}} >Our Team</h1>
    
    {/* <Card className='my-3 p-3 rounded'> */}
    <Row>
        <Col md={4}>
        <div className="pic">
            {/* <Image src="uploads\Mubashir.jpg " width="200" height="217" style={{marginLeft:100}} /> */}
            <div className='text'>
                <p style={{fontSize:18}}>Mubashir A. Faheem</p>
                <p style={{fontSize:10}}>MERN Developer</p>
                </div>
         
    </div>
    </Col>
    <Col md={4}>
    <div className="pic3">
            <div className='text3'>
            <p style={{fontSize:18}}>Misbah Mansoor</p>
                <p style={{fontSize:10}}>JS Learner</p>
                </div>
         
    </div>
    </Col>

    <Col md={4}>
    <div className="pic2">
            <div className='text2'>
            <p style={{fontSize:18}}>Mustafa Rathore</p>
                <p style={{fontSize:10}}>Blog Developer</p>
                </div>
         
    </div>
    </Col>

    
        </Row>
        
        
      {/* </Card> */}
      
      


      
    
    </>
  )
}

export default AboutUs