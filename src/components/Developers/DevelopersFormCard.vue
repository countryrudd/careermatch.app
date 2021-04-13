<template>
    <div class="card shadow">
        <div class="card-body">
            <fieldset>
                <div class="form-group">
                    <input @input="$emit('update:search', $event.target.value)"
                           @keypress.enter="$emit('getDevelopers')"
                           class="form-control"
                           type="text"
                           placeholder="Search">
                </div>
                <DevelopersFormCardSection title="Languages"
                                           :selections="languages"
                                           type="language"
                                           @update:language="$emit('update:languages', $event)" />
                <DevelopersFormCardSection title="Skills"
                                           :selections="skills"
                                           type="skill"
                                           @update:skill="$emit('update:skills', $event)" />
                <DevelopersFormCardSection title="Locations"
                                           :selections="locations"
                                           type="location"
                                           @update:location="$emit('update:locations', $event)" />
            </fieldset>
            <button @click="$emit('getDevelopers')" class="btn btn-primary mt-4" type="button">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
    import DevelopersFormCardSection from '@/components/Developers/DevelopersFormCardSection';

    export default {
        name: 'DevelopersFormCard',
        components: {
            DevelopersFormCardSection,
        },
        props: {
            search: { type: [String, null], default: null },
            languages: { type: Array, required: true },
            skills: { type: Array, required: true },
            locations: { type: Array, required: true },
        },
    }
</script>
