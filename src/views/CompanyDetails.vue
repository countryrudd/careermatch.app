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
                <div v-if="companyPosition && (companyPosition.can_edit)"
                     class="dropdown"
                     style="position: absolute; right: 10px; top: 10px;">
                    <button type="button"
                            class="btn btn-sm btn-outline-light text-nowrap"
                            data-bs-target="#company-settings-dropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <FontAwesomeIcon icon="pencil-alt" />
                    </button>
                    <ul id="company-settings-dropdown" class="dropdown-menu dropdown-menu-end">
                        <li v-if="companyPosition.can_edit">
                            <button data-bs-target="#company-edit-modal"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                    role="link"
                                    class="dropdown-item">
                                Edit Company
                            </button>
                        </li>
                    </ul>
                </div>
                <a :href="`mailto:${company.email}`"
                   role="button"
                   class="btn btn-sm btn-outline-light text-nowrap"
                   style="position: absolute; right: 10px; bottom: 10px;">
                    Contact Us
                </a>
            </section>
            <section class="py-4 text-center">
                <h2 class="text-secondary mb-3">We are <span class="text-primary">{{ company.name }}</span></h2>
                <h5 class="text-secondary">{{ company.slogan }}</h5>
                <h6 class="text-secondary">{{ company.location }}</h6>
            </section>
            <section v-if="company.jobs.length">
                <h4 class="mb-3">We're Hiring!</h4>
                <div class="row">
                    <div v-for="job in company.jobs" :key="job.id" class="col-xl-6">
                        <div class="card">
                            <div class="card-body d-flex flex-column">
                                <router-link :to="{ name: 'JobDetails', query: { id: job.id }}"
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
            <section v-if="company.positions.length">
                <h4 class="mb-3">Our Team</h4>
                <div class="row">
                    <div v-for="position in company.positions" :key="position.id" class="col-6 col-xl-3">
                        <div class="card">
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
            <CompanyEditModal v-if="companyPosition" :company.sync="company" id="company-edit-modal" />
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import { getCompany } from '@/services/CompanyService';
    import CompanyEditModal from '@/components/CompanyDetails/CompanyEditModal';

    export default {
        name: 'CompanyDetails',
        components: {
            LoadingSpinner,
            LoadingError,
            CompanyEditModal,
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
                    return this.$auth.user.positions.find(position => position.company.id === this.company.id);
                }
                return undefined;
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
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 100px;
        margin-bottom: 30px;
    }
</style>
