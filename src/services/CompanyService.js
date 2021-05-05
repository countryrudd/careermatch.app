import axios from 'axios';

/**
 * Creates a Company.
 *
 * @param {Object} data
 */
export const createCompany = (data) => {
    return axios.post('/companies/', data);
};

export const updateCompany = (id, data) => {
    return axios.patch(`/companies/${id}/`, data);
}

export const getCompany = (id) => {
    return axios.get(`/companies/${id}/`);
};
