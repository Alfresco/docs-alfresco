---
title: Overview of connectors
---

Connectors are used to handle interactions with external systems as part of a process. This includes actions such as retrieving, generating, updating and storing content in the Content Services repository, sending emails and utilizing services such as AWS Textract, Rekognition and Lambda functions.

## Properties

Connectors are implemented as a [service task]({% link process-automation/latest/model/processes/bpmn.md %}#service-task). All the properties available to a service task are those required by a connector. The three most important ones to understand for connectors are:

| Property | Description |
| -------- | ----------- |
| Implementation | *Required.* Displays the name of the connector the task is using. This will be the name chosen when creating a connector instance. |
| Action | *Required.* Selects which action the connector task should execute, for example `SELECT_FILE`. |
| Mapping type | *Required.* Sets how data should be passed between the connector and the process by mapping the [input and output parameters]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping). For example, setting the details of the file to select and which process variable will store it. |

## Create a connector

Connectors are created as [BPMN elements]({% link process-automation/latest/model/processes/bpmn.md %}) by dragging them into a process definition from the palette:

1. Sign into the Modeling Application and open a project and process.

2. Click the image of a plug in the tool palette and select the connector to create.

3. The option to use an existing instance of the connector or create a new one will display.

    * **Create a new instance** if it is the first time using the connector within the project and give it a name.

    * Select an existing instance if the connector has already been used within the project and the tasks will share the same [configuration parameters](#configuration-parameters), for example using the same SMTP provider to send an email.

4. Drag the connector onto the diagram canvas and fill in the properties.

## Using connectors in modeling application

We can add a connector to our process while editing a process. We can create a new instance selecting the connector type from the toolbar 

## Connector modeling

Every connector instance created in a process definition will be created in the **Connectors** section of a project using the `name` assigned to the instance.

> **Note**: Creating multiple instances of the same connector within a project is only required if different [configuration parameters](#configuration-parameters) are going to be set.

Clicking on a connector instance will display its actions, events, configuration parameters and errors. These properties all stored in JSON format and can be viewed in the **JSON Editor**. Downloading a connector instance will display the contents of the **JSON Editor**.

### Actions

Actions are the operations a connector can take, for example sending a message on Slack and creating a channel in Slack are two different actions. A connector instance can execute any number of actions, however each [service task]({% link process-automation/latest/model/processes/bpmn.md %}#service-task) can only execute one.

Each action has a set of input parameters and output parameters. Input parameters are values sent from the process for the connector to execute, and output parameters are the values the connector sends back to the process after it has executed. The values sent as input and output parameters are defined using the **Mapping type** property on the service task and [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping).

The properties for input and output parameters are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the parameter, for example `userId`. |
| Description | *Optional.* A free text description of the parameter, for example `The ID of a Slack user`. |
| Type | *Required.* The data type of the parameter, for example `String`. |
| Required | *Optional.* Set whether the parameter requires a value when being used, for example `true`. |

An example of the JSON for the Slack connector **SEND_MESSAGE** action is:

```json
    "actions": {
        "88296a50-f6cf-496e-b433-5d794788fc8f": {
            "id": "88296a50-f6cf-496e-b433-5d794788fc8f",
            "name": "SEND_MESSAGE",
            "description": "Sends a standalone message to a Slack conversation. Conversations can be public or private channels, or direct messages.",
            "inputs": [
                {
                    "id": "f7435a5c-20bd-46e4-9d26-901a9dabb87c",
                    "name": "userId",
                    "description": "Internal Slack user id. If present, the message will be sent as a direct message.",
                    "type": "string"
                },
...
            ],
            "outputs": [
                {
                    "id": "c9daca61-6ecd-4dd2-b8b0-f1f99589cd52",
                    "name": "slackError",
                    "description": "If present, it describes the error occurred trying to send the message.",
                    "type": "string"
                },
...
            ]
        },
```

### Events

Events are used as part of defining event criteria in a [trigger]({% link process-automation/latest/model/triggers.md %}). When the event criteria specified in a trigger are met, an action is started. Certain connectors can be used for defining event criteria. For example, the email service event **MESSAGE_RECEIVED** can be used to monitor inbound emails. If a pattern defined in the trigger is met then a trigger action is started.

See [triggers]({% link process-automation/latest/model/triggers.md %}) for further details on creating event criteria based on connectors.

Connector events contain a set of input and output parameters and the definition of the content of the event. Input parameters can be used to define a pattern for when an event should be created and output parameters can be used as values within a trigger action.

The properties for input and output parameters are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the parameter, for example `pattern`. |
| Description | *Optional.* A free text description of the parameter, for example `A regular expression to match against incoming messages`. |
| Type | *Required.* The data type of the parameter, for example `String`. |
| Required | *Optional.* Set whether the parameter requires a value when being used, for example `true`. |

An example of the JSON for the email service **MESSAGE_RECEIVED** event is:

```json
"events": {
        "62bfa43e-a495-4786-9495-1e24eedf1a1f": {
            "id": "62bfa43e-a495-4786-9495-1e24eedf1a1f",
            "name": "EMAIL_RECEIVED",
            "description": "Event that is dispatched when an email is received",
            "inputs": [
                {
                    "id": "3dbe2c22-dfc2-41c6-a576-7797f9fbeb62",
                    "name": "pattern",
                    "description": "Regular expression that any incoming message shall match in order to be published as events. Regular expressions can contain matching groups delimited by '(' and ')'. Matching groups can be used in variables and the echo message.",
                    "type": "string"
                },
...
            ],
            "outputs": [
                {
                    "id": "fa6b0f2a-ca79-476b-ba4e-f0f082eff47c",
                    "name": "matchGroups",
                    "description": "Matching groups between pattern and message. They can be used in variables and the echo messages.",
                    "type": "json"
                },
...
            ],
            "model": {
                "$schema": "https://json-schema.org/draft/2019-09/schema",
                "type": "object",
                "properties": {
                  "emailTo": {
                    "type": "string"
                  },
                  "emailFrom": {
                    "type": "string"
                  },
                  "emailSubject": {
                     "type": "string"
                  },
                  "emailBody": {
                    "type": "string"
                  }
                },
                "required": [
                    "emailTo",
                    "emailFrom"
                ]
            }
        }
    },
```

The `model` field describes the information that is included inside the data field of the Cloud Event handled in a trigger, for more see [Trigger events]({% link process-automation/latest/model/triggers.md %}#events). This allows you to create a condition for a [Trigger]({% link process-automation/latest/model/triggers.md %}) using the [Condition Builder]({% link process-automation/latest/using/index.md %}#condition-builder) and that is based on the event information.
You can add or edit the model of the event in the editor by clicking the **Add Model Schema** or **Edit Model Schema** button.

![Model Schema Editor]({% link process-automation/images/model-schema-editor.png %})

In the editor on the left you can configure a JSON schema to describe an event. In the editor on the right you can enter a JSON object and validate it matches the schema on the left by clicking the `Validate` button. If it matches you will receive a validation success message.

### Configuration parameters

Configuration parameters are the environment variables specific to each connector instance. Environment variables refer to the configuration settings for a connector, for example the AWS account to connect to, the instance of Slack to create a channel in or the SMTP server to use to send emails from.

Multiple instances of the same connector within a project are only required if different configuration parameters are going to be set for the connector tasks used in the process.

The properties of configuration parameters are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the parameter, for example `SLACK_XOXB`. |
| Description | *Optional.* A free text description of what the parameter is for. For example `The Slack bot user token.` |
| Required | *Required.* Set whether the parameter requires a value when being used, for example `true`. |
| Secure | *Optional.* Indicates a sensitive property. Properties that are set as secure cannot have their information entered in the Modeling Application and must be entered during [deployment]({% link process-automation/latest/admin/release.md %}#deployment) to avoid storing them as plain text in the user interface and database. |
| Value | *Optional.* An optional default value for the parameter. This can be overridden at deployment time, for example `xoxb-`. |

The `Value` field for configuration parameters can be filled out during modeling or when the project is [deployed]({% link process-automation/latest/admin/release.md %}#deployment). Even if properties are entered whilst modeling, they can still be overridden at deployment.

> **Note**: Properties marked as `Secure` shouldn't have their values entered whilst modeling.

An example of the JSON for the Slack connector **MESSAGE_RECEIVED** configuration parameters is:

```json
    "config": [
        {
            "name": "SLACK_XOXB",
            "description": "Slack bot user token",
            "value": "",
            "required": true

        },
        {
            "name": "SLACK_XOXP",
            "description": "Slack admin user token",
            "value": "",
            "required": true
        }
    ],
```

### Errors

Connectors have a set of errors defined in their configuration. These errors are thrown when the error occurs in the execution of a connector action and can be caught by [error boundary events]({% link process-automation/latest/model/processes/bpmn.md %}#error-boundary-event) or [error start events]({% link process-automation/latest/model/processes/bpmn.md %}#error-start-event). This allows connector errors to be handled as business errors.

When an error boundary event is attached to a service task that contains a connector, a list of errors that can be thrown by that connector can be selected as the `error` to catch. Error start events will see a list of errors from the connectors in the project.

The properties of errors are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the error, for example `INVALID_INPUT`. |
| Description | *Optional.* A free text description of what the parameter is for. For example `An input variable had an invalid type.` |
| Code | *Required.* The error code that will be caught by an error boundary or error start event, for example `INVALID_INPUT`. |

An example of the JSON for the email service **INVALID_INPUT** error is:

```json
    "errors": [
        {
            "name": "INVALID_INPUT",
            "description": "The input variable has an invalid type",
            "code": "INVALID_INPUT"
        },
```

## Permissions

When a project is [deployed]({% link process-automation/latest/admin/release.md %}#deployment) service accounts are created for each connector used. The format of the service account name is: `service-account-connector-<connector-name>-<application-name>`.

Read and write access is granted to each service account on the [default storage location]({% link process-automation/latest/admin/release.md %}#deploy-steps/storage). If the connector reads or writes to files and folders held elsewhere in the repository, the service account will need to be manually given explicit permission to those directories otherwise the connector action will fail.

> **Note**: The service accounts for an application are all added to a group named `<application-name>-service-group` so that permissions can be manually assigned for an entire application if required. This also makes it easier when adding permissions because service group can be found by the application name. This approach is useful when granting permissions to a content folder in the Digital Workspace, when using the copy, move, or update actions, for example `MOVE_FILE`.
