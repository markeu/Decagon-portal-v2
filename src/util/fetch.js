import axios from 'axios';

let tokens = ''
const user = localStorage.getItem('userInfo') || '';

if (user) {
    const { data: { token } } = JSON.parse(user) || '';
    tokens = token
}

const publicFetch = axios.create({
    baseURL: 'https://decadev-recruitment-portal.herokuapp.com/api/v1',
    headers: { Authorization: `Bearer ${tokens}` },
    //baseURL: 'http://localhost:8080/api/v1'
    // baseURL: process.env.REACT_APP_DEV_BASE_URL
});

publicFetch.interceptors.request.use(
    (config) => {
        console.log(config);
        let tokens = ''
        const user = localStorage.getItem('userInfo')
        if (user) {
            const { data: { token } } = JSON.parse(user);
            tokens = token
            config.headers['Authorization'] = `Bearer ${tokens}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error)
    }
)



export { publicFetch }
