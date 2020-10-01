---
title: Synchronous Actions
---
The execution of the action is performed as part of the request handling. An `action.status` value is included in the response that indicates if the action has been performed successfully or not. If the action fails, an additional `errorMessage` value is included in the response.

Generic `success` response:

```json
{
  "responseHeader": {
    "QTime": 1,
    "status": 0
  },
  "action": {
    "status": "success"
  }
}
```

Generic `error` response:

```json
{
   "responseHeader": {
      "QTime": 1,
      "status": 0
  },
  "action": {
    "errorMessage": "Core alfresco has NOT been created as storeRef param is required",
    "status": "error"
  }
}
```
