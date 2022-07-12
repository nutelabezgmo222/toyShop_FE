import axios from 'axios';
import store from '@/store';

const getAuth = () => {
    return store.getters.rememberToken || '';
};

const getConfig = () => ({
    baseURL: process.env.VUE_APP_ROOT_API,
    headers: {
        responseType: 'json',
        Authorization: getAuth()
    },
});

export default {
    get(url) {
        return axios.get(url, getConfig());
    },
    post(url, obj = {}) {
        return axios.post(url, obj, getConfig());
    },
    patch(url, obj = {}) {
        return axios.patch(url, obj, getConfig());
    },
    delete(url) {
        return axios.delete(url, getConfig());
    }
};