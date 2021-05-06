<template>
    <nav class="sidebar min-vh-100" :style="{ 'width': expanded ? '250px' : '' }">
        <div class="sticky-top">
            <div class="d-flex flex-column align-items-center py-4">
                <router-link :to="{ name: 'Developers' }" class="sidebar-link">
                    <img v-if="expanded" src="@/assets/logo regular.png" class="sidebar-logo" style="width: 125px;">
                    <img v-else src="@/assets/logo abbreviated.png" class="sidebar-logo" style="width: 35px;">
                </router-link>
            </div>
            <SideNavbarItem name="Developers" icon="users" :route="{ name: 'Developers' }" :expanded="expanded" />
            <SideNavbarItem name="Jobs" icon="list" :route="{ name: 'Jobs' }" :expanded="expanded" />
            <div v-if="$auth.isAuthenticated" @mouseleave="showCompanyOptions = false">
                <a @click="showCompanyOptions = !showCompanyOptions"
                   class="sidebar-link d-flex align-items-center mb-4 px-3 cursor-pointer"
                   :class="[ expanded ? '' : 'flex-column' ]">
                    <FontAwesomeIcon icon="city"
                                     :class="[ expanded ? 'me-2' : 'mb-1' ]"
                                     style="font-size: 0.75rem;" />
                    Companies
                </a>
                <div v-if="showCompanyOptions">
                    <SideNavbarItem v-for="position in $auth.user.positions"
                                    :key="position.company.id"
                                    :name="position.company.name"
                                    icon="building"
                                    :route="{ name: 'CompanyDetails', params: { 'id': position.company.id } }"
                                    :expanded="expanded" />
                    <SideNavbarItem name="Create a Company"
                                    icon="plus"
                                    :route="{ name: 'CreateCompany' }"
                                    :expanded="expanded" />
                </div>
            </div>
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
                showCompanyOptions: false,
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
