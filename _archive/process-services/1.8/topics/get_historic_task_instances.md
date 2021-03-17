# Get historic task instances

The following table lists the request parameters that can be used in the JSON body POST. For example, in case of `taskCompletedAfter`:

```
----
POST api/enterprise/historic-tasks/query
----
```

```
With a json body request:
{
"taskCompletedAfter":"2016-06-16",
"size":50,
"start":0
}
```

Example response:

```
{
  "size": 4,
  "total": 4,
  "start": 0,
  "data": [
    {
      "id": "7507",
      "name": "my task",
      "assignee": {
        "id": 1000,
        "firstName": "Homer",
        "lastName": "Simpson",
        "email": "homer.simpson@gmail.com"
      },
      "created": "2016-06-17T15:14:26.938+0000",
      "dueDate": null,
      "endDate": "2016-06-17T16:09:39.197+0000",
      "duration": 3312259,
      "priority": 50,
. . .
```

|`taskId`

|An ID of the historic task instance.

|
|`processInstanceId`

|The process instance id of the historic task instance.

|
|`processDefinitionKey`

|The process definition key of the historic task instance.

|
|`processDefinitionKeyLike`

|The process definition key of the historic task instance, which matches the given value.

|
|`processDefinitionId`

|The process definition id of the historic task instance.

|
|`processDefinitionName`

|The process definition name of the historic task instance.

|
|`processDefinitionNameLike`

|The process definition name of the historic task instance, which matches the given value.

|
|`processBusinessKey`

|The process instance business key of the historic task instance.

|
|`processBusinessKeyLike`

|The process instance business key of the historic task instance that matches the given value.

|
|`executionId`

|The execution id of the historic task instance.

|
|`taskDefinitionKey`

|The task definition key for tasks part of a process

|
|`taskName`

|The task name of the historic task instance.

|
|`taskNameLike`

|The task name with like operator for the historic task instance.

|
|`taskDescription`

|The task description of the historic task instance

|
|`taskDescriptionLike`

|The task description with like operator for the historic task instance.

|
|`taskDefinitionKey`

|The task identifier from the process definition for the historic task instance.

|
|`taskDeleteReason`

|The task delete reason of the historic task instance.

|
|`taskDeleteReasonLike`

|The task delete reason with like operator for the historic task instance.

|
|`taskAssignee`

|The assignee of the historic task instance.

|
|`taskAssigneeLike`

|The assignee with like operator for the historic task instance.

|
|`taskOwner`

|The owner of the historic task instance.

|
|`taskOwnerLike`

|The owner with like operator for the historic task instance.

|
|`taskInvolvedUser`

|An involved user of the historic task instance. Where, *InvolvedUser* is the User ID.

|
|`taskPriority`

|The priority of the historic task instance.

|
|`finished`

|Indicates if the historic task instance is complete.

|
|`processFinished`

|Indicates if the process instance of the historic task instance is finished.

|
|`parentTaskId`

|An optional parent task ID of the historic task instance.

|
|`dueDate`

|Returns only historic task instances that have a due date equal to this date.

|
|`dueDateAfter`

|Returns only historic task instances that have a due date after this date.

|
|`dueDateBefore`

|Returns only historic task instances that have a due date before this date.

|
|`withoutDueDate`

|Returns only historic task instances that have no due-date. When false value is provided, this parameter is ignored.

|
|`taskCompletedOn`

|Returns only historic task instances that have been completed on this date.

|
|`taskCompletedAfter`

|Returns only historic task instances that have been completed after this date.

|
|`taskCompletedBefore`

|Return only historic task instances that have been completed before this date.

|
|`taskCreatedOn`

|Returns only historic task instances that were created on this date.

|
|`taskCreatedBefore`

|Returns only historic task instances that were created before this date.

|
|`taskCreatedAfter`

|Returns only historic task instances that were created after this date.

|
|`includeTaskLocalVariables`

|Indicates if the historic task instance local variables should be returned.

|
|`includeProcessVariables`

|Indicates if the historic task instance global variables should be returned.

|
|`tenantId`

|Returns historic task instances with the given tenantId.

|
|`tenantIdLike`

|Returns historic task instances with a tenantId like the given value.

|
|`withoutTenantId`

|If true, only returns historic task instances without a tenantId set. If false, *withoutTenantId* is ignored.

|

**Parent topic:**[Historic processes and tasks](../topics/history.md)

