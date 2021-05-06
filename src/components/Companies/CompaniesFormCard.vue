<template>
    <div class="card shadow">
        <div class="card-body">
            <fieldset :disabled="loading">
                <div class="form-group">
                    <input :value="search"
                           @input="$emit('update:search', $event.target.value)"
                           @keypress.enter="$emit('getCompanies')"
                           class="form-control"
                           type="text"
                           placeholder="Search">
                </div>
                <DevelopersFormCardSection title="Locations"
                                           :selections="locations"
                                           type="location"
                                           @update:location="$emit('update:locations', $event)" />
            </fieldset>
            <button @click="$emit('getCompanies')" class="btn btn-primary mt-4" type="button">
                Submit
            </button>
            <div v-if="$auth.isAuthenticated">
                <hr>
                <div class="text-center">
                    <router-link :to="{ name: 'CreateCompany' }" style="text-decoration: none;">
                        <span class="mb-1">Create New Company</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DevelopersFormCardSection from '@/components/Developers/DevelopersFormCardSection';

    export default {
        name: 'CompaniesFormCard',
        components: {
            DevelopersFormCardSection,
        },
        props: {
            search: { type: [String, null], default: null },
            locations: { type: Array, required: true },
            loading: { type: Boolean, required: true },
        },
    }
</script>
