<template>
    <LoadingSpinner v-if="loading" class="min-vh-75" />
    <LoadingError v-else-if="loadingError" class="min-vh-75" />
    <div v-else>
        <h3 class="mb-4">Developers</h3>
        <div class="row no-gutters">
            <div class="col">
                <DevelopersFormCard :search.sync="search"
                                    :languages.sync="languages"
                                    :skills.sync="skills"
                                    :locations.sync="locations"
                                    :loading="loading"
                                    @getDevelopers="getDevelopers()" />
            </div>
            <div class="col-xl-9">
                <DevelopersListCard :loading="loading"
                                    :loading-error="loadingError"
                                    :developers="developers" />
            </div>
        </div>
    </div>
</template>

<script>
    import DevelopersFormCard from '@/components/Developers/DevelopersFormCard';
    import DevelopersListCard from '@/components/Developers/DevelopersListCard';
    import { getUsers } from '@/services/UserService';
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';

    export default {
        name: 'Developers',
        components: {
            DevelopersFormCard,
            DevelopersListCard,
            LoadingSpinner,
            LoadingError,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                developers: [],
                search: null,
                languages: [],
                skills: [],
                locations: [],
            }
        },
        mounted() {
            this.getDevelopers();
        },
        methods: {
            async getDevelopers() {
                this.loading = true;
                try {
                    const { data: developers } = await getUsers(
                        true,
                        this.search,
                        this.languages,
                        this.skills,
                        this.locations,
                        null,
                        null,
                    );
                    this.developers = developers;
                    this.loadingError = null;
                } catch (error) {
                    this.loadingError = error;
                } finally {
                    this.loading = false;
                }
            },
        },
    }
</script>
