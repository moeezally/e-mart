import React from 'react'
import { Link,Route } from 'react-router-dom'
import { Card,Navbar } from 'react-bootstrap'
import Rating from './Rating'
import SearchBox from './SearchBox'
import LinesEllipsis from 'react-lines-ellipsis'

const Product = ({ product }) => {
  return (

    
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'style={{width:225,height:200}}/>
        {/* <Card.Img src={product.image} variant='top' /> */}
      </Link>
     

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
            <br/>
                    </Card.Title>
        </Link>
        {/* <Card.Text as ='div'  style={{whiteSpace:'nowwrap',width:'200px',overflow:'hidden',textOverflow:'clip'}}> */}
       <LinesEllipsis
         
        text={product.description}
        maxLine='3'
        ellipsis='...'
  trimRight
  basedOn='letters'
        />
        <br/>

        {/* </Card.Text> */}

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>Rs.{product.price}</Card.Text>
      </Card.Body>
      
    </Card>
    
  )
}

export default Product
