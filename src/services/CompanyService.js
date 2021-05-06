import axios from 'axios';

/**
 * Creates a Company.
 *
 * @param {Object} data
 */
export const createCompany = (data) => {
    return axios.post('/companies/', data);
};

/**
 * Gets an already existing Company.
 *
 * @param {number} id
 * @param {Object} data
 */
export const updateCompany = (id, data) => {
    return axios.patch(`/companies/${id}/`, data);
}

/**
 * Gets a Company.
 *
 * @param {number} id
 */
export const getCompany = (id) => {
    return axios.get(`/companies/${id}/`);
};


