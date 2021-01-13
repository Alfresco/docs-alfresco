---
title: Process administration
---

The **Process Admin** section of the Admin Application is used to manage process instances and tasks. It also contains the audit log for applications.

Users can only see this section if they have the `ACTIVITI_ADMIN` role. The information that a user sees in each section is then controlled by which applications they have been given administrator access to during [deployment]({% link process-automation/latest/admin/release.md %}#deployment) or afterwards by [updating the application permissions]({% link process-automation/latest/admin/release.md %}#manage-permissions).

## Process instances

The **Process Instances** section is for monitoring all active, completed and suspended process instances that are running in each application.

### Properties {#process-properties}

The properties for each process instance are:

| Property | Description |
| -------- | ----------- |
| ID | The unique ID of the process instance. |
| Name | The name given to the process instance when it was started. |
| Status | The current status of the process instance. See the table below for a list of possible statuses. |
| Created | The name of the user that started the process instance. |
| Start Date | The time since the process instance was started. |
| App Release Version | The [version of the application]({% link process-automation/latest/admin/release.md %}#upgrade) the process instance is using. |

> **Note**: Further details are available to view for each process instance by clicking on it. A properties panel will appear on the right-hand side of the screen.

The status of process instances are:

| Status | Description |
| ------ | ----------- |
| RUNNING | The process instance is currently running. |
| COMPLETED | The process instance has been completed. |
| SUSPENDED | The process instance is currently suspended and cannot continue until it is reactivated. |
| CANCELLED | The process instance has been cancelled and cannot be completed. |

### Diagram

Select the **Diagram** option to view which stage the process is currently at and the path that the process instance has taken to get there. The currently active task or activity is highlighted in bold red. The process flow taken is highlighted in red.

### Variables

Select the **Variables** option to view and edit the [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) values for a process instance.

The properties for variables are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the process variable. |
| Type | The [type]({% link process-automation/latest/model/processes/index.md %}#process-variable-properties) of the process variable. |
| Value | The current value of the variable. The word `json` will be displayed for JSON variables. Click it to view the full JSON value. |
| Edit | If the process instance status is `RUNNING` then the `Value` of a process variable can be updated. |

### Suspend and activate

Select the **Suspend** option to pause a process instance. This will stop any action from completing in the process instance. Use the **Activate** option to resume a suspended process instance.

Suspending a process instance will change the status to `SUSPENDED`.

Activating a process instance will change the status to `RUNNING`.

> **Note**: The **Suspend** option is only available to process instances with a status of `RUNNING` and the **Activate** option is only available to process instances with a status of `SUSPENDED`.

### Cancel

Select the **Cancel** option to cancel a process instance. This will stop any action from completing in the process instance. Cancelled process instances cannot be restarted or worked on again.

Cancelling a process instance will change the status to `CANCELLED`.

> **Note**: The **Cancel** option is not available to process instances with a status of `COMPLETED`.

### Audit {#process-instance-audit}

Select the **Audit** option to view all audit logs for the selected process instance. This will open the [audit](#audit) section with the filter restricted to the application and process instance ID of the selected process instance.

## User tasks

The **User Tasks** section is for monitoring all active, assigned, completed and suspended tasks that are running in each application.

### Properties {#task-properties}

The properties for each task are:

| Property | Description |
| -------- | ----------- |
| ID | The unique ID of the task. |
| Name | The name given to the task. |
| Assignee | The user assigned to the task. |
| Status | The current status of the task. See the table below for a list of possible statuses. |
| Created Date | The time since the task was started. |
| Last Modified | The time since the task was last updated. |
| Parent ID | The ID of a parent task if the standalone task has one. |

> **Note**: Further details are available to view for each task by clicking on it. A properties panel will appear on the right-hand side of the screen and certain properties can be edited if the status is `CREATED` or `ASSIGNED`.

The status of tasks are:

| Status | Description |
| ------ | ----------- |
| CREATED | The task has been created but not yet assigned. |
| ASSIGNED | The task has assigned but not yet completed. |
| COMPLETED | The task has been completed. |
| SUSPENDED | The task is suspended because the process instance it belongs to has been suspended. It cannot be completed until the process instance is activated. |
| CANCELLED | The task has been cancelled and cannot be completed. |

### Variables {#task-variables}

Select the **Variables** option to view and edit the [task variables]({% link process-automation/latest/model/forms.md %}#form-variables) values for a user task.

> **Note**: Task variables are also known as form variables from a modeling perspective.

The properties for task variables are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the task variable. |
| Type | The [type]({% link process-automation/latest/model/forms.md %}#form-variable-properties) of the task variable. |
| Value | The current value of the task variable. The word `json` will be displayed for JSON variables. Click it to view the full JSON value. |
| Edit | If the task status is `CREATED` or `ASSIGNED` then the `Value` of a task variable can be updated. |

### Sibling tasks

Select the **Sibling Tasks** option to view any other standalone tasks that share the same parent task.

### Audit {#task-audit}

Select the **Audit** option to view all audit logs for the selected task. This will open the [audit](#audit) section with the filter restricted to the application and the `Event ID` of the selected user task.

## Service tasks

The **Service Tasks** section is for monitoring all [service tasks]({% link process-automation/latest/model/processes/bpmn.md %}#service-task) that are running in each application.

> **Note**: This includes [connectors]({% link process-automation/latest/model/connectors/index.md %}), [decision tables]({% link process-automation/latest/model/decisions.md %}) and [scripts]({% link process-automation/latest/model/scripts.md %}).

### Properties {#service-properties}

The properties for each service task are:

| Property | Description |
| -------- | ----------- |
| ID | The unique ID of the service task. |
| Activity Name | The name given to the service task within the process definition. |
| Status | The current status of the service task. See the table below for a list of possible statuses. |
| Started Date | The time since the service task was started. |
| Completed Date | The time the service task was completed. It will be blank if the service task has not yet been completed. |

The status of tasks are:

| Status | Description |
| ------ | ----------- |
| STARTED | The service task has started to execute. |
| COMPLETED | The service task has been completed. |
| CANCELLED | The service task has been cancelled and cannot be completed. |
| ERROR | The service task had an error during execution. |

### View error

Select the **View Error** option on a service task with the status of `ERROR`. This will display a detailed stack trace of the error associated with the service task.

## Audit

The **Audit** section provides details of all the [events]({% link process-automation/latest/model/processes/events.md %}) that have occurred in applications.

All audit events can be filtered based on the application, event type, event ID or process instance ID.

### Properties {#audit-properties}

The properties for each audit event are:

| Property | Description |
| -------- | ----------- |
| Event Type | The type of the event that occurred, for example `SEQUENCE_FLOW_TAKEN` shows where a [sequence flow]({% link process-automation/latest/model/processes/bpmn.md %}#sequence-flow) was followed. |
| Event Time | The timestamp for when the event happened. |
| Event ID | The unique ID of the event. |
| Process Instance ID | The process instance ID of the process that the event occurred in. |
| Event Action | The payload of the event in JSON format. Click to view the details. |
