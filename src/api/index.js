import axios from 'axios';

export const Http = axios.create(
  {
      baseURL: 'http://example.com/api'
  });


export default Http;