<template>
    <div>
        <div class="flex">
            <div class="mb-2">
                Filter By:
            </div>
            <v-btn class="mr-2 mb-2 filter-button" variant="outlined" color="teal" v-for="(activity, index) in activityList"
                :key="index" @click="toggleActivity(activity)">
                <v-icon class="mr-1" v-if="selectedActivities.includes(activity)">mdi-check-circle</v-icon>
                {{ formatToDisplayText(activity) }}
            </v-btn>
        </div>
    </div>
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { CONSTANTS } from "../common/constants";
import { formatToDisplayText } from "../utils/utils";
const props = defineProps({
    activities: {
        type: Array,
        required: true
    },
});

const emit = defineEmits(['update:filters']);


const selectedActivities = ref([CONSTANTS.ALL_WORK]);
const activityList = ref([CONSTANTS.ALL_WORK, ...props.activities]);

const toggleActivity = (activity) => {
    if (activity === CONSTANTS.ALL_WORK) {
        selectedActivities.value = [CONSTANTS.ALL_WORK];
    } else {
        const index = selectedActivities.value.indexOf(activity);
        if (index > -1) {
            selectedActivities.value.splice(index, 1);
            if (selectedActivities.value.length === 0) {
                selectedActivities.value.push(CONSTANTS.ALL_WORK);
            }
        } else {
            selectedActivities.value = selectedActivities.value.filter(act => act !== CONSTANTS.ALL_WORK);
            selectedActivities.value.push(activity);
        }
    }
    emit('update:filters', toRaw(selectedActivities.value));
};
</script>

<style scoped>
.filter-button {
    text-transform: none !important;
}
</style>