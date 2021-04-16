<template>
    <nav class="sidebar min-vh-100" :style="{ 'width': expanded ? '250px' : '100px' }">
        <div class="sticky-top">
            <div class="d-flex flex-column align-items-center py-4">
                <router-link :to="{ name: 'Developers' }" class="sidebar-link">
                    <img v-if="expanded" src="@/assets/logo regular.png" class="sidebar-logo" style="width: 125px;">
                    <img v-else src="@/assets/logo abbreviated.png" class="sidebar-logo" style="width: 35px;">
                </router-link>
            </div>
            <SideNavbarItem name="Developers" icon="users" :route="{ name: 'Developers' }" :expanded="expanded" />
            <SideNavbarItem name="Jobs" icon="list" :route="{ name: 'Jobs' }" :expanded="expanded" />
            <SideNavbarItem name="Profile" icon="user" :route="{ name: 'Profile' }" :expanded="expanded" />
            <SideNavbarItem name="Company" icon="building" :route="{ name: 'CreateCompany' }" :expanded="expanded" />
            <div class="d-flex flex-column align-items-center my-4">
                <button @click="expanded = !expanded" class="btn rounded-circle sidebar-toggle">
                    <FontAwesomeIcon :icon="expanded ? 'chevron-left' : 'chevron-right'" style="color: #d1d3e2;" />
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
    import SideNavbarItem from '@/components/Navbars/SideNavbarItem';

    export default {
        name: 'SideNavbar',
        components: {
            SideNavbarItem,
        },
        data() {
            return {
                expanded: false,
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        background-color: #4e73df;
        background-image: linear-gradient(180deg, #4e73df 10%, #224abe);
        background-size: cover;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .sidebar-toggle {
        background-color: hsla(0, 0%, 100%, 0.2);
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .sidebar-link {
        color: #d1d3e2;
        text-decoration: none;
    }
</style>
