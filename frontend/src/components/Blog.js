import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import LinesEllipsis from 'react-lines-ellipsis'

const Blog = ({ blog }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      
      <Link to={`/blog/${blog._id}`}>
        <Card.Img src={blog.image} variant='top' style={{width:225,height:200}} />
      </Link>

      <Card.Body>
        <Link to={`/blog/${blog._id}`}>
            
          <Card.Title as='div'>
            <strong>{blog.name}</strong>
          </Card.Title>
        </Link>

        <LinesEllipsis
         
        text={blog.description}
        maxLine='3'
        ellipsis='...'
  trimRight
  basedOn='letters'
        />
        <br/>

        {/* <Card.Text as='div'>
          <Rating
            value={blog.rating}
            text={`${blog.numReviews} reviews`}
          />
        </Card.Text> */}

       
      </Card.Body>
    </Card>
  )
}

export default Blog
