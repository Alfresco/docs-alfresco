---
author: Alfresco Documentation
---

# Get model of the start form type definition.

Use this to get the model of the start form type definition

## Authorization

An authenticated user will have access to all start form models. In a network, only start form models that are inside the given network are returned.

## Method

Using the HTTP GET method:-

```

process-definitions/<processDefinitionId>/start-form-model
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/workflow/versions/1/process-definitions/financialReport:1/start-form-model
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

The body of the response will be the start form model:

```
{
  "entries": [
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
  ]
}

```

**Parent topic:**[Process definitions](../../../pra/1/concepts/act-procdefs.md)

