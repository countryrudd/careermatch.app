<template>
    <nav class="navbar navbar-light sticky-top shadow bg-white">
        <div class="container d-flex">
            <div class="d-flex align-items-center ms-auto">
                <button type="button"
                        class="btn d-flex p-0"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        href="#">
                    <FontAwesomeIcon icon="bell" style="color: #d1d3e2;" />
                    <span class="badge bg-danger bg-counter">1</span>
                </button>
                <div class="navbar-divider" />
                <small>Craig White</small>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'TopNavbar'
    }
</script>

<style>
    .navbar-divider {
        width: 0;
        border-right: 1px solid #e3e6f0;
        height: 2.375rem;
        margin: auto 1rem;
    }

    .bg-counter {
        font-size: .4rem;
        margin-top: -.25rem;
    }
</style>
