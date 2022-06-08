import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import LinesEllipsis from 'react-lines-ellipsis'

const Renting = ({ renting }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/rentings/${renting._id}`}>
        <Card.Img src={renting.image} variant='top' style={{width:225,height:200}}/>
      </Link>

      <Card.Body>
        <Link to={`/renting/${renting._id}`}>
          <Card.Title as='div'>
            <strong>{renting.name}</strong>
          </Card.Title>
        </Link> 
        <Card.Text as='div'>
          <strong>Tool:{renting.description}</strong>
        </Card.Text>
        <br/>


        <Card.Text as='h4'>Rs.{renting.price}/sq ft
        
        </Card.Text>
        {/* <Card.Text as='div'>
          /sq ft
        </Card.Text> */}
        <Card.Text as='div'>
          <Rating
            value={renting.rating}
            text={`${renting.numReviews} reviews`}
          />
        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Renting
