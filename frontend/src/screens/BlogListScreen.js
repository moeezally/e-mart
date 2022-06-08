import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listBlogs,
  createBlog,
  deleteBlog
} from '../actions/blogActions'
import { BLOG_CREATE_RESET} from '../constants/blogConstants'

const BlogListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const blogList = useSelector((state) => state.blogList)
  const { loading, error, blogs, page, pages } = blogList

  const blogDelete = useSelector((state) => state.blogDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete

  const blogCreate = useSelector((state) => state.blogCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    blog: createdBlog,
  } = blogCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/blog/${createdBlog._id}/edit`)
    } else {
      dispatch(listBlogs('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdBlog,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBlog(id))
    }
  }

  const createBlogHandler = () => {
    dispatch(createBlog())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1 style={{textAlign:'right', marginLeft:50}}>Blogs</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createBlogHandler}style={{backgroundColor:'#1D4B2C'}}>
            <i className='fas fa-plus'></i> Create Blog
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
          <Table variant='outline-success' className='table-sm table-bordered'>
            <thead style={{backgroundColor:'#1D4B2C'}}>
              <tr style={{color:'#FFFFFF'}}>
                <th>ID</th>
                <th>NAME</th>
                {/* <th>PRICE</th> */}
                {/* <th>CATEGORY</th> */}
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog._id}</td>
                  <td>{blog.name}</td>
                  {/* <td>${blog.price}</td>
                  <td>{blog.category}</td> */}
                  <td>{blog.description}</td>
                  <td>
                    <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(blog._id)}
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

export default BlogListScreen
