<template>
    <Modal :id="id" :static-backdrop="processing" centered>
        <template #body>
            <form @submit.prevent="updateUser()">
                <fieldset :disabled="processing" class="d-flex flex-column">
                    <div v-if="processingError" class="text-danger mb-4">
                        Failed to update user. Please contact support if this problem persists.
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <h5 class="mb-0">{{ user.name }}</h5>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" />
                    </div>
                    <div class="mb-3">
                        <label for="location">Location</label>
                        <input v-model="editUser.location" id="location" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="headline">Headline</label>
                        <textarea v-model="editUser.bio" id="headline" class="form-control" maxlength="75" />
                    </div>
                    <div class="mb-3">
                        <label>Skills</label>
                        <form @submit.prevent>
                            <DevelopersFormCardSection title=""
                                                       :selections="editUser.skills"
                                                       type="skill"
                                                       @update:skill="editUser.skills = $event" />
                        </form>
                    </div>
                    <div class="mb-3">
                        <label>Languages</label>
                        <form @submit.prevent>
                            <DevelopersFormCardSection title=""
                                                       :selections="editUser.languages"
                                                       type="language"
                                                       @update:language="editUser.languages = $event" />
                        </form>
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
    import DevelopersFormCardSection from '@/components/Developers/DevelopersFormCardSection';
    import { getUser, updateUser } from '@/services/UserService';

    export default {
        name: 'UserEditModal',
        components: {
            Modal,
            DevelopersFormCardSection,
        },
        props: {
            id: { type: String, required: true },
            user: { type: Object, required: true },
        },
        data() {
            return {
                processing: false,
                processingError: null,
                editUser: { ...this.user },
            }
        },
        methods: {
            async updateUser() {
                this.processing = true;
                try {
                    const { data: user } = await updateUser(this.user.id, this.editUser);
                    const { data: detailedUser } = await getUser(user.id)
                    this.$emit('update:user', detailedUser);
                    window.bootstrap.Modal.getInstance(document.getElementById(this.id)).hide();
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            },
        },
    }
</script>
