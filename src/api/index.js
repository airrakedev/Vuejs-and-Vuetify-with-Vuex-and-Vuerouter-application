import axios from 'axios'


import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'

let client = axios.create({
   baseURL: (process.env.NODE_ENV != 'development') ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_API_URL,
   timeout: 5000,
   headers: { 'Content-Type': 'application/json' },
   validateStatus: function (status) {
      if (status != 200) {
         return status
      } else {
         return status
      }
   }
})

console.log((process.env.NODE_ENV != 'development') ? process.env.VUE_APP_PROD_URL : process.env.VUE_APP_API_URL, 'hmm')

// REQUEST
client.interceptors.request.use(function (config) {
   Nprogress.start()

   let token = localStorage.getItem('authtoken')
   if (token) {
      config.headers['Authorization'] = token
   }
   return config;
}, error => Promise.reject(error))


// RESPONSE
client.interceptors.response.use(function (response) {
   Nprogress.done()
   if (response.data.token) {
      localStorage.setItem('authtoken', response.data.token)
   }
   return response;
}, error => Promise.reject(error))

export default client
