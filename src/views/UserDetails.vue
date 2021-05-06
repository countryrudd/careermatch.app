<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <div v-else class="d-flex flex-column text-secondary">
            <UserSettingsDropdown v-if="isCurrentUser" :user.sync="user" />
            <div class="d-flex flex-column align-items-center justify-content-center text-center">
                <div v-if="user.avatar_url"
                     class="avatar mb-4"
                     :style="{ 'background-image': `url(${user.avatar_url})` }" />
                <FontAwesomeIcon v-else icon="user" class="mb-3" style="font-size: 5vw;" />
                <h3>{{ user.name }}</h3>
                <h5 v-if="user.bio" class="mb-1">{{ user.bio }}</h5>
                <h6 v-if="user.location" class="mb-2">{{ user.location }}</h6>
                <a :href="`https://www.linkedin.com/in/${user.linkedin_username}/`" target="_blank" class="mb-2">
                    <FontAwesomeIcon :icon="['fab', 'linkedin']" style="font-size: 1.25rem;" />
                </a>
            </div>
            <section v-if="user.skills.length">
                <h4 class="my-3">Skills</h4>
                <div class="ms-4">
                    <span v-for="skill in user.skills" :key="skill.id" class="me-1">
                        {{ skill }}
                    </span>
                </div>
            </section>
            <section v-if="user.languages.length">
                <h4 class="my-3">Spoken/Written Languages</h4>
                <div class="ms-4">
                    <span v-for="languages in user.languages" :key="languages.id" class="me-1">
                        {{ languages }}
                    </span>
                </div>
            </section>
            <section v-if="user.positions.length">
                <h4 class="my-3">Current Company Positions</h4>
                <div class="row">
                    <div v-for="position in user.positions" :key="position.id" class="col-6 col-xl-3">
                        <div class="card">
                            <div class="card-body d-flex flex-column align-items-center text-center">
                                <div v-if="position.company.logo_url"
                                     class="avatar"
                                     :style="{ 'background-image': `url(${position.company.logo_url})` }" />
                                <router-link :to="{ name: 'CompanyDetails', params: { id: position.company.id }}"
                                             style="text-decoration: none;">
                                    <h5 class="mb-2">{{ position.company.name }}</h5>
                                </router-link>
                                <span>{{ position.title }}</span>
                                <small>{{ position.description }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section v-if="repositories.length">
                <h4 class="my-3">Repositories</h4>
                <div class="row no-gutters">
                    <div class="col-xl-3 mb-3" v-for="repository in repositories" :key="repository.id">
                        <GitHubRepositoryCard :repository="repository" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import GitHubRepositoryCard from '@/components/UserDetails/GitHubRepositoryCard';
    import UserSettingsDropdown from '@/components/UserDetails/UserSettingsDropdown';
    import { getUser } from '@/services/UserService';

    export default {
        name: 'UserDetails',
        components: {
            LoadingSpinner,
            LoadingError,
            GitHubRepositoryCard,
            UserSettingsDropdown,
        },
        data: () => ({
            loading: true,
            loadingError: null,
            user: null,
            repositories: [],
        }),
        computed: {
            isCurrentUser() {
                if (this.$auth.isAuthenticated && this.user) {
                    return this.$auth.user.id === this.user.id;
                }
                return false;
            },
        },
        async mounted() {
            this.loading = true;
            try {
                const { data: user } = await getUser(this.$route.params.id);
                // if (user.github_username) {
                //     const { data: repositories } = await getRepositories(user.github_username);
                //     this.repositories = repositories;
                // }
                this.user = user;
            } catch (error) {
                if (error?.response?.status === 404) {
                    this.$router.push({ name: '404' })
                }
                this.loadingError = error;
            } finally {
                this.loading = false;
            }
        },
    }
</script>

<style scoped>
    .avatar {
        position: relative;
        width: 150px;
        height: 150px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 100px;
    }
</style>
