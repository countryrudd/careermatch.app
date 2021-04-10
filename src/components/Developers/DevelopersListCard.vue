<template>
    <div class="card shadow">
        <div class="card-body">
            <div v-for="developer in developers" :key="developer.id" class="row no-gutters mb-2">
                <div class="col-2">
                    <picture>
                        <img :src="developer.avatar_url"
                             :alt="developer.name"
                             style="max-height: 100%; max-width: 100%; display: block;">
                    </picture>
                </div>
                <div class="col-10 pl-3">
                    <router-link :to="{ name: 'Developers' }" style="text-decoration: none;">
                        <h5 class="mb-1">{{ developer.name }}</h5>
                    </router-link>
                    <div class="d-flex">
                        <strong class="me-2">Languages:</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="language in developer.languages" :key="language" class="me-2">
                                {{ language }}
                            </span>
                        </div>
                    </div>
                    <div class="d-flex">
                        <strong class="me-2">Skills:</strong>
                        <div class="d-flex flex-wrap">
                            <span v-for="skill in developer.skills" :key="skill" class="me-2">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                    <div class="d-flex">
                        <strong class="me-2">Location:</strong>
                        <span>{{ developer.location }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DevelopersListCard',
        props: {
            developers: { type: Array, required: true },
        },
    }
</script>
