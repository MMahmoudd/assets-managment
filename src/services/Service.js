import axios from 'axios'

const _axios = axios.create({

})

_axios.interceptors.response.use((response) => {
      return response
  },
  function (error) {
      if (error.response.data.statusCode === 401) {
          localStorage.removeItem('token')
          window.location = '/login'
      }
      return Promise.reject(error).then(data => console.log(data))
}
)

export default _axios
