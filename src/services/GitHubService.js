import axios from 'axios';

/**
 * Gets a list of a GitHub repositories by a username.
 * TODO: Move this logic to the API.
 *
 * @param {string} github_username
 */
export const getRepositories = (github_username) => {
    return axios.get(`/github/repositories/?github_username=${github_username}`);
};
