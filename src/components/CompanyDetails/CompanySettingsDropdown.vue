<template>
    <div>
        <div v-if="currentUserPosition.is_admin || currentUserPosition.can_edit"
             class="dropdown">
            <button type="button"
                    class="btn btn-sm btn-outline-light text-nowrap"
                    data-bs-target="#company-settings-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                <FontAwesomeIcon icon="cog" />
            </button>
            <ul id="company-settings-dropdown" class="dropdown-menu dropdown-menu-end">
                <li v-if="currentUserPosition.can_edit">
                    <button data-bs-target="#company-edit-modal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            role="link"
                            class="dropdown-item">
                        Edit ...
                    </button>
                </li>
                <li v-if="currentUserPosition.is_admin">
                    <button data-bs-target="#company-delete-modal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            role="link"
                            class="dropdown-item text-danger">
                        Delete ...
                    </button>
                </li>
            </ul>
        </div>
        <CompanyEditModal v-if="currentUserPosition.can_edit"
                          :company="company"
                          @update:company="$emit('update:company', $event)"
                          id="company-edit-modal" />
        <CompanyDeleteModal v-if="currentUserPosition.is_admin"
                            :company="company"
                            id="company-delete-modal" />
    </div>
</template>

<script>
    import CompanyEditModal from '@/components/CompanyDetails/CompanyEditModal';
    import CompanyDeleteModal from '@/components/CompanyDetails/CompanyDeleteModal';

    export default {
        name: 'CompanySettingsDropdown',
        components: {
            CompanyEditModal,
            CompanyDeleteModal,
        },
        props: {
            company: { type: Object, required: true },
            currentUserPosition: { type: Object, required: true },
        },
    }
</script>
