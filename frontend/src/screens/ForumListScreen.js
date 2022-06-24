
import React, { useEffect ,useState  } from 'react'
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
import { FORUM_GET_TOTAL } from '../constants/forumConstants'
import { getTotalForums,approveforum } from '../actions/forumActions'

const ForumListScreen = ({ history, match }) => {

  const dispatch = useDispatch()


  const forumReducer = useSelector((state) => state.forumTotal)
    const {forums} = forumReducer

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const forumApproveReducer = useSelector((state) => state.forumApprove);
    const {loading: approve_loading, success: approve_success} = forumApproveReducer;
    const [forumstatus, setForumStatus] = useState(undefined);

    const handleapprove = (forum) => setForumStatus(forum);

  useEffect(() => {
    dispatch(getTotalForums())

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    
  }, [
    dispatch,
    history,
    userInfo,
    
  ])
const handleforum=(e)=>{
//  dispatch(approveforum(forumstatus))
//  handleapprove()
  e.preventDefault();
}
 
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1 style={{textAlign:'right', marginLeft:50}}>Forums</h1>
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
                  <Button onClick={handleforum}>Approve</Button>
                  
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
