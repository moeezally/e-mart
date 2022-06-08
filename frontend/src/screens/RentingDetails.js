import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
    listRentingDetails, createRentingReview
} from '../actions/rentingActions'
import {RENTING_CREATE_REVIEW_REQUEST, RENTING_CREATE_REVIEW_RESET} from '../constants/rentingConstants'
import {Carousel} from 'react-responsive-carousel'
import {listMyOrders} from "../actions/orderActions";

const RentingDetails = ({history, match}) => {
    const [qty, setQty] = useState(10)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const rentingDetails = useSelector((state) => state.rentingDetails)
    const {loading, error, renting} = rentingDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const rentingReviewCreate = useSelector((state) => state.rentingReviewCreate)
    const {
        success: successRentingReview, loading: loadingRentingReview, error: errorRentingReview,
    } = rentingReviewCreate

    const userOrdersReducer = useSelector((state) => state.orderListMy);
    const {orders: myOrders} = userOrdersReducer;

    const [enableReview, setEnableReview] = useState(false);

    useEffect(() => {
        if (renting !== undefined && renting._id !== undefined) {
            dispatch(listMyOrders());
        }
    }, [renting]);

    useEffect(() => {
        let flag = false;
        if (myOrders && myOrders.length > 0) for (let order of myOrders) if (order['isDelivered']) for (let item of order['orderItems']) if (item['product'] === renting['_id']) flag = true;
        setEnableReview(flag);
    }, [myOrders])

    useEffect(() => {
        if (successRentingReview) {
            setRating(0)
            setComment('')
        }
        if (!renting._id || renting._id !== match.params.id) {
            dispatch(listRentingDetails(match.params.id))
            dispatch({type: RENTING_CREATE_REVIEW_RESET})
        }
    }, [dispatch, match, successRentingReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}&type=renting`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createRentingReview(match.params.id, {
            rating, comment,
        }))
    }

    return (<>
        <Link className='btn btn-light my-3' to='/renting' style={{backgroundColor: '#1D4B2C', color: '#FFFFFF'}}>
            Go Back
        </Link>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (<>
            <Meta title={renting.name}/>
            <Row>
                <Col md={6}>
                    <Carousel>
                        <Image src={renting.image} alt={renting.name} fluid/>
                        <Image src={renting.image} alt={renting.name} fluid/>
                        <Image src={renting.image} alt={renting.name} fluid/>
                        <Image src={renting.image} alt={renting.name} fluid/>
                    </Carousel>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{renting.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={renting.rating}
                                text={`${renting.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: Rs.{renting.price}/sq ft</ListGroup.Item>
                        <ListGroup.Item>
                            Description: {renting.description}
                        </ListGroup.Item>
                        {/* <ListGroup.Item>
                  Care: {renting.care}
                </ListGroup.Item> */}
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>Rs.{renting.price}/sq ft</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {renting.countInStock > 10 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {renting.countInStock > 10 && (<ListGroup.Item>
                                <Row>
                                    <Col>Sq.ft</Col>
                                    <Col>
                                        <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) => {
                                                if (e.target.value > 10) setQty(e.target.value)
                                            }}

                                        >
                                            {[...Array(renting.countInStock).keys()].map((x) => {
                                                if (x >= 9) return (<option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>)
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)}

                            <ListGroup.Item>
                                <Button style={{backgroundColor: '#1D4B2C'}}
                                        onClick={addToCartHandler}
                                        className='btn-block'
                                        type='button'
                                        disabled={renting.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                                <br/>
                                <div><strong style={{color: 'red'}}>Note:</strong>Minimun renting service starts
                                    from 10 sq. ft
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <br/><br/>
            <Row>

                <Col md={6}>
                    <h2>Reviews</h2>
                    {renting.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {renting.reviews.map((review) => (<ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {successRentingReview && (<Message variant='success'>
                                Review submitted successfully
                            </Message>)}
                            {loadingRentingReview && <Loader/>}
                            {errorRentingReview && (<Message variant='danger'>{errorRentingReview}</Message>)}
                            {userInfo && !userInfo.isAdmin ? (enableReview ? <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
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
                                        </Form.Control>
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
                                        disabled={loadingRentingReview}
                                        type='submit'
                                        variant='primary'
                                        style={{backgroundColor: '#1D4B2C'}}
                                    >
                                        Submit
                                    </Button>
                                </Form> : <div>
                                <Message>
                                    Your items need to be delivered in order for you to write reviews.
                                </Message>
                            </div>) : (<div>
                                    {!userInfo || !userInfo.isAdmin ? <Message>
                                        Please <Link to='/login'>sign in</Link> to write a review{''}
                                    </Message> : <Message>Admin cannot write a review.</Message>}
                                </div>)
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>)}
    </>)
}

export default RentingDetails
