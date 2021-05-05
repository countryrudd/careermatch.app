<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-50" />
        <LoadingError v-else-if="loadingError" class="vh-50" />
        <div v-else-if="company !== null">
            <section class="d-flex align-items-center justify-content-center min-vh-25"
                     style="background-image: linear-gradient( 135deg, #5EFFACE8 10%, #736EFE 100%);">
                <div v-if="company.logo_url" class="col-8 col-xl-2">
                    <img :src="company.logo_url"
                         :alt="company.name"
                         style="max-height: 100%; max-width: 100%; display: block;">
                </div>
            </section>
            <section class="py-4 text-center">
                <h2 class="text-secondary mb-3">We are <span class="text-primary">{{ company.name }}</span></h2>
                <h5 class="text-secondary">{{ company.slogan }}</h5>
                <h5 class="text-secondary">{{ company.email }}</h5>
                <h6 class="text-secondary">{{ company.location }}</h6>
            </section>
            <section v-if="company.jobs.length">
                <h4 class="mb-3">We're Hiring!</h4>
                <div class="row" style="margin-bottom:50px">
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
                <h4 class="mb-3">Employees</h4>
                <div class="row" style="margin-bottom:50px">
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
            
            <div class="form-group" id="main">
                <div class="d-flex">
                    <div class="center" style="margin-bottom: 20px;position: relative;top: 90%;left: 50%;-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal" data-bs-whatever="@getbootstrap" id="editProfile">Edit Profile</button>
                    </div>
                </div>
                <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="company-title" class="col-form-label">Company Title:</label>
                                        <input type="text" class="form-control" id="company-title" v-model="company.name">
                                    </div>
                                    <div class="mb-3">
                                        <label for="company-slogan" class="col-form-label">Company Slogan:</label>
                                        <textarea class="form-control" id="company-slogan" v-model="company.slogan" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="company-email" class="col-form-label">Company Email:</label>
                                        <textarea class="form-control" id="company-email" v-model="company.email" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="company-location" class="col-form-label">Company Location:</label>
                                        <textarea class="form-control" id="company-location" v-model="company.location" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="company-logo" class="col-form-label">Company Logo:</label>
                                        <textarea class="form-control" id="company-logo" v-model="company.logo_url" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="editButton" data-bs-dismiss="modal" @click="updateCompany">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import { getCompany } from '@/services/CompanyService';
    import { updateCompany } from '@/services/CompanyService';

    export default {
        name: 'CompanyDetails',
        components: {
            LoadingSpinner,
            LoadingError,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                company: null
            }
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
                    console.log(this.company);
                } catch (error) {
                    this.loadingError = error;
                } finally {
                    this.loading = false;
                }
            },
            async updateCompany() {
                try {
                    const { data: company } = await updateCompany(this.$route.params.id, this.company);
                } catch (error) {
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
