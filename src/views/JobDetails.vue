<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <div v-else>
            <h3 class="mb-1" style="text-align: center">{{ job.title }}</h3>
            <p class="mb-4" style="text-align: center"><em>{{ job.company_name }}</em></p>
            <br>
            <div class="row no-gutters">

                <div class="col-xl-6">
                    <h4 class="mb-1" style="text-align: center">Job Information</h4>
                    <JobDetailCard :job="job" />
                </div>


                <div class="col-xl-6">
                    <h4 class="mb-1" style="text-align: center">Job Description</h4>
                    <JobDescriptionCard :job="job" />
                </div>


                <div class="col-xl-6">
                    <br>
                    <h4 class="mb-1" style="text-align: center">Company Information</h4>
                    <JobCompanyCard :job="job" />
                </div>


                <div class="col-xl-6">
                    <br>
                    <h4 class="mb-1" style="text-align: center">Open Positions</h4>
                    <JobOtherPositionsCard :jobs="jobs" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import JobDetailCard from '@/components/Jobs/JobDetailCard';
    import JobDescriptionCard from '@/components/Jobs/JobDescriptionCard';
    import JobCompanyCard from '@/components/Jobs/JobCompanyCard';
    import JobOtherPositionsCard from '@/components/Jobs/JobOtherPositionsCard';
    import { getJob } from '@/services/JobService';
    import { getJobs } from '@/services/JobService';

    export default {
        name: 'JobDetails',
        components: {
            LoadingSpinner,
            LoadingError,
            JobDetailCard,
            JobCompanyCard,
            JobDescriptionCard,
            JobOtherPositionsCard,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                job: null,
                jobs: [],
            }
        },
        watch: {
            '$route.query.id'(){
                this.getJob();
            }
        },
        mounted() {
            this.getJob();
        },

        methods: {
            async getJob(){
                try {
                    const { data: job } = await getJob(this.$route.query.id);
                    this.job = job;
                    const { data: jobs } = await getJobs(true);
                    this.jobs = jobs;
                } catch (error) {
                    this.loadingError = error;
                } finally {
                    this.loading = false;
                }

            }
        }
    }
</script>
