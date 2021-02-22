# Task Audit Info \(as JSON\)

To obtain the audit information for a specific task in JSON format, use the following URL:

```
GET api/enterprise/tasks/{taskId}/audit
```

**Response**

***200 Ok***

If everything works as expected and the task is accessible to the current user, then the response will be as follows:

```
{
  "taskId": "18",
  "taskName": null,
  "processInstanceId": "5",
  "processDefinitionName": "TEST decision process",
  "processDefinitionVersion": 1,
  "assignee": "Mr Activiti",
  "startTime": "Wed Jan 20 22:03:05 EET 2016",
  "endTime": "Wed Jan 20 22:03:09 EET 2016",
  "formData": [],
  "selectedOutcome": null,
  "comments": []
}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

