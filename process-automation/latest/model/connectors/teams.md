---
title: Microsoft Teams connector
---

The Microsoft Teams connector uses the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/use-the-api){:target="_blank"} API to integrate with Microsoft Teams.

The Teams connector is displayed on the process diagram with the Teams logo.

> **Important**: The Teams connector and user both require a Microsoft Teams client. The Teams connector requires a Microsoft Teams account. The account is separate to the Alfresco hosted environment and should be created and managed by an administrator.

The actions that can be executed using the Teams connector are:

* [Get Teams](#get-teams) retrieves all teams of the organization.
* [Create Teams channel](#create-teams-channel) creates a new public or private channel.
* [Get channels](#get-channels) retrieves all existing channels for a specific team.

## Configuration

### Teams connector configuration parameters

The configuration parameters for the Teams connector are:

| Parameter | Description |
|-----------|-------------|
| TEAMS_CLIENT_ID | *Required.* The client identifier to be used for authentication. |
| TEAMS_CLIENT_SECRET | *Required.* The client secret to be used for authentication. |
| TEAMS_USERNAME | *Required.* The MS Teams user to impersonate `in:wq` the connector. |
| TEAMS_SCOPE | Thr scopes requested by the connector in the Teams instance OAuth protocol. |
| TEAMS_TENANT | The Teams tenant to be used by the connector. |

### Teams connector errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that
can be handled by the Teams connector are:

| Error | Description |
|-------|-------------|
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| INVALID_REQUEST | An invalid request is received. |
| UNKNOWN_ERROR | An unexpected error occurred during the execution of the action. |

In addition to the above configuration the following properties are required to perform Teams operations:

## Get Teams

The `getTeams` action is used by the Teams connector and retrieves all of the visible teams of the organization.

The input parameter to retrieve all of the visible teams is:

| Property | Type | Description |
|----------|------|-------------|
| teamName | String | *Optional.* Name of the team. If this property is null, the action will return all the teams. |

The output parameter to retrieve all of the visible teams is:

| Property | Type | Description |
|----------|------|-------------|
| result | JSON | *Optional.* Response with the team name and the identifier returned by the Teams API. |

## Create Teams Channel

The `createTeamsChannel` action is used by the Teams connector to create a new public or private channel in Teams.

The input parameters to create a new private or public channel are:

| Property | Type | Description |
|----------|------|-------------|
| teamId | String | *Required.* Identifier of the team in which the channel will be created. |
| channelName | String | *Required.* Name of the channel. |
| channelType | String | *Optional.* Type of the channel. |

The output parameters to create a new private or public channel are:

| Property | Type | Description |
|----------|------|-------------|
| result | JSON | *Optional.* Response with the channel name and the description returned by the Teams API. |
| channelId | String | *Optional.* Identifier of the channel created. |

## Get channels

The `getChannels` action is used by the Teams connector to retrieve all the existing channels from a
specific team.

The input parameters to retrieve all the existing channels from a specific team are:

| Property | Type | Description |
|----------|------|-------------|
| teamId | String | *Required.* Identifier of the team. |
| channelName | String | *Optional.* Name of the channel. If this property is null, the action will return all the channels. |

The output parameter to retrieve all the existing channels from a specific team is:

| Property | Type | Description |
|----------|------|-------------|
| result   | JSON | *Optional.* Response with the identifier, the name, the membership type, and the web url returned by the Teams API. |   
