<template>
    <div class="card shadow">
        <div class="card-body">
            <LoadingSpinner v-if="loading" class="vh-50" />
            <LoadingError v-else-if="loadingError" class="vh-50" />
            <div v-else class="d-flex flex-column align-items-center">
                <div class="w-100">
                    <div v-if="currentUserCompanies.length">
                        <h5 class="mb-3">Your Companies</h5>
                        <CompaniesListCardItem v-for="company in currentUserCompanies"
                                               :key="company.id"
                                               :company="company"
                                               :invalid-company-avatars.sync="invalidCompanyAvatars" />
                        <hr>
                    </div>
                    <h5 class="mb-3">Results</h5>
                    <div v-if="currentPageCompanies.length">
                        <CompaniesListCardItem v-for="company in currentPageCompanies"
                                               :key="company.id"
                                               :company="company"
                                               :invalid-company-avatars.sync="invalidCompanyAvatars" />
                    </div>
                    <div v-else class="vh-25 d-flex align-items-center justify-content-center">
                        <div class="d-flex flex-column align-items-center">
                            <FontAwesomeIcon icon="search" class="mb-3" style="font-size: 2rem;" />
                            <div>No match found</div>
                        </div>
                    </div>
                </div>
                <PaginationButtons :number-of-pages="numberOfPages" :page-number.sync="pageNumber" />
            </div>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import PaginationButtons from '@/components/PaginationButtons';
    import CompaniesListCardItem from '@/components/Companies/CompaniesListCardItem';

    export default {
        name: 'CompaniesListCard',
        components: {
            LoadingSpinner,
            LoadingError,
            FontAwesomeIcon,
            PaginationButtons,
            CompaniesListCardItem,
        },
        props: {
            loading: { type: Boolean, required: true },
            loadingError: { type: [String, null], default: null },
            companies: { type: Array, required: true },
        },
        data() {
            return {
                pageNumber: 1,
                pageLength: 4,
                invalidCompanyAvatars: [],
            }
        },
        computed: {
            currentUserCompanies() {
                if (this.$auth.isAuthenticated) {
                    return this.$auth.user.positions.map(position => position.company)
                }
                return [];
            },
            nonCurrentUserCompanies() {
                if (this.$auth.isAuthenticated) {
                    return this.companies.filter(company => !this.currentUserCompanies.some(userCompany => {
                        return userCompany.id === company.id;
                    }))
                }
                return this.companies;
            },
            /**
             * The number of pages of Companies.
             * @returns {number}
             */
            numberOfPages() {
                return Math.ceil(this.nonCurrentUserCompanies.length / this.pageLength)
            },
            /**
             * The current page's Companies.
             * @returns {Array<Object>}
             */
            currentPageCompanies() {
                return this.nonCurrentUserCompanies.slice(
                    (this.pageNumber - 1) * this.pageLength, this.pageNumber * this.pageLength
                );
            },
        },
    }
</script>
