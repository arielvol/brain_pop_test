<template>
  <div class="d-flex align-items-center is-justify-content-space-between mb-9 activity-border">
    <div class="d-flex align-items-center">
      <ActivityIcon :iconPath="activity.topicIconPath" :product-type="activity.product" />
      <div class="ml-3">
        <div class="title is-6 mb-1">{{ activity.displayText }}</div>
        <p class="mb-0">{{ activity.formattedCreationDate }}</p>
      </div>
    </div>
    <div class="zoom-and-score-section">
      <ActivityScore v-if="activityConfig[CONSTANTS.SCORE]" :score="activity.score" :possible-score="activity.possibleScore" />

      <v-tooltip text="Show Detailed Work Mode" location="top">
        <template v-slot:activator="{ props }">
          <ViewWorkButton v-bind="props" v-if="activityConfig[CONSTANTS.ZOOM]" @activity:viewWorkClicked="onViewWorkClicked"
            :activityId="activity.id" />
        </template>
      </v-tooltip>

      <v-tooltip text="Hide Activity" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="borderless text-teal title is-6" @click="() => onHideActivity(activity.id)">
            <v-icon class="mr-1">mdi-eye-off-outline</v-icon>
          </v-btn>
        </template>
      </v-tooltip>


      <v-dialog v-model="dialog">
        <v-card class="dialog-card">
          <v-card-actions class="justify-end">
            <v-btn icon @click="dialog = false">
              <v-icon large>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
          <ActivityZoom :activityId="activity.id" />
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script setup>

import ActivityIcon from './ActivityIcon.vue';
import ActivityScore from './ActivityScore.vue';
import ActivityZoom from './ActivityZoom.vue';
import ViewWorkButton from './ViewWorkButton.vue';
import { activitiesTypeConfig } from "../config/activities_config";
import { CONSTANTS } from "../common/constants";

import { computed, ref } from "vue";

const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
});

const emit = defineEmits(['activity:hide']);
const dialog = ref(false);

const activityConfig = computed(() => activitiesTypeConfig[props.activity.resourceType] || {
  [CONSTANTS.SCORE]: false,
  [CONSTANTS.ZOOM]: false,
});

const onViewWorkClicked = () => {
  dialog.value = true;
};

const onHideActivity = (activityId) => {
  emit('activity:hide', activityId);
}

</script>

<style scoped>
.dialog-card {
  width: 50%;
  height: 70%;
  margin: auto;
  max-width: none !important;
  border-radius: 20px !important;
  border: 3px solid teal;
}

.activity-border {
  border: 1px solid teal;
  padding: 20px;
  border-radius: 10px;
}

.zoom-and-score-section {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>