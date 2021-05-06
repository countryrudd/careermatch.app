<template>
    <nav class="navbar navbar-light sticky-top shadow bg-white">
        <div class="container d-flex">
            <div class="d-flex align-items-center ms-auto">
                <div class="navbar-divider" />
                <div v-if="$auth.isAuthenticated" class="dropdown">
                    <button class="btn btn-link text-dark d-flex align-items-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style="text-decoration: none;">
                        <span v-if="$auth.user.avatar_url"
                              class="avatar me-3"
                              :style="{ 'background-image': `url(${$auth.user.avatar_url})` }" />
                        <small>{{ $auth.user.name }}</small>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <router-link :to="{ name: 'UserDetails', params: { 'id': $auth.user.id } }"
                                         tag="button"
                                         class="dropdown-item">
                                <FontAwesomeIcon icon="user" class="me-2" />
                                Profile
                            </router-link>
                        </li>
                        <li>
                            <button @click="$auth.logout()" role="link" class="dropdown-item">
                                <FontAwesomeIcon icon="sign-out-alt" class="me-2" />
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <button @click="$auth.login()"
                            class="btn btn-link text-dark d-flex align-items-center"
                            type="button"
                            style="text-decoration: none;">
                        <small>Log In</small>
                    </button>
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
        margin: auto 0.5rem;
    }

    .avatar {
        width: 2.375rem;
        height: 2.375rem;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 100%;
    }
</style>
