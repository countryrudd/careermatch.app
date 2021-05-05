<template>
    <div class="card shadow">
        <div class="card-body">
            <fieldset :disabled="loading">
                <div class="form-group">
                    <input @input="$emit('update:search', $event.target.value)"
                           @keypress.enter="$emit('getJobs')"
                           class="form-control"
                           type="text"
                           placeholder="Search">
                </div>
                <JobsFormCardSection title="Languages"
                                     :selections="languages"
                                     type="language"
                                     @update:language="$emit('update:languages', $event)" />
                <JobsFormCardSection title="Skills"
                                     :selections="skills"
                                     type="skill"
                                     @update:skill="$emit('update:skills', $event)" />
                <JobsFormCardSection title="Locations"
                                     :selections="locations"
                                     type="location"
                                     @update:location="$emit('update:locations', $event)" />
                <JobsFormCardSection title="Cultures"
                                     :selections="cultures"
                                     type="culture"
                                     @update:location="$emit('update:cultures', $event)" />
            </fieldset>
            <button @click="$emit('getJobs')" class="btn btn-primary mt-4" type="button">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
    import JobsFormCardSection from '@/components/Jobs/JobsFormCardSection.vue';

    export default {
        name: 'JobsFormCard',
        components: {
            JobsFormCardSection,
        },
        props: {
            search: { type: [String, null], default: null },
            languages: { type: Array, required: true },
            skills: { type: Array, required: true },
            locations: { type: Array, required: true },
            cultures: { type: Array, required: true },
            loading: { type: Boolean, required: true },
        },
    }
</script>
