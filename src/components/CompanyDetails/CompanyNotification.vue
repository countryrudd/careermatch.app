<template>
    <div>
        <button type="button"
                class="btn btn-sm btn btn-sm btn-success d-flex align-items-center text-nowrap"
                data-bs-target="#company-position-acceptance-modal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                role="link">
            <span class="me-2">
                Pending Employees
            </span>
            <FontAwesomeIcon icon="bell" />
        </button>
        <CompanyPositionAcceptanceModal :company="company"
                                        :positions="pendingPositions"
                                        @update:company="$emit('update:company', $event)"
                                        id="company-position-acceptance-modal" />
    </div>
</template>

<script>
    import CompanyPositionAcceptanceModal from '@/components/CompanyDetails/CompanyPositionAcceptanceModal';

    export default {
        name: 'CompanyNotification',
        components: {
            CompanyPositionAcceptanceModal,
        },
        props: {
            company: { type: Object, required: true },
            currentUserPosition: { type: Object, required: true },
            pendingPositions: { type: Array, required: true },
        },
    }
</script>
