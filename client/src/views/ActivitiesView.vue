<template>
  <div class="container">
    <section class="hero">
      <div class="title is-2 mb-4">Timeline</div>
    </section>
    <Search v-model="searchTerm" :suggestions="suggestions" label-text="Search timeline" />
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
import { sortActivitiesByDate, filterActivitiesByTypes, filterActivitiesByText } from "../utils/utils";
import { activitiesTypeConfig } from "../config/activities_config";
import { CONSTANTS } from '../common/constants';
import { useRoute } from 'vue-router';

let filtersList = ref([]);
let originalActivitiesList = ref([]);
let searchTerm = ref('');


onMounted(async () => {

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

  const activitiesList = sortActivitiesByDate(apiActivities);
  originalActivitiesList.value = activitiesList;
  updateFilters([]);
})

const suggestions = computed(() => {
  return filteredActivities.value.map(activity => activity.displayText);
});

const updateFilters = (newFilters) => {
  filtersList.value = newFilters;
}

let filteredActivities = computed(() => {
  let filtered = filterActivitiesByTypes(toRaw(originalActivitiesList.value), filtersList.value);
  if (searchTerm.value) {
    filtered = filterActivitiesByText(filtered, searchTerm.value);
  }
  return sortActivitiesByDate(filtered);
});

const activitiesByMonth = computed(() => {
  let activities = {};
  for (let activity of filteredActivities.value) {
    const monthYear = `${CONSTANTS.MONTHS[activity.creationDate.getMonth()]}`;
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
