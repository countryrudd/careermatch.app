<template>
    <Modal :id="id" :static-backdrop="processing" centered>
        <template #body>
            <fieldset :disabled="processing" class="d-flex flex-column">
                <div v-if="processingError" class="text-danger mb-4">
                    Failed to submit. Please contact support if this problem persists.
                </div>
                <transition name="fade" mode="out-in">
                    <div v-if="editPosition !== null" :key="1">
                        <div class="d-flex align-items-center mb-4">
                            <h5 class="mb-0">
                                Configuring <span class="text-primary">{{ editPosition.user.name }}</span>
                            </h5>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                        </div>
                        <h6 class="mb-3">Title: <span class="text-primary">{{ editPosition.title }}</span></h6>
                        <form @submit.prevent="updateCompanyPosition()" class="d-flex flex-column">
                            <fieldset>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="can-edit">
                                    <label class="form-check-label" for="can-edit">
                                        This user can edit the company's details.
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="can-create-jobs">
                                    <label class="form-check-label" for="can-create-jobs">
                                        This user can post job listings on the company's behalf.
                                    </label>
                                </div>
                            </fieldset>
                            <div class="d-flex mt-4">
                                <button @click="editPosition = null"
                                        type="button"
                                        class="btn btn-sm btn-outline-secondary">
                                    Back
                                </button>
                                <button type="submit"
                                        class="btn btn-sm ms-auto"
                                        :class="[processingError ? 'btn-outline-danger' : 'btn-primary']">
                                    <span v-if="processing"
                                          class="spinner-border spinner-border-sm me-1"
                                          role="status"
                                          aria-hidden="true" />
                                    {{ processingError ? 'Try Again' : 'Accept' }}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div v-else class="d-flex flex-column" :key="2">
                        <div class="d-flex align-items-center mb-4">
                            <h5 class="mb-0">Pending Employee Connections for {{ company.name }}</h5>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Title</th>
                                    <th />
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="position in positions" :key="position.id">
                                    <td>{{ position.user.name }}</td>
                                    <td>{{ position.title }}</td>
                                    <th class="text-end">
                                        <button @click="editPosition = position" class="btn btn-sm btn-primary">
                                            Configure
                                        </button>
                                    </th>
                                    <th class="text-end">
                                        <button @click="deletePositionId = position.id"
                                                class="btn btn-sm btn-danger">
                                            <span v-if="deletePositionId === position.id"
                                                  class="spinner-border spinner-border-sm me-1"
                                                  role="status"
                                                  aria-hidden="true" />
                                            Deny
                                        </button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </transition>
            </fieldset>
        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal';
    import { getCompany } from '@/services/CompanyService';
    import { deleteCompanyPosition, updateCompanyPosition } from '@/services/CompanyPositionService';

    export default {
        name: 'CompanyPositionAcceptanceModal',
        components: {
            Modal,
        },
        props: {
            id: { type: String, required: true },
            company: { type: Object, required: true },
            positions: { type: Array, required: true },
        },
        data() {
            return {
                processing: false,
                processingError: null,
                editPosition: null,
                deletePositionId: null,
            }
        },
        watch: {
            editPosition() {
                this.processingError = null;
            },
            deletePositionId(value) {
                if (value) {
                    this.deleteCompanyPosition(value);
                }
            }
        },
        methods: {
            async updateCompanyPosition() {
                this.processing = true;
                try {
                    await updateCompanyPosition(this.editPosition.id, { ...this.editPosition, activated: true });
                    const { data: company } = await getCompany(this.company.id)
                    this.$emit('update:company', company);
                    window.bootstrap.Modal.getInstance(document.getElementById(this.id)).hide();
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            },
            async deleteCompanyPosition(id) {
                this.processing = true;
                try {
                    await deleteCompanyPosition(id);
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
