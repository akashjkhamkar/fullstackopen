import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const setToken = (t) => {
  token = `bearer ${t}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const commentBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }

  const body = {
    comment
  }

  const res = await axios.put(`${baseUrl}/comments/${id}`, body, config)
  return res.data
}

const likeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(`${baseUrl}/likes/${id}`, null, config)
  return res.data
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token }
  })
}

const addBlog = async (title, author, url) => {
  const config = {
    headers: { Authorization: token }
  }

  const newBlog = { title, author, url }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, setToken, addBlog, commentBlog, deleteBlog, likeBlog }