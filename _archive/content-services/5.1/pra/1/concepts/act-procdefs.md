---
author: Alfresco Documentation
---

# Process definitions

A process definition is a description of an execution flow in terms of activities. New processes are created and started for a process definition.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/process-definitions](https://api-explorer.alfresco.com/api-explorer/#/process-definitions). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/process-definitions](http://localhost:8080/api-explorer/#/process-definitions).

## Process definition object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|String|The unique id of this process definition|
|key|String|String|The key of this process definition|
|Version|Number|Nunber|For process definitions with the same key, this is the version number|
|name|String|String|The name of this process definition|
|category|String|String|The category to which this process definition belongs|
|deploymentId|String|String|The deployment of which this process definition is a part|
|title|String|String|The title of this process definition|
|Description|String|String|The description of this process definition|
|startFormResourceKey|String|String|The start form key|
|graphicNotationDefined|Boolean|Boolean| |

## Example of a process definition object

```
{
  "id": "financialReport:1",
  "key": "financialReport",
  "version": 1,
  "name": "April financial report",
  "category": "com.acme.financial",
  "deploymentId": "123",
  "title": "Financial report of the month April",
  "description": "Sample description",
  "startFormResourceKey": "wf:adhocTask",
  "graphicNotationDefined": true          
}
```

**Parent topic:**[Entity reference](../../../pra/1/concepts/pra-resources.md)

