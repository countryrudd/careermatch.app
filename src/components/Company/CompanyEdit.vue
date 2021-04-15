<template>
    <div class="form-group">
        <button type="button" @click="add">cLICK</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add Job</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New Job</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Job Title:</label>
                                <input type="text" class="form-control" id="job-title">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Skills:</label>
                                <textarea class="form-control" id="skills"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Location:</label>
                                <textarea class="form-control" id="location"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Requirements:</label>
                                <textarea class="form-control" id="job-requirements"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="add" @click="add">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            add() {
                alert('hey');
            }
        }
    }
</script>
<style>
    .form-group {
        display: flex;
        justify-content: center;
        position: relative;
        top: 300px;
    }
</style>

