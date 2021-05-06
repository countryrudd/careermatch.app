<template>
    <div>
        <div class="dropdown">
            <button type="button"
                    class="btn btn-sm btn-outline-primary text-nowrap"
                    data-bs-target="#user-settings-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style="position: absolute; right: 10px; top: 10px;">
                <FontAwesomeIcon icon="cog" />
            </button>
            <ul id="user-settings-dropdown" class="dropdown-menu dropdown-menu-end">
                <li>
                    <button data-bs-target="#user-edit-modal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            role="link"
                            class="dropdown-item">
                        Edit ...
                    </button>
                </li>
                <li>
                    <button data-bs-target="#user-delete-modal"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            role="link"
                            class="dropdown-item text-danger">
                        Delete ...
                    </button>
                </li>
            </ul>
        </div>
        <UserEditModal id="user-edit-modal" :user="user" @update:user="$emit('update:user', $event)" />
        <UserDeleteModal id="user-delete-modal" :user="user" />
    </div>
</template>

<script>
    import UserEditModal from '@/components/UserDetails/UserEditModal';
    import UserDeleteModal from '@/components/UserDetails/UserDeleteModal';

    export default {
        name: 'UserSettingsDropdown',
        components: {
            UserEditModal,
            UserDeleteModal,
        },
        props: {
            user: { type: Object, required: true },
        },
    }
</script>
