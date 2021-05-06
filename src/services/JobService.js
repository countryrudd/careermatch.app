import axios from 'axios';

/**
 * Create a Job.
 *
 * @param {Object} data
 */
export const createJob = (data) => {
    return axios.post('/jobs/', data);
};

/**
 * Gets a list of User objects.
 *
 * @param {boolean} is_active
 * @param {string} search
 * @param {string[]} languages
 * @param {string[]} skills
 * @param {string[]} locations
 * @param {string[]} cultures
 */
export const getJobs = (is_active, search, languages, skills, locations, cultures) => {

    const isActiveQueryString = typeof is_active === 'boolean' ? `is_active=${is_active}` : '';
    const searchQueryString = search ? `search=${search}` : '';
    const languageQueryString = languages.length ? `language=${languages.join('&language=')}` : '';
    const skillQueryString = skills.length ? `skill=${skills.join('&skill=')}` : '';
    const locationQueryString = locations.length ? `location=${locations.join('&location=')}` : '';
    const cultureQueryString = cultures.length ? `culture=${cultures.join('&culture=')}` : '';

    let combinedQueryString = '';

    [
        isActiveQueryString,
        searchQueryString,
        languageQueryString,
        skillQueryString,
        locationQueryString,
        cultureQueryString
    ].forEach((queryString) => {
        if (queryString) {
            combinedQueryString = combinedQueryString.concat((combinedQueryString ? '&' : '?') + queryString)
        }
    });

    return axios.get('/jobs/' + combinedQueryString);
};

/**
 * Gets other jobs from the API.
 *
 * @param {boolean} is_active
 */
export const getCompanyJobs = (is_active = null) => {
    return axios.get('/jobs/' + (typeof is_active === 'boolean' ? `?is_active=${is_active}` : ''));
};

/**
 * Gets a job by ID from the API.
 *
 * @param {text} id
 */
export const getJob = (id) => {
    return axios.get(`/jobs/${id}/`);
};
