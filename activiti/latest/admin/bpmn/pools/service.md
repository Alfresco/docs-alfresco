---
title: Service tasks
---

Service tasks are used to insert connectors into a process to allow two-way communication between external systems and a process.

Service tasks are graphically represented by a single, thin rounded rectangle with a cog icon inside.

> Service tasks do not emit the `TASK_CREATED` and `TASK_COMPLETED` [engine events](../../../architecture/events.md). The `INTEGRATION_REQUESTED` and `INTEGRATION_RESULT_RECEIVED` events should be monitored to report or track service tasks.

## XML

The XML for a service task is similar to the following:

```xml
<bpmn2:serviceTask id="Task_19x7wuh" name="send-email" implementation="email-connector.SEND">
	<bpmn2:documentation>A connector that sends an email.</bpmn2:documentation>
	<bpmn2:incoming>SequenceFlow_19fgs1w</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_64jaw7e</bpmn2:outgoing>
</bpmn2:serviceTask>
```

## Properties

The basic properties for a service task are:

{% capture table1 %}

| Property | Description | Example |
| -------- | ----------- | ------- |
| `id` | *Required.* The unique identifier for the service task. This is system generated and cannot be altered. | Task_19x7wuh |
| `name` | *Optional.* The name of the service task. This will display on the service task in the process diagram. | Email customer |
| `documentation` | *Optional.* A free text description of what the service task does. | A connector that sends an email.  |

{% endcapture %}

{% include table.html table=table1 %}

The ID and name of a service task are set as XML attributes of the `serviceTask`. Documentation is a sub-element of `serviceTask`, for example: 

```xml
<bpmn2:serviceTask id="Task_19x7wuh" name="send-email">
	<bpmn2:documentation>A connector that sends an email.</bpmn2:documentation>
</bpmn2:serviceTask>
```

### Multi-instance type

The type of multi-instance execution for the service task. The default value is `None`.

`Sequential` multi-instance executions only ever have a single instance of that service task executing at any one time. The next instance will only start after the previous one has been executed.

`Parallel` multi-instances executions start multiple instances of a service task at once, meaning they can all be executed at the same time.

### Implementation and action

The `implementation` of a property is used to select which connector instance to use for the service task using the connector `name`. The `action` property then selects which connector action that service task should execute.

Implementation and action are combined in the XML attribute `implementation` of the service task in the format `<connector-name>.<connector-action>`, for example:

```xml
<bpmn2:serviceTask id="Task_19x7wuh" name="send-email" implementation="email-connector.SEND">
```

### Mapping type

Mapping type sets whether process variables are sent to a service task as inputs and whether the outputs of a service task are sent back to a process as process variables after the connector has executed.

If variables are sent to and from a service task explicit mapping can be configured between process variables and the connector using the **Input mapping** and **Output mapping** fields. If no explicit mapping is set, implicit mapping will be used by attempting to match `name` fields. Only exact matches will map.

Mappings are stored in the `<process-definition-name>-extensions.json` file and can be viewed in the **Extensions Editor**.

Mapping type is only visible if a connector has been selected. The default value is to `Send all variables`.

An example JSON extensions file for a service task with explicit mapping is similar to the following:

```json
"mappings": {
	"Task_0gjdh22": {
		"inputs": {
			"subject": {
				"type": "variable",
				"value": "order_number"
				}
            },
        }
    },
"properties": {
	"f4839a26-65f5-425d-b913-688d5328fd22": {
  		"id": "f4839a26-65f5-425d-b913-688d5328fd22",
		"name": "order_number",
		"type": "string",
		"required": true
        }
    }
```
