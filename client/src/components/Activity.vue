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
      <Score v-if="activityConfig[CONSTANTS.SCORE]" :score="activity.score" :possible-score="activity.possibleScore" />
      <ViewWorkButton v-if="activityConfig[CONSTANTS.ZOOM]" @viewWorkClicked="handleViewWorkClicked"
        :activityId="activity.id" />
      <v-dialog v-model="dialog">
        <v-card class="dialog-card">
          <v-card-actions class="justify-end">
            <v-btn icon @click="dialog = false">
              <v-icon large>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
          <Zoom :activityId="activity.id" />
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script setup>

import ActivityIcon from './ActivityIcon.vue';
import Score from './Score.vue';
import Zoom from './Zoom.vue';
import ViewWorkButton from './ViewWorkButton.vue';
import { activitiesTypeConfig } from "../config/activities_config";
import { CONSTANTS } from "../common/constants";
import { computed, defineProps, ref } from "vue";

const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
});

const dialog = ref(false);

const activityConfig = computed(() => activitiesTypeConfig[props.activity.resourceType] || {
  [CONSTANTS.SCORE]: false,
  [CONSTANTS.ZOOM]: false,
});

const handleViewWorkClicked = () => {
  dialog.value = true;
};

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

.rounded-lg {
  background-color: white;
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