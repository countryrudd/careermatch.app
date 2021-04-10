<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <div v-else>
            <h3 class="mb-4">Developers</h3>
            <div class="row no-gutters">
                <div class="col">
                    <DevelopersFormCard />
                </div>
                <div class="col-xl-9">
                    <DevelopersListCard :developers="developers" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import DevelopersFormCard from '@/components/Developers/DevelopersFormCard';
    import DevelopersListCard from '@/components/Developers/DevelopersListCard';
    import { getUsers } from '@/services/UserService';

    export default {
        name: 'Developers',
        components: {
            LoadingSpinner,
            LoadingError,
            DevelopersFormCard,
            DevelopersListCard,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                developers: [],
            }
        },
        async mounted() {
            try {
                const { data: developers } = await getUsers(true);
                this.developers = developers;
            } catch (error) {
                this.loadingError = error;
            } finally {
                this.loading = false;
            }
        }
    }
</script>
