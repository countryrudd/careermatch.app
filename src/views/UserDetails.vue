<template>
    <html lang="en">
        <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <div v-else>
            <div class="col">
                <button type="button"
                        class="btn btn-primary btn-right"
                        data-bs-toggle="modal"
                        data-bs-target="#userDetailsModal">
                    Edit Profile
                </button>
                <Modal id="userDetailsModal">
                    <template v-slot:header>
                        <h1> Edit Profile </h1>
                    </template>
                    <template v-slot:body>
                        <h4>Edit Image</h4>
                        <input v-model="user.avatar_url" type="text"><br><br>
                        <h4>Edit Description</h4>
                        <textarea v-model="user.bio" rows="4" cols="50" /><br>
                        <h4>Edit Skills</h4>
                        <textarea v-model="user.skills" rows="4" cols="50" /><br>
                        <!--<h4>Edit Git Projects</h4>
                        <textarea v-text="" rows="4" cols="50" /><br>-->
                    </template>
                    <template v-slot:footer>
                        <button type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                                @click="saveProfile">
                            Save
                        </button>
                    </template>
                </Modal>
            </div>
            <div class="text">
                <div class="center">
                    <div class="d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon v-if="!valid_image"
                                         icon="user"
                                         style="font-size: 5vw;" />
                        <img v-show="valid_image"
                             :src="user.avatar_url"
                             :alt="user.name"
                             @load="valid_image = true"
                             @error="valid_image = false"
                             style="max-height: 100%; max-width: 100%; display: block;">
                    </div>
                </div>
                <h3 class="text-center text-secondary text-wrap">
                    <br>{{ user.bio }}
                </h3>
                <h3 class="d-flex text-secondary">
                    <strong class="me-2">Skills:</strong>
                    <div class="d-flex flex-wrap">
                        <span v-for="skill in user.skills" :key="skill" class="me-2">
                            {{ skill }}
                        </span>
                    </div>
                </h3>
                <h3 class="d-flex text-secondary">
                    <strong class="me-2">Repositories:</strong>
                </h3>
                <div class="row no-gutters">
                    <!--<div class="col">
                           <GitHubRepositoryCard />
                       </div>-->
                    <div class="col-3" v-for="repo in repos" :key="repo.id">
                        <GitHubRepositoryCard :description="repo.description" :languages_url="repo.languages_url" :name="repo.name" :link="repo.html_url" />
                    </div>
                </div>
            </div>
        </div>
    </html>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import Modal from '@/components/Modal';
    import GitHubRepositoryCard from '@/components/UserDetails/GitHubRepositoryCard';
    import { getUser } from '@/services/UserService';
    import { getRepos } from '@/services/UserService';
    import { getLanguages } from '@/services/UserService';

    export default {
        name: 'UserDetails',
        components: {
            LoadingSpinner,
            LoadingError,
            Modal,
            GitHubRepositoryCard,
        },
        data: () => ({
            loading: true,
            loadingError: null,
            user: null,
            repo: null,
            repos: null,
            valid_image: true,
        }),
        async mounted() {
            this.loading = true;
            try {
                const { data: user } = await getUser(this.$route.params.id);
                const { data: repos } = await getRepos(this.$route.params.id);
                this.user = user;
                this.repos = repos;
            } catch (error) {
                this.loadingError = error;
            } finally {
                this.loading = false;
            }
        },
        methods: {
            /*async getLanguages(url) {
                //const { data: languages } = await getLanguages(url);
                return getLanguages(url);
            }*/
            /*saveProfile() {
                //Code for updating the database with our saved profile
            }*/
        },
    }

</script>
