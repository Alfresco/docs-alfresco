---
title: Calendar connector
---

The Calendar connector uses the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/use-the-api){:target="_blank"} API to integrate with Microsoft Outlook.

The Calendar connector is displayed on the process diagram with the calendar icon.

> **Important**: The Calendar connector and user both require a Microsoft Outlook client. The Calendar connector requires a Microsoft Outlook account. The account is separate to the Alfresco hosted environment and should be created and managed by an administrator.

The actions that can be executed using the Calendar connector are:

* [Create a calendar event](#create-a-calendar-event) creates an event or appointment in the calendar.
* [Update a calendar event](#update-a-calendar-event) updates an event or appointment in the calendar.
* [Get schedule availability](#get-schedule-availability) retrieves user availability.

## Configuration

### Calendar connector configuration parameters

The Calendar connector uses the Microsoft Teams credentials to connect with a Microsoft account.
The configuration parameters for the Calendar connector are:

| Parameter | Description |
|-----------|-------------|
| TEAMS_CLIENT_ID | *Required.* The client identifier to be used for authentication. |
| TEAMS_CLIENT_SECRET | *Required.* The client secret to be used for authentication. |
| TEAMS_SCOPE | The scopes requested by the connector in the Teams instance OAuth protocol. |
| TEAMS_TENANT | The Teams tenant to be used by the connector. |

### Calendar connector errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Calendar connector are:

| Error | Description |
|-------|-------------|
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| INVALID_REQUEST | An invalid request is received. |
| SCHEDULE_ERROR | An error occurred from attempting to get the availability. |
| UNKNOWN_ERROR | An unexpected error occurred during the execution of the action. |

In addition to the above configuration the following properties are required to perform calendar operations.

## Create a calendar event

The `createTeamsEventCalendar` action is used by the Calendar connector to create a calendar event in Microsoft Outlook.

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
| onlineMeeting | Boolean | *Optional.* Adds an online Teams meeting to the event. |
| attachments | File | *Optional.* File to attach to the calendar event. |

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
| availability | String | *Required.* Single value that represents a global availability status for the required period. `0` - a user is free during the whole interval. `1` - all the existing slots in the required period are either free or tentative (at least one of them is tentative). `2` - all the existing slots in the required period are either free or tentative or busy (at least one of them is busy). `3` - all the existing slots in the required period are either free or tentative or busy or out of the office (at least one of them is  out of the office). `4` - all the existing slots in the required period are either free or tentative or busy or out of the office or working elsewhere (at least one of them is working elsewhere). |
| scheduleItems | JSON | *Required.* List of objects containing each of the events in the user`s calendar. |
| workingHours | JSON | *Required.* Indicates the days of the week and time intervals when the user can be available. |

## Remove a calendar event

The `removeTeamsEventCalendar` action removes an event or appointment in the calendar.

The input parameters to remove an event or appointment in Microsoft Outlook are:

| Property  | Type | Description |
| --- | --- | --- |
| id | String | *Required.* Identifier of the calendar event.|
