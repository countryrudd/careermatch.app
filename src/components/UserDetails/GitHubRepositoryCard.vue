<template>
    <div class="card shadow h-100">
        <div class="card-body text-center d-flex flex-column">
            <a :href="repository.html_url" class="mb-2" style="text-decoration: none;">
                <h4>{{ repository.name }}</h4>
            </a>
            <span class="mb-3">{{ repository.description }}</span>
            <div class="d-flex flex-column">
                <small v-for="(count, language) in languages" :key="language">
                    {{ language }} : {{ count | truncate }}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
    import { getRepositoryLanguages } from '@/services/GitHubService';

    export default {
        name: 'DevelopersListCard',
        data: () => ({
            languages: null,
        }),
        props: {
            repository: { type: Object, required: true }
        },
        async mounted() {
            const { data: languages } = await getRepositoryLanguages(this.repository.languages_url);
            this.languages = languages;
        },
    }
</script>
