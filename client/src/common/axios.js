import axios from 'axios'

export const activitiesApiClient = axios.create({
  baseURL: 'http://localhost:3000/', // TODO: for local testing mode
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

