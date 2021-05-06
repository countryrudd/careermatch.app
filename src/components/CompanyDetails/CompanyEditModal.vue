<template>
    <Modal :id="id" :static-backdrop="processing" :hide="hide" centered>
        <template #body>
            <form @submit.prevent="updateCompany()">
                <fieldset :disabled="processing" class="d-flex flex-column">
                    <div v-if="processingError" class="text-danger mb-4">
                        Failed to update company. Please contact support if this problem persists.
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <h5 class="mb-0">Editing {{ company.name }}</h5>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                    </div>
                    <div class="mb-2">
                        <label for="name">Name</label>
                        <input v-model="editCompany.name" id="name" type="text" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="location">Location</label>
                        <input v-model="editCompany.location" id="location" type="text" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="email">Contact Email</label>
                        <input v-model="editCompany.email" id="email" type="email" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="url">Logo URL</label>
                        <input v-model="editCompany.logo_url" id="url" type="url" class="form-control">
                    </div>
                    <div class="mb-2">
                        <label for="slogan">Slogan</label>
                        <input v-model="editCompany.slogan" id="slogan" type="text" class="form-control" maxlength="75">
                    </div>
                    <button type="submit"
                            class="btn btn-sm mt-3 ms-auto"
                            :class="[processingError ? 'btn-outline-danger' : 'btn-primary']">
                        <span v-if="processing"
                              class="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true" />
                        {{ processingError ? 'Try Again' : 'Save' }}
                    </button>
                </fieldset>
            </form>
        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal';
    import { getCompany, updateCompany } from '@/services/CompanyService';

    export default {
        name: 'CompanyEditModal',
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
                hide: false,
                editCompany: { ...this.company },
            }
        },
        methods: {
            async updateCompany() {
                this.processing = true;
                try {
                    const { data: company } = await updateCompany(this.company.id, this.editCompany);
                    const { data: detailedCompany } = await getCompany(company.id)
                    this.$emit('update:company', detailedCompany);
                    this.hide = true;
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            }
        },
    }
</script>
