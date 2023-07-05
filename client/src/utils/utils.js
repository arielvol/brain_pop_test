//import moment from 'moment';
import { CONSTANTS } from "../common/constants";

import moment from 'moment';

export function generateFormattedDate(dateTimeObj) {
  return moment(dateTimeObj).format("MMM D, YYYY · h:mm a");
}

export function convertTimestampToDate(timestamp) {
    const dateTime = new Date(timestamp * 1000);
    // const datetime = moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
    return dateTime;
}

export function sortActivitiesByDate(activities, byMonth = true) {
    const newActivitiesSortedList = [...activities];
    return newActivitiesSortedList.sort((a, b) => {
        if(byMonth) {
            if(a.creationDate.getFullYear() !== b.creationDate.getFullYear()) {
                return a.creationDate.getFullYear() - b.creationDate.getFullYear();
            }
            // If years are same, sort by month
            return a.creationDate.getMonth() - b.creationDate.getMonth();
        } else {
            // Sort by year only
            return a.creationDate.getFullYear() - b.creationDate.getFullYear();
        }
    });
}

export function filterActivitiesByTypes(activities, activitiesTypeList) {
    if (!activitiesTypeList || activitiesTypeList.length === 0 || activitiesTypeList.includes(CONSTANTS.ALL_WORK)) {
        return activities;
    }
    const filtered = activities.filter(activity => {
        const activityTypeFormatted = activity.type.toLowerCase().replace(/\s+/g, '_');
        return activitiesTypeList.includes(activityTypeFormatted);
    });
    return filtered;
}

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

export function formatToDisplayText(str) {
    return toTitleCase(str).replace(/_/g, ' ');;
}


export function generateActivityDisplayText(topicName, resourceType) {
    const name = toTitleCase(topicName);
    const type = resourceType.replace(/_/g, ' ');
    const resourceTypeTitleCase = toTitleCase(type);

    return `${name} ${resourceTypeTitleCase}`;
  }