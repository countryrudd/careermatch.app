import { truncate } from './numbers';

export { truncate };

export default {
    install(Vue) {
        Vue.filter('truncate', truncate);
    }
};
