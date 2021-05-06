<template>
    <Modal :id="id" :static-backdrop="processing" centered>
        <template #body>
            <form @submit.prevent="deleteCompany()">
                <fieldset :disabled="processing" class="d-flex flex-column">
                    <div v-if="processingError" class="text-danger mb-4">
                        Failed to delete company. Please contact support if this problem persists.
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <h5 class="mb-0">Delete Profile</h5>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                    </div>
                    <span>
                        This action is irreversible. All listed jobs will be deleted.
                    </span>
                    <button type="submit"
                            class="btn btn-sm mt-3 ms-auto"
                            :class="[processingError ? 'btn-outline-danger' : 'btn-danger']">
                        <span v-if="processing"
                              class="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true" />
                        {{ processingError ? 'Try Again' : 'Delete' }}
                    </button>
                </fieldset>
            </form>
        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal';
    import { deleteCompany } from '@/services/CompanyService';

    export default {
        name: 'CompanyDeleteModal',
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
            }
        },
        methods: {
            async deleteCompany() {
                this.processing = true;
                try {
                    await deleteCompany(this.company.id);
                    await this.$auth._setUserState();
                    window.bootstrap.Modal.getInstance(document.getElementById(this.id)).hide();
                    this.$router.push({ name: 'Developers' });
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            },
        },
    }
</script>
