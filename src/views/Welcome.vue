<template>
    <div v-if="Object.keys(user).length"
         class="min-vh-75 row d-flex align-items-center justify-content-center text-break">
        <div class="col-sm-10 col-md-8 col-lg-7">
            <div class="card">
                <fieldset :disabled="processing">
                    <transition name="fade" mode="out-in">
                        <div v-if="currentPage === 1" :key="1" class="card-body p-4 p-sm-5 text-center">
                            Welcome to Dev<span class="text-primary">Link</span>!
                        </div>
                        <div v-else-if="currentPage === 2" :key="2" class="card-body p-4 p-sm-5 text-center">
                            <div class="d-flex flex-column">
                                We've pulled a little bit of your information from LinkedIn...
                            </div>
                        </div>
                        <div v-else-if="currentPage === 3" :key="3" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="currentPage = 4" class="d-flex align-items-center flex-column">
                                <div v-if="user.avatar_url"
                                     class="avatar mb-3"
                                     :style="{ 'background-image': `url(${user.avatar_url})` }" />
                                <h5>{{ user.name }}</h5>
                                <h6 class="mb-3">{{ user.email }}</h6>
                                <button type="submit" class="btn btn-sm btn-outline-primary">
                                    That's me!
                                </button>
                            </form>
                        </div>
                        <div v-else-if="currentPage === 4" :key="4" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="currentPage = 5" class="d-flex align-items-center flex-column">
                                <h6 class="mb-3">
                                    <label for="bio">
                                        How would you describe yourself to employers and peers?
                                    </label>
                                </h6>
                                <textarea v-model="user.bio" id="bio" maxlength="150" class="form-control" />
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <transition name="fade">
                                        <button type="submit" class="btn btn-sm btn-outline-primary">
                                            <transition name="fade" mode="out-in">
                                                <span v-if="user.bio" :key="1">
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
                        <div v-else-if="currentPage === 5" :key="5" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="currentPage = 6" class="d-flex align-items-center flex-column">
                                <h6 class="mb-3">
                                    <label for="location">
                                        Where are you located?
                                    </label>
                                </h6>
                                <div>
                                    <input v-model="user.location"
                                           id="location"
                                           type="text"
                                           class="form-control"
                                           required>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <button type="submit" class="btn btn-sm btn-outline-primary">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div v-else-if="currentPage === 6" :key="6" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="verifyLinkedInUsername()"
                                  class="d-flex align-items-center flex-column">
                                <span v-if="linkedInUsernameError" class="text-danger mb-4">
                                    {{ linkedInUsernameError }}
                                </span>
                                <h6 class="mb-3">
                                    <label for="linkedin">
                                        What is your public LinkedIn username?
                                    </label>
                                </h6>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">https://www.linkedin.com/in/</span>
                                    <input v-model="user.linkedin_username"
                                           id="linkedin"
                                           type="text"
                                           class="form-control"
                                           :class="[linkedInUsernameError ? 'btn-danger' : '']"
                                           required>
                                </div>
                                <small>Need help?
                                    <a href="https://www.linkedin.com/me/"
                                       target="_blank"
                                       style="text-decoration: none;">
                                        Click here
                                    </a>
                                </small>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <button type="submit"
                                            class="btn btn-sm"
                                            :class="[linkedInUsernameError ? 'btn-outline-danger' : 'btn-outline-primary']">
                                        <span v-if="processing"
                                              class="spinner-border spinner-border-sm me-1"
                                              role="status"
                                              aria-hidden="true" />
                                        <span v-if="linkedInUsernameError">
                                            Try Again
                                        </span>
                                        <span v-else>
                                            Continue
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div v-else-if="currentPage === 7" :key="7" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="currentPage = 8" class="d-flex align-items-center flex-column">
                                <h6 class="mb-3">
                                    <label>
                                        What spoken languages do you know?
                                    </label>
                                </h6>
                                <form @submit.prevent>
                                    <DevelopersFormCardSection title=""
                                                               :selections="user.languages"
                                                               type="language"
                                                               @update:language="user.languages = $event" />
                                </form>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <transition name="fade">
                                        <button type="submit" class="btn btn-sm btn-outline-primary">
                                            <transition name="fade" mode="out-in">
                                                <span v-if="user.languages.length" :key="1">
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
                        <div v-else-if="currentPage === 8" :key="8" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="currentPage = 9" class="d-flex align-items-center flex-column">
                                <h6 class="mb-3">
                                    <label>
                                        What skills do you have?
                                    </label>
                                </h6>
                                <form @submit.prevent>
                                    <DevelopersFormCardSection title=""
                                                               :selections="user.skills"
                                                               type="skill"
                                                               @update:skill="user.skills = $event" />
                                </form>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <transition name="fade">
                                        <button type="submit" class="btn btn-sm btn-outline-primary">
                                            <transition name="fade" mode="out-in">
                                                <span v-if="user.skills.length" :key="1">
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
                        <div v-else-if="currentPage === 9" :key="9" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="currentPage = user.is_developer ? 10 : 11"
                                  class="d-flex align-items-center flex-column">
                                <h6 class="mb-3">
                                    <label for="is_developer">
                                        Are you a developer?
                                    </label>
                                </h6>
                                <div class="form-check">
                                    <input v-model="user.is_developer"
                                           class="form-check-input"
                                           type="checkbox"
                                           id="is_developer">
                                    <label class="form-check-label" for="is_developer">
                                        {{ user.is_developer ? 'Yes' : 'No' }}
                                    </label>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <button type="submit" class="btn btn-sm btn-outline-primary">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div v-else-if="currentPage === 10" :key="10" class="card-body p-4 p-sm-5 text-center">
                            <form @submit.prevent="verifyGitHubUsername()" class="d-flex align-items-center flex-column">
                                <span v-if="gitHubUsernameError" class="text-danger mb-4">
                                    {{ gitHubUsernameError }}
                                </span>
                                <h6 class="mb-3">
                                    <label for="github">
                                        What is your public GitHub username?
                                    </label>
                                </h6>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">https://github.com/</span>
                                    <input v-model="user.github_username"
                                           id="github"
                                           type="text"
                                           class="form-control"
                                           :class="[gitHubUsernameError ? 'btn-danger' : '']"
                                           required>
                                </div>
                                <small>Need help?
                                    <a href="https://github.com/" target="_blank" style="text-decoration: none;">
                                        Click here
                                    </a>
                                </small>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <button type="submit"
                                            class="btn btn-sm"
                                            :class="[gitHubUsernameError ? 'btn-outline-danger' : 'btn-outline-primary']">
                                        <span v-if="processing"
                                              class="spinner-border spinner-border-sm me-1"
                                              role="status"
                                              aria-hidden="true" />
                                        <span v-if="gitHubUsernameError">
                                            Try Again
                                        </span>
                                        <span v-else>
                                            Continue
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div v-else-if="currentPage === 11" :key="11" class="card-body p-4 p-sm-5">
                            <form @submit.prevent="updateUser()">
                                <div class="d-flex align-items-center flex-column text-center mb-4">
                                    <span v-if="processingError" class="text-danger mb-4">
                                        Failed to register. Please contact support if this problem persists.
                                    </span>
                                    <div v-if="user.avatar_url"
                                         class="avatar mb-3"
                                         :style="{ 'background-image': `url(${user.avatar_url})` }" />
                                    <h4>{{ user.name }}</h4>
                                    <h5 v-if="user.bio">{{ user.bio }}</h5>
                                    <h6>{{ user.email }}</h6>
                                    <h6>{{ user.location }}</h6>
                                    <div>
                                        <a :href="`https://linkedin.com/in/${user.linkedin_username}`" target="_blank">
                                            <FontAwesomeIcon :icon="['fab', 'linkedin']" style="font-size: 1.25rem;" />
                                        </a>
                                        <a v-if="user.is_developer"
                                           :href="`https://github.com/${user.github_username}`"
                                           target="_blank"
                                           class="ms-2">
                                            <FontAwesomeIcon :icon="['fab', 'github']" style="font-size: 1.25rem;" />
                                        </a>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <h5>Languages</h5>
                                    <div v-if="user.languages.length">
                                        <span v-for="(language, index) in user.languages" :key="language">
                                            {{ language }}{{ index !== user.languages.length - 1 ? ',' : '' }}
                                        </span>
                                    </div>
                                    <div v-else>
                                        None
                                    </div>
                                </div>
                                <div>
                                    <h5>Skills</h5>
                                    <div v-if="user.skills.length">
                                        <span v-for="(skill, index) in user.skills" :key="skill">
                                            {{ skill }}{{ index !== user.skills.length - 1 ? ',' : '' }}
                                        </span>
                                    </div>
                                    <div v-else>
                                        None
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <button @click="currentPage--"
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary me-2">
                                        Back
                                    </button>
                                    <button type="submit"
                                            class="btn btn-sm"
                                            :class="[processingError ? 'btn-outline-danger' : 'btn-outline-primary']">
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
</template>

<script>
    import DevelopersFormCardSection from '@/components/Developers/DevelopersFormCardSection';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { getUsers, updateUser } from '@/services/UserService';

    export default {
        name: 'Welcome',
        components: {
            DevelopersFormCardSection,
            FontAwesomeIcon,
        },
        data() {
            return {
                processing: false,
                processingError: null,
                currentPage: 1,
                linkedInUsernameError: null,
                gitHubUsernameError: null,
                user: {
                    avatar_url: this.$auth.user.picture,
                    name: this.$auth.user.given_name + ' ' + this.$auth.user.family_name,
                    bio: '',
                    email: this.$auth.user.email,
                    finished_registration: true,
                    linkedin_username: null,
                    is_developer: true,
                    languages: [],
                    skills: [],
                },
            }
        },
        watch: {
            'user.linkedin_username'() {
                this.linkedInUsernameError = null;
            },
            'user.github_username'() {
                this.gitHubUsernameError = null;
            },
        },
        async mounted() {
            await new Promise((resolve) => setTimeout(() => {
                this.currentPage = 2;
                resolve();
            }, 2000));
            await new Promise((resolve) => setTimeout(() => {
                this.currentPage = 3;
                resolve();
            }, 2000));
        },
        methods: {
            async verifyLinkedInUsername() {
                this.processing = true;
                try {
                    const { data: users } = await getUsers(null,
                                                           null,
                                                           [],
                                                           [],
                                                           [],
                                                           this.user.linkedin_username,
                                                           null);
                    if (users.length) {
                        this.linkedInUsernameError = 'LinkedIn username already registered.';
                    } else {
                        this.currentPage = 7;
                    }
                } catch (error) {
                    this.linkedInUsernameError = 'Failed to verify LinkedIn username. Please contact support if this problem persists.';
                } finally {
                    this.processing = false;
                }
            },
            async verifyGitHubUsername() {
                this.processing = true;
                try {
                    const { data: users } = await getUsers(null,
                                                           null,
                                                           [],
                                                           [],
                                                           [],
                                                           null,
                                                           this.user.github_username);
                    if (users.length) {
                        this.gitHubUsernameError = 'GitHub username already registered.';
                    } else {
                        this.currentPage = 11;
                    }
                } catch (error) {
                    this.gitHubUsernameError = 'Failed to verify GitHub username. Please contact support if this problem persists.';
                } finally {
                    this.processing = false;
                }
            },
            async updateUser() {
                this.processing = true;
                try {
                    const { data: user } = await updateUser(this.$auth.user.id, this.user);
                    this.$auth.user = { ...this.$auth.user, ...user }
                    this.$router.push({ name: 'UserDetails', params: { id: this.$auth.user.id }})
                } catch (error) {
                    this.processingError = 'Failed to register. Please contact support if this problem persists.';
                } finally {
                    this.processing = false;
                }
            },
        },
    }
</script>

<style scoped>
    .avatar {
        position: relative;
        width: 150px;
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 100px;
    }
</style>
