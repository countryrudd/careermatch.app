<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <div v-else>
            <h3 class="mb-4">Jobs</h3>
            <div class="row no-gutters">
                <div class="col">
                    <JobsFormCard />
                </div>
                <div class="col-xl-9">
                    <JobsListCard :jobs="jobs" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import JobsFormCard from '@/components/Jobs/JobsFormCard';
    import JobsListCard from '@/components/Jobs/JobsListCard';
    import { getJobs } from '@/services/JobService';

    export default {
        name: 'Jobs',
        components: {
            LoadingSpinner,
            LoadingError,
            JobsFormCard,
            JobsListCard,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                jobs: [],
            }
        },
        async mounted() {
            try {
                const { data: jobs } = await getJobs(true);
                this.jobs = jobs;
            } catch (error) {
                this.loadingError = error;
            } finally {
                this.loading = false;
            }
        }
    }
</script>
