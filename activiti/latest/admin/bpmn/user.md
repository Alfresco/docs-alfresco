---
title: User tasks
layout: docs
---

User tasks represent a stage in the process where human action is required.

Human action is handled by a task being assigned to specific users or groups. The task that is assigned can be modeled using a {% include tooltip.html word="form" text="form" %}. Once a task is completed, the process flow continues onto the next element in the process.

User tasks are displayed as a single thin, rounded rectangle with a user icon inside.

## XML

The XML for a user task is similar to the following:

```xml
<bpmn2:userTask id="UserTask_0gpdh83" name="Order" activiti:formKey="form-38098a3e-bff1-46cb-ba0f-0c94fdb287ed" activiti:assignee="${userDetails.username}" activiti:dueDate="2020-01-01T01:00:00" activiti:priority="2">
	<bpmn2:documentation>A form to choose the flavor of ice cream.</bpmn2:documentation>
	<bpmn2:incoming>SequenceFlow_02eaofe</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_14ma5mo</bpmn2:outgoing>
</bpmn2:userTask>
```

## Properties

The basic properties for a user task are: 

{% capture table1 %}

| Property | Description | Example |
| -------- | ----------- | ------- |
| `id` | *Required.* The unique identifier for the user task. This is system generated and cannot be altered. | UserTask_0gpdh83 |
| `name` | *Optional.* The name of the user task. This will display on the user task in the process diagram. The value `${initiator}` can be used to include the name of the user that starts the process instance as part of the task name at runtime. | Flavor order |
| `documentation` | *Optional.* A free text description of what the user task does | A form to choose the flavor of ice cream. |

{% endcapture %}

{% include table.html table=table1 %}

The ID and name of a user task are set as XML attributes of the `userTask`. Documentation is a sub-element of `userTask`, for example: 

```xml
<bpmn2:userTask id="UserTask_0gpdh83" name="Order">
	<bpmn2:documentation>A form to choose the flavor of ice cream.</bpmn2:documentation>
</bpmn2:userTask>
```

### Assignment

The users or groups that are able to complete a task. A single user can be assigned or candidates can be set. Candidates are a list of users or groups that may claim a task at runtime. A single user or candidates must be set for a user task.  

A single assignee is set in the XML attribute `activiti:assignee` of the `userTask`, for example: 

```xml
<bpmn2:userTask activiti:assignee="hruser"> 
```

Candidates are set in the XML attribute `activiti:candidateGroups` of the `userTask`, for example:

```xml
<bpmn2:userTask activiti:candidateGroups="${groupDetails.groupNames}">
```

Users and groups can be set from three different sources:

{% capture static %}

Static values are a free text field that has no validation against users in the Identity Service. The text entered will require an exact match to a `username` in the Identity Service for the user task to be correctly assigned at runtime.

{% endcapture %}

{% capture identity %}

Identity allows for users and groups to be searched in the Identity Service and selected for the assignment.

{% endcapture %}

{% capture expression %}

Expression allows for an expression using process variables to be used to select users and groups for the assignment. Expressions can be a simple process variable such as `${userToAssign}` or an expression such as `${userDetails.username}` that uses a process variable of type JSON. A JSON editor is provided for creating expressions for assignment, however the editor will only be displayed if there are process variables in the process.

> **Note:** The value `"assignee": "${initiator}"` can be set as an expression without creating a process variable. This will assign the task to the user that started the process instance.  

{% endcapture %}

{% include tabs.html opt1="Static" content1=static opt2="Identity" content2=identity opt3="Expression" content3=expression %}

The assignments for user tasks are stored in the `assignments` property of the **Extensions Editor** and `<process-definition-name>-extensions.json`.

> **Note:** Users and groups that are selected as assignees or candidates in a user task are automatically added as [users](../../../administrator/identity/README.md#permissions) when deploying an application if they are set using the static or identity options. Setting an assignee or candidate using the expression source will require the potential users or groups to be manually assigned users when deploying an application. 

### Due date

An optional date and time for a user task to be completed by in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} format. A date picker can be used to choose the time and date.

Checking the **Use process variable** box for due date allows a process variable to be used to generate the date. The process variable must be of type `datetime`.

The due date is set as an XML attribute of the `userTask`, for example:

```xml
<bpmn2:userTask activiti:dueDate="2020-01-01T01:00:00">
```

### Multi-instance type

The type of multi-instance execution for the user task. The default value is `None`.

`Sequential` multi-instance executions only ever have a single instance of that user task running at any one time. The next instance will only start after the previous one has been completed.

`Parallel` multi-instances executions start multiple instances of a user task at once, meaning they are all active and can all be worked on at the same time.

### Priority

A optional priority for the user task between 0 and 4. The priority property is to aid end-users in their task management.  

Priority is set as an XML attribute of the `userTask`, for example: 

```xml
<bpmn2:userTask activiti:priority="2">
```

### Form selector

An optional form to present to a user completing the task. The form must exist within the same project as the process definition to be selected.

A new form can be created using the **Create Form** symbol and a previously selected form can be edited using the **Open Form** symbol.

A form is set as an XML attribute of the `userTask` where the `activiti:formKey` is the `id` of the form, for example:

```xml
<bpmn2:userTask activiti:formKey="form-38098a3e-bff1-46cb-ba0f-0c94fdb287ed">
```

### Mapping type

Mapping type sets whether process variables are sent to a user task as task variables and whether the form fields and task variables from a user task are sent back to a process as process variables once a task has been completed. Mapping type is only visible if a form has been selected. The default value is `Send all variables`.

If variables are sent to and from a user task explicit mapping can be configured between process variables and task variables and form fields using the **Input mapping** and **Output mapping** fields. If no explicit mapping is set, implicit mapping will be used by attempting to match `name` fields. Only exact matches will map.

Mappings are stored in the `<process-name>-extensions.json` file and can be viewed in the **Extensions Editor**.

An example JSON extensions file for a user task with explicit mapping is similar to the following:

```json
"mappings": {
	"UserTask_0gpdh83": {
		"inputs": {
			"Text0mvlww": {
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