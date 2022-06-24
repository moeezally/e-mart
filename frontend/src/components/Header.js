import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer,Col } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import MovingText from 'react-moving-text'
import Avatar from 'react-avatar';

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    
    <header>
       <marquee behavior="scroll" direction="left" style={{backgroundColor:'#00B761',color:'#FFFFFF',marginBottom:-7}}>Garden Mart provides you with ultimate facility of buying your garden products.You can also avail our renting services.We provide you with the ultimate facility of virtual garden to enhance your gardening experience.Contact us at teamgardenmart@gardenmart.com for any assistance.  </marquee>
          
       
      <Navbar  variant='dark' expand='lg' collapseOnSelect style={{backgroundColor:'#1D4B2C'}}>
        <Container>

        <LinkContainer to='/' >
        
            <Navbar.Brand >
              <strong>Garden</strong> <img src='https://www.pinclipart.com/picdir/big/554-5540530_growing-clipart.png' width={50}/>
              &nbsp; <strong>Mart</strong>
               {/* <img src='https://i.pinimg.com/236x/f8/0f/66/f80f66ae640dca558e06d7266ef391c1.jpg' width={50}/></Navbar.Brand> */}
               </Navbar.Brand>
               
          </LinkContainer>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* <MovingText
      type="animation_type"
      duration="1000ms"
      delay="0s"
      direction="normal"
      timing="ease"
      iteration="infinite"
      fillMode="none">
      Content...alkndksiubdaebdiiusuianjakddddddddddddddddddddddddddddddddddddddddddddddd
    </MovingText> */}
            
          
          
        {/* <Navbar.Toggle aria-controls='basic-navbar-nav'  />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
           */}
           
          
            
            <Nav className='ml-auto'>
              
              {userInfo && !userInfo.isAdmin ?(
                <NavDropdown title='Services' id='services'>
                  <LinkContainer to='/blogs'>
                    <NavDropdown.Item>Blogs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/videos'>
                    <NavDropdown.Item>Videos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/forum'>
                    <NavDropdown.Item>Forums</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/renting'>
                    <NavDropdown.Item>Renting</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/vg'>
                    <NavDropdown.Item>Virtual Garden</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ): (
                // <LinkContainer to='/login'>
                //   <Nav.Link>
                //     <i className='fas fa-user'></i> Sign In
                //   </Nav.Link>
                // </LinkContainer>
                null
              )
              
              }
              {userInfo  ?(
                null
              ):(
                <LinkContainer to='/login'>
                  <Nav.Link>
                     <i className='fas fa-user'></i> Sign In
                   </Nav.Link>
                 </LinkContainer>
              )}
            
              


{/* 
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin Panel' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/bloglist'>
                    <NavDropdown.Item>Blogs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/rentinglist'>
                    <NavDropdown.Item>Renting Services</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
                <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'>&nbsp;</i> Cart
                </Nav.Link>
              </LinkContainer>
              

{userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/myorders'>
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                
              )
              
              
               : 
              (
                // <LinkContainer to='/login'>
                //   <Nav.Link>
                //     <i className='fas fa-user'></i> Sign In
                //   </Nav.Link>
                // </LinkContainer>
                <div></div>
              )
              
              }
              
            </Nav>
          {/* </Navbar.Collapse> */}
          {userInfo ?(
            <Avatar facebookId="100008343750912" size="50" round={true} style={{marginLeft:-25,marginTop:-5}}/>
              
          ):(
            null
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
