<template>
    <div class="card shadow">
        <div class="card-body">
            <div class="row no-gutters mb-2">
                <div class="col-10 pl-3">
                    <div class="d-flex flex-row align-items-center flex-wrap">
                        <strong class="me-2">Job Title: </strong>
                        <span>{{ job.title }}</span>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Primary Location: </strong>
                        <span>{{ job.location }}</span>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Language(s): </strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="language in job.languages" :key="language" class="me-2">
                                {{ language }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Skill(s) Required: </strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="skill in job.skills" :key="skill" class="me-2">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Workplace-Culture Tag(s): </strong>
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
        name: 'JobDetailCard.vue',
        props:{
            job: {type: Array, required: true},
        },
    }
</script>
