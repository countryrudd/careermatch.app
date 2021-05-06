<template>
    <div v-if="companyPosition">
        <div v-if="companyPosition.is_admin || companyPosition.can_edit"
             class="dropdown"
             style="position: absolute; right: 10px; top: 10px;">
            <button type="button"
                    class="btn btn-sm btn-outline-light text-nowrap"
                    data-bs-target="#company-settings-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                <FontAwesomeIcon icon="cog" />
            </button>
            <ul id="company-settings-dropdown" class="dropdown-menu dropdown-menu-end">
                <li v-if="companyPosition.can_edit">
                    <button data-bs-target="#company-edit-modal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            role="link"
                            class="dropdown-item">
                        Edit ...
                    </button>
                </li>
                <li v-if="companyPosition.is_admin">
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
        <CompanyEditModal v-if="companyPosition.can_edit"
                          :company="company"
                          @update:company="$emit('update:company', $event)"
                          id="company-edit-modal" />
        <CompanyDeleteModal v-if="companyPosition.is_admin"
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
            company: { type: Object, required: true }
        },
        computed: {
            companyPosition() {
                if (this.$auth.isAuthenticated) {
                    const positions = this.$auth?.user?.positions;
                    if (positions) {
                        return positions.find(position => position.company.id === this.company.id);
                    }
                }
                return undefined;
            },
        },
    }
</script>
