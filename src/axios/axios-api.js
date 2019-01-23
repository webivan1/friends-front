import axios from 'axios';
import env from '@/env/env';

export default axios.create({
  baseURL: env.apiUrl,
  crossDomain: true,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
});