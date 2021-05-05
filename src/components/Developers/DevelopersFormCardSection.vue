<template>
    <div>
        <h5 v-if="title" class="mt-3">{{ title }}</h5>
        <div class="d-flex flex-wrap">
            <div v-for="(selection, index) in selections"
                 :key="selection"
                 class="form-check"
                 :class="[ index !== selections.length - 1 ? 'me-2' : '']">
                <input @input="$delete(selections, index)"
                       :id="`${selection}Check`"
                       class="form-check-input cursor-pointer"
                       type="checkbox"
                       checked>
                <label :for="`${selection}Check`"
                       class="form-check-label cursor-pointer">
                    {{ selection }}
                </label>
            </div>
        </div>
        <button v-if="!adding"
                @click="adding = true;"
                class="btn btn-link text-secondary"
                type="button">
            Add a {{ type }}
        </button>
        <input v-if="adding"
               v-model="value"
               @blur="value = null; adding = false; addingError = false;"
               @keypress.enter="addSelection()"
               ref="input"
               type="text"
               class="form-control mt-2"
               :class="[addingError ? 'btn-danger' : '']">
        <div v-if="addingError" class="form-text text-danger">
            {{ addingError }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DevelopersFormCardSection',
        props: {
            title: { type: String, required: true },
            type: { type: String, required: true },
            selections: { type: Array, required: true },
        },
        data() {
            return {
                adding: false,
                addingError: null,
                value: null,
            }
        },
        watch: {
            value() {
                this.addingError = null;
            },
            adding(value) {
                if (value === true) {
                    this.$nextTick(() => {
                        this.$refs.input.focus();
                    })
                }
            },
        },
        methods: {
            addSelection() {
                if (!this.value) {
                    return this.addingError = this.type[0].toUpperCase() + this.type.slice(1) + ' must not be blank.';
                }
                if (this.selections.includes(this.value)) {
                    return this.addingError = this.type[0].toUpperCase() + this.type.slice(1) + ' already added.';
                }
                this.$emit(`update:${this.type}`, this.selections.concat(this.value))
                this.value = null;
                this.adding = false;
            },
        },
    }
</script>
