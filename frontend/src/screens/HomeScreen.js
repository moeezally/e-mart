import React, { useEffect,useState } from 'react'
import { Link,Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,Navbar } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Meta from '../components/Meta'
import SearchBox from '../components/SearchBox'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match,history }) => {
  const [qty, setQty] = useState(1)
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  

  return (
    <>
      <Meta />
      
      {!keyword ? (
      
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1 style={{textAlign:'center'}}>Latest Products</h1>
      
      <Col md={12}   >
      <Route  render={({ history }) => <SearchBox  history={history} />} />
      </Col>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
      )}
   
      
    </>
    
  )
}

export default HomeScreen
