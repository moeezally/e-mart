import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
 listBlogDetails,
 createBlogReview
} from '../actions/blogActions'
import { BLOG_CREATE_REVIEW_RESET} from '../constants/blogConstants'

const BlogDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const blogDetails = useSelector((state) => state.blogDetails)
  const { loading, error, blog } = blogDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const blogReviewCreate = useSelector((state) => state.blogReviewCreate)
  const {
    success: successBlogReview,
    loading: loadingBlogReview,
    error: errorBlogReview,
  } = blogReviewCreate

  useEffect(() => {
    if (successBlogReview) {
      setRating(0)
      setComment('')
    }
    if (!blog._id || blog._id !== match.params.id) {
      dispatch(listBlogDetails(match.params.id))
      dispatch({ type: BLOG_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successBlogReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createBlogReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/blogs'  style={{backgroundColor:'#1D4B2C' ,color:'#FFFFFF'}}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={blog.name} />
          <Row>
            <Col md={7}>
              <Image src={blog.image} alt={blog.name} fluid />
            </Col>
            <Col md={1}></Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 style={{marginTop:120}}>{blog.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* <Rating
                    value={blog.rating}
                    text={`${blog.numReviews} reviews`}
                  /> */}
                </ListGroup.Item>
                {/* <ListGroup.Item>Price: {product.price}PKR</ListGroup.Item> */}
                
                {/* <ListGroup.Item>
                  Care: {product.care}
                </ListGroup.Item> */}
              </ListGroup>
            </Col>
            {/* <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{blog.price}PKR</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {blog.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {blog.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(blog.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={blog.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col> */}
          </Row>

          <Row>
            <br/>
            
            <br/>
          <Col md={7}>
          <h1>Description</h1>
          <hr/>
                   
                  {blog.description}
                  </Col>
                  <Col md={1}>  </Col>
            <Col md={4}>
              <h2>Comments</h2>
              {blog.reviews.length === 0 && <Message>No Q/As</Message>}
              <ListGroup variant='flush'>
                {blog.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    {/* <Rating value={review.rating} /> */}
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                )
                )
                }
                <ListGroup.Item>
                  <h2>Write your Opinion</h2>
                  {successBlogReview && (
                    <Message variant='success'>
                      Opinion submitted successfully
                    </Message>
                  )}
                  {loadingBlogReview && <Loader />}
                  {errorBlogReview && (
                    <Message variant='danger'>{errorBlogReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        {/* <Form.Label>Rating</Form.Label> */}
                        {/* <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control> */}
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingBlogReview}
                        type='submit'
                        variant='primary'style={{backgroundColor:'#1D4B2C'}}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default BlogDetails
