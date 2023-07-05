<template>
  <div class="container">
    <section class="hero">
      <div class="title is-2 mb-4">Timeline</div>
    </section>
    <Search />
    <Filter :activities="Object.keys(activitiesTypeConfig)" @update:filters="updateFilters" />
      <Activity v-for="activity in filteredActivities" :key="activity.id" :activity="activity" />
  </div>
</template>

<script setup>
import Search from '../components/Search.vue'
import Filter from '../components/Filter.vue'
import Activity from '../components/Activity.vue'
import ActivitiesService from '../services/ActivitiesService'
import { ref, onMounted, toRaw } from "vue";
import ActivityModel from "../models/activity";
import { sortActivitiesByDate, filterActivitiesByTypes } from "../utils/utils";
import { activitiesTypeConfig } from "../config/activities_config";
let filteredActivities = ref([]);
let originalActivities = ref([]);

onMounted(async () => {
  const response = await ActivitiesService.getAllActivitiesV1();
  const activitiesList = sortActivitiesByDate(response.data.map(activity => new ActivityModel(activity)));
  originalActivities.value = activitiesList;
  filteredActivities.value = activitiesList;
})

const updateFilters = (filters) => {
  filteredActivities.value = sortActivitiesByDate(filterActivitiesByTypes(toRaw(originalActivities.value), filters));
}

</script>
