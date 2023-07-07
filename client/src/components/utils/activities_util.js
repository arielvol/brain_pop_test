import ActivitiesService from '../../services/ActivitiesApiService'


export async function getActivities(routeName) {
    let apiActivities = [];
    if (routeName.toLowerCase().includes('v1')) {
      apiActivities = await ActivitiesService.getAllActivitiesV1();
    } else if (routeName.toLowerCase().includes('v2')) {
      apiActivities = await ActivitiesService.getAllActivitiesV2();
    } else {
      apiActivities = await ActivitiesService.getAllActivitiesV1();
    }

    return apiActivities
}