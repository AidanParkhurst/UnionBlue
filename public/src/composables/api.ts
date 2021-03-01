import axios from 'axios'

enum HTTPResponse {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  Conflict = 409,
  PayloadTooLarge = 413,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const API = axios.create({})
API.interceptors.response.use(
  (res) => {
    return res
  },
  (rej) => {
    switch (rej.response.status) {
      case HTTPResponse.BadRequest:
        // This should only happen if someone manually attempts to
        // send poorly formatted data
        console.log('Invalid data format!')
        break
      case HTTPResponse.Unauthorized:
        // Redirect to /login and reset user state
        // This occurs if a user is not logged in
        console.log('You are not logged in!')
        break
      case HTTPResponse.Forbidden:
        // Redirect to / and keep all state
        // A user is attempting to do something they are not
        // authorized to do (supporter/admin only)
        console.log('You are not authorized to do that!')
        break
      case HTTPResponse.Conflict:
        // Occurs when something fails on the server
        // - Trying to register an existing username
        // - Missing/unknown data (e.g. user ID)
        console.log('Oops! Something went wrong.')
        break
      case HTTPResponse.TooManyRequests:
        // Add auto-retries with exponential growth
        console.log('Too many requests!')
        break
      case HTTPResponse.InternalServerError:
        // Oops! Something went wrong.
        // Check your internet connection.
        console.log('We hope this never happens!')
        break
    }
    return Promise.reject(rej)
  }
)
export default API