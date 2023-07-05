import { activitiesApiClient } from "../common/axios";


export default {
  getAllActivitiesV1() {
    return activitiesApiClient.get("/activities/v1");
  },

  getAllActivitiesV2() {
    return activitiesApiClient.get("/activities/v2");
  },
};
