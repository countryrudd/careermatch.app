<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-75" />
        <LoadingError v-else-if="loadingError" class="vh-75" />
        <div v-else>
            <section class="d-flex flex-column align-items-center mb-4">
                <div v-if="job.logo_url" class="col-2 mb-3">
                    <img :src="job.logo_url"
                         :alt="job.title"
                         style="max-height: 100%; max-width: 100%; display: block;">
                </div>
                <h3 class="text-center">{{ job.title }}</h3>
                <p class="text-center"><em>{{ job.company_name }}</em></p>
                <a class="btn btn-primary mt-4" v-bind:href="'mailto:' + job.email">Apply for this Position</a>
            </section>
            <section class="row no-gutters">
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
                    <h4 class="mb-1" style="text-align: center">Other Open Positions</h4>
                    <JobOtherPositionsCard :jobs="jobs" />
                </div>
            </section>
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
    import { getCompanyJobs } from '@/services/JobService';

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
            '$route.params.id'(){
                this.getJob();
            }
        },
        mounted() {
            this.getJob();
        },
        methods: {
            async getJob() {
                try {
                    const { data: job } = await getJob(this.$route.params.id);
                    this.job = job;
                    const { data: jobs } = await getCompanyJobs(true);
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

