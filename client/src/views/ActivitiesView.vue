<template>
  <div class="container">
    <section class="hero">
      <div class="title is-2 mb-4">Timeline</div>
    </section>
    <Search v-model="searchTerm" :suggestions="suggestions" label-text="Search timeline" />
    <ActivityFilter class="mb-9" :activities="Object.keys(activitiesTypeConfig)" @update:filters="onUpdateFilters" />
    <div v-if="hiddenActivitiesIdList.length > 0" class="mb-9">
      <v-btn class="borderless text-teal" @click="onUnhideAllActivities">
        <v-icon class="mr-1">mdi-eye-outline</v-icon>
        <div class="title is-6 text-teal">
          Unhide {{ hiddenActivitiesIdList.length }} hidden activities
        </div>
      </v-btn>
    </div>
    <div v-for="(activities, month) in paginatedActivitiesByMonth" :key="`months-${month}`">
      <v-row :key="month" class="mb-7">
        <v-col cols="12">
          <div class="activity-month">{{ month }}</div>
        </v-col>
      </v-row>
      <v-row :key="`activities-${month}`" class="activity-row">
        <v-col cols="12" v-for="activity in activities" :key="activity.id">
          <Activity :activity="activity" @activity:hide="onHideActivity" />
        </v-col>
      </v-row>
    </div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn v-if="hasMoreActivities" class="borderless text-teal mb-9" @click="loadMoreActivities">
          <v-icon class="mr-1">mdi-chevron-down</v-icon>
          <div class="title is-6 text-teal">
            Load more
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Search from '../components/Search.vue'
import ActivityFilter from '../components/ActivityFilter.vue'
import Activity from '../components/Activity.vue'
import { ref, onMounted, toRaw, computed, watch } from "vue";
import { sortActivitiesByDate, filterActivitiesByTypes, filterActivitiesByText } from "../utils/utils";
import { activitiesTypeConfig } from "../config/activities_config";
import { CONSTANTS } from '../common/constants';
import { useRoute } from 'vue-router';
import { getActivities } from '../components/utils/activities_util';

const HIDDEN_ACTIVITIES_KEY = 'hiddenActivitiesIdList';
const MAX_ACTIVITIES_TO_SHOW = 10;

let filtersList = ref([]);
let originalActivitiesList = ref([]);
let searchTerm = ref('');
let hiddenActivitiesIdList = ref([]);
let activitiesToShow = ref(MAX_ACTIVITIES_TO_SHOW);

onMounted(async () => {

  const route = useRoute();
  const routeName = route.name;
  const apiActivities = await getActivities(routeName);
  if (localStorage.getItem(HIDDEN_ACTIVITIES_KEY)) {
    hiddenActivitiesIdList.value = JSON.parse(localStorage.getItem(HIDDEN_ACTIVITIES_KEY));
  }

  const activitiesList = sortActivitiesByDate(apiActivities);
  originalActivitiesList.value = activitiesList;
  onUpdateFilters([]);
})


watch(hiddenActivitiesIdList, (newHiddenActivities) => {
  localStorage.setItem(HIDDEN_ACTIVITIES_KEY, JSON.stringify(newHiddenActivities));
});

const suggestions = computed(() => {
  return filteredActivities.value.map(activity => activity.displayText);
});

const onUpdateFilters = (newFilters) => {
  filtersList.value = newFilters;
}

const onUnhideAllActivities = () => {
  hiddenActivitiesIdList.value = [];
  localStorage.removeItem(HIDDEN_ACTIVITIES_KEY);
};

const onHideActivity = (activityId) => {
  const activity = originalActivitiesList.value.find(item => item.id === activityId);
  hiddenActivitiesIdList.value = [...hiddenActivitiesIdList.value, activity.id];
};


let filteredActivities = computed(() => {
  let filtered = filterActivitiesByTypes(toRaw(originalActivitiesList.value), filtersList.value);
  if (searchTerm.value) {
    filtered = filterActivitiesByText(filtered, searchTerm.value);
  }
  if (hiddenActivitiesIdList.value.length > 0) {
    filtered = filtered.filter(activity => !hiddenActivitiesIdList.value.includes(activity.id));
  }
  return sortActivitiesByDate(filtered);
});

const paginatedActivitiesByMonth = computed(() => {
  let paginatedActivities = {};
  let count = 0;

  for (let activity of filteredActivities.value) {
    const monthYear = `${CONSTANTS.MONTHS[activity.creationDate.getMonth()]}`;

    if (!paginatedActivities[monthYear]) {
      paginatedActivities[monthYear] = [];
    }

    if (count >= activitiesToShow.value) return paginatedActivities;

    paginatedActivities[monthYear].push(activity);
    count++;
  }

  return paginatedActivities;
});


const hasMoreActivities = computed(() => {
  let totalActivities = filteredActivities.value.length;
  return activitiesToShow.value < totalActivities;
});

const loadMoreActivities = () => {
  activitiesToShow.value += MAX_ACTIVITIES_TO_SHOW;
};

</script>

<style scoped>
.activity-month {
  border-radius: 30px;
  background-color: rgb(244, 226, 195);
  width: 100px;
  text-align: center;
  height: 25px;
}

::v-deep .v-col {
  padding: 0px !important;
}
</style>
