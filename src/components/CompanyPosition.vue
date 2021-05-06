<template>
    <div class="card shadow h-100">
        <div class="card-body text-center d-flex flex-column">
            <a :href="position.html_url" class="mb-2" style="text-decoration: none;">
                <h4>{{ position.company.name }}</h4>
            </a>
            <span class="mb-3">{{ position.title }}</span>
        </div>
    </div>
</template>

<script>
    import {  } from '@/services/GitHubService';

    export default {
        name: 'CompanyPosition',
        data: () => ({
        }),
        props: {
            position: { type: Object, required: true }
        },
    }
</script>
