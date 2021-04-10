<template>
    <div class="d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center flex-column">
            <FontAwesomeIcon icon="exclamation-triangle" />
            <span class="mt-3">Oops! Something went wrong.</span>
            <button class="btn btn-sm btn-outline-secondary mt-3" @click="refreshPage()">Click to refresh</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoadingError',
        methods: {
            refreshPage() {
                window.location.reload();
            }
        }
    }
</script>

<style scoped>
    svg {
        font-size: 2rem;
        color: #999cba;
    }
</style>
