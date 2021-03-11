import axios from 'axios';

const publicFetch = axios.create({
    baseURL: 'https://decadev-recruitment-portal.herokuapp.com/api/v1'
});
//process.env.REACT_APP_DEV_BASE_URL
console.log(process.env.REACT_APP_DEV_BASE_URL);
export { publicFetch }
