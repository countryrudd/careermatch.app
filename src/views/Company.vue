<template>
    <div>
        <LoadingSpinner v-if="loading" class="vh-50" />
        <LoadingError v-else-if="loadingError" class="vh-50" />
        <div v-else-if="company !== null" class="d-flex flex-column align-items-center">
            <div class="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon="user" style="font-size: 5vw;" />
            </div>
            <br>
            <br>
            <section class="mb-4">
                <div class="container d-flex flex-column align-items-center">
                    <div class="d-flex align-items-center">
                        <h2 class="mb-3">{{ company.name }}</h2>
                    </div>
                    <h5 class="text-center">{{ company.slogan }}</h5>
                    <h6 class="text-center">{{ company.location }}</h6>
                </div>
            </section>
            <div class="form-group">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jobModal" data-bs-whatever="@getbootstrap" id="addJob">Add Job</button>
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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal" data-bs-whatever="@getbootstrap" id="editProfile">Edit Profile</button>
                <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
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
<!--
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div>
                                <p><strong>Front End Developer</strong></p>
                                <br>
                                <div class="mr-2" style="display: flex;align-items: center;">
                                    <ul style="position:relative; right:32px;">
                                        <li v-for="skills in requiredSkills" :key="skills.id"> {{ skills }} </li>
                                    </ul>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>Charlotte</p>
                            <p>We would like you to be able to relocate based on our needs at times. 1-3 years of experience would be preferred.</p>
                        </div>
                    </div>
                </div>
            </div>
-->

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
                            <div class="form-group" id="main">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewJobModal" data-bs-whatever="@getbootstrap" id="viewJob">View More</button>
                                <div class="modal fade" id="viewJobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="mb-3">
                                                        <label for="recipient-name" class="col-form-label">Job Title:</label>
                                                        <input type="text" class="form-control" id="job">
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="message-text" class="col-form-label">Skills:</label>
                                                        <textarea class="form-control" id="skills" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="message-text" class="col-form-label">Description:</label>
                                                        <textarea class="form-control" id="company-location" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="message-text" class="col-form-label">Requirements:</label>
                                                        <textarea class="form-control" id="company-location" />
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
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Data Engineer</h5>
                            <div class="mr-2" style="display: flex;align-items: center;">
                                <ul style="position:relative; right:32px;">
                                    <li v-for="skills in requiredSkills" :key="skills.id"> {{ skills }} </li>
                                </ul>
                            </div>
                            <p class="job-location">Charlotte</p>
                            <a href="#" class="btn btn-primary">View More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import { getCompany } from '@/services/CompanyService';

    export default {
        name: 'Company',
        components: {
            FontAwesomeIcon,
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

        async mounted()  {
            this.loading = true;
            try {
                const { data: company } = await getCompany(
                    this.$route.params.id
                );
                this.company = company;
                this.loadingError = null;
            } catch ({ response: { data }}) {
                this.loadingError = data;
            } finally {
                this.loading = false;
            }
        },

        methods: {
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
    

    // ccb92254-5279-48e8-b413-5d725d73b58c
</script>


<style>
    .form-group #addJob {
    position:absolute;
    bottom: 9%;
    right: 43%;
    }

    .form-group #editProfile {
        position:absolute;
        bottom: 9%;
        right: 52%;
    }

    .row {
        position:absolute;
        bottom: 25%;
        justify-content: center;
        width: 50%;
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
</style>
