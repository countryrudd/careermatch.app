import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthGuard } from '@/auth/AuthGuard';

Vue.use(VueRouter)

const routes = [
    // Auth Routes -----------------------------------------------------------------------------------------------------
    {
        path: '/login',
        name: 'login',
        meta: {
            navbar: false
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            navbar: false
        },
    },
    {
        path: '/authorized',
        name: 'authorized',
        meta: {
            navbar: false
        },
    },
    // General Routes --------------------------------------------------------------------------------------------------
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
        path: '/jobs/:id',
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
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: {
            navbar: false
        },
    },
    // 404 Route -------------------------------------------------------------------------------------------------------
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/404.vue'),
    },
    {
        path: '*',
        redirect: '404',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(AuthGuard)

export default router;
