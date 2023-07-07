<template>
    <div>
        <div class="flex">
            <div class="mb-2">
                Filter By:
            </div>
            <v-btn class="mr-2 mb-2 filter-button" variant="outlined" color="teal" v-for="(activity, index) in originalActivityList"
                :key="index" @click="onToggleActivity(activity)">
                <v-icon class="mr-1" v-if="selectedActivitiesList.includes(activity)">mdi-check-circle</v-icon>
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

const selectedActivitiesList = ref([CONSTANTS.ALL_WORK]);
const originalActivityList = ref([CONSTANTS.ALL_WORK, ...props.activities]);

const onToggleActivity = (activity) => {
    if (activity === CONSTANTS.ALL_WORK) {
        selectedActivitiesList.value = [CONSTANTS.ALL_WORK];
    } else {
        const index = selectedActivitiesList.value.indexOf(activity);
        if (index > -1) {
            selectedActivitiesList.value.splice(index, 1);
            if (selectedActivitiesList.value.length === 0) {
                selectedActivitiesList.value = [...selectedActivitiesList.value, CONSTANTS.ALL_WORK];
            }
        } else {
            selectedActivitiesList.value = selectedActivitiesList.value.filter(activity => activity !== CONSTANTS.ALL_WORK);
            selectedActivitiesList.value = [...selectedActivitiesList.value, activity];
        }
    }
    emit('update:filters', toRaw(selectedActivitiesList.value));
};
</script>

<style scoped>
.filter-button {
    text-transform: none !important;
}
</style>