import { getInstance } from './Auth0';

export const AuthGuard = (to, _from, next) => {
    const authService = getInstance();

    const fn = () => {
        if (to.meta.requiresAuthentication && !authService.isAuthenticated) {
            return next({ name: '404' });
        }

        if ('/authorized' === to.path) {
            try {
                authService.handleRedirectCallback(to.fullPath)
                return next({ name: 'Developers' });
            } catch (err) {
                authService.logout();
            }
        }

        if ('/login' === to.path) {
            return next({ name: 'Developers' });
        }

        if ('/logout' === to.path) {
            authService.logout();
        }

        if ('/welcome' === to.path) {
            if (authService.user.finished_registration) {
                return next({ name: 'Developers' });
            } else {
                return next();
            }
        }

        if (authService.isAuthenticated) {
            if (!authService.user.finished_registration && to.path !== '/welcome') {
                return next({ name: 'Welcome' });
            } else {
                return next();
            }
        } else {
            return next();
        }
    };

    // If loading has already finished, check our auth state using `fn()`
    if (!authService.loading) {
        return fn();
    }

    // Watch for the loading property to change before we check isAuthenticated
    authService.$watch('loading', loading => {
        if (loading === false) {
            return fn();
        }
    });
};
