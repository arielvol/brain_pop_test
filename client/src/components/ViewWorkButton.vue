<template>
    <v-btn class="borderless text-teal" @click="() => onViewWorkClicked(activityId)">
        <v-icon class="mr-1">mdi-eye-outline</v-icon>
        <div class="title is-6 text-teal">
            View Work
        </div>
    </v-btn>
</template>

<script setup>

const emit = defineEmits(['activity:viewWorkClicked']);

defineProps({
  activityId: {
    type: String,
    required: true
  },
});

const onViewWorkClicked = (activityId) => {
  emit('activity:viewWorkClicked', activityId);
}

</script>

