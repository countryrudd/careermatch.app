<template>
    <LoadingSpinner v-if="loading" class="min-vh-75" />
    <LoadingError v-else-if="loadingError" class="min-vh-75" />
    <div v-else>
        <h3 class="mb-4">Companies</h3>
        <div class="row no-gutters">
            <div class="col">
                <CompaniesFormCard :search.sync="search"
                                   :locations.sync="locations"
                                   :loading="loading"
                                   @getCompanies="getCompanies()" />
            </div>
            <div class="col-xl-9">
                <CompaniesListCard :loading="loading"
                                   :loading-error="loadingError"
                                   :companies="companies" />
            </div>
        </div>
    </div>
</template>

<script>
    import CompaniesFormCard from '@/components/Companies/CompaniesFormCard';
    import CompaniesListCard from '@/components/Companies/CompaniesListCard';
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import { getCompanies } from '@/services/CompanyService';

    export default {
        name: 'Companies',
        components: {
            CompaniesFormCard,
            CompaniesListCard,
            LoadingSpinner,
            LoadingError,
        },
        data() {
            return {
                loading: true,
                loadingError: null,
                companies: [],
                search: null,
                locations: [],
            }
        },
        mounted() {
            this.getCompanies();
        },
        methods: {
            async getCompanies() {
                this.loading = true;
                try {
                    const { data: companies } = await getCompanies(
                        this.search,
                        this.locations,
                    );
                    this.companies = companies;
                    this.loadingError = null;
                } catch (error) {
                    this.loadingError = error;
                } finally {
                    this.loading = false;
                }
            },
        },
    }
</script>
