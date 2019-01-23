import axios from 'axios';
import env from '@/env/env';

export default axios.create({
  baseURL: env.mediaUrl,
  crossDomain: true,
});