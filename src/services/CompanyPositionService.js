import axios from 'axios';

/**
 * Creates a CompanyPosition.
 *
 * @param {Object} data - The details of a CompanyPosition
 */
export const createCompanyPosition = (data) => {
    return axios.post('/company_positions/', data);
};

/**
 * Updates a CompanyPosition.
 *
 * @param {number} id - The ID of a CompanyPosition
 * @param {Object} data - The details of a CompanyPosition
 */
export const updateCompanyPosition = (id, data) => {
    return axios.patch(`/company_positions/${id}/`, data);
};

/**
 * Deletes a CompanyPosition.
 *
 * @param {number} id - The ID of a CompanyPosition
 */
export const deleteCompanyPosition = (id) => {
    return axios.delete(`/company_positions/${id}/`);
};
