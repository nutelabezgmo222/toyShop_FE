import axios from 'axios';

export const Http = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API
});


export default Http;