import axios from 'axios';

export const getUsers = (is_developer = null) => {
    return axios.get('/users/' + (typeof is_developer === 'boolean' ? `?is_developer=${is_developer}` : ''));
};
