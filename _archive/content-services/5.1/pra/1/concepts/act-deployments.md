---
author: Alfresco Documentation
---

# Deployments

A deployment resource represents one file inside a deployment.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/deployments](https://api-explorer.alfresco.com/api-explorer/#/deployments). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/deployments](http://localhost:8080/api-explorer/#/deployments).

Process files, forms and perhaps some other files are authored in a separate environment. The act of deployment brings them into the runtime workflow engine.

A deployment is a collection of files that include all resources to specify one or more process definitions. After deployment, the included process definitions are known to the workflow runtime engine and new processes can be started.

Users can then continue to edit the process and other files in their authoring environment like e.g. our eclipse based process editor. A redeployment will result in a complete separate deployment containing new versions of the process definition.

When a process definition inside a new deployment has the same key as an existing process definition, then it is considered a new version of the existing process definition.

## Deployment object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|String|The unique id of this deployment|
|name|String|String|The name this deployment file|
|category|String|String|The category URL|
|category|Date Time|String|The time of this deployment|

## Example of a deployment object

```
 
entry: {
    "id": "92837492",
    "name": "activiti-examples.bar",
    "category": "http://alfresco.org/workflows/examples",
    "deployedAt": "2010-10-13T14:54:26.750+02:00"
}
```

**Parent topic:**[Entity reference](../../../pra/1/concepts/pra-resources.md)

