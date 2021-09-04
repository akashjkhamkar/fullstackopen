import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const res = await axios.post(baseUrl , { username, password })
  return res.data
}
export default { login }