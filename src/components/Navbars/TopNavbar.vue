<template>
    <nav class="navbar navbar-light sticky-top shadow bg-white">
        <div class="container d-flex">
            <div class="d-flex align-items-center ms-auto">
                <div class="navbar-divider" />
                <div class="dropdown">
                    <button class="btn btn-link text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none;">
                        <small>{{ $auth.user.name }}</small>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li @click="$auth.logout()">
                            <button role="link" class="dropdown-item">
                                <FontAwesomeIcon icon="sign-out-alt" class="me-2" />
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    export default {
        name: 'TopNavbar',
        components: {
            FontAwesomeIcon
        },
    }
</script>

<style>
    .navbar-divider {
        width: 0;
        border-right: 1px solid #e3e6f0;
        height: 2.375rem;
        margin: auto 1rem;
    }
</style>
