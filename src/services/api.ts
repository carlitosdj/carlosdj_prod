import axios from 'axios'

const api = axios.create({
  baseURL: 'https://institutodefelicibus.com.br/apiassociacao',
  // baseURL: 'http://localhost:8887',
})

export default api
