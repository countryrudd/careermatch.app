import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/developers',
        name: 'Developers',
        component: () => import('@/views/Developers.vue'),
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: () => import('@/views/Jobs.vue'),
    },
    {
        path: '/job',
        name: 'JobDetails',
        component: () => import('@/views/JobDetails.vue'),
    },
    {
        path: '/companies/create',
        name: 'CreateCompany',
        component: () => import('@/views/CreateCompany.vue'),
    },
    {
        path: '/companies/:id',
        name: 'CompanyDetails',
        component: () => import('@/views/CompanyDetails.vue'),
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: () => import('@/views/UserDetails.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
