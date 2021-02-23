---
author: Alfresco Documentation
---

# Start a new process

Use this to start a new process.

## Authorization

In non-network deployments, any authenticated user can start a new process for any process definition.

If networks are enabled, the authenticated user can can start a new process for a process definition in the user's network.

## Method

Using the HTTP POST method:-

```
processes
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|processDefinitionId|id|string|A specific version of a process definition. For example, financialReport:1 . Either the processDefinitionId or the processDefinitionKey must be specified.|
|processDefinitionKey|key|string|A logical process definition. For example, financialReport Multiple versions of this process definition may be deployed. The new process starts in the latest version of the process definition. Either the processDefinitionId or the processDefinitionKey must be specified|
|businessKey|key|string|A user defined unique identifier for this process. You can find this process based on this value.|
|variables|object|object consisting of name/value pairs|The variables that will be set during initialization of the new process. For `cm:person` and `cm:authorityContainer` content model types the value must be the fully qualified user name or group name. The user and group name will be transformed to a node reference by Alfresco.|
|items|array|array|An array of string items. For more information on items see [Items and Packages](act-items-and-packages.md).|

In the REST service the following process instance variables are created automatically, in addition to the variables and items provided in the request:

-   **bpm:package**

    The package node reference that holds references to all documents attached to the process instance.

-   **cancelled**

    Initially false

-   **companyHome**

    The company home value

-   **initiator**

    The person that started the process instance

-   **initiatorHome**

    The home location of the person that started the process instance

-   **\_network\_domain**

    If multi tenancy is enabled this is the network domain name


## Example POST body

```
{
  "processDefinitionId": "financialReport:1",
  "processDefinitionKey": "financialReport",
  "businessKey": "55",
  "variables": {
                "bpm_assignee":"fred",
                "bpm_sendEMailNotifications":false,
                "bpm_workflowPriority":1
               },
  "items": ["42eef795-857d-40cc-9fb5-5ca9fe6a0592", "42eef795-857d-40cc-9fb5-5ca9fe6a0592"] ,      
}


```

## Example response body

The body of the response will be a single process:

```
{
 { entry: {
    "id": "2",
    "processDefinitionId": "financialReport:1",
    "processDefinitionKey": "financialReport",
    "businessKey": "55",
    "startedAt": "2010-10-13T14:54:26.750+02:00",
    "endedAt": "2010-10-13T14:54:26.750+02:00",
    "durationInMs": 9823720,  // expressed in millis
    "completed": true
    "startActivityId": "startFinancialAnalysis",
    "endActivityId": "success",
    "startUserId": "kermit",
    "deleteReason": "cancelled",
    "superProcessInstanceId", "1"
  }
}

```

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

