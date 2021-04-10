<template>
    <div class="card shadow">
        <div class="card-body">
            <form class="d-flex flex-column">
                <fieldset>
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="Search">
                    </div>
                    <h5 class="mt-3">Languages</h5>
                    <div class="form-group d-flex flex-row align-items-center flex-wrap">
                        <div class="form-check" style="margin-right: 15px;">
                            <input class="form-check-input" type="checkbox" id="formCheck-1">
                            <label class="form-check-label" for="formCheck-1">Python</label>
                        </div>
                        <div class="form-check" style="margin-right: 15px;">
                            <input class="form-check-input" type="checkbox" id="formCheck-3">
                            <label class="form-check-label" for="formCheck-3">Java</label>
                        </div>
                        <button class="btn btn-link text-secondary" type="button">Add a language</button>
                    </div>
                    <h5 class="mt-3">Skills</h5>
                    <div class="form-group d-flex flex-row align-items-center flex-wrap">
                        <div class="form-check" style="margin-right: 15px;">
                            <input class="form-check-input" type="checkbox" id="formCheck-2">
                            <label class="form-check-label" for="formCheck-1">Project Management</label>
                        </div><button class="btn btn-link text-secondary" type="button">Add a skill</button>
                    </div>
                    <h5 class="mt-3">Location</h5>
                    <div class="form-group d-flex flex-row align-items-center flex-wrap">
                        <div class="form-check" style="margin-right: 15px;">
                            <input class="form-check-input" type="checkbox" id="formCheck-4">
                            <label class="form-check-label" for="formCheck-4">Charlotte, NC</label>
                        </div><button class="btn btn-link text-secondary" type="button">Add a location</button>
                    </div>
                </fieldset>
                <button class="btn btn-primary mt-4" type="submit">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DevelopersFormCard'
    }
</script>
