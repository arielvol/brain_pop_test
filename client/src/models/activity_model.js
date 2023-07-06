import {
  convertTimestampToDate,
  generateActivityDisplayText,
  generateFormattedDate
} from '../utils/utils'

class ActivityModel {
  constructor() {
    this.id = ''
    this.resourceType = ''
    this.score = ''
    this.possibleScore = ''
    this.product = ''
    this.creationDate = ''
    this.topicName = ''
    this.topicIconPath = ''
    this.comment = ''
    this.displayText = ''
    this.formattedCreationDate = ''
  }

  static fromApiResponse(version, activityObj) {
    if (version === 'v1') {
      return this.fromV1Response(activityObj)
    } else if (version === 'v2') {
      return this.fromV2Response(activityObj)
    } else {
      throw new Error(`Unsupported API version: ${version}`)
    }
  }

  static fromV1Response(activityObj) {
    const instance = new ActivityModel()
    instance.id = activityObj.id
    instance.resourceType = activityObj.resource_type
    instance.score = activityObj.score
    instance.possibleScore = activityObj.possible_score
    instance.product = activityObj.product
    instance.creationDate = convertTimestampToDate(activityObj.d_created)
    instance.topicName = activityObj.topic_data.name
    instance.topicIconPath = activityObj.topic_data.icon_path
    instance.comment = activityObj.comment
    instance.displayText = generateActivityDisplayText(instance.topicName, instance.resourceType)
    instance.formattedCreationDate = generateFormattedDate(instance.creationDate)
    return instance
  }

  static fromV2Response(activityObj) {
    const instance = new ActivityModel()
    instance.id = activityObj.activities[0].id
    instance.resourceType = activityObj.resource_type
    instance.score = activityObj.activities[0].score
    instance.possibleScore = activityObj.activities[0].possible_score
    instance.product = activityObj.activities[0].product
    instance.creationDate = convertTimestampToDate(activityObj.activities[0].d_created)
    instance.topicName = activityObj.activities[0].topic_data.name
    instance.topicIconPath = activityObj.activities[0].topic_data.icon_path
    instance.comment = activityObj.comment
    instance.displayText = generateActivityDisplayText(instance.topicName, instance.resourceType)
    instance.formattedCreationDate = generateFormattedDate(instance.creationDate)
    return instance
  }
}

export default ActivityModel
