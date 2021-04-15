import axios from 'axios';

export const getCompany = (id) => {
    return axios.get(`/companies/${id}/`);
};

export const postCompany = (id) => {
    return axios.post(`/companies/${id}/`);
};
