---
title: Triggers
---

Triggers are used to define a set of event criteria. When the event criteria specified in the trigger is met, the event is published and an action containing a payload is kicked off.

> **Note**: Triggers are not referenced in a process definition.

## Properties

The basic properties of a trigger are:

| Property | Description |
| -------- | ----------- |
| Trigger name | *Required.* The name of the trigger. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example `email-trigger` |
| Trigger description | *Optional.* A description of what the trigger should be used for, for example `Starts a process when an order request email is received.` |

## Create a trigger

To create a trigger:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

3. Select how to create the trigger:

    * **Create > Trigger** creates a new, empty trigger.

    * **Upload > Trigger** allows for uploading an existing trigger `.json` file into the Modeling Application.

    Alternatively use the **+** or **Upload** buttons next to **Triggers** in the left-hand menu.

4. Enter a name and optional description.

## Events {#events}

Trigger events include specific [BPMN]({% link process-automation/latest/model/processes/bpmn.md %}) states occurring in a process such as a timer being fired, a form being saved or events related to [connectors]({% link process-automation/latest/model/connectors/index.md %}) such as an email being received or a webhook REST request.

The events that can be created for a trigger are:

* [BPMN engine activities](#bpmn-engine-events)
* [Form save and submission events](#forms)
* [A user interface event action](#user-interface)
* [Content connector events](#content-connector)
* [An email being received](#email-received)
* [An SMS being received](#sms-received)
* [A Slack message being received](#slack-message-received)
* [An incoming webhook](#webhooks)

**Note:** The events handled in triggers follow the [Cloud Events](https://cloudevents.io/) specification. All the information described there and the specific information of the event is contained inside the `data` field.

### BPMN engine events

[BPMN engine events]({% link process-automation/latest/model/processes/events.md %}) are events generated as part of the life cycle of processes. They include events such as when BPMN activity is started, saved, submitted or completed. These events can be monitored by a trigger and an event published when specific criteria are met, for example when a timer with a certain ID is fired.

BPMN engine events are mostly configured using the `elementId` which is the `ID` of the [BPMN element]({% link process-automation/latest/model/processes/bpmn.md %}) within a process definition.

### Forms

The saving and submission of a [form]({% link process-automation/latest/model/forms.md %}) can be monitored as a trigger event. The specific form and the process definition it is attached to are used to create the trigger event.

### User interface

A [custom end-user action]({% link process-automation/latest/model/interfaces.md %}#event) of type **Event** can be set on the Digital Workspace user interface. When a user clicks the action in the Ditial Workspace an event is fired that can be linked to a trigger action.

The input parameters for a user interface action are:

| Parameter | Description |
| --------- | ----------- |
| uIName | *Required.* The name of the user interface that contains the action, for example `content`. |
| Name | *Required.* The name of the action of type **Event** to monitor, for example `share-with-accounts`. |

### Content connector

[Content connector]({% link process-automation/latest/model/connectors/content.md %}) events that can be monitored as trigger events include creating, updating and moving files, folders and content types. Content types are read from any [content models]({% link process-automation/latest/model/content-models.md %}) attached to the project.

### Email received

The [email service]({% link process-automation/latest/model/connectors/email.md %}) contains an **EMAIL_RECEIVED** event. This event allows for inbound emails to be monitored and an event published when specific criteria are met.

The input parameters for receiving an email are:

| Parameter | Description |
| --------- | ----------- |
| condition | *Optional.* An expression created using the [Condition Builder]({% link process-automation/latest/using/index.md %}#condition-builder) that when true triggers an action. The event content described by its model can be used in the expression. |
| pattern | *Required.* A regular expression that selects which emails trigger an action. Java catching group syntax can be used to create groups from the pattern as variables, for example `Order Number (?<orderNumber>.+)`. The variables can then be used in `echo` and `echoError`, for example `${orderNumber}`. |
| echo | *Optional.* An email sent to the original sender of the email that is matched, for example `Your reference number is ${orderNumber}`. |
| echoError | *Optional.* An email sent to the original sender if an error occurs when publishing the event, for example `There was a problem publishing that event.` |

The output parameters that can be used as values within the trigger action for receiving an email are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| matchGroups | JSON | *Optional.* Any matching groups found using the regular expression in `pattern`. |
| emailSubject | String | *Optional.* The subject line of the matched email. |
| emailTo | String | *Optional.* The recipient of the matched email. |
| emailFrom | String | *Optional.* The sender of the matched email. |
| emailBody | String | *Optional.* The message body of the matched email. |

> **Note**: Groups found in `matchGroups` can be used within a trigger action variable using the syntax `${matchGroups.group}`, for example `${matchGroups.orderNumber}`.

> **Important**: The [configuration parameters]({% link process-automation/latest/model/connectors/email.md %}#configuration-parameters) for the email service contain some parameters that are specific to configuring a trigger.

### SMS received

The [Twilio connector]({% link process-automation/latest/model/connectors/twilio.md %}) contains an **SMS_RECEIVED** event. This event allows for inbound SMS messages to be monitored and an event published when specific criteria are met.

The input parameters for receiving an SMS are:

| Parameter | Description |
| --------- | ----------- |
| condition | *Optional.* An expression created using the [Condition Builder]({% link process-automation/latest/using/index.md %}#condition-builder) that when true triggers an action. The event content described by its model can be used in the expression. |
| pattern | *Required.* A regular expression that selects which messages trigger an action. Java catching group syntax can be used to create groups from the pattern as variables, for example `Order Number (?<orderNumber>.+)`. The variables can then be used in `echo` and `echoError`, for example `${orderNumber}`. |
| echo | *Optional.* A message sent to the original sender of the text that is matched, for example `Your reference number is ${orderNumber}`. |
| echoError | *Optional.* A message sent to the original sender if an error occurs when publishing the event, for example `There was a problem publishing that event.` |

The output parameters that can be used as values within the trigger action for receiving an SMS are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| matchGroups | JSON | *Optional.* Any matching groups found using the regular expression in `pattern`. |
| originalMessage | String | *Optional.* The contents of the SMS message. |
| to | String | *Optional.* The recipient of the matched message. |
| from | String | *Optional.* The sender of the matched message. |

> **Note**: Groups found in `matchGroups` can be used within a trigger action variable using the syntax `${matchGroups.group}`, for example `${matchGroups.orderNumber}`.

### Slack message received

The [Slack connector]({% link process-automation/latest/model/connectors/slack.md %}) contains a **MESSAGE_RECEIVED** event. This event allows for Slack messages to be monitored and an event published when specific criteria are met.

> **Note:** Make sure the Slack connector [event subscription]({% link process-automation/latest/model/connectors/slack.md %}#event-subscription) has been configured to receive notifications from the Slack API.

The input parameters for a received Slack message are:

| Parameter | Description |
| --------- | ----------- |
| condition | *Optional.* An expression created using the [Condition Builder]({% link process-automation/latest/using/index.md %}#condition-builder) that when true triggers an action. The event content described by its model can be used in the expression.|
| pattern | *Required.* A regular expression that selects which messages trigger an action. Java catching group syntax can be used to create groups from the pattern as variables, for example `Order Number (?<orderNumber>.+)`. The variables can then be used in `echo` and `echoError`, for example `${orderNumber}`. |
| echo | *Optional.* A message sent to the user of the message that is matched, for example `Your reference number is ${orderNumber}`. |
| echoError | *Optional.* A message sent to the user of the message that is matched if an error occurs when publishing the event, for example `There was a problem publishing that event.` |
| channelTypes | *Optional.* The channel types to be monitored in Slack, for example `direct-message`,`public-channel` or `mention`. |

The output parameters that can be used as values within the trigger action for a received Slack message are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| matchGroups | JSON | *Optional.* Any matching groups found using the regular expression in `pattern`. |
| originalMessage | String | *Optional.* The contents of the Slack message. |
| slackChannelId | String | *Optional.* The channel the matched message was sent in. |
| slackUserId | String | *Optional.* The Slack user that sent the matched message. |

> **Note**: Groups found in `matchGroups` can be used within a trigger action variable using the syntax `${matchGroups.group}`, for example `${matchGroups.orderNumber}`.

### Webhooks

The [REST connector]({% link process-automation/latest/model/connectors/rest.md %}) can be used to publish an endpoint that external systems such as GitHub can consume as part of a trigger. The trigger then monitors this webhook and will publish any events that match the specific criteria as part of a project.

The input parameters for the **INCOMING_WEBHOOK** event is:

| Parameter | Description                                                                                                                                                                                                                                       |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| condition | *Optional.* An expression created using the [Condition Builder]({% link process-automation/latest/using/index.md %}#condition-builder) that when true triggers an action. The event content described by its model can be used in the expression. |
| path      | *Required.* The webhook path to monitor. The format begins `https://<environment>.com/<project-name>/<connector-name>/events/` followed by a custom value, for example `https://alfresco.com/finance-project/rest-connector-1/events/github`.     |
| method    | *Optional.* A list of HTTP methods that can trigger an action.                                                                                                                                                                                    |
| condition | *Optional.* The condition that must evaluate to true to trigger an action.                                                                                                                                                                        |
| status    | *Optional.* The status code to return to the external service.                                                                                                                                                                                    |
| headers   | *Optional.* The key value pairs that must match in order to publish the event. Use the **+** symbol to add more pairs.                                                                                                                            |
| params    | *Optional.* The request parameter key value pairs that must match in order to publish the event. Use the **+** symbol to add more pairs.                                                                                                          |
| body      | *Optional.* The JSON body to send to the external service.                                                                                                                                                                                        |
| secured   | *Required.* When true, the webhook needs a valid token in the request.                                                                                                                               |

The output parameters that can be used as values within the trigger action for a webhook are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| method | String | *Optional.* The HTTP method of the request. |
| path | String | *Optional.* The relative path of the request URL. |
| params | JSON | *Optional.* The query string or form parameters of the request. |
| headers | JSON | *Optional.* The headers of the request. |
| body | JSON | *Optional.* The body of the HTTP request. |

> **Important**: The [configuration parameter]({% link process-automation/latest/model/connectors/rest.md %}#configuration-parameters) for the REST connector is used for sending a response to the external system from the webhook.

## Actions

Trigger actions include starting a process instance, sending a BPMN signal or any [connector action]({% link process-automation/latest/model/connectors/index.md %}#actions). An action contains a payload that is sent from the trigger to the action being started.

The values for action payloads can be set in different ways depending on the action being sent and the source event type that generated the action. For example, if the Slack **MESSAGE_RECEIVED** event is used, then the value of an action can use the value of the `slackChannelId` the message was received from or an expression based on the event model.

The ways in which an action can be set are as:

* **Variables** are variables from the source event, for example using a BPMN engine activity as an event will allow the variables such as the `processDefinitionKey` as a value.

* **Expressions**: can be entered using a JSON editor to create more complex mappings from JSON objects, such as `${temperature.celsius}` will use the value for the object `celsius`.

* **Values** are static values that can be entered when the trigger action is modeled.

The actions that can be set on a trigger are:

* [Start a process](#start-a-process)
* [Send a signal](#send-a-signal)
* [Receive a message](#receive-a-message)
* [Execute a script](#execute-a-script)
* [Any content connector action](#content-connector-actions)
* [Any connector action](#connector-actions)

### Start a process

The action to start a process will begin a process instance when the event criteria are met. The payload for the start process action is:

| Property | Description |
| -------- | ----------- |
| processDefinitionKey | *Required.* The process definition the action will use to create a process instance with. The process definition must be in the same project as the trigger. |
| name | *Required.* The name that will be given to the process instance, for example `slackUserId`. |
| payloadType | *Required.* The type of payload. This is set to `StartProcessPayload` and cannot be changed. |
| businessKey | *Optional.* A business key ID for the process instance. |
| variables | *Optional.* Values from the trigger event can be mapped to [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) in the process definition. If the trigger event was a connector, this includes output parameters in the connector event. |

### Send a signal

The action to send a signal will send a named signal of global scope when an event criteria are met. The signal can be caught by the catching signal events [signal start events]({% link process-automation/latest/model/processes/bpmn.md %}#signal-start-event), [signal intermediate catch events]({% link process-automation/latest/model/processes/bpmn.md %}#signal-intermediate-catch-event) and [signal boundary events]({% link process-automation/latest/model/processes/bpmn.md %}#signal-boundary-event). The payload for the send signal action is:

| Property | Description |
| -------- | ----------- |
| name | *Required.* The name of the signal to emit, for example `Signal_0n91cib`. |
| payloadType | *Required.* The type of payload. This is set to `SignalPayload` and cannot be changed. |
| variables | *Optional.* Values from the trigger event can be mapped to [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) in the process definition. If the trigger event was a connector, this includes output parameters in the connector event. |

### Receive a message

The action to receive a message will send a named message when an event criteria are met. The message can be caught by the message catching events [message intermediate catch events]({% link process-automation/latest/model/processes/bpmn.md %}#message-intermediate-catch-event) and [message boundary events]({% link process-automation/latest/model/processes/bpmn.md %}#message-boundary-event). The payload for the receive message action is:

| Property | Description |
| -------- | ----------- |
| name | *Required.* The name of the message to send, for example `Message_077epax`. |
| correlationKey | *Required.* A [correlation key]({% link process-automation/latest/model/processes/bpmn.md %}#message-int-cat/message) must be provided when sending a message from a trigger, for example `014-245`. |
| payloadType | *Required.* The type of payload. This is set to `ReceiveMessagePayload` and cannot be changed. |
| variables | *Optional.* Values from the trigger event can be sent as part of the message payload. |

### Send a start message

The action to send a start message will send a named message when an event criteria are met. The message can be caught by a [message start event]({% link process-automation/latest/model/processes/bpmn.md %}#message-start-event) to start a process instance. The payload for the start message action is:

| Property | Description |
| -------- | ----------- |
| name | *Required.* The name of the message to send, for example `Message_077epax`. |
| payloadType | *Required.* The type of payload. This is set to `StartMessagePayload` and cannot be changed. |
| businessKey | *Optional.* A business key ID for the process instance. |
| variables | *Optional.* Values from the trigger event can be sent as part of the message payload. |

### Execute a script

The action to execute a script will execute a named [script]({% link process-automation/latest/model/scripts.md %}) when an event criteria are met. The script must exist in the same project as the trigger.

| Property | Description |
| -------- | ----------- |
| scriptName | *Required.* The name of the script to execute. This is set by selecting a script to execute, for example `update-orders-script`. |
| scriptId | *Required.* The ID of the script to execute. This is set by selecting a script to execute, for example `19ced673-e701-4e6c-ace6-f8aaee5455eb`. |
| variables | *Optional.* Values from the trigger event can be mapped to script variables to be used as part of the execution. |

### Content connector actions

The [content connector]({% link process-automation/latest/model/connectors/content.md %}) is used to execute actions against the Content Services repository. The actions available involve creating, selecting, updating and managing content.

All of the actions that the content connector can execute as part of a service task can also be used as trigger actions. The properties are the same as they are when the action is attached to a service task.

### Connector actions

[Connectors]({% link process-automation/latest/model/connectors/index.md %}) are used to handle interactions with external systems. This includes actions such as sending emails and utilizing services such as AWS Textract, Rekognition and Lambda functions.

All of the actions that connectors can execute as part of a service task can also be used as trigger actions. The properties are the same as they are when the action is attached to a service task.

> **Note**: Connector actions as part of a trigger are also tied to the connector instance. If different configuration is required to a connector used within a process then create a new connector instance for the trigger.
