import React, { useEffect,useState } from 'react'
import { Link,Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,Navbar,Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { Image, ListGroup, Card, Button, Form,LinkContainer } from 'react-bootstrap'
import Meta from '../components/Meta'
import SearchBox from '../components/SearchBox'
import { listProducts } from '../actions/productActions'
import { borderRadius } from '@mui/system'

const HomeScreen = ({ match,history }) => {
  const [qty, setQty] = useState(1)
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  

  return (
    <>
      <Meta />
      
      {!keyword && !userInfo.isAdmin ? (
      
        <ProductCarousel />
      ) : (
        // <Link to='/' className='btn btn-dark'>
        //   Go Back
        // </Link>
        null
      )}
     {userInfo && !userInfo.isAdmin ?(
      
      
      <Col md={12}  style={{marginLeft:-70,padding:20}} >
      <Route  render={({ history }) => <SearchBox  history={history} />} />
      </Col>
      ):(
null
      )}
      
      {loading && !userInfo.isAdmin ? (
        <Loader />
      ) : error && !userInfo.isAdmin ? (
        <Message variant='danger'>{error}</Message>
      ):(
        null
      )}
       {userInfo && !userInfo.isAdmin ?(
        <>
         <Row>
          <h1 style={{textAlign:'center' ,marginLeft:10}}>Latest Products</h1></Row>
          <Row>
           
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
                {/* {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={product._id.qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
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
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item> */}

              </Col>
            ))}
            
            
          </Row>
          
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          
        </>
      ):(
        <Row>
          
         <Container style={{backgroundColor:'#1D4B2C',textAlign:'center',padding:10}}><h3 style={{color:'#FFFFFF'}}>Welcome to Admin Dashboard</h3> </Container>
          
          <Col md={4}>
          <Card style={{height:250,marginTop:50}}>
          <Link to={'/admin/userlist'}>
            <Card.Body>
        <Card.Img src='https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png' variant='top'style={{width:225,height:200}}/>
        <Card.Text style={{textAlign:'center'}}>Users</Card.Text>
        </Card.Body>
        {/* <Card.Img src={product.image} variant='top' /> */}
      </Link>
          </Card>
          </Col>
          <Col md={4}>
          <Card style={{height:250,marginTop:50}}>
          <Link to={'/admin/productlist'}>
            <Card.Body>
        <Card.Img src='https://specials-images.forbesimg.com/imageserve/621b817d4a86784da5949c9c/three-potted-plants-set-up-on-a-small-table/960x0.jpg?cropX1=0&cropX2=2132&cropY1=652&cropY2=2251' variant='top'style={{width:225,height:200}}/>
        {/* <Card.Img src={product.image} variant='top' /> */}
        <Card.Text style={{textAlign:'center'}}>Products</Card.Text>
        </Card.Body>
      </Link>
          </Card></Col>
          <Col md={4}>
                      <Card style={{height:250,marginTop:50}}>
          <Link to={'/admin/bloglist'}>
            <Card.Body>
        <Card.Img src='https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d3JpdGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80' variant='top'style={{width:225,height:200}}/>
        {/* <Card.Img src={product.image} variant='top' /> */}
        <Card.Text style={{textAlign:'center'}}>Blogs</Card.Text>
        </Card.Body>
      </Link>
          </Card>
          </Col>

          <Col md={4}>
          
          <Card style={{height:250, marginTop:50}}>
          <Link to={'/admin/rentinglist'}>
            <Card.Body>
        <Card.Img src='https://collegian.csufresno.edu/wp-content/uploads/2019/06/HomeRentalImage-825x500.jpg' variant='top'style={{width:225,height:200}}/>
        {/* <Card.Img src={product.image} variant='top' /> */}
        <Card.Text style={{textAlign:'center'}}>Rentings</Card.Text>
        </Card.Body>
      </Link>
      
          </Card>
          </Col>
          <Col md={4}>
          <Card style={{height:250,marginTop:50}}>
          <Link to={'/admin/orderlist'}>
            <Card.Body>
        <Card.Img src='https://cdn5.vectorstock.com/i/1000x1000/21/19/orders-list-vector-16672119.jpg' variant='top'style={{width:225,height:200}}/>
        {/* <Card.Img src={product.image} variant='top' /> */}
        <Card.Text style={{textAlign:'center'}}>Orders</Card.Text>
        </Card.Body>
      </Link>
          </Card>
          </Col>

          <Col md={4}>
          <Card style={{height:250,marginTop:50}}>
          <Link to={'/admin/forumlist'}>
            <Card.Body>
        <Card.Img src='https://cdn.spark.app/media/whitefuse/image/blog_forums_cropped.png' variant='top'style={{width:225,height:200}}/>
        {/* <Card.Img src={product.image} variant='top' /> */}
        <Card.Text style={{textAlign:'center'}}>Forums</Card.Text>
        </Card.Body>
      </Link>
          </Card>
          </Col>
        </Row>
        
        

      )}
    
    
   
      
    </>
    
  )
}

export default HomeScreen
