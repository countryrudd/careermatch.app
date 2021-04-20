<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-50" />
        <LoadingError v-else-if="loadingError" class="vh-50" />
        <div v-else-if="company !== null" class="d-flex flex-column align-items-center">
            <div class="d-flex align-items-center justify-content-center">
                <picture>
                    <img :src="company.logo_url" style="height: 100px; width: 250px;">
                </picture>
            </div>
            <section class="mb-4">
                <div class="container d-flex flex-column align-items-center">
                    <div class="d-flex align-items-center">
                        <h2 class="mb-3">{{ company.name }}</h2>
                    </div>
                    <h5 class="text-center">{{ company.slogan }}</h5>
                    <h6 class="text-center">{{ company.location }}</h6>
                </div>
            </section>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Front-End Developer</h5>
                            <div class="mr-2" style="display: flex;align-items: center;">
                                <ul style="position:relative; right:32px;">
                                    <li v-for="skills in requiredSkills" :key="skills.id"> {{ skills }} </li>
                                </ul>
                            </div>
                            <p class="job-location">Charlotte</p>
                            <router-link :to="{ name: 'JobDetails', query: { id: 'ccb92254-5279-48e8-b413-5d725d73b58d' } }"
                                         tag="button"
                                         class="btn btn-primary">
                                View More
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Data Engineer</h5>
                            <div class="mr-2" style="display: flex;align-items: center;">
                                <ul style="position:relative; right:32px;list-style: none;float:left;">
                                    <li v-for="skills in requiredSkills" :key="skills.id"> {{ skills }} </li>
                                </ul>
                            </div>
                            <p class="job-location">Charlotte</p>
                            <button type="button" class="btn btn-primary">View More</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="d-flex">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jobModal" data-bs-whatever="@getbootstrap" id="addJob">Add Job</button>
                </div>
                <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">New Job</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Job Title:</label>
                                        <input type="text" class="form-control" id="job-title">
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Skills:</label>
                                        <textarea class="form-control" id="skills" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Location:</label>
                                        <textarea class="form-control" id="location" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Requirements:</label>
                                        <textarea class="form-control" id="job-requirements" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group" id="main">
                <div class="d-flex">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal" data-bs-whatever="@getbootstrap" id="editProfile">Edit Profile</button>
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
                                        <label for="recipient-name" class="col-form-label">Company Title:</label>
                                        <input type="text" class="form-control" id="company-title" v-model="company.name">
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Company Slogan:</label>
                                        <textarea class="form-control" id="company-slogan" v-model="company.slogan" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Company Location:</label>
                                        <textarea class="form-control" id="company-location" v-model="company.location" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="editButton" data-bs-dismiss="modal" @click="add">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <component is="style">
            .form-group #addJob {
            position:relative;
            top: 62px;
            left: 65px;
            display: flex;
            }

            .form-group #editProfile {
            position:relative;
            top: 24px;
            right: 75px;
            display: flex;
            }

            .row {
            position:relative;
            bottom: 25%;
            justify-content: center;
            width: 50%;
            display: flex;
            }

            ul li {
            list-style: none;
            float:left;
            }

            ul li:before {
            content: '\ffed';
            margin-right: 0.1em;
            color: green;
            }

            .accordion-item {
            position:relative;
            bottom:200px;
            right:400px;
            width: 300px;
            }

            .accordion-button::after {
            content: none;
            }
        </component>
    </div>
</template>

<script>
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import { getCompany } from '@/services/CompanyService';


    export default {
        name: 'Company',
        components: {
            LoadingSpinner,
            LoadingError
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                requiredSkills: ['JavaScript', 'Python'],
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
            async getCompany(){
                try {
                    const { data: company } = await getCompany(this.$route.params.id);
                    this.company = company;
                } catch (error) {
                    this.loadingError = error;
                } finally {
                    this.loading = false;
                }

            },
            add() {
                if(this.company.name !== '' || this.company.location !== '') {
                    if((this.company.name !== document.getElementById('company-title').value) ||
                        (this.company.location !== document.getElementById('company-location').value)){
                        this.company.name = document.getElementById('company-title').value;
                        this.company.location = document.getElementById('company-location').value;
                    } else {
                        return;
                    }
                } else {
                    document.getElementById('editButton').removeAttribute('data-bs-dismiss');
                    alert('enter some data please');
                }
            }
        }
    }
    


</script>
