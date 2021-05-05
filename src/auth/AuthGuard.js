import { getInstance } from './Auth0';

export const AuthGuard = (to, _from, next) => {
    const authService = getInstance();

    const fn = async () => {
        if ('/authorized' === to.path) {
            try {
                await authService.handleRedirectCallback(to.fullPath);
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
            } else if ('/authorized' === to.path) {
                return next({ name: 'Developers' });
            } else {
                return next();
            }
        } else if (to.meta.requiresAuthentication) {
            return next({ name: '404' });
        } else if ('/authorized' === to.path) {
            return next({ name: 'Developers' });
        } else {
            return next();
        }
    };

    // If loading has already finished, check our auth state using `fn()`
    if (!authService.loading) {
        return fn();
    }

    // Watch for the loading property to change before we check isAuthenticated
    authService.$watch('loading', (loading) => {
        if (!loading) {
            return fn();
        }
    });
};
