import axios from 'axios';

/**
 * Gets a list of a GitHub repositories by a username.
 * TODO: Move this logic to the API.
 *
 * @param {string} github_username
 */
export const getRepositories = (github_username) => {
    return axios.get(`https://api.github.com/users/${github_username}/repos`);
};

/**
 * Gets a list of GitHub languages by a repositories.
 * TODO: Move this logic to the API.
 *
 * @param {string} url
 */
export const getRepositoryLanguages = (url) => {
    return axios.get(url);
};
