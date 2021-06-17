---
title: Microsoft Outlook connector
---

The Outlook connector uses the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/use-the-api){:target="_blank"} API to integrate with Microsoft Outlook.

The Outlook connector is displayed on the process diagram with the Outlook logo.

> **Important**: The Outlook connector and user both require a Microsoft Outlook client. The Outlook connector requires a Microsoft Outlook account. The account is separate to the Alfresco hosted environment and should be created and managed by an administrator.

The actions that can be executed using the Outlook connector are:

* [Create a calendar event](#create-a-calendar-event) creates an event or appointment in the calendar.
* [Update a calendar event](#update-a-calendar-event) update an event or appointment in the calendar.
* [Get schedule availability](#get-schedule-availability) retrieves user availability.

## Configuration

For the Outlook connector to function specifc properties must be defined in the `application.properties` file of the Spring Boot application. By default, these properties are set to environment variables.

The following is a set of standard properties that define the use of the connector:

```bash
teams.connector.client.id=${TEAMS_CLIENT_ID}
teams.connector.client.secret=${TEAMS_CLIENT_SECRET}
teams.connector.scope=${TEAMS_SCOPE}
teams.connector.username=${TEAMS_USERNAME}
teams.connector.password=${TEAMS_PASSWORD}
teams.connector.tenant=${TEAMS_TENANT}
```

The connector uses a stream mechanism to send and receive information between Process Services and the connector. For this to occur you need to configure the following properties so the connector can be identified:

```bash
spring.cloud.stream.bindings.createTeamsEventCalendar.destination=${teams.connector.name}${spring.application.name}.CREATE_CALENDAR_EVENT
spring.cloud.stream.bindings.createTeamsEventCalendar.contentType=application/json
spring.cloud.stream.bindings.createTeamsEventCalendar.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.getScheduleAvailability.destination=${teams.connector.name}${spring.application.name}.GET_SCHEDULE_AVAILABILITY
spring.cloud.stream.bindings.getScheduleAvailability.contentType=application/json
spring.cloud.stream.bindings.getScheduleAvailability.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.updateTeamsEventCalendar.destination=${teams.connector.name}${spring.application.name}.UPDATE_CALENDAR_EVENT
spring.cloud.stream.bindings.updateTeamsEventCalendar.contentType=application/json
spring.cloud.stream.bindings.updateTeamsEventCalendar.group=${CONSUMER_GROUP:${spring.application.name}}
```

In addition to the above configuration the following properties are required to perform Outlook operations:

## Create a calendar event

The `createTeamsEventCalendar` action is used by the Outlook connector to create a calendar event in Microsoft Outlook.

The input parameters to create a calendar event in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| subject | String | *Required.* Subject of the calendar event. |
| text | String | *Optional.* Body of the calendar event. |
| startDate | DateTime | *Required.* Start Date / Time of the event. |
| minutes | Integer | *Required.* Duration in minutes of the event. |
| endDate | DateTime | *Required.* End Date / Time of the event. |
| attendees | Array | *Required.* List of attendees email addresses. |
| location | String | *Optional.* Location of the event. |
| timeZone | String | *Optional.* Timezone of the event. In general, the `timeZone` property can be set to any of the [time zones supported by Microsoft Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones){:target="_blank"} as well as the additional [time zones supported by the calendar API](https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones){:target="_blank"}. By default, **GMT Standard Time**.|

The output parameters to create a calendar event in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| result | JSON | *Optional.* Response with the identifier returned by the Teams API. |

## Update a calendar event

The `updateTeamsEventCalendar` action retrieves calendar event information for a specific event in Microsoft Outlook.

The input parameters to update an event in Microsoft Outlook are:

| Property | Type | Description |
| --- | --- | --- |
| subject | String | *Required.* Subject of the calendar event. |
| text | String | *Required.* Body of the calendar event. |
| startDate | DateTime | *Required.* Start Date / Time of the event. |
| minutes | Integer | *Required.* Duration in minutes of the event. |
| endDate | DateTime | *Required.* End Date / Time of the event. |
| attendees | Array | *Required.* List of attendees email addresses. |
| location | String | *Optional.* Location of the event. |
| timeZone | String | *Required.* Timezone of the event. In general, the `timeZone` property can be set to any of the [time zones supported by Microsoft Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones){:target="_blank"} as well as the additional [time zones supported by the calendar API](https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones){:target="_blank"}. By default, **GMT Standard Time**.|

The input parameter used to update an event in Microsoft Outlook is:

| Property | Type | Description |
| --- | --- | --- |
| result | JSON | *Required.* Response with the identifier returned by the Teams API. |

## Get schedule availability

The `getScheduleAvailability` action retrieves a users availability information for a specific period of time.

The input parameters to get the schedule availability in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| startDate | DateTime | *Required.* Start date of the period of time to query. The time period must be less than 42 days.|
| endDate | DateTime | *Required.* End date of the period of time to query. The time period must be less than 42 days.|
| timeZone | String | *Optional.* Time zone e.g: **Pacific Standard Time**. The `timeZone` property can be set to any of the [time zones currently supported by Microsoft Windows](#https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones){:target="_blank"} as well as the additional [time zones supported by the calendar API](#https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0){:target="_blank"}. By default, `GMT Standard Time`.|
| scheduleAddress | array | *Required.* Email address of a user, group, or room. |
| availabilityViewInterval | Integer | *Required.* Defines the granularity, in minutes, used to represent the users availability. Default value: `60`. |

The output parameters to get the schedule availability in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| availabilityView | String | *Required.* Merged view of availability for the specific period of time. The merged view is a string that consists of time slots covering that day, with each time slot using the following convention: `n0` - free, `n1` - tentative, `n2` - busy, `n3` - out of office, `n4` - working elsewhere. |
| availability | String | *Required.* Single value that represents a global availability status for the required period. 0 - a user is free during the whole interval. `1` - all the existing slots in the required period are either free or tentative (at least one of them is tentative). `2` - all the existing slots in the required period are either free or tentative or busy (at least one of them is busy). `3` - all the existing slots in the required period are either free or tentative or busy or out of the office (at least one of them is  out of the office). `4` - all the existing slots in the required period are either free or tentative or busy or out of the office or working elsewhere (at least one of them is working elsewhere). |
| scheduleItems | JSON | *Required.* List of objects containing each of the events in the user`s calendar. |
| workingHours | JSON | *Required.* Indicates the days of the week and time intervals when the user can be available. |
