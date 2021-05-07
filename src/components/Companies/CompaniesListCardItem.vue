<template>
    <div class="row no-gutters mb-2">
        <div class="col-2 d-flex align-items-center justify-content-center">
            <FontAwesomeIcon v-if="invalidCompanyAvatars.includes(company.id)"
                             icon="user"
                             style="font-size: 5vw;" />
            <img v-else
                 :src="company.logo_url"
                 :alt="company.name"
                 @error="$emit('update:invalidCompanyAvatars', invalidCompanyAvatars.concat([company.id]))"
                 style="max-height: 100%; max-width: 100%; display: block;">
        </div>

        <div class="col-10 pl-3">
            <router-link :to="{ name: 'CompanyDetails', params: { id: company.id } }"
                         style="text-decoration: none;">
                <h5 class="mb-1">{{ company.name }}</h5>
            </router-link>

            <div class="d-flex">
                <strong class="me-2">Location:</strong>
                <span>{{ company.location }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CompaniesListCardItem',
        props: {
            company: { type: Object, required: true },
            invalidCompanyAvatars: { type: Array, required: true },
        }
    }
</script>
