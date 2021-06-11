---
title: Microsoft Outlook Connector
---

The Microsoft Outlook Connector uses the Microsoft Graph API and supports the following operations:

* [Create a calendar event](#create-a-event-calendar) Creates an event or appointment in the calendar.
* [Update a calendar event](#update-a-calendar-event) Update an event or appointment in the calendar.
* [Get Schedule Availability](#get-schedule-availability) retrieves user availability.

## Configuration

For the Microsoft Outlook connector to function specifc properties must be defined in the `application.properties` file of the Spring Boot application. By default, these properties are set to environment variables.

The following is a set of standard properties that define the use of the connector:

```bash
teams.connector.client.id=${TEAMS_CLIENT_ID}
teams.connector.client.secret=${TEAMS_CLIENT_SECRET}
teams.connector.scope=${TEAMS_SCOPE}
teams.connector.username=${TEAMS_USERNAME}
teams.connector.password=${TEAMS_PASSWORD}
teams.connector.tenant=${TEAMS_TENANT}
```

The connector uses a stream mechanism to send and receive information between Process Services and the connector. For this to occur you need to configure the following properties to so connector can be identified:

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

In addition to the above configuration, these properties are required to perform the Microsoft Outlook operations:

## Create a calendar event

The `createTeamsEventCalendar` action is used by the Outlook Connector to create a calendar even in Microsoft Outlook.

The input parameters to create a calendar event in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| subject | String | *Required* Subject of the calendar event. |
| text | String | *Optional* Body of the calendar event. |
| startDate | *Required* DateTime | Start Date / Time of the event. |
| minutes | Integer | *Required* Duration in minutes of the event. |
| endDate | DateTime | *Required* End Date / Time of the event. |
| attendees | Array | *Required* List of attendees email addresses. |
| location | String | *Optional* Location of the event. |
| timeZone | String | *Optional* Timezone of the event. In general, the `timeZone` property can be set to any of the [time zones currently supported by Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones), as well as the additional [time zones supported by the calendar API](https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones). By default, 'GMT Standard Time'.|

The output parameters to create a calendar event in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| result | JSON | *Optional* Response with the identifier returned by MS Teams API. |

## Update a calendar event

The `updateTeamsEventCalendar` action retrieves a users availability information for a specific period of time.

The input parameters to create a calendar event in Microsoft Outlook are:

| Property | Type | Description |
| --- | --- | --- |
| subject | String | *Required* Subject of the calendar event. |
| text | String | *Required* Body of the calendar event. |
| startDate | DateTime | *Required* Start Date / Time of the event. |
| minutes | Integer | *Required* Duration in minutes of the event. |
| endDate | DateTime | *Required* End Date / Time of the event. |
| attendees | Array | *Required* List of attendees email addresses. |
| location | String | *Optional* Location of the event. |
| timeZone | String | *Required* Timezone of the event. In general, the timeZone property can be set to any of the [time zones currently supported by Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones), as well as the additional [time zones supported by the calendar API](https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones). By default, 'GMT Standard Time'.|

The output parameters to create a calendar event in Microsoft Outlook are:

| Property | Type | Description |
| --- | --- | --- |
| result | JSON | *Required* Response with the identifier returned by MS Teams API. |

## Get schedule availability

The `getScheduleAvailability`action retrieves a users availability information for a specific period of time.

The input parameters to get the schedule availability in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| startDate | DateTime | *Required* Start date of the period of time to query. The time period to look up must be less than 42 days.|
| endDate | DateTime | *Required* End date of the period of time to query. The time period to look up must be less than 42 days.|
| timeZone | String | *Optional* Time zone. E.g: 'Pacific Standard Time'. The timeZone property can be set to any of the time zones currently supported by Windows: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones as well as the additional time zones supported by the calendar API: https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0. By default, 'GMT Standard Time'.|
| scheduleAddress | array | *Required* Email address of a user, group, or room. |
| availabilityViewInterval | yes | Integer | *Required* Defines the granularity, in minutes, used to represent the availability view result. Default value: 60. |

The output parameters to get the schedule availability in Microsoft Outlook are:

| Property  | Required | Type | Description |
| --- | --- | --- |
| availabilityView | String | *Required* Merged view of availability for the specific period of time. The merged view is a string that consists of time slots covering that day, with each time slot following convention:\n\n0= free\n1= tentative\n2= busy\n3= out of office\n4= working elsewhere. |
| availability | String | *Required* Single value that represents a global availability status for the required period:\n\n0: if the user is free during the whole interval.\n\n1: If all the existing slots in the required period are either free or tentative.\n\n2, 3, 4: If there are busy, OOO, or working elsewhere slots respectively in the required period. |
| scheduleItems | JSON | *Required* List of objects containing each of the events in the user's calendar. |
| workingHours | JSON | *Required* Indicates the days of the week and time intervals when the user can be available. |