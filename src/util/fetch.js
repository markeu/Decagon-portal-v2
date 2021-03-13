import axios from 'axios';

const publicFetch = axios.create({
    baseURL: 'https://decadev-recruitment-portal.herokuapp.com/api/v1'
        //baseURL: 'http://localhost:8080/api/v1'
        // baseURL: process.env.REACT_APP_DEV_BASE_URL
});

export { publicFetch }
