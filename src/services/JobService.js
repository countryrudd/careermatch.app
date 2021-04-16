import axios from 'axios';

export const getJobs = (is_active = null) => {
    return axios.get('/jobs/' + (typeof is_active === 'boolean' ? `?is_active=${is_active}` : ''));
};

export const getJob = (id) => {
    return axios.get(`/jobs/${id}`);
};
