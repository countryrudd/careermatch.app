import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthGuard } from '@/auth/AuthGuard';

Vue.use(VueRouter)

const routes = [
    // Auth Routes -----------------------------------------------------------------------------------------------------
    {
        path: '/login',
        name: 'Login',
        meta: {
            navbar: false,
            requiresAuthentication: false,
        },
    },
    {
        path: '/logout',
        name: 'Logout',
        meta: {
            navbar: false,
            requiresAuthentication: true,
        },
    },
    {
        path: '/authorized',
        name: 'Authorized',
        meta: {
            navbar: false,
            requiresAuthentication: false,
        },
    },
    // General Routes --------------------------------------------------------------------------------------------------
    {
        path: '/',
        redirect: { name: 'Developers' },
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/developers',
        name: 'Developers',
        component: () => import('@/views/Developers.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: () => import('@/views/Jobs.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/jobs/:id',
        name: 'JobDetails',
        component: () => import('@/views/JobDetails.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/companies',
        name: 'Companies',
        component: () => import('@/views/Companies.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/companies/create',
        name: 'CreateCompany',
        component: () => import('@/views/CreateCompany.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: true,
        },
    },
    {
        path: '/companies/:id',
        name: 'CompanyDetails',
        component: () => import('@/views/CompanyDetails.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: () => import('@/views/UserDetails.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: {
            navbar: false,
            requiresAuthentication: true,
        },
    },
    // 404 Route -------------------------------------------------------------------------------------------------------
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/404.vue'),
        meta: {
            navbar: true,
            requiresAuthentication: false,
        },
    },
    {
        path: '*',
        redirect: { name: '404' },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(AuthGuard)

export default router;
