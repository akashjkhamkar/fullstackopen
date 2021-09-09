import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const put = async (anecdote, id) => {
  const response = await axios.put(baseUrl+`/${id}`, anecdote)
  return response.data
}

export default { getAll, add, put }