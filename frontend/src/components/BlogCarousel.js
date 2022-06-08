import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopBlogs } from '../actions/blogActions'

const BlogCarousel = () => {
  const dispatch = useDispatch()

  const blogTopRated = useSelector((state) => state.blogTopRated)
  const { loading, error, blogs } = blogTopRated

  useEffect(() => {
    dispatch(listTopBlogs())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover'style={{backgroundColor:'#1D4B2C'}}>
      {blogs.map((blog) => (
        <Carousel.Item key={blog._id}>
          <Link to={`/blog/${blog._id}`}>
            <Image src={blog.image} alt={blog.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {blog.name}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default BlogCarousel
