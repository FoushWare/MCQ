import axios from 'axios'

export default axios.create({
  // baseURL: `http://localhost:3000/`,
  baseURL: `https://mcqquestionstest.herokuapp.com/questions`,
  mode: 'no-cors',
})
