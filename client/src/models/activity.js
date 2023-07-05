import {convertTimestampToDate, generateActivityDisplayText, generateFormattedDate} from "../utils/utils"

class Activity {
    constructor(activityObj) {
        this.id = activityObj.id;
        this.resourceType = activityObj.resource_type;
        this.score = activityObj.score;
        this.possibleScore = activityObj.possible_score;
        this.product = activityObj.product;
        this.creationDate = convertTimestampToDate(activityObj.d_created);
        this.topicName = activityObj.topic_data.name;
        this.topicIconPath = activityObj.topic_data.icon_path;
        this.comment = activityObj.comment;

        this.displayText = generateActivityDisplayText(this.topicName, this.resourceType );
        this.formattedCreationDate = generateFormattedDate(this.creationDate);
    }
}

export default Activity;