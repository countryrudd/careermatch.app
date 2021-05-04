<template>
    <div class="d-flex justify-content-center">
        <div class="col-xl-8">
            <div class="card min-vh-50">
                <div :disabled="processing" class="card-body d-flex flex-column text-break text-center">
                    <span v-if="processingError" class="text-danger">
                        Error creating company. Please contact support if this problem persists.
                    </span>
                    <fieldset :disabled="processing" class="flex-fill d-flex align-items-center justify-content-center">
                        <transition name="fade" mode="out-in">
                            <div v-if="currentPage === 1" :key="1" class="d-flex flex-column">
                                <div class="text-center">
                                    An awesome company is joining Dev<span class="text-primary">Link</span>!
                                </div>
                                <button @click="currentPage++"
                                        class="btn btn-sm btn-outline-primary mt-3 mx-auto">
                                    Begin
                                </button>
                            </div>
                            <div v-else-if="currentPage === 2" :key="2">
                                <form @submit.prevent="currentPage++" class="d-flex flex-column align-items-center">
                                    <transition name="fade" mode="out-in">
                                        <span v-if="company.name" :key="1">
                                            Oh, that's right! They're called
                                            <span class="text-primary">{{ company.name }}!</span>
                                        </span>
                                        <span v-else :key="2">
                                            What is their name again?
                                        </span>
                                    </transition>
                                    <div>
                                        <input v-model="company.name"
                                               type="text"
                                               class="form-control form-control-sm mt-3"
                                               required>
                                    </div>
                                    <div class="d-flex justify-content-center mt-3">
                                        <button @click="currentPage--"
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary me-2">
                                            Back
                                        </button>
                                        <transition name="fade">
                                            <button v-if="company.name"
                                                    type="submit"
                                                    class="btn btn-sm btn-outline-primary">
                                                Continue
                                            </button>
                                        </transition>
                                    </div>
                                </form>
                            </div>
                            <div v-else-if="currentPage === 3" :key="3">
                                <form @submit.prevent="currentPage++" class="d-flex flex-column align-items-center">
                                    <transition name="fade" mode="out-in">
                                        <span v-if="company.location" key="company_location_1">
                                            We love <span class="text-primary">{{ company.location }}</span>!
                                        </span>
                                        <span v-else key="company_location_0">
                                            Where did you say they are from?
                                        </span>
                                    </transition>
                                    <div>
                                        <input v-model="company.location"
                                               type="text"
                                               class="form-control form-control-sm mt-3"
                                               required>
                                    </div>
                                    <div class="d-flex justify-content-center mt-3">
                                        <button @click="currentPage--"
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary me-2">
                                            Back
                                        </button>
                                        <transition name="fade">
                                            <button v-if="company.location"
                                                    type="submit"
                                                    class="btn btn-sm btn-outline-primary">
                                                Continue
                                            </button>
                                        </transition>
                                    </div>
                                </form>
                            </div>
                            <div v-else-if="currentPage === 4" :key="4">
                                <form @submit.prevent="currentPage++" class="d-flex flex-column align-items-center">
                                    <transition name="fade" mode="out-in">
                                        <span v-if="company.slogan" key="company_slogan_1">
                                            "<span class="text-primary">{{ company.slogan }}</span>" Wow, that's great!
                                        </span>
                                        <span v-else key="company_slogan_0">
                                            Do they have a catchy slogan or description?
                                        </span>
                                    </transition>
                                    <div>
                                        <input v-model="company.slogan"
                                               type="text"
                                               class="form-control form-control-sm mt-3">
                                    </div>
                                    <div class="d-flex justify-content-center mt-3">
                                        <button @click="currentPage--"
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary me-2">
                                            Back
                                        </button>
                                        <transition name="fade">
                                            <button type="submit"
                                                    class="btn btn-sm btn-outline-primary">
                                                <transition name="fade" mode="out-in">
                                                    <span v-if="company.slogan" key="company_slogan_1">
                                                        Continue
                                                    </span>
                                                    <span v-else key="company_slogan_0">
                                                        Skip
                                                    </span>
                                                </transition>
                                            </button>
                                        </transition>
                                    </div>
                                </form>
                            </div>
                            <div v-else-if="currentPage === 5" :key="5">
                                <form @submit.prevent="currentPage++"
                                      class="d-flex flex-column align-items-center py-3 align-items-center">
                                    <transition-group name="fade-in" class="d-flex align-items-center">
                                        <div v-if="!image_loading && !valid_logo" key="0">
                                            <FontAwesomeIcon icon="building" style="font-size: 5vw;" />
                                        </div>
                                        <div v-show="!image_loading && valid_logo"
                                             key="1"
                                             class="d-flex justify-content-center">
                                            <img v-show="!image_loading && valid_logo"
                                                 @load="valid_logo = true; image_loading = false;"
                                                 @error="valid_logo = false; image_loading = false;"
                                                 :src="company.logo_url"
                                                 :alt="company.name"
                                                 style="max-height: 100%; max-width: 25%; display: block;">
                                        </div>
                                    </transition-group>
                                    <transition name="fade" mode="out-in">
                                        <span v-if="company.logo_url && !valid_logo" :key="1" class="text-danger mt-3">
                                            It looks like that URL doesn't work :(
                                        </span>
                                        <span v-else-if="company.logo_url" :key="2" class="mt-3">
                                            Looks great!
                                        </span>
                                        <span v-else key="0" class="mt-3">
                                            Do they have a fancy logo?
                                        </span>
                                    </transition>
                                    <div>
                                        <input v-model="company.logo_url"
                                               type="url"
                                               class="form-control form-control-sm mt-3">
                                    </div>
                                    <div class="d-flex justify-content-center mt-3">
                                        <button @click="currentPage--"
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary me-2">
                                            Back
                                        </button>
                                        <transition name="fade">
                                            <button type="submit"
                                                    class="btn btn-sm btn-outline-primary">
                                                <transition name="fade" mode="out-in">
                                                    <span v-if="company.logo_url && valid_logo" :key="1">
                                                        Continue
                                                    </span>
                                                    <span v-else :key="2">
                                                        Skip
                                                    </span>
                                                </transition>
                                            </button>
                                        </transition>
                                    </div>
                                </form>
                            </div>
                            <div v-else-if="currentPage === 6" :key="6">
                                <form @submit.prevent="createCompany()"
                                      class="d-flex flex-column align-items-center py-3">
                                    <img v-if="valid_logo"
                                         :src="company.logo_url"
                                         :alt="company.name"
                                         style="max-height: 100%; max-width: 25%; display: block;">
                                    <FontAwesomeIcon v-else icon="building" style="font-size: 5vw;" />
                                    <h5 class="text-primary mt-3">{{ company.name }}</h5>
                                    <span v-if="company.slogan" class="mb-2">{{ company.slogan }}</span>
                                    <small>{{ company.location }}</small>
                                    <div class="d-flex justify-content-center mt-3">
                                        <button @click="currentPage--"
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary me-2">
                                            Back
                                        </button>
                                        <button type="submit" class="btn btn-sm btn-outline-primary">
                                            <span v-if="processing"
                                                  class="spinner-border spinner-border-sm me-1"
                                                  role="status"
                                                  aria-hidden="true" />
                                            <span v-if="processingError">
                                                Try Again
                                            </span>
                                            <span v-else>
                                                Finish
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </transition>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { createCompany } from '@/services/CompanyService';

    export default {
        name: 'CreateCompanyVue',
        components: {
            FontAwesomeIcon,
        },
        data() {
            return {
                creating: false,
                processing: false,
                processingError: null,
                company: {
                    name: null,
                    location: null,
                    slogan: '',
                    logo_url: '',
                },
                valid_logo: false,
                image_loading: false,
                currentPage: 1,
            }
        },
        watch: {
            'company.logo_url'() {
                this.image_loading = true;
            },
            company: {
                handler() {
                    this.processingError = null;
                },
                deep: true,
            }
        },
        methods: {
            async createCompany() {
                this.processing = true;
                this.processingError = null;
                try {
                    const { data: company } = await createCompany(this.company);
                    // TODO: Redirect to CompanyDetails page.
                    this.$router.push({ name: 'Developers' })
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            }
        }
    }
</script>
