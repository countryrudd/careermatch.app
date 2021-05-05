import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filters from './filters'
import '@/services/util/AxiosInterceptor'

import { Auth0 } from '@/auth/Auth0';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

Vue.config.productionTip = false
Vue.prototype.$auth = Auth0();

library.add(fas)
library.add(fab)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.use(filters);

export const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
