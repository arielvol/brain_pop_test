<template>
    <v-btn class="borderless text-teal" @click="$emit('viewWorkClicked', activityId)">
        <v-icon class="mr-1">mdi-eye-outline</v-icon>
        <div class="title is-6 text-teal">
            View Work
        </div>
    </v-btn>
</template>

<script setup>

import { defineProps } from "vue";

defineProps({
  activityId: {
    type: String,
    required: true
  },
});

</script>

<style scoped>
.borderless {
    border: none !important;
    background-color: transparent !important;
    box-shadow: none !important;
    text-transform: none !important;
    font-weight: bolder !important;
}
</style>
