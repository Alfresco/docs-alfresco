# Process Instance Audit Log As JSON

If you need the audit log information as a JSON you can use the next URL:

```
GET api/enterprise/process-instances/{process-instance-id}/audit-log
```

**Response**

**`200 Ok`**

Returns a JSON string representing the full audit log for the requested process instance. For example:

```
{
  "processInstanceId": "5",
  "processInstanceName": "myProcessInstance",
  "processDefinitionName": "TEST decision process",
  "processDefinitionVersion": "1",
  "processInstanceStartTime": "Wed Jan 20 16:18:46 EET 2016",
  "processInstanceEndTime": null,
  "processInstanceInitiator": "Mr Activiti",
  "entries": [
    {
      "index": 1,
      "type": "startForm",
      "timestamp": "Wed Jan 20 16:18:46 EET 2016",
      "selectedOutcome": null,
      "formData": [
        {
          "fieldName": "Text1",
          "fieldId": "text1",
          "value": "TEST"
        }
      ],
      "taskName": null,
      "taskAssignee": null,
      "activityId": null,
      "activityName": null,
      "activityType": null
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:05 GMT 2017",
      "durationInMillis": 1
    },
    {
      "index": 2,
      "type": "activityExecuted",
      "timestamp": "Wed Jan 20 16:18:46 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": null,
      "activityId": "startEvent1",
      "activityName": "",
      "activityType": "startEvent"
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    },
    {
      "index": 3,
      "type": "activityExecuted",
      "timestamp": "Wed Jan 20 16:18:47 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": null,
      "activityId": "sid-15E18ED8-252F-4A24-9E93-68F53FE28535",
      "activityName": "",
      "activityType": "serviceTask"
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    },
    {
      "index": 4,
      "type": "activityExecuted",
      "timestamp": "Wed Jan 20 16:18:48 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": null,
      "activityId": "sid-001FD811-C171-40E3-9C62-602621672022",
      "activityName": "",
      "activityType": "userTask"
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    },
    {
      "index": 5,
      "type": "taskCreated",
      "timestamp": "Wed Jan 20 16:18:48 EET 2016",
      "selectedOutcome": null,
      "formData": [],
      "taskName": null,
      "taskAssignee": "Mr Activiti",
      "activityId": null,
      "activityName": null,
      "activityType": null
      "startTime": "Thu Feb 16 16:32:05 GMT 2017",
      "endTime": "Thu Feb 16 16:32:09 GMT 2017",
      "durationInMillis": 24054
    }
  ],
  "decisionInfo": {
    "calculatedValues": [
      {
        "name": "outputVariable1",
        "value": "1.0"
      }
    ],
    "appliedRules": [
      {
        "title": "Rule 1 (TEST Decision Table 1)",
        "expressions": [
          {
            "type": "CONDITION",
            "variable": "text1",
            "value": "== 'TEST'"
          },
          {
            "type": "OUTCOME",
            "variable": "outputVariable1",
            "value": "1"
          }
        ]
      }
    ]
  }
}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

