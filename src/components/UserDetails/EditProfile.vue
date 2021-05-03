<template>
    <div class="col">
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
                    <h4>Edit Image</h4>
                    <input v-model="user.avatar_url" type="text" required><br><br>
                    <h4>Edit Location</h4>
                    <input v-model="user.location" type="text" required><br><br>
                    <h4>Edit LinkedIn Id</h4>
                    <input v-model="user.linkedin_id" type="text" required><br><br>
                    <h4>Edit Description</h4>
                    <textarea v-model="user.bio" rows="4" cols="50" required /><br>
                    <h4>Edit Skills</h4>
                    <textarea v-model="user.skills" type="list" rows="4" cols="50" required /><br>
                    <h4>Edit Languages</h4>
                    <textarea v-model="user.languages" type="list" rows="4" cols="50" required /><br>
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
    import { getUser } from '@/services/UserService';

    export default {
        name: 'EditProfile',
        components: {
            Modal,
        },
        data: () => ({
            loading: true,
            loadingError: null,
            user: null,
            valid_image: true,
        }),
        async mounted() {
            this.loading = true;
            try {
                const { data: user } = await getUser(this.$route.params.id);
                this.user = user;
            } catch (error) {
                this.loadingError = error;
            } finally {
                this.loading = false;
            }
        },
        methods: {
            async editProfile() {
                this.processing = true;
                this.processingError = null;
                try {
                    const { data: user } = await editProfile(this.$route.params.id, this.user);
                    this.$router.push({ name: 'UserDetails' })
                } catch (error) {
                    this.processingError = error;
                } finally {
                    this.processing = false;
                }
            }
        },
    }
</script>
