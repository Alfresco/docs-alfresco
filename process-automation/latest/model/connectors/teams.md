---
title: Microsoft Teams Connector
---

The Microsoft Teams Connector uses the [Microsoft Graph](https://slack.com){:target="_blank"} API to intergrate with Microsfot Teams. What can I add here.

The Teams Connector is displayed on the process diagram with the Teams logo.

> **Important**: The Teams Connector and user both require a Microsoft Teams client. The Teams Connector requires a Teams account and is separate to the Alfresco hosted environment and should be created and managed by customers.

The actions that can be executed using the Teams connector are:

* [Get Teams](#get-teams) retrieves all teams of the organisation.
* [createTeamsChannel](#createTeamsChannel) (public or private).
* [Get channels](#get-channels) retrieves all existing channels for a specific team.
* [Get Schedule Availability](#get-schedule-availability) retrieves user availability.

## Configuration

For the Teams connector to function specifc properties must be defined in the `application.properties` file of the Spring Boot application. By default, these properties are set to environment variables.

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

In addition to the above configuration, these properties are required to perform the MS Teams operations:

## Get Teams

The `getTeams` action is used by the Teams Connector to retrieves all the teams of the organisation that are visible to the application.

#### Inbound Variables

| Property | Type | Description |
|--- | --- | --- |
| teamName | String | *Optional* Name of the team. If this property is null, the action will return all the teams. |

#### Outbound Variables

| Property  | Type | Description |
|--- |--- |--- |
| result | JSON | *Optional* Response with the team name and the identifier returned by MS Teams API. |

## Create Teams Channel`

The `createTeamsChannel` action is used by the Teams Connector to create a new public or private channel in Teams.

#### Inbound Variables

| Property  | Type | Description |
|--- |--- | --- |
| teamId | String | *Required* Identifier of the team in which the channel will be created. |
| channelName | String | *Required* Name of the channel. |
| channelDescription | String | *Optional* Description of the channel. |
| channelType | String | *Optional* Type of the channel. |

#### Outbound Variables

| Property | Type | Description |
|--- | --- | --- |
| result | JSON | *Optional* Response with the channel name and the description returned by MS Teams API. |
| channelId | String | *Optional* Identifier of the channel created. |

## Get channels

The `getChannels` action is used by the Teams Connector to retrieve all the existing channels from a specific team.  

#### Inbound Variables

| Property | Type | Description |
|---|---| --- |
| teamId | String | *Required* Identifier of the team. |
| channelName | String | *Optional* Name of the channel. If this property is null, the action will return all the channels. |

#### Outbound Variables

| Property | Type | Description |
|---|---|--- |
| result | JSON | *Optional* Response with the identifier, the name, the membership type and the web url returned by MS Teams API. |

## Get schedule availability

The `getScheduleAvailability`action retrieves a users availability information for a specific period of time.

The input parameters to get the schedule availability in Teams are:

| Property  | Type | Description |
| --- | --- | --- |
| startDate | DateTime | *Required* Start date of the period of time to query. The time period to look up must be less than 42 days.|
| endDate | DateTime | *Required* End date of the period of time to query. The time period to look up must be less than 42 days.|
| timeZone | String | *Optional* Time zone. E.g: 'Pacific Standard Time'. The timeZone property can be set to any of the time zones currently supported by Windows: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones as well as the additional time zones supported by the calendar API: https://docs.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0. By default, 'GMT Standard Time'.|
| scheduleAddress | array | *Required* Email address of a user, group, or room. |
| availabilityViewInterval | yes | Integer | *Required* Defines the granularity, in minutes, used to represent the availability view result. Default value: 60. |

The output parameters to get the schedule availability in Teams are:

| Property  | Required | Type | Description |
| --- | --- | --- |
| availabilityView | String | *Required* Merged view of availability for the specific period of time. The merged view is a string that consists of time slots covering that day, with each time slot following convention:\n\n0= free\n1= tentative\n2= busy\n3= out of office\n4= working elsewhere. |
| availability | String | *Required* Single value that represents a global availability status for the required period:\n\n0: if the user is free during the whole interval.\n\n1: If all the existing slots in the required period are either free or tentative.\n\n2, 3, 4: If there are busy, OOO, or working elsewhere slots respectively in the required period. |
| scheduleItems | JSON | *Required* List of objects containing each of the events in the user's calendar. |
| workingHours | JSON | *Required* Indicates the days of the week and time intervals when the user can be available. |