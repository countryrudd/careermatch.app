<template>
    <div>
        <h3 class="mb-4">Jobs</h3>
        <div class="row no-gutters">
            <div class="col">
                <JobsFormCard :search.sync="search"
                              :languages.sync="languages"
                              :skills.sync="skills"
                              :locations.sync="locations"
                              :cultures.sync="cultures"
                              :loading="loading"
                              @getJobs="getJobs()" />
            </div>
            <div class="col-xl-9">
                <JobsListCard :loading="loading"
                              :loading-error="loadingError"
                              :jobs="jobs" />
            </div>
        </div>
    </div>
</template>

<script>
    import JobsFormCard from '@/components/Jobs/JobsFormCard';
    import JobsListCard from '@/components/Jobs/JobsListCard';
    import { getJobs } from '@/services/JobService';


    export default {
        name: 'Jobs',
        components: {
            JobsFormCard,
            JobsListCard,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                jobs: [],
                search: null,
                languages: [],
                skills: [],
                locations: [],
                cultures: [],
            }
        },
        mounted() {
            this.getJobs();
        },
        methods: {
            async getJobs() {
                this.loading = true;
                try {
                    const { data: jobs } = await getJobs(
                        true,
                        this.search,
                        this.languages,
                        this.skills,
                        this.locations,
                        this.cultures,
                    );
                    this.jobs = jobs;
                    this.loadingError = null;
                } catch ({ response: { data }}) {
                    this.loadingError = data;
                } finally {
                    this.loading = false;
                }
            },
        },
    }
</script>
