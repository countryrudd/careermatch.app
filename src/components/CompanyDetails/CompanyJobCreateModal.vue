<template>
    <Modal :id="id" :static-backdrop="processing" centered>
        <template #body>
            <form v-if="job" @submit.prevent="createJob()">
                <fieldset :disabled="processing" class="d-flex flex-column">
                    <div v-if="processingError" class="text-danger mb-4">
                        Failed to submit position application. Please contact support if this problem persists.
                    </div>
                    <div class="d-flex align-items-center mb-3">
                        <h5 class="mb-0">Creating Job for {{ company.name }}</h5>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                    </div>
                    <div class="mb-2">
                        <label for="title">Title</label>
                        <input v-model="job.title" id="title" type="text" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="location">Location</label>
                        <input v-model="job.location" id="location" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="mb-1">Skills</label>
                        <input v-if="!job.skills.length"
                               oninvalid="this.setCustomValidity('Please enter a skill required for this job.')"
                               class="hidden-input"
                               required>
                        <form @submit.prevent>
                            <DevelopersFormCardSection title=""
                                                       :selections="job.skills"
                                                       type="skill"
                                                       @update:skill="job.skills = $event" />
                        </form>
                    </div>
                    <div class="mb-3">
                        <label class="mb-1">Languages</label>
                        <input v-if="!job.languages.length"
                               oninvalid="this.setCustomValidity('Please enter a spoken or written language required for this job.')"
                               class="hidden-input"
                               required>
                        <form @submit.prevent>
                            <DevelopersFormCardSection title=""
                                                       :selections="job.languages"
                                                       type="language"
                                                       @update:language="job.languages = $event" />
                        </form>
                    </div>
                    <div class="mb-3">
                        <label class="mb-1">Workplace Cultures</label>
                        <form @submit.prevent>
                            <DevelopersFormCardSection title=""
                                                       :selections="job.cultures"
                                                       type="culture"
                                                       @update:culture="job.cultures = $event" />
                        </form>
                    </div>
                    <div class="mb-2">
                        <label for="description">Description</label>
                        <textarea v-model="job.description"
                                  id="description"
                                  class="form-control"
                                  maxlength="200"
                                  required />
                    </div>
                    <button type="submit"
                            class="btn btn-sm mt-3 ms-auto"
                            :class="[processingError ? 'btn-outline-danger' : 'btn-primary']">
                        <span v-if="processing"
                              class="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true" />
                        {{ processingError ? 'Try Again' : 'Apply' }}
                    </button>
                </fieldset>
            </form>
        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal';
    import DevelopersFormCardSection from '@/components/Developers/DevelopersFormCardSection';
    import { createJob } from '@/services/JobService';
    import { getCompany } from '@/services/CompanyService';

    export default {
        name: 'CompanyJobCreateModal',
        components: {
            Modal,
            DevelopersFormCardSection,
        },
        props: {
            id: { type: String, required: true },
            company: { type: Object, required: true },
        },
        data() {
            return {
                processing: false,
                processingError: null,
                job: null,
            }
        },
        mounted() {
            this.initJobObject();
        },
        methods: {
            initJobObject() {
                this.job = {
                    title: null,
                    location: null,
                    description: null,
                    languages: [],
                    skills: [],
                    cultures: [],
                    company_id: this.company.id,
                }
            },
            async createJob() {
                this.processing = true;
                try {
                    await createJob(this.job);
                    const { data: company } = await getCompany(this.company.id)
                    this.$emit('update:company', company);
                    this.initJobObject();
                    window.bootstrap.Modal.getInstance(document.getElementById(this.id)).hide();
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            }
        },
    }
</script>

<style scoped>
    .hidden-input {
        opacity: 0;
        width: 0;
        position: absolute;
    }
</style>
