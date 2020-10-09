---
title: Slack connector
---

The Slack connector is used to integrate with the [Slack](https://slack.com){:target="_blank"} web API and REST time messaging API to create Slack channels and send messages to channels or users. 

The Slack connector is displayed on the process diagram with the Slack logo.

The actions that can be executed using the Slack connector are:

* [Send a message](#send-message) to a specific user or channel (public or private)
* [Create a new channel](#create-channel) (public or private)

## Send message

The **SEND_MESSAGE** action is used by the Slack connector to send a message to a user or channel.

The input parameters to send a message in Slack are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| channelId | String | *Requires one.* The channel ID to send the message to. |
| channelName | String | *Requires one.* The name of the channel to send the message to. |
| userId | String | *Requires one.* The user ID of the message recipient. |
| userEmail | String | *Requires ones.* The email address of the message recipient. |
| text | String | *Required.* The contents of the message. The message supports [Freemarker](https://freemarker.apache.org/docs/dgui_datamodel_basics.html){:target="_blank"} syntax, for example `${fullName.lastName}` can be used from the `metadata` parameter to include variables. |
| metadata | JSON | *Optional.* Metadata to be used by the `text` parameter to include [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) in a message. |
| requestResponse | String | *Optional.* Set to `no` and a response will be sent back to the process immediately after the message is sent. Set to `any` and a response will be sent back to the process only after a reply is received in the same channel. Set to `thread` and a response will be sent back to the process only after a reply is received in a thread. |

The output parameters from sending a message in Slack are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | String | *Optional.* The message received in the channel or thread if the input parameter `requestResponse` was set to `any` or `thread`. |

## Create channel

The **CREATE_CHANNEL** action is used by the Slack connector to create a new public or private channel in Slack.

The input parameters to create a channel in Slack are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| channelName | String | *Required.* The name of the channel to be created. |
| channelType | String | *Required.* Set whether the channel is `public` or `private`. |
| members | String | *Required.*  A list of members that will be invited to join the new channel using Slack IDs or email addresses. |

The output parameters from creating a channel in Slack are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| slackResult | JSON | *Optional.* An object containing the details of the newly created channel. |

An example of a channel creation in the `slackResult` is:

```json
{
  "ok":true,
  "channel":{
    "id":"CFWSKMFR6",
    "name":"my_channel",
    "is_channel":true,
    "created":1549985348,
    "is_archived":false,
    "is_general":false,
    "unlinked":0,
    "creator":"UFX13DBJM",
    "name_normalized":"my_channel",
    "is_shared":false,
    "is_org_shared":false,
    "is_member":true,
    "is_private":false,
    "is_mpim":false,
    "last_read":"0000000000.000000",
    "latest":null,
    "unread_count":0,
    "unread_count_display":0,
    "members":[
      "UFX13DBJM",
      "DFWSKM0HH"
    ],
    "topic":{
      "value":"",
      "creator":"",
      "last_set":0
    },
    "purpose":{
      "value":"",
      "creator":"",
      "last_set":0
    },
    "previous_names":[],
    "priority":0
  }
}
```

## Configuration

The Slack connector requires a Slack application and a Slack bot in order to function. The application and bot need to be configured correctly.

1. Use the [Slack website](https://api.slack.com/apps){:target="_blank"} to create an application.

    > **Note**: You will need to be logged in as a workspace administrator to create an application.

2. Use the following URL to create a bot in the application you created: `https://api.slack.com/apps/<app_id>/bots`.

3. Use the following URL to configure the scope and permissions of the application and bot: `https://api.slack.com/apps/<app_id>/oauth`.

    The required [scope and permissions](https://api.slack.com/scopes){:target="_blank"} are:

    * bot
    * channels:read
    * channels:write
    * groups:read
    * groups:write
    * mpim:read
    * mpim:write
    * users:read
    * users:read.email
    * chat:write:bot
    * chat:write:user
    * im:read
    * im:write

4. Use the following URL to obtain the Slack bot user and admin tokens: `https://api.slack.com/apps/<app_id>/oauth`.

### Configuration parameters

The configuration parameters for the Slack connector are:

| Parameter | Description |
| --------- | ----------- |
| SLACK_XOXB | *Required.* The Slack bot user token obtained from configuring Slack, beginning `xoxb-`. |
| SLACK_XOXP | *Required.* The Slack bot admin user token obtained from configuring Slack beginning `xoxp-`. |

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Slack connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| INVALID_RESULT_FORMAT | The REST service result payload cannot be parsed. |
| USER_NOT_FOUND | User is not found. |
| CHANNEL_NOT_FOUND | Channel is not found. |
| INVALID_REQUEST | A null response is received while sending message. |
| INVALID_CHANNEL | There is a problem with the channel. |
| MSG_TOO_LONG | Message text is too long. |
| FATAL_ERROR | The server could not complete the operation without encountering a catastrophic error. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
