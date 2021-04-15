<template>
    <div class="card shadow">
        <div class="card-body">
            <div class="row no-gutters mb-2">
                <div class="col-10 pl-3">

                    <div class="d-flex">
                        <span>{{ job.description }}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'JobDescriptionCard.vue',
        props:{
            job: {type: Array, required: true},
        },
    }
</script>
