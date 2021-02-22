# Comments

Comments can be added to a process instance or a task.

To get the list of comments:

```
GET api/enterprise/process-instances/{processInstanceId}/comments
```

```
GET api/enterprise/tasks/{taskId}/comments
```

To create a comments:

```
POST api/enterprise/process-instances/{processInstanceId}/comments
```

```
POST api/enterprise/tasks/{taskId}/comments
```

with in the json body one property called `message`, with a value that is the comment text.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

