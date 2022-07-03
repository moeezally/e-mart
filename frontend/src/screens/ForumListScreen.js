
import React, { useEffect ,useState  } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { connectAdvanced, useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listBlogs,
  createBlog,
  deleteBlog
} from '../actions/blogActions'
import { BLOG_CREATE_RESET} from '../constants/blogConstants'
import { FORUM_GET_TOTAL } from '../constants/forumConstants'
import { getTotalForums,approveforum, deleteForum } from '../actions/forumActions'

const ForumListScreen = ({ history, match }) => {

  const dispatch = useDispatch()


  const forumReducer = useSelector((state) => state.forumTotal)
    const {forums} = forumReducer

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const forumDelete = useSelector((state) => state.forumDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = forumDelete


  useEffect(() => {
    dispatch(getTotalForums())

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    
  ])
const handleforum=(id)=>{
  console.log(id);
 dispatch(approveforum(id))
//  handleapprove()
  // e.preventDefault();
}

const deleteHandler = (id) => {
  if (window.confirm('Are you sure')) {
    dispatch(deleteForum(id))
  }
}
 
  return (
    <>
    <Link className='btn btn  my-3' to='/' style={{backgroundColor: '#1D4B2C', color: '#FFFFFF'}}>
            Go Back
        </Link>
      <Row className='align-items-center'>
        <Col>
          <h1 style={{textAlign:'center'}}>Forums</h1>
        </Col>
        
      </Row>
      
        <>
          <Table variant='outline-success' className='table-sm table-bordered'>
            <thead style={{backgroundColor:'#1D4B2C'}}>
              <tr style={{color:'#FFFFFF'}}>
                <th>ID</th>
                <th>TITLE</th>
               
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forums &&forums.map((forum) => (
                <tr key={forum._id}>
                  <td>{forum._id}</td>
                  <td>{forum.title}</td>
                 
                  <td>{forum.description}</td>
                  <td>
                  <Button onClick={()=>handleforum(forum._id)}
                  variant='success'>Approve</Button>
                  
                  <Button
                      variant='danger'
                      
                      onClick={() => deleteHandler(forum._id)}
                    >Delete
                      {/* <i className='fas fa-trash'></i> */}
                    </Button>
                  </td>
                  
                 
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      
    </>
  )
}

export default ForumListScreen
