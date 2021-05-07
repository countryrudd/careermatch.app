<template>
    <div>
        <div v-if="numberOfPages > 1" class="btn-group btn-group-sm" role="group">
            <button type="button"
                    :disabled="pageNumber === 1"
                    @click="$emit('update:pageNumber', pageNumber - 1)"
                    class="btn btn-secondary">
                <FontAwesomeIcon icon="chevron-left" />
            </button>
            <select :value="pageNumber"
                    @change="$emit('update:pageNumber', parseInt($event.target.value))"
                    class="form-select form-select-sm border-start-0 border-end-0 rounded-0">
                <option v-for="page in numberOfPages"
                        :key="page"
                        :value="page">
                    Page {{ page }}
                </option>
            </select>
            <button type="button"
                    class="btn btn-secondary"
                    @click="$emit('update:pageNumber', pageNumber + 1)"
                    :disabled="pageNumber === numberOfPages">
                <FontAwesomeIcon icon="chevron-right" />
            </button>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    export default {
        name: 'PaginationButtons',
        components: {
            FontAwesomeIcon,
        },
        props: {
            numberOfPages: { type: Number, required: true },
            pageNumber: { type: Number, required: true },
        },
    }
</script>
