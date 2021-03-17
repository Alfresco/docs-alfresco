# Model Details and History

Both app definition and process definition models are versioned.

To retrieve details about a particular model \(process, form, decision rule or app\):

```
GET api/enterprise/models/{modelId}
```

**Example response:**

```
{
     "createdBy": 1,
     "lastUpdatedBy": 1,
     "lastUpdatedByFullName": " Administrator",
     "name": "aad",
     "id": 2002,
     "referenceId": null,
     "favorite": false,
     "modelType": 0,
     "comment": "",
     "version": 3,
     "lastUpdated": "2015-01-10T16:24:27.893+0000",
     "stencilSet": 0,
     "description": "",
     "createdByFullName": " Administrator",
     "permission": "write",
     "latestVersion": true
}
```

The response shows the current version of the model.

To retrieve a thumbnail of the model:

```
GET api/enterprise/models/{modelId}/thumbnail
```

To get the version information for a model:

```
GET api/enterprise/models/{modelId}/history
```

**Example response:**

```
{
     "size": 2,
     "total": 2,
     "data": [
          {
               "createdBy": 1,
               "lastUpdatedBy": 1,
               "lastUpdatedByFullName": " Administrator",
               "name": "aad",
               "id": 3000,
               "referenceId": null,
               "favorite": null,
               "modelType": 0,
               "comment": "",
               "version": 2,
               "lastUpdated": "2015-01-10T16:15:50.579+0000",
               "stencilSet": 0,
               "description": "",
               "createdByFullName": " Administrator",
               "permission": null,
               "latestVersion": false
          },
          {
               "createdBy": 1,
               "lastUpdatedBy": 1,
               "lastUpdatedByFullName": " Administrator",
               "name": "aad",
               "id": 2000,
               "referenceId": null,
               "favorite": null,
               "modelType": 0,
               "comment": null,
               "version": 1,
               "lastUpdated": "2015-01-10T16:07:41.831+0000",
               "stencilSet": 0,
               "description": "",
               "createdByFullName": " Administrator",
               "permission": null,
               "latestVersion": false
          }
     ],
     "start": 0
}
```

To get a particular older version:

```
GET api/enterprise/models/{modelId}/history/{modelHistoryId}
```

To create a new model:

```
POST api/enterprise/models/
```

with a json body that looks like:

```
{
    "modelType": 0,
    "name": "My process",
    "description": "This is my favourite process!"
}
```

The modelType property defines the kind of model that is created:

-   0 is a BPMN 2.0 process model

-   1 is a step process model

-   2 is a form model

-   3 is an app model

-   4 is a decision table model


Following properties are optional:

-   *stencilSet* : the identifier of the stencilset in case a non-default stencilset needs to be used.


To update the details of a model:

```
PUT api/enterprise/models/{modelId}
```

with a json body that looks like:

```
{
    "name": "New name",
    "description": "New description"
}
```

To favorite a model:

```
PUT api/enterprise/models/{modelId}
```

with as json body:

```
{
    "favorite": true
}
```

To delete a model:

```
DELETE api/enterprise/models/{modelId}
```

To duplicate a model:

```
POST api/enterprise/models/{modelId}/clone
```

with as json body:

```
{
    "name": "Cloned model"
}
```

To convert a step process to a BPMN 2.0 process, add *"modelType" : 0* to the body.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

