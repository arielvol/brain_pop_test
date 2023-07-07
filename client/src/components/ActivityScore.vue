<template>
    <div v-if="score && possibleScore" class="text-teal">
        Score: <strong class="text-teal">{{ score }}/{{ possibleScore }}</strong>
    </div>
</template>

<script setup>

defineProps({
    score: {
        type: String,
        required: true
    },
    possibleScore: {
        type: String,
        required: true
    },
});

</script>