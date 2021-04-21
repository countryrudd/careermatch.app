<template>
    <div class="card shadow">
        <div class="card-body">
            <div class="row no-gutters mb-2">
                <div class="col-2 d-flex align-items-center justify-content-center">
                    <img :src="job.logo_url"
                         :alt="job.title"
                         style="max-height: 100%; max-width: 100%; display: block;">
                </div>
                <div class="col-10 pl-3">
                    <div class="d-flex flex-row align-items-center flex-wrap">
                        <strong class="me-2">Company Name: </strong>
                        <span>{{ job.company_name }}</span>
                    </div>

                    <div class="d-flex">
                        <strong class="me-2">Company Headquarters: </strong>
                        <span>{{ job.company_location }}</span>
                    </div>

                    <div class="d-flex">
                        <br>
                        <span><em>{{ job.company_slogan }}</em></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'JobCompanyCard',
        props: {
            job: { type: Object, required: true },
        },
    }
</script>
