<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-50" />
        <LoadingError v-else-if="loadingError" class="vh-50" />
        <div v-else-if="company !== null">
            <section class="d-flex align-items-center justify-content-center min-vh-25"
                     style="background-image: linear-gradient( 135deg, #5EFFACE8 10%, #736EFE 100%); position: relative;">
                <div v-if="company.logo_url" class="col-8 col-xl-2">
                    <img :src="company.logo_url"
                         :alt="company.name"
                         style="max-height: 100%; max-width: 100%; display: block;">
                </div>
                <div v-if="companyPosition"
                     class="d-flex justify-content-end flex-wrap"
                     style="position: absolute; right: 10px; top: 10px;">
                    <CompanyNotification v-if="companyPosition.is_admin && pendingEmployees.length"
                                         :company.sync="company"
                                         :pending-positions="pendingEmployees"
                                         :current-user-position="companyPosition"
                                         class="mb-2" />
                    <CompanyJobCreateButton v-if="companyPosition.can_create_jobs"
                                            :company.sync="company"
                                            :current-user-position="companyPosition"
                                            class="ms-2 mb-2" />
                    <CompanySettingsDropdown :company.sync="company"
                                             :current-user-position="companyPosition"
                                             class="ms-2 mb-2" />
                </div>
                <div class="d-flex flex-wrap justify-content-end" style="position: absolute; right: 10px; bottom: 10px;">
                    <button v-if="!companyPosition"
                            data-bs-target="#company-position-create-modal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            type="button"
                            class="btn btn-sm btn-outline-light text-nowrap mb-1">
                        Do you work here?
                    </button>
                    <a :href="`mailto:${company.email}`"
                       role="button"
                       class="btn btn-sm btn-outline-light text-nowrap ms-2 mb-1">
                        Contact Us
                    </a>
                </div>
            </section>
            <section class="py-4 text-center">
                <h2 class="text-secondary mb-3">We are <span class="text-primary">{{ company.name }}</span></h2>
                <h5 class="text-secondary">{{ company.slogan }}</h5>
                <h6 class="text-secondary">{{ company.location }}</h6>
            </section>
            <section v-if="company.jobs.length" class="mb-4">
                <h4 class="mb-3">We're Hiring!</h4>
                <div class="row">
                    <div v-for="job in company.jobs" :key="job.id" class="col-xl-6">
                        <div class="card mb-3">
                            <div class="card-body d-flex flex-column">
                                <router-link :to="{ name: 'JobDetails', params: { id: job.id }}"
                                             style="text-decoration: none;">
                                    <h5 class="mb-2">{{ job.title }}</h5>
                                </router-link>
                                <span class="mb-3">{{ job.location }}</span>
                                <span v-if="job.description">{{ job.description.substring(0, 250) + '...' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section v-if="company.positions.length" class="mb-4">
                <h4 class="mb-3">Our Team</h4>
                <div class="row">
                    <div v-for="position in activeEmployees" :key="position.id" class="col-6 col-xl-3">
                        <div class="card mb-3">
                            <div class="card-body d-flex flex-column align-items-center text-center">
                                <div v-if="position.user.avatar_url" class="avatar" :style="{ 'background-image': `url(${position.user.avatar_url})` }" />
                                <router-link :to="{ name: 'UserDetails', params: { id: position.user.id }}"
                                             style="text-decoration: none;">
                                    <h5 class="mb-2">{{ position.user.name }}</h5>
                                </router-link>
                                <span>{{ position.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CompanyPositionCreateModal id="company-position-create-modal" :company.sync="company" />
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import CompanySettingsDropdown from '@/components/CompanyDetails/CompanySettingsDropdown';
    import CompanyPositionCreateModal from '@/components/CompanyDetails/CompanyPositionCreateModal';
    import CompanyNotification from '@/components/CompanyDetails/CompanyNotification';
    import CompanyJobCreateButton from '@/components/CompanyDetails/CompanyJobCreateButton';
    import { getCompany } from '@/services/CompanyService';

    export default {
        name: 'CompanyDetails',
        components: {
            LoadingSpinner,
            LoadingError,
            CompanyNotification,
            CompanySettingsDropdown,
            CompanyPositionCreateModal,
            CompanyJobCreateButton,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                company: null,
            }
        },
        computed: {
            companyPosition() {
                if (this.$auth.isAuthenticated) {
                    const positions = this.$auth?.user?.positions;
                    if (positions) {
                        return positions.find(position => position.company.id === this.company.id);
                    }
                }
                return undefined;
            },
            activeEmployees() {
                return this.company.positions.filter(position => position.activated)
            },
            pendingEmployees() {
                return this.company.positions.filter(position => !position.activated)
            },
        },
        watch: {
            '$route.params.id'(){
                this.getCompany();
            }
        },
        mounted() {
            this.getCompany();
        },
        methods: {
            async getCompany() {
                try {
                    const { data: company } = await getCompany(this.$route.params.id);
                    this.company = company;
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
    }
</script>


<style scoped>
    .avatar {
        position: relative;
        width: 150px;
        height: 150px;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 100px;
        margin-bottom: 30px;
    }
</style>
