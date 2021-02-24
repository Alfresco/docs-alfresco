---
author: Alfresco Documentation
---

# Create or update variables for a process

Use this to create or update variables for a given process. If one of the variables doesn't exist yet, it will be created.

## Authorization

In non-network deployments, a user can update variables are updated for which the user started the process or if the user is involved in any of the process’s tasks.

If networks are enabled, the authenticated user can update variables inside their network.

In non-network deployments, administrators can see all variables and perform all operations on variables. In network deployments, network administrators can see all variables in their network and perform all operations on variables in their network.

## Method

Using the HTTP PUT method:-

```
processes
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/processes/<processId>/variables
```

## PUT body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|name|string|string|The name of the variable to update. It should match the name in the URL.|
|value|string, number or boolean|string|The value of the variable to update.|
|type|string which points to a valid data-type, for example `d:int` or `d:text` .|string|An optional type in which to store the variable. If specified, the value is converted to the required type based on the ‘value’ property supplied. When type is omitted, the value will be based on the JSON-type of the variable, `text`, `number`, `boolean`.|

## Example PUT body

```
[{
  "name": "bpm_priority",
  "value": 1,
  "type": "d_int"
}]

```

## Example response body

```
{
   "name": "bpm_priority",
   "value": 1,
   "type": "d_int"
}
         

```

**Parent topic:**[Processes](../../../pra/1/concepts/act-processes.md)

