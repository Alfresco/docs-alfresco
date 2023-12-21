---
title: Process administration
---

The **Process Admin** section of the Admin Application is used to manage applications, process instances, user tasks, service tasks, auditing, and data cleanup.

You can only see this section if you have the `ACTIVITI_ADMIN` role. The information you see in each section is controlled by which applications you have been given administrator access to during [deployment]({% link process-automation/latest/admin/release.md %}#deployment) or afterwards by [updating the application permissions]({% link process-automation/latest/admin/release.md %}#manage-permissions).

## Configure columns

You can configure the columns of the Applications List, Process Instances, User Tasks, and Service Tasks lists in the Admin App.

The order of the columns can be adjusted.

1. Expand the **Process Admin** section on the left of the Admin App and then select **Applications List**, **Process Instances**, **User Tasks**, or **Service Tasks**.

2. Access the six dots on the top left of a column by hovering your mouse over the name of the column.

3. Click and hold the six dots and then move the column on top of another column.

    This moves the columns to the left one position and the column you are moving takes the place of the one underneath.

![Move column]({% link process-automation/images/move-column-admin.png %})

The columns that are visible can be adjusted.

1. Expand the **Process Admin** section on the left of the Admin App and then select **Applications List**, **Process Instances**, **User Tasks**, or **Service Tasks**.

2. Click the three dots on the right of the last column.

3. Select which columns you want show and then click **Apply**.

![Select columns]({% link process-automation/images/select-columns-admin.png %})

## Applications List

The **Applications List** section is for viewing the applications you have released.

### Properties {#applications-properties}

The columns for each application are:

| Property | Description |
| -------- | ----------- |
| Application name | The name of the application. |
| Description | A description of the application, if entered when the application was released. |
| Version | The version of the application. |
| Release | The amount of times the application has been released. |
| Workspace | If the application is the Workspace, there is a link to it. |
| Three dots | Right click on the three dots to access the [Process Instances](#process-instances), [User Tasks](#user-tasks), [Service Tasks](#service-tasks), [Audit](#audit), or [Data Cleanup](#data-cleanup) sections. |
| Star icon | Use the icon to select which application you want to 'favorite'. The application you select will appear first in the search lists, when using the search in the **Process Instances**, **User Tasks**, and **Service Tasks** sections. |

## Process Instances

The **Process Instances** section is for monitoring all active, completed, and suspended process instances that are running in each application. Use the filters to find process instances. To automatically populate the [Service Tasks](#service-tasks) section with all the service tasks of a process instance, click the three dots next to a process instance and select **Service Tasks**.

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

> **Note:** Further details are available to view for each process instance by clicking on it. A properties panel will appear on the right-hand side of the screen.

The status of process instances are:

| Status | Description |
| ------ | ----------- |
| RUNNING | The process instance is currently running. |
| COMPLETED | The process instance has been completed. |
| SUSPENDED | The process instance is currently suspended and cannot continue until it is reactivated. |
| CANCELLED | The process instance has been cancelled and cannot be completed. |

### User tasks

Use the **User Tasks** option to monitor all active, assigned, completed, and suspended tasks that are running for the process instance.

### Service tasks

Use the **Service Tasks** option to monitor all [service tasks]({% link process-automation/latest/model/processes/bpmn.md %}#service-task) that are running for the process instance.

### Variables

Use the **Variables** option to view and edit the [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) values for a process instance.

The properties for variables are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the process variable. |
| Type | The [type]({% link process-automation/latest/model/processes/index.md %}#process-variable-properties) of the process variable. |
| Value | The current value of the variable. The word `json` will be displayed for JSON variables. Click it to view the full JSON value. |
| Edit | If the process instance status is `RUNNING` then the `Value` of a process variable can be updated. |

### Audit {#process-instance-audit}

Use the **Audit** option to view all audit logs for the selected process instance. This will open the [audit](#audit) section with the filter restricted to the application and process instance ID of the selected process instance.

### Activate

Use the **Activate** option to resume a suspended process instance.

Activating a process instance will change the status to `RUNNING`.

> **Note:** The **Activate** option is only available to process instances with a status of `SUSPENDED`.

### Suspend

Use the **Suspend** option to pause a process instance. This will stop any action from completing in the process instance. Use the **Activate** option to resume a suspended process instance.

Suspending a process instance will change the status to `SUSPENDED`.

> **Note:** The **Suspend** option is only available to process instances with a status of `RUNNING`.

### Diagram

Use the **Diagram** option to view which stage the process is currently at and the path that the process instance has taken to get there. The currently active task or activity is highlighted in bold red. The process flow taken is highlighted in red.

### Cancel

Use the **Cancel** option to cancel a process instance. This will stop any action from completing in the process instance. Cancelled process instances cannot be restarted or worked on again.

Cancelling a process instance will change the status to `CANCELLED`.

> **Note:** The **Cancel** option is not available to process instances with a status of `COMPLETED`.

### Delete {#process-instance-delete}

Use the **Delete** option to delete a process instance. When you delete a process instance you will permanently delete it and all of its data and the operation cannot be undone. You can delete one or more selected process instances, regardless of what state they are in. You can delete more than one at the same time by using the **Select multiple** check box on the top right. Once you have selected multiple process instances, click **Delete** from the top right.

## User Tasks

The **User Tasks** section is for monitoring all active, assigned, completed, and suspended tasks that are running in each application.

### Properties {#task-properties}

The properties for each task are:

| Property | Description |
| -------- | ----------- |
| ID | The unique ID of the task. |
| Task Name | The name given to the task. |
| Assignee | The user assigned to the task. |
| Status | The current status of the task. See the table below for a list of possible statuses. |
| Created Date | The time since the task was started. |
| Last Modified | The time since the task was last updated. |
| Parent ID | The ID of a parent task if the standalone task has one. |

Further details are available to view for each task by clicking on it. A properties panel will appear on the right-hand side of the screen and certain properties can be edited if the status is `CREATED` or `ASSIGNED`.

The status of tasks are:

| Status | Description |
| ------ | ----------- |
| CREATED | The task has been created but not yet assigned. |
| ASSIGNED | The task has been assigned but not yet completed. |
| COMPLETED | The task has been completed. |
| SUSPENDED | The task is suspended because the process instance it belongs to has been suspended. It cannot be completed until the process instance is activated. |
| CANCELLED | The task has been cancelled and cannot be completed. |

#### Select multiple user tasks

You can delete or change the assignee of multiple user tasks at the same time.

1. Select the **Select Multiple** check box on the top right.  

2. Use the check boxes on the left next to each user task to select the ones you want to change.

    You can also select all of the user tasks at once by selecting the check box at the top of the list.

3. Click **Delete** or **Change assignee** from the three dots menu on the top right.

    This change will apply to all of the user tasks you have selected on the left.

4. Follow the prompts and confirm to delete the user tasks or select a new assignee and then click **Assign**.

### Variables {#task-variables}

Use the **Variables** option to view and edit the [task variables]({% link process-automation/latest/model/forms.md %}#form-variables) values for a user task.

> **Note:** Task variables are also known as form variables from a modeling perspective.

The properties for task variables are:

| Property | Description |
| -------- | ----------- |
| Name | The name of the task variable. |
| Type | The [type]({% link process-automation/latest/model/forms.md %}#form-variable-properties) of the task variable. |
| Value | The current value of the task variable. The word `json` will be displayed for JSON variables. Click it to view the full JSON value. |
| Edit | If the task status is `CREATED` or `ASSIGNED` then the `Value` of a task variable can be updated. |

### Sibling tasks

Use the **Sibling Tasks** option to view any other standalone tasks that share the same parent task.

### Audit {#task-audit}

Use the **Audit** option to view all audit logs for the selected task. This will open the [audit](#audit) section with the filter restricted to the application and the `Event ID` of the selected user task.

## Service Tasks

The **Service Tasks** section is for monitoring all [service tasks]({% link process-automation/latest/model/processes/bpmn.md %}#service-task) that are running in each application. You can enter a **ProcessInstanceID** in the filter to view all the service tasks of a specific process instance. See [Process Instances](#process-instances) for how to automatically populate the **Service Tasks** section with the service tasks of a particular process instance.

> **Note:** This includes [connectors]({% link process-automation/latest/model/connectors/index.md %}), [decision tables]({% link process-automation/latest/model/decisions.md %}) and [scripts]({% link process-automation/latest/model/scripts.md %}).

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

Use the **View Error** option on a service task with the status of `ERROR`. This will display a detailed stack trace of the error associated with the service task.

## Audit

The **Audit** section provides details of all the [events]({% link process-automation/latest/model/processes/events.md %}) that have occurred in applications.

All audit events can be filtered based on the application, event type, event ID, or process instance ID. Use the **Export** button on the top right to download a `.CSV` list of all the audit events. Even if you have filtered the audit events you still download all the audit events for the selected application.

### Properties {#audit-properties}

The properties for each audit event are:

| Property | Description |
| -------- | ----------- |
| Event Type | The type of the event that occurred, for example `SEQUENCE_FLOW_TAKEN` shows where a [sequence flow]({% link process-automation/latest/model/processes/bpmn.md %}#sequence-flow) was followed. |
| Event Time | The timestamp for when the event happened. |
| Event ID | The unique ID of the event. |
| Process Instance ID | The process instance ID of the process that the event occurred in. |
| Event Action | The payload of the event in JSON format. Click to view the details. |

## Data Cleanup

You can clean up historical data using the Create cleanup job process from within the Admin App.

1. Sign into the Admin App.

2. Expand **Process Admin** from the left pane.

3. Select **Data Cleanup**.

4. Click the **+** symbol on the top right to create a new cleanup job.

5. Use the application you want to run the Create cleanup job process for from the drop down menu.

6. Use the applications process definition you want to cleanup.

    You can select multiple process definitions. If you do not select a process definition for the application all process definitions are selected.

7. Use the period of time you want to retain any completed or cancelled processes.

8. Click **Yes I agree** to creating the cleanup job and then click **CREATE**.

![Cleanup Job]({% link process-automation/images/cleanup-job.png %})
