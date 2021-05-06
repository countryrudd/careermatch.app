<template>
    <div v-if="editUser" class="col">
        <button type="button "
                class="btn btn-primary btn-right"
                data-bs-toggle="modal"
                data-bs-target="#userDetailsModal">
            Edit Profile
        </button>
        <Modal id="userDetailsModal">
            <template v-slot:header>
                <h1> Edit Profile </h1>
            </template>
            <template v-slot:body>
                <form @submit.prevent="editProfile()">
                    <h4>Edit Location</h4>
                    <input v-model="editUser.location" type="text" required><br><br>
                    <h4>Edit Location Flexibility</h4>
                    <input v-model="editUser.location_flexibility" type="text" required><br><br>
                    <h4>Edit Description</h4>
                    <textarea v-model="editUser.bio" rows="4" cols="50" required /><br>
                    <h4>Edit Skills</h4>
                    <form @submit.prevent>
                        <DevelopersFormCardSection title=""
                                                   :selections="editUser.skills"
                                                   type="skill"
                                                   @update:skill="editUser.skills = $event" />
                    </form>
                    <h4>Edit Languages</h4>
                    <form @submit.prevent>
                        <DevelopersFormCardSection title=""
                                                   :selections="editUser.languages"
                                                   type="language"
                                                   @update:language="editUser.languages = $event" />
                    </form>
                </form>
            </template>
            <template v-slot:footer>
                <button type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal">
                    Close
                </button>
                <button type="submit"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        @click="editProfile">
                    Save
                </button>
            </template>
        </Modal>
    </div>
</template>

<script>
    import Modal from '@/components/Modal';
    import { editProfile } from '@/services/UserService';
    import DevelopersFormCardSection from '@/components/Developers/DevelopersFormCardSection';

    export default {
        name: 'EditProfile',
        components: {
            Modal,
            DevelopersFormCardSection,
        },
        props: {
            user: { type: Object, required: true }
        },
        data: () => ({
            processing: false,
            processingError: null,
            valid_image: true,
            editUser: null,
        }),
        mounted() {
            this.editUser = { ...this.user };
        },
        methods: {
            async editProfile() {
                this.processing = true;
                this.processingError = null;
                try {
                    const { data: user } = await editProfile(this.$route.params.id, this.editUser);
                    this.$emit('update:user', user);
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            }
        },
    }
</script>
