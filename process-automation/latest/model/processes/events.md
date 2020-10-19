---
title: Engine events
---

Engine events are events generated as part of the life cycle of processes. They include events such as when BPMN activity is started, saved, submitted or completed. They can be used as [trigger events]({% link process-automation/latest/model/triggers.md %}) and for [audit](LINK) purposes.

## Properties

All engine events have a common set of properties describing the service they are using and a common set of properties describing the event.

The service properties are:

| Name | Description |
| ---- | ----------- |
|  appName  | The name of the application, for example `finance-application`. |
|  appVersion  | The version number of the application, for example `3`.  |
|  serviceName  | The name of the service in the application, for example `rb-finance-application`.  |
|  serviceFullName  | The full name of the service in the application. This is the same as `serviceName`. |
|  serviceType  | The type of service, for example `runtime-bundle`.  |
|  serviceVersion  | The version of the service. |
|  messageId  | The ID of the message that carried the event. All events that are part of the same transaction are aggregated into the same message. |
|  sequenceNumber  | The sequence index of an event within a message. |
|  entityId  | The ID of an entity included in a message. |

The event properties are:

| Name | Description |
|------|-------------|
| id | The event ID. |
| entity | The entity included in the message. |
| timestamp | The timestamp of the event. |
| eventType | The type of event. |
| processInstanceId | The process instance ID. |
| parentProcessInstanceId | The parent process instance ID if one exists. |
| processDefinitionId | The process definition ID. |
| processDefinitionKey | The process definition key. |
| processDefinitionVersion | The version of the process definition. |
| businessKey | The business key associated to the process instance if one exists. |

## Event Types

| Event | Description |
| ----- | ----------- |
| ACTIVITY_STARTED | An activity is starting to execute. This event is sent just before an activity is executed. |
| ACTIVITY_CANCELLED | An activity has been cancelled. |
| ACTIVITY_COMPLETED | An activity has been completed. |
| ERROR_RECEIVED | An activity has received an error event. |
| SIGNAL_RECEIVED | An activity has received a signal. |
| TIMER_FIRED | A timer has been fired. It will be followed by either a `TIMER_EXECUTED` or `TIMER_FAILED` event. |
| TIMER_CANCELLED | A timer has been cancelled, for example if a task was completed before the timer expired. |
| TIMER_SCHEDULED | A timer has been scheduled. |
| TIMER_EXECUTED | A timer has executed. |
| TIMER_FAILED | A timer failed to fire. |
| TIMER_RETRIES_DECREMENTED | The retry count for a timer has been decreased. |
| MESSAGE_WAITING | A message catch event is waiting to receive a message. |
| MESSAGE_RECEIVED | An activity received a message. |
| MESSAGE_SENT | A message throw event has sent a message. |
| INTEGRATION_REQUESTED | The application runtime bundle has sent a request to a connector. |
| INTEGRATION_RESULT_RECEIVED | The application runtime bundle has received a result from a connector. |
| PROCESS_DEPLOYED | A new process definition is available. These events are sent when the application runtime bundle first starts and on any restarts. |
| PROCESS_CREATED | A process instance has been created. |
| PROCESS_STARTED | A process instance has been started. |
| PROCESS_COMPLETED | A process instance has been completed. This event is sent after the final `ACTIVITY_COMPLETED` event is sent. |
| PROCESS_CANCELLED | A process instance has been cancelled. |
| PROCESS_SUSPENDED | A process instance has been suspended. |
| PROCESS_RESUMED | A previously suspended process instance has been resumed. |
| PROCESS_UPDATED | A process instance has been updated. |
| SEQUENCE_FLOW_TAKEN | A sequence flow between two activities has been taken. |
| START_MESSAGE_DEPLOYED | A start message event is waiting to catch a message. Similar to `MESSAGE_WAITING` but specific to start message events. |
| MESSAGE_SUBSCRIPTION_CANCELLED | A message event subscription entity has been deleted. For example, if a process instance is deleted that had an active catch message event activity. |
| TASK_CREATED | A task has been created. Note that [service tasks]({% link process-automation/latest/model/processes/bpmn.md %}#service-task) do not emit a `TASK_CREATED` event. The `INTEGRATION_REQUESTED` event should be monitored to report or track service tasks. |
| TASK_UPDATED | A task has been updated. |
| TASK_ASSIGNED | A task has been assigned. |
| TASK_COMPLETED | A task has been completed. Note that [service tasks]({% link process-automation/latest/model/processes/bpmn.md %}#service-task) do not emit a `TASK_COMPLETED` event. The `INTEGRATION_RESULT_RECEIVED` event should be monitored to report or track service tasks. |
| TASK_SUSPENDED | A task has been suspended. |
| TASK_ACTIVATED | A previously suspended task has been reactivated. |
| TASK_CANCELLED | A task has been cancelled. |
| TASK_CANDIDATE_USER_ADDED | A user has been added to the list of candidates for a task. |
| TASK_CANDIDATE_USER_REMOVED | A user has been removed from the list of candidates for a task. |
| TASK_CANDIDATE_GROUP_ADDED | A group has been added to the list of candidates for a task. |
| TASK_CANDIDATE_GROUP_REMOVED | A group has been removed from the list of candidates for a task. |
| VARIABLE_CREATED | A variable has been created. |
| VARIABLE_UPDATED | A variable has been updated. |
| VARIABLE_DELETED | A variable has been deleted. |
