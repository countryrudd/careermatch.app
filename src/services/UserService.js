import axios from 'axios';

/**
 * Gets a list of User objects from the API.
 *
 * @param {boolean} is_developer
 * @param {string} search
 * @param {string[]} languages
 * @param {string[]} skills
 * @param {string[]} locations
 */
export const getUsers = (is_developer, search, languages, skills, locations) => {
    const isDeveloperQueryString = typeof is_developer === 'boolean' ? `is_developer=${is_developer}` : '';
    const searchQueryString = search ? `search=${search}` : '';
    const languageQueryString = languages.length ? `language=${languages.join('&language=')}` : '';
    const skillQueryString = skills.length ? `skill=${skills.join('&skill=')}` : '';
    const locationQueryString = locations.length ? `location=${locations.join('&location=')}` : '';
    let combinedQueryString = '';

    [
        isDeveloperQueryString,
        searchQueryString,
        languageQueryString,
        skillQueryString,
        locationQueryString
    ].forEach((queryString) => {
        if (queryString) {
            combinedQueryString = combinedQueryString.concat((combinedQueryString ? '&' : '?') + queryString)
        }
    });

    return axios.get('/users/' + combinedQueryString);
};

/**
 * Get a single User object from the API.
 *
 * @param {string} id
 */
export const getUser = (id) => {
    return axios.get(`/users/${id}/`);
};

export const editProfile = (id, data) => {
    return axios.patch(`/users/${id}/`, data);
};
