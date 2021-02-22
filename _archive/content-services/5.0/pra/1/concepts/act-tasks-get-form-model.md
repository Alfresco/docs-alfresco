---
author: Alfresco Documentation
---

# Get model of the task form type definition

Use this to get the model of the task form type definition.

## Authorization

An authenticated user will have access to all task form models. In a network, only task form models that are inside the given network are returned.

## Method

Using the HTTP GET method:-

```

tasks/<taskId>/task-form-model
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/tasks/152/task-form-model
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be the task form model:

```
{ 
  "entry": {
  "dataType": "d:text",
  "title": "Name",
  "qualifiedName":  
    "{http://www.alfresco.org/model/content/1.0}/name",
  "name": "cm_name",
  "required": true,
  "defaultValue": "Default name",
  "allowedValues": ["text1", "text2"]
  } 
}
```

**Parent topic:**[Tasks](../../../pra/1/concepts/act-tasks.md)

