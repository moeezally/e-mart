import React from "react";
import ReactPlayer from "react-player";
import Card from 'react-bootstrap/Card'
import { Row,Col } from "react-bootstrap";
 function Videos() {

  return (

    <>
    <div className="App">
      <h1 style={{textAlign:'center'}} >Videos</h1>
      <hr/>
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=3FGxEYWAPf8"     /> */}

{ <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 1 }).map((_, idx) => (
    <Col md={5} style={{marginLeft:-100}}>
      {/* <Card > */}
        <Card.Body>
        <ReactPlayer url="https://www.youtube.com/watch?v=3FGxEYWAPf8" controls={true}/>
        <br />
        <ReactPlayer url="https://www.youtube.com/watch?v=eySTo2GgvoY" controls={true}/>
      
        </Card.Body>

        <Card.Body>
        <ReactPlayer url="https://www.youtube.com/watch?v=KFw5yBYtDnA" controls={true}/>
        <br />
        <ReactPlayer url="https://www.youtube.com/watch?v=B0DrWAUsNSc" controls={true}/>
        </Card.Body>
      {/* </Card> */}
    </Col>
    
  ))}
<Col md={2}></Col>
{Array.from({ length: 1 }).map((_, idx) => (
    <Col md={5}>
      {/* <Card style={{marginRight:'-200px'}}> */}
        <Card.Body >
        <ReactPlayer url="https://www.youtube.com/watch?v=DXwF_jVtwFU" controls={true}/>
        <br />
        <ReactPlayer url="https://www.youtube.com/watch?v=eLACnABG2LM" controls={true}/>
        </Card.Body>
        <Card.Body>
        <ReactPlayer url="https://www.youtube.com/watch?v=pLQuIuokP6Q" controls={true}/>
        <br />
        <ReactPlayer url="https://www.youtube.com/watch?v=nccV__8Pb9U" controls={true}/>
        </Card.Body>
      {/* </Card> */}
      
    </Col>
   
  ))}
 
 

</Row>

   }
    </div>
    </>
  );
}

export default Videos