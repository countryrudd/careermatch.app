<template>
    <div class="card shadow">
        <div class="card-body">
            <div v-for="job in jobs" :key="job.id" class="row no-gutters mb-2">
                <div class="col-2">
                    <picture>
                        <img :src="job.logo_url"
                             :alt="job.name"
                             style="max-height: 100%; max-width: 100%; display: block;">
                    </picture>
                </div>

                <div class="col-10 pl-3">
                    <router-link :to="{ name: 'Jobs' }" style="text-decoration: none;">
                        <h5 class="mb-1">{{ job.name }}</h5>
                    </router-link>

                    <div class="d-flex">
                        <strong class="me-2">Skills:</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="skill in job.skills" :key="skill" class="me-2">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Location:</strong>
                        <span>{{ job.location }}</span>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Workplace-Culture Tags:</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="culture in job.culture" :key="culture" class="me-2">
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
            developers: { type: Array, required: true },
        },
    }
</script>
