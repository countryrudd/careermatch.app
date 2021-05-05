import axios from 'axios';

export const getCompany = (id) => {
    return axios.get(`/companies/${id}/`);
};

export const updateCompany = (id, data) => {
    return axios.patch(`/companies/${id}/`, data);
}
