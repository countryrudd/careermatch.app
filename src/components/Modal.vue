<template>
    <div :id="id"
         ref="modal"
         class="modal fade"
         :class="[size]"
         :data-bs-backdrop="[staticBackdrop ? 'static': 'true']"
         tabindex="-1"
         aria-hidden="true">
        <div class="modal-dialog" :class="[centered ? 'modal-dialog-centered' : '']">
            <div class="modal-content">
                <div class="modal-body">
                    <slot name="body" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'ModalComponent',
        props: {
            id: { type: String, required: true },
            centered: { type: Boolean, required: true },
            staticBackdrop: { type: Boolean, default: false },
            hide: { type: Boolean, required: true },
            size: {
                type: String,
                default: '',
                validator: (value) => {
                    return ['', 'modal-sm', 'modal-lg', 'modal-xl'].indexOf(value) !== -1;
                }
            },
        },
        data() {
            return {
                instance: null,
            }
        },
        watch: {
            /**
             * Watches the dispose prop. If it becomes true, the modal is hidden.
             * @param value
             */
            hide(value) {
                if (value) {
                    window.bootstrap.Modal.getInstance(this.$refs.modal).hide();
                }
            }
        }
    }
</script>
