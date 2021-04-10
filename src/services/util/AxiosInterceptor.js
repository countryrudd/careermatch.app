import axios from 'axios';

axios.interceptors.request.use(config => {
    config.baseURL = process.env.VUE_APP_API_BASE_URL;
    return config;
});
