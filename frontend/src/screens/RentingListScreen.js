import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listRentings,
  createRenting,
  deleteRenting
} from '../actions/rentingActions'
import { RENTING_CREATE_RESET } from '../constants/rentingConstants'

const RentingListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const rentingList = useSelector((state) => state.rentingList)
  const { loading, error, rentings, page, pages } = rentingList

  const rentingDelete = useSelector((state) => state.rentingDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = rentingDelete

  const rentingCreate = useSelector((state) => state.rentingCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    renting: createdRenting,
  } = rentingCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: RENTING_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/renting/${createdRenting._id}/edit`)
    } else {
      dispatch(listRentings('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdRenting,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteRenting(id))
    }
  }

  const createRentingHandler = () => {
    dispatch(createRenting())
  }

  return (
    <>
    <Link className='btn btn  my-3' to='/' style={{backgroundColor: '#1D4B2C', color: '#FFFFFF'}}>
            Go Back
        </Link>
      <Row className='align-items-center'>
        <Col>
          <h1 style={{textAlign:'right'}}>Rentings</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createRentingHandler}style={{backgroundColor:'#1D4B2C'}}>
            <i className='fas fa-plus'></i> Create Service
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table  variant='outline-success' className='table-sm table-bordered'>
            <thead style={{backgroundColor:'#1D4B2C'}}>
              <tr style={{color:'#FFFFFF'}}>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE(per sq ft)</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rentings.map((renting) => (
                <tr key={renting._id}>
                  <td>{renting._id}</td>
                  <td>{renting.name}</td>
                  <td>Rs.{renting.price}</td>
                  <td>{renting.category}</td>
                  <td>{renting.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/renting/${renting._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(renting._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default RentingListScreen
