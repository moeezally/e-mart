import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button,Modal, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import ImageGallery from 'react-image-gallery'
import {Carousel} from 'react-responsive-carousel'
import ReactDOM from 'react-dom'
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'
import Avatar from 'react-avatar';

import {
    listProductDetails, createProductReview, createProduct,
} from '../actions/productActions'

import {
    listMyOrders,
} from '../actions/orderActions'

import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
// import ProductCarousel from '../components/ProductCarousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleModalClose = () => setShowCreateModal(false);
    const handleModalShow = () => setShowCreateModal(true);

    const [askTitle, setAskTitle] = useState('');
    const [askQuestion, setAskQuestion] = useState('');

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const userOrdersReducer = useSelector((state) => state.orderListMy);
    const {orders: myOrders} = userOrdersReducer;

    const [enableReview, setEnableReview] = useState(false);

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview, loading: loadingProductReview, error: errorProductReview,
    } = productReviewCreate


// const props = {width: 400, height: 250, zoomWidth: 500, img: "1.jpg"};
// ReactDOM.render(<ReactImageZoom {...props} />, document.getElementById('react-app'));

    useEffect(() => {
        if (product !== undefined && product._id !== undefined) {
            dispatch(listMyOrders());
        }
    }, [product]);

    useEffect(() => {
        let flag = false;
        if (myOrders && myOrders.length > 0) for (let order of myOrders) if (order['isDelivered']) for (let item of order['orderItems']) if (item['product'] === product['_id']) flag = true;
        setEnableReview(flag);
    }, [myOrders])

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}&type=product`)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, comment,
        }))
    }
    function handleSubmit(e) {
        // post new question
        dispatch(askQuestion({title: askTitle, description: askQuestion}));
        handleModalClose();
        e.preventDefault();
    }
//   

    return (<>
        {/* <ProductCarousel/> */}
        <Link className='btn btn  my-3' to='/' style={{backgroundColor: '#1D4B2C', color: '#FFFFFF'}}>
            Go Back
        </Link>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (<>
            <Meta title={product.name}/>
            <Row>
                <Col md={5}>


                    <Carousel showArrows={true}>

                        <Image src={product.image} alt={product.name} fluid/>

                        <Image src={product.image2} alt={product.name} fluid/>
                        <Image src={product.image3} alt={product.name} fluid/>
                        <Image src={product.image4} alt={product.name} fluid/>


                    </Carousel>


                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price:Rs. {product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Care: {product.care}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>Rs.{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (<ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)}

                            <ListGroup.Item>
                                <Button style={{backgroundColor: '#1D4B2C'}}
                                        onClick={addToCartHandler}
                                        className='btn-block'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
           
            <Row>
                <Col md={6}>

                    <h2>Reviews</h2>

                    {product.reviews.length === 0 && <Message>No Reviews</Message>}

                    <ListGroup variant='flush' >
                        {product.reviews.map((review) => (<ListGroup.Item key={review._id}>
                            
                            <strong>{review.name}</strong>
                            <Avatar facebookId="100008343750912" size="50" round={true} style={{marginLeft:15,marginTop:-5}}/>
                           
              
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {successProductReview &&  (<Message variant='success'>
                                Review submitted successfully
                            </Message>)}
                            {loadingProductReview && <Loader/>}
                            {errorProductReview && (<Message variant='danger'>{errorProductReview}</Message>)}
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
                                        style={{backgroundColor: '#1D4B2C'}}
                                        disabled={loadingProductReview}
                                        type='submit'
                                        variant='primary'
                                        disable="userInfo.isAdmin"
                                    >
                                        Submit
                                    </Button>
                                </Form> : <div>
                                    <Message>
                                        Your items need to be delivered in order for you to write reviews.
                                    </Message>
                                </div>) :

                                (<div>
                                    {!userInfo || !userInfo.isAdmin ? <Message>
                                        Please <Link to='/login'>sign in</Link> to write a review{''}
                                    </Message> : <Message>Admin cannot write a review.</Message>}
                                </div>)


                            }

                            {/* {userInfo.isAdmin ?(
                  <Message>Admin cannot write a review.</Message>
                ):null} */}
                            <br/>

                            {/* {userInfo &&userInfo.isAdmin && (
                  <Message>Admin cannot post a review</Message>
                )


                } */}


                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>)}
    </>)
}


export default ProductScreen
