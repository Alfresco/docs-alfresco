---
title: Microsoft Outlook Connector
---

The Microsoft Outlook Connector uses the Microsoft Graph API and supports the following operations:

* Create a event calendar: Creates an event or appointment in the calendar.
* Get schedule availability: Retrieves user availability information for a specific period of time.
* Update an event calendar: Updates an event or appointment in the calendar.

## Configuration

### Building Configuration

For the MS Teams connector to function certain properties must be defined in the `application.properties` file of the Spring Boot application. By default, these properties are set to environment variables.

The connector requires an MS Team Client.

The following are a set of properties that shall be defined for a standard use of this connector:

```bash
teams.connector.client.id=${TEAMS_CLIENT_ID}
teams.connector.client.secret=${TEAMS_CLIENT_SECRET}
teams.connector.scope=${TEAMS_SCOPE}
teams.connector.username=${TEAMS_USERNAME}
teams.connector.password=${TEAMS_PASSWORD}
teams.connector.tenant=${TEAMS_TENANT}
```

As the connector uses a stream mechanism to send/receive information between AAE and the connector, the following property is used to identify the connector:

```bash
spring.cloud.stream.bindings.createTeamsEventCalendar.destination=${teams.connector.name}${spring.application.name}.CREATE_CALENDAR_EVENT
spring.cloud.stream.bindings.createTeamsEventCalendar.contentType=application/json
spring.cloud.stream.bindings.createTeamsEventCalendar.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.createTeamsChannel.destination=${teams.connector.name}${spring.application.name}.CREATE_CHANNEL
spring.cloud.stream.bindings.createTeamsChannel.contentType=application/json
spring.cloud.stream.bindings.createTeamsChannel.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.getTeams.destination=${teams.connector.name}${spring.application.name}.GET_TEAMS
spring.cloud.stream.bindings.getTeams.contentType=application/json
spring.cloud.stream.bindings.getTeams.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.getChannels.destination=${teams.connector.name}${spring.application.name}.GET_CHANNELS
spring.cloud.stream.bindings.getChannels.contentType=application/json
spring.cloud.stream.bindings.getChannels.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.getScheduleAvailability.destination=${teams.connector.name}${spring.application.name}.GET_SCHEDULE_AVAILABILITY
spring.cloud.stream.bindings.getScheduleAvailability.contentType=application/json
spring.cloud.stream.bindings.getScheduleAvailability.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.updateTeamsEventCalendar.destination=${teams.connector.name}${spring.application.name}.UPDATE_CALENDAR_EVENT
spring.cloud.stream.bindings.updateTeamsEventCalendar.contentType=application/json
spring.cloud.stream.bindings.updateTeamsEventCalendar.group=${CONSUMER_GROUP:${spring.application.name}}
```

In addition to the above configuration, these variables are required to perform the MS Teams operations:

## Create a calendar event

#### Inbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| subject | yes | String | Subject of the calendar event. |
| text |  no | String | Body of the calendar event. |
| startDate | yes | DateTime | Start Date / Time of the event. |
| minutes | yes | Integer | Duration in minutes of the event. |
| endDate | yes | DateTime | End Date / Time of the event. |
| attendees | yes | Array | List of attendees email addresses. |
| location | no | String | Location of the event. |
| timeZone | no | String | Timezone of the event. In general, the timeZone property can be set to any of the [time zones currently supported by Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones), as well as the additional [time zones supported by the calendar API](https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones). By default, 'GMT Standard Time'.|

#### Outbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| result | no | JSON | Response with the identifier returned by MS Teams API. |

## Create a channel

#### Inbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| teamId | yes | String | Identifier of the team in which the channel will be created. |
| channelName |  yes | String | Name of the channel. |
| channelDescription | no | String | Description of the channel. |
| channelType | no | String | Type of the channel. |

#### Outbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| result | no | JSON | Response with the channel name and the description returned by MS Teams API. |
| channelId | no | String | Identifier of the channel created. |

## Get teams

#### Inbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| teamName | no | String | Name of the team. If this property is null, the action will return all the teams. |

#### Outbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| result | no | JSON | Response with the team name and the identifier returned by MS Teams API. |

## Get channels

#### Inbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| teamId | yes | String | Identifier of the team. |
| channelName | no | String | Name of the channel. If this property is null, the action will return all the channels. |

#### Outbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| result | no | JSON | Response with the identifier, the name, the membership type and the web url returned by MS Teams API. |

## Get schedule availability

#### Inbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| startDate | yes | DateTime | Start date of the period of time to query. The time period to look up must be less than 42 days.|
| endDate | yes | DateTime | End date of the period of time to query. The time period to look up must be less than 42 days.|
| timeZone | no | String | Time zone. E.g: 'Pacific Standard Time'. The timeZone property can be set to any of the time zones currently supported by Windows: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones as well as the additional time zones supported by the calendar API: https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0. By default, 'GMT Standard Time'.|
| scheduleAddress | yes | array | Email address of a user, group, or room. |
| availabilityViewInterval | yes | Integer | Defines the granularity, in minutes, used to represent the availability view result. Default value: 60. |

#### Outbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| availabilityView | yes | String | Merged view of availability for the specific period of time. The merged view is a string that consists of time slots covering that day, with each time slot following convention:\n\n0= free\n1= tentative\n2= busy\n3= out of office\n4= working elsewhere. |
| availability | yes | String | Single value that represents a global availability status for the required period:\n\n0: if the user is free during the whole interval.\n\n1: If all the existing slots in the required period are either free or tentative.\n\n2, 3, 4: If there are busy, OOO, or working elsewhere slots respectively in the required period. |
| scheduleItems | yes | JSON | List of objects containing each of the events in the user's calendar. |
| workingHours | yes | JSON | Indicates the days of the week and time intervals when the user can be available. |

## Create a calendar event

#### Inbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| subject | yes | String | Subject of the calendar event. |
| text |  no | String | Body of the calendar event. |
| startDate | yes | DateTime | Start Date / Time of the event. |
| minutes | yes | Integer | Duration in minutes of the event. |
| endDate | yes | DateTime | End Date / Time of the event. |
| attendees | yes | Array | List of attendees email addresses. |
| location | no | String | Location of the event. |
| timeZone | no | String | Timezone of the event. In general, the timeZone property can be set to any of the [time zones currently supported by Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones), as well as the additional [time zones supported by the calendar API](https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones). By default, 'GMT Standard Time'.|

#### Outbound Variables

| Property  | Required | Type | Description |
|---|---|---| --- |
| result | no | JSON | Response with the identifier returned by MS Teams API. |