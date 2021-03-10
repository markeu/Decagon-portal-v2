import axios from 'axios';

const publicFetch = axios.create({
    baseURL: process.env.REACT_APP_DEV_BASE_URL
});

export { publicFetch }