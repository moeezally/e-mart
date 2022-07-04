import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Form,Modal} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
    listRentingDetails, createRentingReview,addReply,toggleLike,askQuestion
} from '../actions/rentingActions'
import {RENTING_CREATE_REVIEW_REQUEST, RENTING_CREATE_REVIEW_RESET} from '../constants/rentingConstants'
import {Carousel} from 'react-responsive-carousel'
import {listMyOrders} from "../actions/orderActions";
import Avatar from 'react-avatar';


function EmptyHeart() {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-heart" viewBox="0 0 16 16">
        <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>);
}

function FilledHeart() {
    return (<div style={{color: '#b90000'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-heart-fill"
             viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    </div>);
}


const RentingDetails = ({history, match}) => {
    const [qty, setQty] = useState(10)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [replyText, setReplyText] = useState('');
    const [askTitle, setAskTitle] = useState('');
    const [askQuestions, setAskQuestions] = useState('');

    const dispatch = useDispatch()

    const rentingDetails = useSelector((state) => state.rentingDetails)
    const {loading, error, renting} = rentingDetails

    const replyReducer = useSelector((state) => state.rentingAddReply);
    const likeReducer = useSelector((state) => state.rentingLike);


    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const rentingReviewCreate = useSelector((state) => state.rentingReviewCreate)
    const {
        success: successRentingReview, loading: loadingRentingReview, error: errorRentingReview,
    } = rentingReviewCreate

    const userOrdersReducer = useSelector((state) => state.orderListMy);
    const {orders: myOrders} = userOrdersReducer;

    const [enableReview, setEnableReview] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleModalClose = () => setShowCreateModal(false);
    const handleModalShow = () => setShowCreateModal(true);

    
    useEffect(() => {
        dispatch(listRentingDetails(match.params.id));
    }, [dispatch, replyReducer, likeReducer]);
     
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
    function handleSubmit(e) {
        dispatch(addReply(match.params.id, replyText));
        e.preventDefault();
    }

    function handleToggleLike(rid) {
        dispatch(toggleLike(match.params.id, rid));
    }

    function handleSubmit(e) {
        // post new question
        dispatch(askQuestion({title: askTitle, descriptions: askQuestions}));
        handleModalClose();
        e.preventDefault();
    }


    return (<>
        <Link className='btn btn-light my-3' to='/renting' style={{backgroundColor: '#1D4B2C', color: '#FFFFFF'}}>
            Go Back
        </Link>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (<>
            <Meta title={renting.name}/>
            <Row>
                <Col md={6}>
                    {/* <Carousel> */}
                        <Image src={renting.image} alt={renting.name} fluid/>
                        {/* <Image src={renting.image} alt={renting.name} fluid/>
                        <Image src={renting.image} alt={renting.name} fluid/>
                        <Image src={renting.image} alt={renting.name} fluid/> */}
                    {/* </Carousel> */}
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
                            <Avatar facebookId="100008343750912" size="50" round={true} style={{marginLeft:15,marginTop:-5}}/>
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
                                            maxLength='250'
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

            
        </>
        )}
    </>)    
}

export default RentingDetails
