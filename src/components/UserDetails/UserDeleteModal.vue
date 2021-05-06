<template>
    <Modal :id="id" :static-backdrop="processing" centered>
        <template #body>
            <form @submit.prevent="deleteUser()">
                <fieldset :disabled="processing" class="d-flex flex-column">
                    <div v-if="processingError" class="text-danger mb-4">
                        Failed to delete user. Please contact support if this problem persists.
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <h5 class="mb-0">Delete Profile</h5>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                    </div>
                    <span>
                        This action is irreversible.
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
    import { deleteUser } from '@/services/UserService';

    export default {
        name: 'UserDeleteModal',
        components: {
            Modal,
        },
        props: {
            id: { type: String, required: true },
            user: { type: Object, required: true },
        },
        data() {
            return {
                processing: false,
                processingError: null,
            }
        },
        methods: {
            async deleteUser() {
                this.processing = true;
                try {
                    await deleteUser(this.user.id);
                    window.bootstrap.Modal.getInstance(document.getElementById(this.id)).hide();
                    this.$auth.logout();
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            },
        },
    }
</script>
