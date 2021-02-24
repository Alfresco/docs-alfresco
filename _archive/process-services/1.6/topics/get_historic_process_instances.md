# Get historic process instances

The following table lists the request parameters to be used in the JSON body POST. For example, to filter historic process instances that completed before the given date \(`startedBefore`\):

```
POST api/enterprise/historic-process-instances/query
```

With a JSON body request:

```
{
"startedBefore":"2016-06-16",
}
```

Example response:

```
{
"size": 25,
"total": 200,
"start": 0,
  "data": [
    {
      "id": "2596",
      "name": "Date format example - June 7th 2016",
      "businessKey": null,
      "processDefinitionId": "dateformatexample:1:2588",
      "tenantId": "tenant_1",
      "started": "2016-06-07T14:18:34.433+0000",
      "ended": null,
      "startedBy": {
        "id": 1,
        "firstName": null,
        "lastName": "Administrator",
        "email": "admin@app.activiti.com"
      },
{
"id": "2596",
. . .
```

Where, \*`size` is the size of the page or number of items per page. By default, the value is 25. \* `start` is the page to start on. Pages are counted from 0-N. By default, the value is 0, which means 0 will be the first page.

|`processInstanceId`

|An ID of the historic process instance.

|
|`processDefinitionKey`

|The process definition key of the historic process instance.

|
|`processDefinitionId`

|The process definition id of the historic process instance.

|
|`businessKey`

|The business key of the historic process instance.

|
|`involvedUser`

|An involved user of the historic process instance. Where, `InvolvedUser` is the ID of the user.

|
|`finished`

|Indicates if the historic process instance is complete. Where, the value may only be `True`, as the default values are `True` or `False`.

|
|`superProcessInstanceId`

|An optional parent process id of the historic process instance.

|
|`excludeSubprocesses`

|Returns only historic process instances which aren’t sub-processes.

|
|`finishedAfter`

|Returns historic process instances that finished after the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.

|
|`finishedBefore`

|Returns historic process instances that finished before the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.

|
|`startedAfter`

|Returns historic process instances that were started after the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.

|
|`startedBefore`

|Returns historic process instances that were started before the given date. The date is displayed in `yyyy-MM-ddTHH:MM:SS` format.

|
|`startedBy`

|Returns only historic process instances that were started by the selected user.

|
|`includeProcessVariables`

|Indicates if the historic process instance variables should be returned.

|
|`tenantId`

|Returns instances with the given `tenantId`.

|
|`tenantIdLike`

|Returns instances with a `tenantId` like the given value.

|
|`withoutTenantId`

|If true, only returns instances without a `tenantId` set. If false, the `withoutTenantId` parameter is ignored.

|

**Parent topic:**[Historic processes and tasks](../topics/history.md)

