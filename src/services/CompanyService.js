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
 * Gets a list of Company objects.
 *
 * @param {string} search
 * @param {string[]} locations
 */
export const getCompanies = (search, locations) => {
    const searchQueryString = search ? `search=${search}` : '';
    const locationQueryString = locations.length ? `location=${locations.join('&location=')}` : '';

    let combinedQueryString = '';

    [searchQueryString, locationQueryString].forEach((queryString) => {
        if (queryString) {
            combinedQueryString = combinedQueryString.concat((combinedQueryString ? '&' : '?') + queryString)
        }
    });

    return axios.get('/companies/' + combinedQueryString);
};

/**
 * Updates an already existing Company.
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

/**
 * Deletes a Company.
 *
 * @param {number} id
 */
export const deleteCompany = (id) => {
    return axios.delete(`/companies/${id}/`);
};
