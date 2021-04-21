<template>
    <div id="app">
        <div class="d-flex">
            <SideNavbar />
            <div class="d-flex flex-column w-100">
                <TopNavbar class="mb-4 w-100" style="height: min-content;" />
                <div class="container mb-4">
                    <router-view />
                </div>
                <Footer class="mt-auto" />
            </div>
        </div>
    </div>
</template>

<script>
    import TopNavbar from '@/components/Navbars/TopNavbar';
    import SideNavbar from '@/components/Navbars/SideNavbar';
    import Footer from '@/components/Footer';

    export default {
        components: {
            TopNavbar,
            SideNavbar,
            Footer,
        },
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

    body {
        background-color: #f8f9fc;
        font-family: Nunito, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .min-vh-100 {
        min-height: 100vh !important;
    }

    .min-vh-75 {
        min-height: 75vh !important;
    }

    .min-vh-50 {
        min-height: 50vh !important;
    }

    .min-vh-25 {
        min-height: 25vh !important;
    }

    .vh-100 {
        height: 100vh;
    }

    .vh-75 {
        height: 75vh;
    }

    .vh-50 {
        height: 50vh;
    }

    .vh-25 {
        height: 25vh;
    }

    .h-100 {
        height: 100%;
    }

    .w-100 {
        width: 100%;
    }
</style>
