import axios from 'axios'

export default axios.create({
  // baseURL: "https://sun-music-backend.herokuapp.com"
  baseURL: "http://localhost:3000"
})