<template>
    <div class="card shadow">
        <div class="card-body">
            <LoadingSpinner v-if="loading" class="vh-50" />
            <LoadingError v-else-if="loadingError" class="vh-50" />
            <div v-else-if="jobs.length" class="d-flex flex-column align-items-center">
                <div class="w-100">
                    <div v-for="job in currentPageJobs" :key="job.id" class="row no-gutters mb-2">
                        <div class="col-2 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon v-if="invalidJobAvatars.includes(job.id)"
                                             icon="user"
                                             style="font-size: 5vw;" />
                            <img v-else
                                 :src="job.logo_url"
                                 :alt="job.title"
                                 @error="invalidJobAvatars.push(job.id)"
                                 style="max-height: 100%; max-width: 100%; display: block;">
                        </div>

                        <div class="col-10 pl-3">
                            <router-link :to="{ name: 'JobDetails', params: { id: job.id }}"
                                         style="text-decoration: none;">
                                <h5 class="mb-1">{{ job.title }}</h5>
                            </router-link>

                            <div class="d-flex">
                                <strong class="me-2">Language(s):</strong>
                                <div class="d-flex flex-wrap">
                                    <span v-for="language in job.languages" :key="language" class="me-2">
                                        {{ language }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex">
                                <strong class="me-2">Skill(s):</strong>
                                <div class="d-flex flex-wrap">
                                    <span v-for="skill in job.skills" :key="skill" class="me-2">
                                        {{ skill }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex">
                                <strong class="me-2">Workplace Culture(s):</strong>
                                <div class="d-flex flex-wrap">
                                    <span v-for="culture in job.cultures" :key="culture" class="me-2">
                                        {{ culture }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex">
                                <strong class="me-2">Location:</strong>
                                <span>{{ job.location }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <PaginationButtons :number-of-pages="numberOfPages" :page-number.sync="pageNumber" />
            </div>
            <div v-else class="vh-50 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon="search" class="mb-3" style="font-size: 2rem;" />
                    <div>No match found</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import PaginationButtons from '@/components/PaginationButtons';

    export default {
        name: 'JobsListCard',
        components: {
            LoadingSpinner,
            LoadingError,
            FontAwesomeIcon,
            PaginationButtons,
        },
        props: {
            loading: { type: Boolean, required: true },
            loadingError: { type: [String, null], default: null },
            jobs: { type: Array, required: true },
        },
        data() {
            return {
                pageNumber: 1,
                pageLength: 4,
                invalidJobAvatars: [],
            }
        },
        computed: {
            /**
             * The number of pages of Jobs.
             * @returns {number}
             */
            numberOfPages() {
                return Math.ceil(this.jobs.length / this.pageLength)
            },
            /**
             * The current page's Jobs.
             * @returns {Array<Object>}
             */
            currentPageJobs() {
                return this.jobs.slice(
                    (this.pageNumber - 1) * this.pageLength, this.pageNumber * this.pageLength
                );
            },
        },
    }
</script>
