<template>
  <div class="container">
    <section class="hero">
      <div class="title is-2 mb-4">Timeline</div>
    </section>
    <Search />
    <Filter :activities="Object.keys(activitiesTypeConfig)" @update:filters="updateFilters" />
    <v-timeline side="end" density="compact" hide-opposite-content>
      <v-timeline-item v-for="(activities, month) in activitiesByMonth" :key="month">
        <v-btn rounded variant="tonal" class="cursor-default has-background-warning mb-7">
          <div class="title is-5">
            {{ month }}
          </div>
        </v-btn>
        <Activity v-for="activity in activities" :key="activity.id" :activity="activity" />
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script setup>
import Search from '../components/Search.vue'
import Filter from '../components/Filter.vue'
import Activity from '../components/Activity.vue'
import ActivitiesService from '../services/ActivitiesService'
import { ref, onMounted, toRaw, computed } from "vue";
import ActivityModel from "../models/activity";
import { sortActivitiesByDate, filterActivitiesByTypes } from "../utils/utils";
import { activitiesTypeConfig } from "../config/activities_config";

let originalActivities = ref([]);

onMounted(async () => {
  const response = await ActivitiesService.getAllActivitiesV1();
  const activitiesList = sortActivitiesByDate(response.data.map(activity => new ActivityModel(activity)));
  originalActivities.value = activitiesList;
  updateFilters([]);  // initialize with no filters
})

const updateFilters = (filters) => {
  filteredActivities.value = sortActivitiesByDate(filterActivitiesByTypes(toRaw(originalActivities.value), filters));
}

let filteredActivities = ref([]);



const activitiesByMonth = computed(() => {
  let activities = {};
  for (let activity of filteredActivities.value) {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthYear = `${monthNames[activity.creationDate.getMonth()]}`;
    if (!(monthYear in activities)) {
      activities[monthYear] = [];
    }
    activities[monthYear].push(activity);
  }
  return activities;
});
</script>

<style scoped>
.cursor-default {
  cursor: default !important;
}

.v-timeline {
  display: inline;
}

.v-timeline-item__opposite {
  display: none;
}

::v-deep .v-timeline-divider__dot {
  display: none !important;
}

::v-deep .v-timeline-divider {
  display: none !important;
}

</style>
