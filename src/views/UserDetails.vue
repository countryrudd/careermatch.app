<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <EditProfile />
        <div class="d-flex flex-column">
            <div class="d-flex flex-column align-items-center justify-content-center text-center text-secondary">
                <div v-if="user.avatar_url" class="avatar" :style="{ 'background-image': `url(${user.avatar_url})` }" />
                <FontAwesomeIcon v-else icon="user" class="mb-3" style="font-size: 5vw;" />
                <h3>{{ user.name }}</h3>
                <h5 v-if="user.bio" class="mb-0">{{ user.bio }}</h5>
                <h6 v-if="user.location" class="mb-0">{{ user.location }} - {{ user.location_flexibility }}</h6><br>
                <a :href="`https://www.linkedin.com/in/${user.linkedin_id}/`" class="mb-2" style="text-decoration: none;">
                    <FontAwesomeIcon icon="user" style="font-size: 3vw;" />
                </a>
            </div>
            <section class="text-secondary">
                <h3 class="my-3">Skills</h3>
                <div class="ms-4">
                    <span v-for="skill in user.skills" :key="skill.id" class="me-1">
                        {{ skill }}
                    </span>
                </div>
                <h3 class="my-3">Written and Spoken Languages</h3>
                <div class="ms-4">
                    <span v-for="languages in user.languages" :key="languages.id" class="me-1">
                        {{ languages }}
                    </span>
                </div>
                <h3 class="my-3">Current Company Positions</h3>
                <div class="ms-4">
                    <span v-for="position in user.positions" :key="position.id" class="me-1">
                        <CompanyPosition :position="position" />
                    </span>
                </div>
            </section>
            <section class="text-secondary">
                <h3 class="my-3">Repositories</h3>
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
    import { getUser } from '@/services/UserService';
    import { getRepositories } from '@/services/GitHubService';
    import EditProfile from '@/components/UserDetails/EditProfile';
    import CompanyPosition from '../components/CompanyPosition';

    export default {
        name: 'UserDetails',
        components: {
            CompanyPosition,
            EditProfile,
            LoadingSpinner,
            LoadingError,
            GitHubRepositoryCard,
        },
        data: () => ({
            loading: true,
            loadingError: null,
            user: null,
            repositories: null,
        }),
        async mounted() {
            this.loading = true;
            try {
                const { data: user } = await getUser(this.$route.params.id);
                if (user.github_username) {
                    const { data: repositories } = await getRepositories(user.github_username);
                    this.repositories = repositories;
                }
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
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 100px;
        margin-bottom: 30px;
    }
</style>
