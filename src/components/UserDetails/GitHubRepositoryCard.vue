<template>
    <div class="card shadow h-100">
        <div class="card-body text-center d-flex flex-column">
            <a :href="repository.html_url" class="mb-2" style="text-decoration: none;">
                <h4>{{ repository.name }}</h4>
            </a>
            <span class="mb-3">{{ repository.description }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DevelopersListCard',
        data: () => ({
            languages: null,
        }),
        props: {
            repository: { type: Object, required: true }
        },
    }
</script>
