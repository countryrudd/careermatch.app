<template>
    <div class="card shadow">
        <div class="card-body">
            <div v-for="job in jobs" :key="job.id" class="row no-gutters mb-2">
                <div class="col-2">
                    <picture>
                        <img :src="job.logo_url"
                             :alt="job.title"
                             style="max-height: 100%; max-width: 100%; display: block;">
                    </picture>
                </div>

                <div class="col-10 pl-3">
                    <router-link :to="{ name: 'JobDetails', query: { id: job.id }}" style="text-decoration: none;">
                        <h5 class="mb-1">{{ job.title }}</h5>
                    </router-link>

                    <div class="d-flex">
                        <strong class="me-2">Language(s):</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="language in job.languages" :key="language" class="me-2">
                                {{ language }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Skill(s) Required:</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="skill in job.skills" :key="skill" class="me-2">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Primary Location:</strong>
                        <span>{{ job.location }}</span>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Workplace-Culture Tag(s):</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="culture in job.cultures" :key="culture" class="me-2">
                                {{ culture }}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'JobsListCard',
        props: {
            jobs: { type: Array, required: true },
        },
    }
</script>
