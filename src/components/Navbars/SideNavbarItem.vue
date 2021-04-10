<template>
    <router-link :to="route"
                 class="sidebar-link d-flex align-items-center mb-4 px-3"
                 :class="[ expanded ? '' : 'flex-column' ]">
        <FontAwesomeIcon :icon="icon" :class="[ expanded ? 'me-2' : 'mb-1' ]" style="font-size: 0.75rem;" />
        {{ name }}
    </router-link>
</template>

<script>
    export default {
        name: 'SideNavbarItem',
        props: {
            name: { type: String, required: true },
            icon: { type: String, required: true },
            route: { type: [String, Object], required: true },
            expanded: { type: Boolean, required: true }
        },
        computed: {
            active() {
                return this.$route.path === this.$router.resolve(this.route).route.path;
            }
        },
    }
</script>
