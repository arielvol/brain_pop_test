<template>
    <div v-if="activity && activity.topicIconPath && activity.product">
        <div class="zoom-main-section mb-3">
            <v-row class="d-flex flex-column align-center">
                <v-col class="text-center">
                    <ActivityIcon class="mb-5" :iconPath="activity.topicIconPath" :product-type="activity.product" />
                    <div class="title is-3 mb-5">{{ activity.displayText }}</div>
                    <p class="mb-0">{{ activity.formattedCreationDate }}</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex flex-column ml-10">
            <div class="title is-5 mb-9">
                {{ activity.comment }}
            </div>
            <Score v-if="activityConfig[CONSTANTS.SCORE]" :score="activity.score" :possible-score="activity.possibleScore"
                class="score-margin" />
        </div>
    </div>
</template>
<script setup>

import ActivityIcon from './ActivityIcon.vue';
import Score from './Score.vue';
import { activitiesTypeConfig } from "../config/activities_config";
import { CONSTANTS } from "../common/constants";
import { ref, computed, defineProps, onMounted } from "vue";
import ActivitiesService from "../services/ActivitiesService";
import { useRoute } from 'vue-router';


const props = defineProps({
    activityId: {
        type: String,
        required: true
    },
});

const activity = ref(null);

const activityConfig = computed(() => activitiesTypeConfig[activity.value.resourceType] || {
    [CONSTANTS.SCORE]: false,
    [CONSTANTS.ZOOM]: false,
});

onMounted(async () => {


    if (props.activityId) {
        const route = useRoute();
        const routeName = route.name;
        let apiActivities = [];
        if (routeName.toLowerCase().includes('v1')) {
            apiActivities = await ActivitiesService.getAllActivitiesV1();
        } else if (routeName.toLowerCase().includes('v2')) {
            apiActivities = await ActivitiesService.getAllActivitiesV2();
        } else {
            apiActivities = await ActivitiesService.getAllActivitiesV1();
        }

        activity.value = apiActivities.find(activity => activity.id === props.activityId);
    }
});
</script>

<style scoped >
.zoom-main-section {
    display: flex;
    justify-content: center;
}

.score-margin {
    margin-bottom: 10px;
}
</style>