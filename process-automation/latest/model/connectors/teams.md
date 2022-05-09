---
title: Microsoft Teams connector
---

The Microsoft Teams connector uses the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/use-the-api){:target="_blank"} API to intergrate with Microsfot Teams.

The Teams connector is displayed on the process diagram with the Teams logo.

> **Important**: The Teams connector and user both require a Microsoft Teams client. The Teams connector requires a Microsoft Teams account. The account is separate to the Alfresco hosted environment and should be created and managed by an administrator.

The actions that can be executed using the Teams connector are:

* [Get Teams](#get-teams) retrieves all teams of the organization.
* [Create Teams channel](#create-teams-channel) creates a new public or private channel.
* [Get channels](#get-channels) retrieves all existing channels for a specific team.

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

The connector uses a stream mechanism to send and receive information between Process Services and the connector. For this to occur you need to configure the following properties so the connector can be identified:

```bash
spring.cloud.stream.bindings.createTeamsChannel.destination=${teams.connector.name}${spring.application.name}.CREATE_CHANNEL
spring.cloud.stream.bindings.createTeamsChannel.contentType=application/json
spring.cloud.stream.bindings.createTeamsChannel.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.getTeams.destination=${teams.connector.name}${spring.application.name}.GET_TEAMS
spring.cloud.stream.bindings.getTeams.contentType=application/json
spring.cloud.stream.bindings.getTeams.group=${CONSUMER_GROUP:${spring.application.name}}
spring.cloud.stream.bindings.getChannels.destination=${teams.connector.name}${spring.application.name}.GET_CHANNELS
spring.cloud.stream.bindings.getChannels.contentType=application/json
spring.cloud.stream.bindings.getChannels.group=${CONSUMER_GROUP:${spring.application.name}}
```

In addition to the above configuration the following properties are required to perform Teams operations:

## Get Teams

The `getTeams` action is used by the Teams connector and retrieves all of the visible teams of the organization.

The input parameter to retrieve all of the visible teams is:

| Property | Type | Description |
|--- | --- | --- |
| teamName | String | *Optional.* Name of the team. If this property is null, the action will return all the teams. |

The output parameter to retrieve all of the visible teams is:

| Property  | Type | Description |
|--- |--- |--- |
| result | JSON | *Optional.* Response with the team name and the identifier returned by the Teams API. |

## Create Teams Channel

The `createTeamsChannel` action is used by the Teams connector to create a new public or private channel in Teams.

The input parameters to create a new private or public channel are:

| Property  | Type | Description |
|--- |--- | --- |
| teamId | String | *Required.* Identifier of the team in which the channel will be created. |
| channelName | String | *Required.* Name of the channel. |
| channelDescription | String | *Optional.* Description of the channel. |
| channelType | String | *Optional.* Type of the channel. |

The output parameters to create a new private or public channel are:

| Property | Type | Description |
|--- | --- | --- |
| result | JSON | *Optional.* Response with the channel name and the description returned by the Teams API. |
| channelId | String | *Optional.* Identifier of the channel created. |

## Get channels

The `getChannels` action is used by the Teams connector to retrieve all the existing channels from a specific team.  

The input parameters to retrieve all the existing channels from a specific team are:

| Property | Type | Description |
|---|---| --- |
| teamId | String | *Required.* Identifier of the team. |
| channelName | String | *Optional.* Name of the channel. If this property is null, the action will return all the channels. |

The output parameter to retrieve all the existing channels from a specific team is:

| Property | Type | Description |
|---|---|--- |
| result | JSON | *Optional.* Response with the identifier, the name, the membership type, and the web url returned by the Teams API. |
