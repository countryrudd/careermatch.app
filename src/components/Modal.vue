<template>
    <div :id="id"
         class="modal fade"
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
        },
    }
</script>
