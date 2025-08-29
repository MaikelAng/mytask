// api.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Base URL backend
const local: string = 'http://localhost:5000'
const production: string = 'https://exam-vitalz-backend-8267f8929b82.herokuapp.com'

let api_url: string = ''
const mode: 'dev' | 'pro' = 'pro' 

if (mode === 'pro') {
  api_url = production
} else {
  api_url = local
}

const api: AxiosInstance = axios.create({
  baseURL: api_url,
})

export default api
