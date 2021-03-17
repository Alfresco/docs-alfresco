---
author: Alfresco Documentation
---

# Process definitions

A process definition is a description of an execution flow in terms of activities. New processes are created and started for a process definition.

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

-   **[Get a list of process definitions.](../../../pra/1/concepts/act-procdefs-get-procdefs.md)**  
Use this to get a list of process definitions.
-   **[Get a single process definition.](../../../pra/1/concepts/act-procdefs-get-procdef.md)**  
Use this to get a process definition identified by a process definition id.
-   **[Get an image of a single process definition.](../../../pra/1/concepts/act-procdefs-get-image.md)**  
Use this to get an image that represents a single process definition.
-   **[Get model of the start form type definition.](../../../pra/1/concepts/act-procdefs-get-form-model.md)**  
Use this to get the model of the start form type definition

**Parent topic:**[API Reference](../../../pra/1/concepts/pra-resources.md)

