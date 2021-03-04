import axios from 'axios';

const publicFetch = axios.create({
    baseURL: "https://tradedepotapp.herokuapp.com"
});

export { publicFetch }