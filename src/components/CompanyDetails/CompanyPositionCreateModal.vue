<template>
    <Modal :id="id" :static-backdrop="processing" centered>
        <template #body>
            <form @submit.prevent="createCompanyPosition()">
                <fieldset :disabled="processing" class="d-flex flex-column">
                    <div v-if="processingError" class="text-danger mb-4">
                        Failed to submit position application. Please contact support if this problem persists.
                    </div>
                    <div class="d-flex align-items-center mb-3">
                        <h5 class="mb-0">Tell us a little bit about your position at {{ company.name }}</h5>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                    </div>
                    <div class="mb-2">
                        <label for="title">Title</label>
                        <input v-model="position.title" id="title" type="text" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="start-date">Start Date</label>
                        <input v-model="position.start_date"
                               id="start-date"
                               type="date"
                               :max="new Date().toISOString().split('T')[0]"
                               class="form-control"
                               required>
                    </div>
                    <div class="mb-2">
                        <label for="description">Description</label>
                        <textarea v-model="position.description"
                                  id="description"
                                  class="form-control"
                                  maxlength="200" />
                    </div>
                    <div class="my-2">
                        An administrative user for this Company will need to accept your position application.
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
    import { getCompany } from '@/services/CompanyService';
    import { createCompanyPosition } from '@/services/CompanyPositionService';

    export default {
        name: 'CompanyPositionCreateModal',
        components: {
            Modal,
        },
        props: {
            id: { type: String, required: true },
            company: { type: Object, required: true },
        },
        data() {
            return {
                processing: false,
                processingError: null,
                position: {
                    title: null,
                    description: '',
                    start_date: null,
                    end_date: null,
                    user_id: this.$auth.user.id,
                    company_id: this.company.id,
                },
            }
        },
        methods: {
            async createCompanyPosition() {
                this.processing = true;
                try {
                    await createCompanyPosition(this.position);
                    await this.$auth._setUserState();
                    const { data: company } = await getCompany(this.company.id)
                    this.$emit('update:company', company);
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
