<template>
    <div>
        <button type="button"
                class="btn btn-sm btn btn-sm btn-primary d-flex align-items-center text-nowrap"
                data-bs-target="#job-create-modal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                role="link">
            <span class="me-2">
                Job
            </span>
            <FontAwesomeIcon icon="plus" />
        </button>
        <CompanyJobCreateModal :company="company"
                               @update:company="$emit('update:company', $event)"
                               id="job-create-modal" />
    </div>
</template>

<script>
    import CompanyJobCreateModal from '@/components/CompanyDetails/CompanyJobCreateModal';

    export default {
        name: 'CompanyJobCreateButton',
        components: {
            CompanyJobCreateModal,
        },
        props: {
            company: { type: Object, required: true },
            currentUserPosition: { type: Object, required: true },
        },
    }
</script>
