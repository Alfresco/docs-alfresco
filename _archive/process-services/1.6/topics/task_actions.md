# Task Actions

To update the details of a task:

```
PUT api/enterprise/tasks/{taskId}
```

with a json body that can contain `name`, `description` and `dueDate` \(ISO 8601 string\)

For example:

**Example request:**

```
{
  "name" : "IchangedTaskName",
  "description" : "description-updated",
  "dueDate" : "2015-01-11T22:59:59.000Z",
  "priority":10,
  "formKey": "100"
}
```

To delegate a task:

```
PUT api/enterprise/tasks/{taskId}/action/delegate
```

**Example request**:

```
{
     "userId": "1000"
}
```

To resolve a task:

```
PUT api/enterprise/tasks/{taskId}/action/resolve
```

To complete a task \(standalone or without a task form\) \(**Note**: No json body needed!\):

```
PUT api/enterprise/tasks/{taskId}/action/complete
```

To claim a task \(in case the task is assigned to a group\):

```
PUT api/enterprise/tasks/{taskId}/action/claim
```

No json body needed. The task will be claimed by the user in the authentication credentials.

To assign a task to a user:

```
PUT api/enterprise/tasks/{taskId}/action/assign
```

with a json body that contains the `assignee` property set to the `ID` of a user.

To involve a user with a task:

```
PUT api/enterprise/tasks/{taskId}/action/involve
```

with a json body that contains the `userId` property set to the `ID` of a user.

To remove an involved user from a task:

```
PUT api/enterprise/tasks/{taskId}/action/remove-involved
```

with a json body that contains the `userId` property set to the `ID` of a user.

To attach a form to a task:

```
PUT api/enterprise/tasks/{taskId}/action/attach-form
```

with a json body that contains the `formId` property set to the the `ID` of a form.

To attach a form to a task:

```
DELETE api/enterprise/tasks/{taskId}/action/remove-form
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

