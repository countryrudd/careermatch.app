import axios from 'axios';

/**
 * Gets a list of User objects from the API.
 *
 * @param {boolean|null} is_developer
 * @param {string|null} search
 * @param {string[]} languages
 * @param {string[]} skills
 * @param {string[]} locations
 * @param {string|null} linkedin_username
 * @param {string|null} github_username
 */
export const getUsers = (is_developer, search, languages, skills, locations, linkedin_username,  github_username ) => {
    const isDeveloperQueryString = typeof is_developer === 'boolean' ? `is_developer=${is_developer}` : '';
    const searchQueryString = search ? `search=${search}` : '';
    const languageQueryString = languages.length ? `language=${languages.join('&language=')}` : '';
    const skillQueryString = skills.length ? `skill=${skills.join('&skill=')}` : '';
    const locationQueryString = locations.length ? `location=${locations.join('&location=')}` : '';
    const linkedinQueryString = linkedin_username ? `linkedin_username=${linkedin_username}` : '';
    const githubQueryString = github_username ? `github_username=${github_username}` : '';
    let combinedQueryString = '';

    [
        isDeveloperQueryString,
        searchQueryString,
        languageQueryString,
        skillQueryString,
        locationQueryString,
        linkedinQueryString,
        githubQueryString
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

/**
 * Updates a User object in the API.
 *
 * @param {string} id
 * @param {Object} data
 */
export const updateUser = (id, data) => {
    return axios.patch(`/users/${id}/`, data);
};

export const editProfile = (id, data) => {
    return axios.patch(`/users/${id}/`, data);
};
