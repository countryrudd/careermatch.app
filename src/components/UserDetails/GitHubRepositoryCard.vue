<template>
    <div class="card shadow" id="githubCard">
        <div class="card-body">
            <fieldset :disabled="loading">
                <div class="form-group">
                    <h3 class="text-center text-secondary text-wrap">
                        <br>{{ name }}
                    </h3>
                    <p class="text-center text-secondary text-wrap">{{ description }}</p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">LANG</div>
                        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">LANG</div>
                        <div class="progress-bar bg-info" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">LANG</div>
                    </div>
                    <span v-for="(language, value) in languages" :key="language" class="me-2">
                        <br>{{ value }} : {{ language }} lines
                    </span>
                </div>
            </fieldset>
            <button @click="viewRepo" class="btn btn-primary mt-4" type="button">
                View on Github
            </button>
        </div>
    </div>
</template>

<script>
    import { getLanguages } from '@/services/UserService';

    export default {
        name: 'DevelopersListCard',
        data: () => ({
            languages: null,
        }),
        props: {
            //languages: { type: Array, required: true },
            link: { type: [String, null], default: null },
            name: { type: [String, null], default: null },
            description: { type: [String, null], default: null },
            languages_url: { type: [String, null], default: null },
        },
        async mounted() {
            const { data: languages } = await getLanguages(this.languages_url);
            this.languages = languages;
        },
        methods: {
            viewRepo: function(event) {
                window.open(this.link)
            }
        }
    }
</script>

<style lang="css">
    #githubCard {
        margin-top: 25px;
        height: 350px;
        margin-bottom: 25px;
    }
</style>
