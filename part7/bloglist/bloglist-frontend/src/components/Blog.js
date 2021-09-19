import React from 'react'
import blogService from '../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { actionModifyBlogs, actionDeletedBlog } from '../reducers/BlogReducer'
import { useHistory } from 'react-router-dom'

import { Button, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  if(!blog){
    return null
  }

  const handleLike = async (e) => {
    e.preventDefault()
    const res = await blogService.likeBlog(blog.id)
    dispatch(actionModifyBlogs(res))
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if(!window.confirm(`are you sure ? deleting ${blog.title}`)){
      return
    }
    await blogService.deleteBlog(blog.id)
    dispatch(actionDeletedBlog(blog.id))
    history.push('/')
  }

  const handleComment = async (e) => {
    e.preventDefault()
    const res = await blogService.commentBlog(blog.id, e.target.comment.value)
    e.target.comment.value = ''
    dispatch(actionModifyBlogs(res))
  }


  return (

    <Container>
      <Card>
        <Card.Body>
          <Card.Title><h2>{blog.title}</h2></Card.Title>
          <Card.Text>
              - by {blog.author}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem><h5>Likes -</h5> {blog.likes}</ListGroupItem>
          <ListGroupItem><h5>URL -</h5> <a href={blog.url}>{blog.url}</a></ListGroupItem>
          <ListGroupItem>added by {blog.user.username}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link>
            <Button variant="outline-dark" onClick={handleLike}>like</Button>
          </Card.Link>

          {user.username === blog.user.username ?
            <Card.Link>
              <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
            </Card.Link> :
            null}


        </Card.Body>
      </Card>

      <div>
        <h2>comments</h2>
        <form onSubmit={handleComment}>
          <input name="comment" type="text" required placeholder={'comment here'}/>
          <Button type="submit" variant="outline-dark">submit</Button>
        </form>
        <ListGroup variant="flush">
          {blog.comments.map(comment =>
            <ListGroup.Item key={getRandomInt(100)+comment}>{comment}</ListGroup.Item>)}
        </ListGroup>
      </div>
    </Container>
  )}

export default Blog