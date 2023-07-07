import { activitiesApiClient } from "../common/axios";
import ActivityModel from "../models/activity_model";


export default {
  async getAllActivitiesV1() {
    const response = await activitiesApiClient.get("/activities/v1")
    return response.data.map(activityObj => ActivityModel.fromApiResponse('v1', activityObj));
  },

  async getAllActivitiesV2() {
    const response = await activitiesApiClient.get("/activities/v2")
    return response.data.map(activityObj => ActivityModel.fromApiResponse('v2', activityObj));
  },
};
