import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://5374e7784ffb.ngrok.io/api/v1'
})

export default Api